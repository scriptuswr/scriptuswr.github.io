// Results Screen Component

function renderResultsScreen(results) {
    const accuracy = Math.round(results.accuracy);
    const grade = getGrade(accuracy);
    const minutes = Math.floor(results.duration / 60);
    const seconds = results.duration % 60;

    return `
        <div class="container" style="padding-top: 3rem; padding-bottom: 3rem;">
            <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 3rem;">
                    <div class="bounce" style="font-size: 5rem; margin-bottom: 1rem;">
                        ${grade.grade === 'A' || grade.grade === 'B' ? '🎉' : grade.grade === 'C' || grade.grade === 'D' ? '👍' : '📚'}
                    </div>
                    <h2 class="text-4xl font-bold" style="margin-bottom: 0.5rem;">
                        ¡Test completado!
                    </h2>
                    <p style="color: var(--text-secondary); font-size: 1.125rem;">
                        Así es como lo has hecho
                    </p>
                </div>
                
                <!-- Main Stats -->
                <div class="card scale-in" style="margin-bottom: 2rem;">
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 6rem; font-weight: 700; color: var(--${grade.color}); margin-bottom: 1rem;">
                            ${accuracy}%
                        </div>
                        <div style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                            Nota: ${grade.grade}
                        </div>
                        <div style="color: var(--text-secondary);">
                            ${getGradeMessage(grade.grade)}
                        </div>
                    </div>
                </div>
                
                <!-- Detailed Stats -->
                <div class="grid-auto stagger-item" style="margin-bottom: 2rem;">
                    <div class="card stat-card">
                        <div class="stat-value" style="color: var(--success);">
                            ${results.score.correct}
                        </div>
                        <div class="stat-label">
                            Respuestas correctas
                        </div>
                    </div>
                    
                    <div class="card stat-card">
                        <div class="stat-value" style="color: var(--error);">
                            ${results.score.incorrect}
                        </div>
                        <div class="stat-label">
                            Respuestas incorrectas
                        </div>
                    </div>
                    
                    <div class="card stat-card">
                        <div class="stat-value">
                            ${results.score.total}
                        </div>
                        <div class="stat-label">
                            Preguntas totales
                        </div>
                    </div>
                    
                    <div class="card stat-card">
                        <div class="stat-value">
                            ${minutes}:${seconds.toString().padStart(2, '0')}
                        </div>
                        <div class="stat-label">
                            Tiempo usado
                        </div>
                    </div>
                </div>
                
                <!-- Review Section -->
                ${results.score.incorrect > 0 ? `
                <div class="card slide-in" style="margin-bottom: 2rem;">
                    <h3 class="text-xl font-semibold" style="margin-bottom: 1rem;">
                        Mira los fallos
                    </h3>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${results.history.filter(h => !h.isCorrect).map((item, index) => `
                            <div style="padding: 1rem; border-bottom: 1px solid var(--border); ${index === results.history.filter(h => !h.isCorrect).length - 1 ? 'border-bottom: none;' : ''}">
                                <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
                                    <div style="flex: 1;">
                                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">
                                            ${item.question.prompt}
                                        </div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                                            ${item.question.meaning ? `Meaning: ${item.question.meaning}` : ''}
                                        </div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                                            Tu respuesta:
                                        </div>
                                        <div style="color: var(--error); font-weight: 600; text-decoration: line-through;">
                                            ${item.userAnswer || '(empty)'}
                                        </div>
                                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem; margin-bottom: 0.25rem;">
                                            Respuesta correcta:
                                        </div>
                                        <div style="color: var(--success); font-weight: 600;">
                                            ${item.question.correctAnswer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : `
                <div class="card slide-in" style="margin-bottom: 2rem; text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🌟</div>
                    <h3 class="text-xl font-semibold" style="margin-bottom: 0.5rem;">
                        ¡Puntuanción perfecta!
                    </h3>
                    <p style="color: var(--text-secondary);">
                        Has respondido a todas las preguntas correctamente ¡Muy buen trabajo!
                    </p>
                </div>
                `}
                
                <!-- Action Buttons -->
                <div class="grid-auto">
                    <button class="btn btn-secondary" 
                            onclick="App.goHome()"
                            style="width: 100%;">
                        Vuelve al inicio
                    </button>
                    <button class="btn btn-primary" 
                            onclick="App.retakeTest()"
                            style="width: 100%;">
                        Toma otro test
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getGradeMessage(grade) {
    const messages = {
        'A': '¡Sobresaliente! Tienes un dominio excelente de este sistema de escritura.',
        'B': '¡Muy bien! Tienes una comprensión sólida.',
        'C': 'Buen esfuerzo. Sigue practicando para mejorar.',
        'D': '¡Buen intento! Más práctica te ayudará a mejorar.',
        'F': 'Sigue practicando. ¡Cada intento te ayuda a aprender!'
    };
    return messages[grade] || '¡Sigue adelante!';
}