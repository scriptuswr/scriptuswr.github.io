// Helper: obtener cantidad total disponible de preguntas según el modo actual
function getAvailableQuestionCount() {
    const mode = TestEngine.state.testMode;
    // Para modos basados en palabras, usamos wordPool; para el resto usamos characterPool
    if (!TestEngine.state || !TestEngine.state.system) return 0;

    if (mode && (mode.includes('word') || mode.includes('syllable') || mode === 'letter-combinations' || mode === 'vowel-marks')) {
        // Algunos modos de palabra usan wordPool; si no hay wordPool devolvemos 0
        return (TestEngine.state.wordPool && TestEngine.state.wordPool.length) ? TestEngine.state.wordPool.length : 0;
    }

    // Por defecto usamos characterPool (letras)
    return (TestEngine.state.characterPool && TestEngine.state.characterPool.length) ? TestEngine.state.characterPool.length : 0;
}

// Test Screen Component (actualizado para mostrar estado respecto al selector de duración)
function renderTestScreen() {
    const question = TestEngine.getCurrentQuestion();
    const score = TestEngine.getScore();

    if (!question) {
        return '<div class="container" style="padding: 3rem; text-align: center;">No question available</div>';
    }

    const totalAnswered = score.total; // preguntas respondidas hasta ahora
    const currentIndex = totalAnswered + 1;

    // Lógica de duración / pool
    const requestedMax = TestEngine.state && typeof TestEngine.state.maxQuestions !== 'undefined' ? Number(TestEngine.state.maxQuestions) : 0; // 0 = todas
    const availablePool = getAvailableQuestionCount(); // total de preguntas disponibles según el pool
    // Si requestedMax > 0 usamos el mínimo entre requestedMax y availablePool (si availablePool>0)
    const effectiveTotal = (requestedMax > 0)
        ? (availablePool > 0 ? Math.min(requestedMax, availablePool) : requestedMax)
        : (availablePool > 0 ? availablePool : 0); // si requestedMax===0 (todas), intentamos usar availablePool para mostrar denominador

    // Porcentaje de progreso: si effectiveTotal === 0 mostramos 0%
    const progressPercent = effectiveTotal > 0 ? Math.round((totalAnswered / effectiveTotal) * 100) : 0;

    // Accuracy (porcentaje de aciertos)
    const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

    // Texto para el denominador (si requestedMax === 0 mostramos "Todas" y, si conocemos availablePool, lo indicamos)
    let denomLabel;
    if (requestedMax === 0) {
        denomLabel = (availablePool > 0) ? `Todas (${availablePool})` : 'Todas';
    } else {
        // Mostrar si se pidió más de lo disponible
        if (availablePool > 0 && requestedMax > availablePool) {
            denomLabel = `${requestedMax} (pool: ${availablePool})`;
        } else {
            denomLabel = `${requestedMax}`;
        }
    }

    // Aviso corto por si el usuario pidió más preguntas de las disponibles
    let poolWarning = '';
    if (requestedMax > 0 && availablePool > 0 && requestedMax > availablePool) {
        poolWarning = `<div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">
            Solicitaste <strong>${requestedMax}</strong> preguntas, pero el pool disponible tiene <strong>${availablePool}</strong>.
            El test terminará cuando se agoten las preguntas del pool.
        </div>`;
    } else if (requestedMax === 0 && availablePool === 0) {
        poolWarning = `<div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">
            No se pudo determinar el tamaño del pool (tal vez no seleccionaste filas o el modo no tiene entradas).
        </div>`;
    }

    return `
        <div class="container" style="padding-top: 2rem; padding-bottom: 3rem;">
            <div style="max-width: 700px; margin: 0 auto;">
                <!-- Progress Bar -->
                <div class="fade-in" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                            Pregunta ${currentIndex} de ${denomLabel}
                        </div>
                        <div style="font-size: 0.875rem; font-weight: 600; color: var(--accent);">
                            ${accuracy}% Precisión
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${Math.min(100, progressPercent)}%;"></div>
                    </div>
                    ${poolWarning}
                </div>
                
                <!-- Score Display -->
                <div class="card fade-in" style="margin-bottom: 2rem; display: flex; justify-content: space-around; text-align: center;">
                    <div>
                        <div style="font-size: 2rem; font-weight: 700; color: var(--success);">
                            ${score.correct}
                        </div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                            Correcto
                        </div>
                    </div>
                    <div style="border-left: 2px solid var(--border);"></div>
                    <div>
                        <div style="font-size: 2rem; font-weight: 700; color: var(--error);">
                            ${score.incorrect}
                        </div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                            Incorrecto
                        </div>
                    </div>
                    <div style="border-left: 2px solid var(--border);"></div>
                    <div>
                        <div style="font-size: 2rem; font-weight: 700; color: var(--accent);">
                            ${score.total}
                        </div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                            Total
                        </div>
                    </div>
                </div>
                
                <!-- Question Card -->
                <div class="card scale-in" id="question-card" style="margin-bottom: 2rem; min-height: 300px; display: flex; flex-direction: column; justify-content: center;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${getQuestionTypeLabel(question)}
                        </div>
                        <div class="${question.type === 'letter' ? 'letter-display' : 'word-display'}" id="question-prompt">
                            ${question.prompt}
                        </div>
                        ${question.meaning ? `
                            <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">
                                Significado: ${question.meaning}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Answer Input -->
                    <div>
                        <input type="text" 
                               class="input input-focus" 
                               id="answer-input"
                               placeholder="Type your answer..."
                               autocomplete="off"
                               autofocus
                               style="text-align: center; font-size: 1.25rem;">
                    </div>
                </div>
                
                <!-- Feedback Area -->
                <div id="feedback-area" style="min-height: 60px;"></div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-secondary" 
                            onclick="App.endTest()"
                            style="flex: 1;">
                        Terminar test
                    </button>
                    <button class="btn btn-primary" 
                            id="submit-btn"
                            onclick="App.submitAnswer()"
                            style="flex: 2;">
                        Enviar respuestas
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getQuestionTypeLabel(question) {
    const labels = {
        'letter-to-romaji': 'Letra → Transcripción',
        'romaji-to-letter': 'Transcripción → Letra',
        'word-to-romaji': 'Palabra → Transcripción',
        'romaji-to-word': 'Transcripción → Palabra'
    };

    if (question.type === 'letter') {
        return question.direction === 'toRomaji' ? 'Letra → Transcripción' : 'Transcripción → Letra';
    } else {
        return question.direction === 'toRomaji' ? 'Palabra → Transcripción ' : 'Transcripción → Palabra';
    }
}

// Add enter key support for answer submission
function setupTestScreenListeners() {
    const input = document.getElementById('answer-input');
    if (input) {
        // Eliminar listeners previos para evitar duplicados
        input.removeEventListener && input.removeEventListener('keypress', () => {});
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                App.submitAnswer();
            }
        });
        input.focus();
        // Seleccionar texto para que el usuario pueda sobreescribir fácilmente
        input.select && input.select();
    }
}