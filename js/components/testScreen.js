function renderTestScreen() {
    const question = TestEngine.getCurrentQuestion();
    const score = TestEngine.getScore();

    // Si alcanzamos el límite de preguntas o no hay pregunta
    if (!question || (TestEngine.state.maxQuestions && score.total >= TestEngine.state.maxQuestions)) {
        // Finalizar automáticamente
        setTimeout(() => App.endTestAutomatically(), 100);
        return '<div class="container" style="padding: 3rem; text-align: center;"><div class="text-2xl">Finalizando prueba...</div></div>';
    }

    const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const isMultipleChoice = question.type === 'multiple-choice' || question.type === 'multiple-choice-word';

    return `
        <div class="container" style="padding: 2rem 0 4rem;">
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="fade-in" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                        <span style="font-size: 0.9rem; color: var(--text-secondary);">
                            Pregunta ${score.total + 1}${TestEngine.state.maxQuestions ? ` de ${TestEngine.state.maxQuestions}` : ''}
                        </span>
                        <span style="font-weight: 600; color: var(--accent);">${accuracy}% Precisión</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${TestEngine.state.maxQuestions ? (score.total / TestEngine.state.maxQuestions * 100) : accuracy}%;"></div>
                    </div>
                </div>
                
                <div class="card fade-in" style="margin-bottom: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
                    <div><div style="font-size: 2.5rem; font-weight: 700; color: var(--success);">${score.correct}</div><div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Correctas</div></div>
                    <div><div style="font-size: 2.5rem; font-weight: 700; color: var(--error);">${score.incorrect}</div><div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Incorrectas</div></div>
                    <div><div style="font-size: 2.5rem; font-weight: 700; color: var(--accent);">${score.total}</div><div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">Total</div></div>
                </div>
                
                <div class="card scale-in" id="question-card" style="margin-bottom: 2rem;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">
                            ${getQuestionTypeLabel(question)}
                        </div>
                        <div class="${(question.type === 'letter' || question.type === 'vowel-mark' || question.type === 'multiple-choice') ? 'letter-display' : 'word-display'}" id="question-prompt">
                            ${question.prompt}
                        </div>
                        ${question.type === 'multiple-choice-word' && question.romaji ? `<div style="font-size: 1.2rem; color: var(--text-secondary); margin-top: 1rem;">${question.romaji}</div>` : ''}
                        ${question.meaning && !isMultipleChoice ? `<div style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 1rem;">Significado: <strong>${question.meaning}</strong></div>` : ''}
                        ${question.hint ? `<div class="badge" style="margin-top: 1rem;">${question.hint}</div>` : ''}
                    </div>
                    
                    ${isMultipleChoice ? `
                        <div style="display: grid; gap: 1rem;">
                            ${question.options.map((option, index) => `
                                <button class="btn btn-secondary btn-lg multiple-choice-option" 
                                        onclick="App.submitMultipleChoice(${index})" 
                                        id="option-${index}"
                                        style="font-size: 1.25rem; padding: 1.25rem; text-align: center;">
                                    ${option}
                                </button>
                            `).join('')}
                        </div>
                    ` : `
                        <input type="text" class="input input-focus" id="answer-input" placeholder="Escribe tu respuesta..." autocomplete="off" autofocus
                               style="text-align: center; font-size: 1.3rem; padding: 1.25rem;">
                    `}
                </div>
                
                <div id="feedback-area" style="min-height: 70px;"></div>
                
                ${!isMultipleChoice ? `
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1rem;">
                    <button class="btn btn-secondary" onclick="App.endTest()">Finalizar</button>
                    <button class="btn btn-primary btn-lg" id="submit-btn" onclick="App.submitAnswer()">Enviar Respuesta</button>
                </div>
                ` : `
                <div style="text-align: center;">
                    <button class="btn btn-secondary" onclick="App.endTest()">Finalizar Prueba</button>
                </div>
                `}
            </div>
        </div>
    `;
}

function getQuestionTypeLabel(q) {
    if (q.type === 'letter') return q.direction === 'toRomaji' ? 'Letra → Romanización' : 'Romanización → Letra';
    if (q.type === 'word') return q.direction === 'toRomaji' ? 'Palabra → Romanización' : 'Romanización → Palabra';
    if (q.type === 'syllable-block') return 'Bloque Silábico';
    if (q.type === 'letter-combination') return 'Combinación de Letras';
    if (q.type === 'vowel-mark') return 'Marca Vocálica';
    if (q.type === 'multiple-choice') return 'Opción Múltiple (Letras)';
    if (q.type === 'multiple-choice-word') return 'Opción Múltiple (Palabras)';
    return 'Pregunta';
}

function setupTestScreenListeners() {
    const input = document.getElementById('answer-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') App.submitAnswer();
        });
        input.focus();
    }
}