// Main App Controller

const App = {
    // App state
    state: {
        currentScreen: 'home',
        selectedSystem: null,
        selectedTestMode: null,
        selectedRows: [],
        testResults: null,
        selectedNumQuestions: 20 // valor por defecto (20 preguntas). 0 = ilimitado (todas)
    },

    // Initialize app
    init() {
        // Initialize theme (si ThemeManager no existe, evita romper la app)
        if (typeof ThemeManager !== 'undefined' && ThemeManager && typeof ThemeManager.init === 'function') {
            try {
                ThemeManager.init();
            } catch (e) {
                console.warn('ThemeManager.init() fallo:', e);
            }
        }

        // Render initial screen
        this.render();

        // Hide loading si existe
        const loadingEl = document.getElementById('loading');
        if (loadingEl && loadingEl.style) {
            loadingEl.style.display = 'none';
        } else {
            // Si no existe, no hacer nada (previene errores en entornos donde el DOM es distinto)
            // console.warn('Elemento #loading no encontrado.');
        }
    },

    // Main render function
    render() {
        const appContainer = document.getElementById('app');

        if (!appContainer) {
            console.warn('App container (#app) no encontrado — render abortado.');
            return;
        }

        let content = '';

        // Always render header (si la función existe)
        if (typeof renderHeader === 'function') {
            content += renderHeader();
        }

        // Render current screen
        switch (this.state.currentScreen) {
            case 'home':
                if (typeof renderHomeScreen === 'function') content += renderHomeScreen();
                break;
            case 'setup':
                if (typeof renderSetupScreen === 'function') content += renderSetupScreen(this.state.selectedSystem);
                break;
            case 'test':
                if (typeof renderTestScreen === 'function') content += renderTestScreen();
                // setupTestScreenListeners se llama después de inyectar el HTML
                break;
            case 'results':
                if (typeof renderResultsScreen === 'function') content += renderResultsScreen(this.state.testResults);
                break;
        }

        appContainer.innerHTML = content;

        // Cuando la pantalla es 'test' necesitamos montar listeners (no usar setTimeout indefinido)
        if (this.state.currentScreen === 'test' && typeof setupTestScreenListeners === 'function') {
            // Ejecutar en el siguiente tick para asegurar que el DOM ya está actualizado
            requestAnimationFrame(() => setupTestScreenListeners());
        }
    },

    // Navigation functions
    goHome() {
        this.state.currentScreen = 'home';
        this.state.selectedSystem = null;
        this.state.selectedTestMode = null;
        this.state.selectedRows = [];
        this.render();
    },

    selectSystem(systemId) {
        this.state.selectedSystem = systemId;
        this.state.currentScreen = 'setup';
        this.state.selectedTestMode = null;
        this.state.selectedRows = [];
        this.render();
    },

    selectTestMode(mode) {
        this.state.selectedTestMode = mode;

        // Update UI to show selected mode
        document.querySelectorAll('[id^="mode-"]').forEach(el => {
            el.style.borderColor = 'var(--border)';
            el.style.backgroundColor = 'transparent';
        });

        const selectedEl = document.getElementById(`mode-${mode}`);
        if (selectedEl) {
            selectedEl.style.borderColor = 'var(--accent)';
            selectedEl.style.backgroundColor = 'var(--accent-shadow)';
        }

        this.updateStartButton();
    },

    toggleRow(rowId) {
        const index = this.state.selectedRows.indexOf(rowId);

        if (index > -1) {
            // Remove row
            this.state.selectedRows.splice(index, 1);
        } else {
            // Add row
            this.state.selectedRows.push(rowId);
        }

        // Update checkbox UI
        const checkbox = document.getElementById(`checkbox-${rowId}`);
        if (checkbox) {
            if (this.state.selectedRows.includes(rowId)) {
                checkbox.classList.add('checked');
            } else {
                checkbox.classList.remove('checked');
            }
        }

        this.updateStartButton();
    },

    selectAllRows() {
        const system = getWritingSystem(this.state.selectedSystem);
        if (!system) return;

        const allRows = Object.keys(system.rows);
        const allSelected = this.state.selectedRows.length === allRows.length;

        if (allSelected) {
            // Deselect all
            this.state.selectedRows = [];
            document.querySelectorAll('.checkbox').forEach(cb => {
                cb.classList.remove('checked');
            });
        } else {
            // Select all
            this.state.selectedRows = [...allRows];
            document.querySelectorAll('.checkbox').forEach(cb => {
                cb.classList.add('checked');
            });
        }

        this.updateStartButton();
    },

    updateStartButton() {
        const btn = document.getElementById('start-test-btn');
        if (!btn) return;

        const canStart = this.state.selectedTestMode && this.state.selectedRows.length > 0;
        btn.disabled = !canStart;
    },

    startTest() {
        if (!this.state.selectedTestMode || this.state.selectedRows.length === 0) {
            return;
        }

        // Initialize test engine
        TestEngine.init(
            this.state.selectedSystem,
            this.state.selectedTestMode,
            this.state.selectedRows,
            this.state.selectedNumQuestions // 0 = sin límite
        );

        this.state.currentScreen = 'test';
        this.render();
    },

    submitAnswer() {
        const input = document.getElementById('answer-input');
        if (!input) return;

        const userAnswer = input.value.trim();

        // Check answer
        const result = TestEngine.checkAnswer(userAnswer);

        if (!result) return;

        // Show feedback
        this.showFeedback(result);

        // Si el test terminó por alcanzar el número de preguntas, mostramos resultados inmediatamente
        if (result.finished) {
            // guardar resultados y navegar a pantalla de resultados
            this.state.testResults = TestEngine.endTest();
            // breve timeout para que el usuario vea el feedback (se puede ajustar si se desea)
            setTimeout(() => {
                this.state.currentScreen = 'results';
                this.render();
            }, 800); // 0.8s para que se aprecie el feedback
            return;
        }

        // Si no terminó, avanzar a la siguiente pregunta tras feedback
        setTimeout(() => {
            TestEngine.nextQuestion();
            this.render();
        }, 1500);
    },

    showFeedback(result) {
        const feedbackArea = document.getElementById('feedback-area');
        const questionCard = document.getElementById('question-card');
        const input = document.getElementById('answer-input');

        if (!feedbackArea || !questionCard) return;

        if (result.isCorrect) {
            feedbackArea.innerHTML = `
                <div class="feedback success pulse-success">
                    ✓ Correct! "${result.correctAnswer}"
                </div>
            `;
            questionCard.classList.add('pulse-success');
        } else {
            feedbackArea.innerHTML = `
                <div class="feedback error shake">
                    ✗ Incorrect. The correct answer is "${result.correctAnswer}"
                </div>
            `;
            questionCard.classList.add('shake');
            if (input) {
                input.classList.add('shake');
            }
        }

        // Disable input
        if (input) {
            input.disabled = true;
        }

        // Remove animation classes after animation completes
        setTimeout(() => {
            questionCard.classList.remove('pulse-success', 'shake');
            if (input) {
                input.classList.remove('shake');
            }
        }, 500);
    },

    endTest() {
        const confirmEnd = confirm('Are you sure you want to end this test?');
        if (!confirmEnd) return;

        this.state.testResults = TestEngine.endTest();
        this.state.currentScreen = 'results';
        this.render();
    },

    retakeTest() {
        // Go back to setup with same system
        this.state.currentScreen = 'setup';
        this.state.selectedTestMode = null;
        this.state.selectedRows = [];
        this.state.testResults = null;
        this.render();
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}