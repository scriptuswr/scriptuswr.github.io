const TestEngine = {
    state: {
        systemId: null,
        system: null,
        testMode: null,
        selectedRows: [],
        characterPool: [],
        wordPool: [],
        availableItems: [],        // <-- items que quedan por preguntar (sin repetir)
        initialPoolSize: 0,       // <-- tamaño original del pool (para controles / progreso)
        currentQuestion: null,
        questionHistory: [],
        score: { correct: 0, incorrect: 0, total: 0 },
        startTime: null,
        endTime: null,
        secondarySystem: null,    // Para modos combinados
        maxQuestions: 0
    },

    // Inicializar prueba (acepta maxQuestions)
    init(systemId, testMode, selectedRows, maxQuestions = 0) {
        this.state.systemId = systemId;
        this.state.system = getWritingSystem(systemId);
        this.state.testMode = testMode;
        this.state.selectedRows = selectedRows;
        this.state.startTime = Date.now();

        // Aseguramos que maxQuestions sea numérico y >= 0
        const parsed = Number(maxQuestions);
        this.state.maxQuestions = (Number.isFinite(parsed) && parsed > 0) ? Math.floor(parsed) : 0; // 0 = sin límite (usar todo el pool)

        // Construir pool de caracteres (para el sistema primario)
        this.state.characterPool = getCharacterPool(this.state.system, selectedRows);

        // Para modos combinados (hiragana + katakana): pre-cargar secondarySystem
        if (testMode === 'combined-kana') {
            const secondaryId = systemId === 'hiragana' ? 'katakana' : 'hiragana';
            this.state.secondarySystem = getWritingSystem(secondaryId);
        } else {
            this.state.secondarySystem = null;
        }

        // Construir pool de palabras (según el modo)
        this.buildWordPool();

        // Construir listado mezclado de items disponibles sin repeticiones
        this.buildAvailableItems();

        // Resetear puntaje / historial
        this.state.score = { correct: 0, incorrect: 0, total: 0 };
        this.state.questionHistory = [];

        // Generar primera pregunta (si hay)
        this.nextQuestion();
    },

    // Construir pool de palabras según el modo
    buildWordPool() {
        const mode = this.state.testMode || '';

        if (mode.includes('word') && this.state.system) {
            this.state.wordPool = this.state.system.beginnerWords || [];
        } else if (mode === 'word-no-vowels' && this.state.system && this.state.system.beginnerWordsNoVowels) {
            this.state.wordPool = this.state.system.beginnerWordsNoVowels;
        } else if (mode === 'word-with-vowels' && this.state.system && this.state.system.beginnerWordsWithVowels) {
            this.state.wordPool = this.state.system.beginnerWordsWithVowels;
        } else if (mode === 'syllable-blocks-2' && this.state.system && this.state.system.syllableBlocks2) {
            this.state.wordPool = this.state.system.syllableBlocks2;
        } else if (mode === 'syllable-blocks-3' && this.state.system && this.state.system.syllableBlocks3) {
            this.state.wordPool = this.state.system.syllableBlocks3;
        } else if (mode === 'letter-combinations' && this.state.system && this.state.system.letterCombinations) {
            this.state.wordPool = this.state.system.letterCombinations;
        } else {
            this.state.wordPool = [];
        }
    },

    // Construir availableItems mezclado (sin repeticiones)
    buildAvailableItems() {
        const mode = this.state.testMode || '';
        const items = [];

        // Helper: añadir caracteres desde un sistema dado y las filas seleccionadas
        const pushCharsFromSystem = (system, systemIdLabel = null) => {
            if (!system) return;
            const pool = getCharacterPool(system, this.state.selectedRows);
            pool.forEach(item => {
                // guardamos systemId para distinguir en modo combinado
                items.push({
                    kind: 'letter',
                    char: item.char,
                    reading: item.reading,
                    systemId: systemIdLabel || system.id || this.state.systemId
                });
            });
        };

        // Modos de palabra / bloques
        if (mode.includes('word') || mode.includes('syllable') || mode === 'letter-combinations') {
            // wordPool ya fue poblado en buildWordPool()
            (this.state.wordPool || []).forEach(w => {
                // guardamos la estructura original para reconstruir la pregunta
                items.push({
                    kind: 'word',
                    native: w.native,
                    romaji: w.romaji,
                    meaning: w.meaning,
                    components: w.components || null
                });
            });
        } else if (mode === 'vowel-marks') {
            if (this.state.system && this.state.system.vowelMarks) {
                const marks = Object.values(this.state.system.vowelMarks);
                marks.forEach(m => {
                    items.push({
                        kind: 'vowel-mark',
                        mark: m.mark,
                        name: m.name,
                        sound: m.sound
                    });
                });
            }
        } else if (mode === 'combined-kana') {
            // combinar caracteres de ambos sistemas (primario + secundario)
            pushCharsFromSystem(this.state.system, this.state.systemId || (this.state.system && this.state.system.id));
            pushCharsFromSystem(this.state.secondarySystem, this.state.secondarySystem ? (this.state.secondarySystem.id || null) : null);
        } else {
            // modos por defecto basados en letra
            pushCharsFromSystem(this.state.system, this.state.systemId || (this.state.system && this.state.system.id));
        }

        // Mezclar sin repetir
        this.state.availableItems = shuffleArray(items);
        this.state.initialPoolSize = this.state.availableItems.length;
    },

    // Generar siguiente pregunta (extrae el siguiente item sin repetir)
    nextQuestion() {
        // Si no hay items disponibles -> no hay pregunta
        if (!this.state.availableItems || this.state.availableItems.length === 0) {
            this.state.currentQuestion = null;
            return null;
        }

        // Si existe maxQuestions y ya hemos alcanzado ese número, no generar más
        const limit = this.state.maxQuestions > 0
            ? Math.min(this.state.maxQuestions, this.state.initialPoolSize || Infinity)
            : (this.state.initialPoolSize || 0);

        if (limit > 0 && this.state.score.total >= limit) {
            this.state.currentQuestion = null;
            return null;
        }

        // Tomar un item (sin repetir) - usamos pop() porque la lista ya está mezclada
        const item = this.state.availableItems.pop();

        // Construir pregunta según kind
        let question = null;
        if (item.kind === 'letter') {
            // direction por defecto aleatoria entre a romaji / a letra — pero respetar el modo concreto si existe
            const mode = this.state.testMode;
            let direction = 'toRomaji';
            if (mode === 'romaji-to-letter') direction = 'toLetter';
            else if (mode === 'letter-to-romaji') direction = 'toRomaji';
            else direction = Math.random() > 0.5 ? 'toRomaji' : 'toLetter';

            question = {
                type: 'letter',
                direction: direction,
                character: item.char,
                reading: item.reading,
                correctAnswer: direction === 'toRomaji' ? item.reading : item.char,
                prompt: direction === 'toRomaji' ? item.char : item.reading,
                systemUsed: item.systemId || this.state.systemId
            };
        } else if (item.kind === 'word') {
            const mode = this.state.testMode;
            let direction = mode === 'romaji-to-word' ? 'toWord' : 'toRomaji'; // default mapping
            question = {
                type: 'word',
                direction: direction,
                native: item.native,
                romaji: item.romaji,
                meaning: item.meaning,
                correctAnswer: direction === 'toRomaji' ? item.romaji : item.native,
                prompt: direction === 'toRomaji' ? item.native : item.romaji,
                components: item.components || null
            };
        } else if (item.kind === 'vowel-mark') {
            question = {
                type: 'vowel-mark',
                direction: 'identify',
                mark: item.mark,
                name: item.name,
                sound: item.sound,
                correctAnswer: item.name.toLowerCase(),
                prompt: item.mark,
                hint: `Sonido: ${item.sound}`
            };
        } else {
            // fallback: tratar como letra si no coincide
            question = {
                type: 'letter',
                direction: 'toRomaji',
                character: item.char || '',
                reading: item.reading || '',
                correctAnswer: item.reading || '',
                prompt: item.char || ''
            };
        }

        this.state.currentQuestion = question;
        return question;
    },

    // Verificar respuesta (sin cambios funcionales, pero terminado se decide según límite efectivo)
    checkAnswer(userAnswer) {
        if (!this.state.currentQuestion) return null;

        const normalized = normalizeString(userAnswer);
        const correct = normalizeString(this.state.currentQuestion.correctAnswer);

        const isCorrect = normalized === correct;

        // Actualizar puntaje
        this.state.score.total++;
        if (isCorrect) this.state.score.correct++;
        else this.state.score.incorrect++;

        // Agregar al historial
        this.state.questionHistory.push({
            question: this.state.currentQuestion,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            timestamp: Date.now()
        });

        // Determinar límite efectivo: si se pidió menos que el pool usamos maxQuestions; si se pidió "Todas" (0) usamos initialPoolSize
        const effectiveLimit = this.state.maxQuestions > 0
            ? Math.min(this.state.maxQuestions, this.state.initialPoolSize || Infinity)
            : (this.state.initialPoolSize || 0);

        const finished = (effectiveLimit > 0) && (this.state.score.total >= effectiveLimit);

        if (finished) {
            this.state.endTime = Date.now();
        }

        return {
            isCorrect: isCorrect,
            correctAnswer: this.state.currentQuestion.correctAnswer,
            userAnswer: userAnswer,
            finished: finished
        };
    },

    // Obtener pregunta actual
    getCurrentQuestion() {
        return this.state.currentQuestion;
    },

    // Obtener puntaje
    getScore() {
        return this.state.score;
    },

    // Obtener precisión
    getAccuracy() {
        return calculateAccuracy(this.state.score.correct, this.state.score.total);
    },

    // Finalizar prueba
    endTest() {
        this.state.endTime = this.state.endTime || Date.now();
        const duration = Math.floor((this.state.endTime - this.state.startTime) / 1000);

        return {
            score: this.state.score,
            accuracy: this.getAccuracy(),
            duration: duration,
            history: this.state.questionHistory,
            systemId: this.state.systemId,
            testMode: this.state.testMode
        };
    },

    // Resetear prueba
    reset() {
        this.state = {
            systemId: null,
            system: null,
            testMode: null,
            selectedRows: [],
            characterPool: [],
            wordPool: [],
            availableItems: [],
            initialPoolSize: 0,
            currentQuestion: null,
            questionHistory: [],
            score: { correct: 0, incorrect: 0, total: 0 },
            startTime: null,
            endTime: null,
            secondarySystem: null,
            maxQuestions: 0
        };
    }
};