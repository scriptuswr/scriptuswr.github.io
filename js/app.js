// Controlador Principal de la Aplicación

const App = {
    state: {
        currentScreen: 'home',
        selectedSystem: null,
        selectedTestMode: null,
        selectedRows: [],
        selectedLetters: [],
        selectionMode: 'rows',  // 'rows' o 'individual'
        questionCount: null,  // null = ilimitado
        testResults: null
    },

    init() {
        ThemeManager.init();
        this.render();
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    },

    render() {
        const app = document.getElementById('app');
        let content = renderHeader();

        switch (this.state.currentScreen) {
            case 'home': content += renderHomeScreen(); break;
            case 'setup': content += renderSetupScreen(this.state.selectedSystem); break;
            case 'test': content += renderTestScreen(); setTimeout(setupTestScreenListeners, 0); break;
            case 'results': content += renderResultsScreen(this.state.testResults); break;
        }

        app.innerHTML = content;
    },

    goHome() {
        this.state = {
            currentScreen: 'home',
            selectedSystem: null,
            selectedTestMode: null,
            selectedRows: [],
            selectedLetters: [],
            selectionMode: 'rows',
            questionCount: null,
            testResults: null
        };
        this.render();
    },

    selectSystem(systemId) {
        this.state.selectedSystem = systemId;
        this.state.currentScreen = 'setup';
        this.state.selectedTestMode = null;
        this.state.selectedRows = [];
        this.state.selectedLetters = [];
        this.state.selectionMode = 'rows';
        this.state.questionCount = 20;  // Default 20 preguntas
        this.render();

        // Seleccionar automáticamente el contador de 20 preguntas
        setTimeout(() => {
            document.getElementById('count-20')?.classList.add('selected');
        }, 100);
    },

    selectTestMode(mode) {
        this.state.selectedTestMode = mode;
        document.querySelectorAll('.selection-box').forEach(el => {
            el.classList.remove('selected');
        });
        document.getElementById(`mode-${mode}`)?.classList.add('selected');
        this.updateStartButton();
    },

    toggleRow(rowId) {
        const index = this.state.selectedRows.indexOf(rowId);
        if (index > -1) {
            this.state.selectedRows.splice(index, 1);
        } else {
            this.state.selectedRows.push(rowId);
        }

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

        this.state.selectedRows = Object.keys(system.rows);
        document.querySelectorAll('.checkbox').forEach(cb => cb.classList.add('checked'));
        this.updateStartButton();
    },

    deselectAllRows() {
        this.state.selectedRows = [];
        document.querySelectorAll('.checkbox').forEach(cb => cb.classList.remove('checked'));
        this.updateStartButton();
    },

    selectQuestionCount(count) {
        this.state.questionCount = count;

        // Actualizar UI
        document.querySelectorAll('[id^="count-"]').forEach(el => {
            el.classList.remove('selected');
        });

        const countId = count === null ? 'count-unlimited' : `count-${count}`;
        document.getElementById(countId)?.classList.add('selected');
    },

    setSelectionMode(mode) {
        this.state.selectionMode = mode;

        // Actualizar UI
        document.querySelectorAll('[id^="selection-mode-"]').forEach(el => {
            el.classList.remove('selected');
        });
        document.getElementById(`selection-mode-${mode}`)?.classList.add('selected');

        // Mostrar/ocultar secciones apropiadas
        const rowsSelection = document.getElementById('rows-selection');
        const individualSelection = document.getElementById('individual-selection');

        if (mode === 'rows') {
            if (rowsSelection) rowsSelection.style.display = 'block';
            if (individualSelection) individualSelection.style.display = 'none';
            this.state.selectedLetters = [];
        } else {
            if (rowsSelection) rowsSelection.style.display = 'none';
            if (individualSelection) individualSelection.style.display = 'block';
            this.state.selectedRows = [];
        }

        this.updateStartButton();
    },

    toggleLetter(letter) {
        const index = this.state.selectedLetters.indexOf(letter);

        if (index > -1) {
            this.state.selectedLetters.splice(index, 1);
        } else {
            this.state.selectedLetters.push(letter);
        }

        const letterId = `letter-${letter.charCodeAt(0)}`;
        const letterEl = document.getElementById(letterId);
        if (letterEl) {
            if (this.state.selectedLetters.includes(letter)) {
                letterEl.classList.add('selected');
            } else {
                letterEl.classList.remove('selected');
            }
        }

        this.updateStartButton();
    },

    selectAllLetters() {
        const system = getWritingSystem(this.state.selectedSystem);
        if (!system) return;

        const allLetters = [];
        for (let rowId in system.rows) {
            const row = system.rows[rowId];
            Object.keys(row.characters).forEach(char => {
                if (!allLetters.includes(char)) {
                    allLetters.push(char);
                }
            });
        }

        this.state.selectedLetters = allLetters;

        document.querySelectorAll('[id^="letter-"]').forEach(el => {
            el.classList.add('selected');
        });

        this.updateStartButton();
    },

    deselectAllLetters() {
        this.state.selectedLetters = [];

        document.querySelectorAll('[id^="letter-"]').forEach(el => {
            el.classList.remove('selected');
        });

        this.updateStartButton();
    },

    updateStartButton() {
        const btn = document.getElementById('start-test-btn');
        if (!btn) return;

        const hasSelection = this.state.selectionMode === 'rows'
            ? this.state.selectedRows.length > 0
            : this.state.selectedLetters.length > 0;

        const canStart = this.state.selectedTestMode && hasSelection;
        btn.disabled = !canStart;
    },

    startTest() {
        const hasSelection = this.state.selectionMode === 'rows'
            ? this.state.selectedRows.length > 0
            : this.state.selectedLetters.length > 0;

        if (!this.state.selectedTestMode || !hasSelection) return;

        TestEngine.init(
            this.state.selectedSystem,
            this.state.selectedTestMode,
            this.state.selectedRows,
            this.state.selectedLetters,
            this.state.questionCount
        );

        this.state.currentScreen = 'test';
        this.render();
    },

    submitAnswer() {
        const input = document.getElementById('answer-input');
        if (!input) return;

        const result = TestEngine.checkAnswer(input.value.trim());
        if (!result) return;

        this.showFeedback(result);
        setTimeout(() => {
            TestEngine.nextQuestion();
            this.render();
        }, 1800);
    },

    submitMultipleChoice(optionIndex) {
        const result = TestEngine.checkAnswer('', optionIndex);
        if (!result) return;

        // Marcar la opción seleccionada
        const optionBtn = document.getElementById(`option-${optionIndex}`);
        const correctBtn = document.getElementById(`option-${TestEngine.state.currentQuestion.correctIndex}`);

        if (result.isCorrect) {
            if (optionBtn) {
                optionBtn.style.backgroundColor = 'var(--success)';
                optionBtn.style.color = 'white';
                optionBtn.style.borderColor = 'var(--success)';
            }
        } else {
            if (optionBtn) {
                optionBtn.style.backgroundColor = 'var(--error)';
                optionBtn.style.color = 'white';
                optionBtn.style.borderColor = 'var(--error)';
            }
            if (correctBtn) {
                correctBtn.style.backgroundColor = 'var(--success)';
                correctBtn.style.color = 'white';
                correctBtn.style.borderColor = 'var(--success)';
            }
        }

        // Deshabilitar todos los botones
        document.querySelectorAll('.multiple-choice-option').forEach(btn => {
            btn.disabled = true;
        });

        this.showFeedback(result);

        setTimeout(() => {
            TestEngine.nextQuestion();
            this.render();
        }, 1800);
    },

    showFeedback(result) {
        const area = document.getElementById('feedback-area');
        const card = document.getElementById('question-card');
        const input = document.getElementById('answer-input');

        if (!area) return;

        if (result.isCorrect) {
            area.innerHTML = `<div class="feedback success pulse-success">✓ ¡Correcto! "${result.correctAnswer}"</div>`;
            card?.classList.add('pulse-success');
        } else {
            area.innerHTML = `<div class="feedback error shake">✗ Incorrecto. La respuesta correcta es "${result.correctAnswer}"</div>`;
            card?.classList.add('shake');
            input?.classList.add('shake');
        }

        if (input) input.disabled = true;

        setTimeout(() => {
            card?.classList.remove('pulse-success', 'shake');
            input?.classList.remove('shake');
        }, 600);
    },

    endTest() {
        if (!confirm('¿Estás seguro de que quieres terminar esta prueba?')) return;
        this.endTestAutomatically();
    },

    endTestAutomatically() {
        this.state.testResults = TestEngine.endTest();
        this.state.currentScreen = 'results';
        this.render();
    },

    retakeTest() {
        this.state.currentScreen = 'setup';
        this.state.selectedTestMode = null;
        this.state.selectedRows = [];
        this.state.selectedLetters = [];
        this.state.selectionMode = 'rows';
        this.state.questionCount = 20;
        this.state.testResults = null;
        this.render();

        // Seleccionar automáticamente el contador de 20 preguntas
        setTimeout(() => {
            document.getElementById('count-20')?.classList.add('selected');
        }, 100);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}