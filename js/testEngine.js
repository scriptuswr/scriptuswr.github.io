// Motor de Pruebas - Maneja toda la lógica de las pruebas

const TestEngine = {
    state: {
        systemId: null,
        system: null,
        testMode: null,
        selectedRows: [],
        selectedLetters: [],  // Para selección individual de letras
        characterPool: [],
        wordPool: [],
        currentQuestion: null,
        questionHistory: [],
        usedQuestions: new Set(),  // Para evitar repeticiones
        maxQuestions: null,  // Límite de preguntas
        score: {
            correct: 0,
            incorrect: 0,
            total: 0
        },
        startTime: null,
        endTime: null,
        secondarySystem: null  // Para modos combinados
    },

    // Inicializar prueba
    init(systemId, testMode, selectedRows, selectedLetters = [], maxQuestions = null) {
        this.state.systemId = systemId;
        this.state.system = getWritingSystem(systemId);
        this.state.testMode = testMode;
        this.state.selectedRows = selectedRows;
        this.state.selectedLetters = selectedLetters;
        this.state.maxQuestions = maxQuestions;
        this.state.startTime = Date.now();
        this.state.usedQuestions = new Set();

        // Construir pool de caracteres
        if (selectedLetters.length > 0) {
            // Usar letras individuales seleccionadas
            this.state.characterPool = selectedLetters.map(char => ({
                char: char,
                reading: this.getReadingForChar(char)
            }));
        } else {
            // Usar filas seleccionadas
            this.state.characterPool = getCharacterPool(this.state.system, selectedRows);
        }

        // Para modos combinados (hiragana + katakana)
        if (testMode === 'combined-kana') {
            const secondaryId = systemId === 'hiragana' ? 'katakana' : 'hiragana';
            this.state.secondarySystem = getWritingSystem(secondaryId);
        }

        // Construir pool de palabras
        this.buildWordPool();

        // Resetear puntaje
        this.state.score = { correct: 0, incorrect: 0, total: 0 };
        this.state.questionHistory = [];

        // Generar primera pregunta
        this.nextQuestion();
    },

    // Obtener lectura de un carácter
    getReadingForChar(char) {
        const system = this.state.system;
        for (let rowId in system.rows) {
            const row = system.rows[rowId];
            if (row.characters[char]) {
                return row.characters[char];
            }
        }
        return char;
    },

    // Construir pool de palabras según el modo
    buildWordPool() {
        const mode = this.state.testMode;
        let words = [];

        if (mode.includes('word') || mode === 'word-no-vowels' || mode === 'word-with-vowels') {
            if (mode === 'word-no-vowels' && this.state.system.beginnerWordsNoVowels) {
                words = this.state.system.beginnerWordsNoVowels;
            } else if (mode === 'word-with-vowels' && this.state.system.beginnerWordsWithVowels) {
                words = this.state.system.beginnerWordsWithVowels;
            } else {
                words = this.state.system.beginnerWords || [];
            }

            // Filtrar palabras que solo contienen letras seleccionadas
            if (this.state.characterPool.length > 0) {
                const allowedChars = new Set(this.state.characterPool.map(c => c.char));
                words = words.filter(word => {
                    // Verificar si todas las letras de la palabra están en el conjunto permitido
                    for (let char of word.native) {
                        if (!allowedChars.has(char)) {
                            return false;
                        }
                    }
                    return true;
                });
            }

            this.state.wordPool = words;
        } else if (mode === 'syllable-blocks-2' && this.state.system.syllableBlocks2) {
            this.state.wordPool = this.state.system.syllableBlocks2;
        } else if (mode === 'syllable-blocks-3' && this.state.system.syllableBlocks3) {
            this.state.wordPool = this.state.system.syllableBlocks3;
        } else if (mode === 'letter-combinations' && this.state.system.letterCombinations) {
            this.state.wordPool = this.state.system.letterCombinations;
        }
    },

    // Generar siguiente pregunta
    nextQuestion() {
        // Verificar si se alcanzó el límite de preguntas
        if (this.state.maxQuestions && this.state.score.total >= this.state.maxQuestions) {
            return null;
        }

        let question = null;
        const mode = this.state.testMode;
        const maxAttempts = 50; // Evitar bucle infinito
        let attempts = 0;

        // Intentar generar una pregunta que no se haya usado
        while (attempts < maxAttempts) {
            if (mode === 'letter-to-romaji') {
                question = this.generateLetterQuestion('toRomaji');
            } else if (mode === 'romaji-to-letter') {
                question = this.generateLetterQuestion('toLetter');
            } else if (mode === 'multiple-choice') {
                question = this.generateMultipleChoiceQuestion();
            } else if (mode === 'word-to-romaji' || mode === 'word-no-vowels' || mode === 'word-with-vowels') {
                question = this.generateWordQuestion('toRomaji');
            } else if (mode === 'romaji-to-word') {
                question = this.generateWordQuestion('toWord');
            } else if (mode === 'combined-kana') {
                question = this.generateCombinedKanaQuestion();
            } else if (mode === 'syllable-blocks-2' || mode === 'syllable-blocks-3') {
                question = this.generateSyllableBlockQuestion();
            } else if (mode === 'letter-combinations') {
                question = this.generateLetterCombinationQuestion();
            } else if (mode === 'vowel-marks') {
                question = this.generateVowelMarkQuestion();
            }

            if (!question) break;

            // Crear ID único para la pregunta
            const questionId = `${question.type}-${question.prompt}-${question.correctAnswer}`;

            // Si la pregunta no se ha usado, aceptarla
            if (!this.state.usedQuestions.has(questionId)) {
                this.state.usedQuestions.add(questionId);
                break;
            }

            // Si ya usamos todas las preguntas posibles, resetear
            if (this.state.usedQuestions.size >= this.getTotalPossibleQuestions()) {
                this.state.usedQuestions.clear();
            }

            attempts++;
        }

        this.state.currentQuestion = question;
        return question;
    },

    // Calcular total de preguntas posibles
    getTotalPossibleQuestions() {
        const mode = this.state.testMode;

        if (mode.includes('word')) {
            return this.state.wordPool.length;
        } else if (mode.includes('letter') || mode === 'romaji-to-letter' || mode === 'letter-to-romaji') {
            return this.state.characterPool.length;
        }

        return 100; // Default
    },

    // Generar pregunta de letra
    generateLetterQuestion(direction) {
        if (this.state.characterPool.length === 0) return null;

        const item = getRandomItem(this.state.characterPool);

        return {
            type: 'letter',
            direction: direction,
            character: item.char,
            reading: item.reading,
            correctAnswer: direction === 'toRomaji' ? item.reading : item.char,
            prompt: direction === 'toRomaji' ? item.char : item.reading
        };
    },

    // Generar pregunta de palabra
    generateWordQuestion(direction) {
        if (this.state.wordPool.length === 0) return null;

        const word = getRandomItem(this.state.wordPool);

        return {
            type: 'word',
            direction: direction,
            native: word.native,
            romaji: word.romaji,
            meaning: word.meaning,
            correctAnswer: direction === 'toRomaji' ? word.romaji : word.native,
            prompt: direction === 'toRomaji' ? word.native : word.romaji
        };
    },

    // Generar pregunta de kana combinado
    generateCombinedKanaQuestion() {
        const useSecondary = Math.random() > 0.5;
        const system = useSecondary ? this.state.secondarySystem : this.state.system;
        const pool = getCharacterPool(system, this.state.selectedRows);

        if (pool.length === 0) return null;

        const item = getRandomItem(pool);
        const direction = Math.random() > 0.5 ? 'toRomaji' : 'toLetter';

        return {
            type: 'letter',
            direction: direction,
            character: item.char,
            reading: item.reading,
            correctAnswer: direction === 'toRomaji' ? item.reading : item.char,
            prompt: direction === 'toRomaji' ? item.char : item.reading,
            systemUsed: system.id
        };
    },

    // Generar pregunta de bloques silábicos
    generateSyllableBlockQuestion() {
        if (this.state.wordPool.length === 0) return null;

        const block = getRandomItem(this.state.wordPool);
        const direction = Math.random() > 0.5 ? 'toRomaji' : 'toBlock';

        return {
            type: 'syllable-block',
            direction: direction,
            native: block.native,
            romaji: block.romaji,
            components: block.components,
            correctAnswer: direction === 'toRomaji' ? block.romaji : block.native,
            prompt: direction === 'toRomaji' ? block.native : block.romaji,
            hint: direction === 'toBlock' ? `Combina: ${block.components.join(' + ')}` : null
        };
    },

    // Generar pregunta de combinación de letras
    generateLetterCombinationQuestion() {
        if (this.state.wordPool.length === 0) return null;

        const combination = getRandomItem(this.state.wordPool);

        return {
            type: 'letter-combination',
            direction: 'toRomaji',
            native: combination.native,
            romaji: combination.romaji,
            components: combination.components,
            correctAnswer: combination.romaji,
            prompt: combination.native,
            hint: `Componentes: ${combination.components.join(' + ')}`
        };
    },

    // Generar pregunta de marcas vocálicas
    generateVowelMarkQuestion() {
        if (!this.state.system.vowelMarks) return null;

        const marks = Object.values(this.state.system.vowelMarks);
        const mark = getRandomItem(marks);

        return {
            type: 'vowel-mark',
            direction: 'identify',
            mark: mark.mark,
            name: mark.name,
            sound: mark.sound,
            correctAnswer: mark.name.toLowerCase(),
            prompt: mark.mark,
            hint: `Sonido: ${mark.sound}`
        };
    },

    // Generar pregunta de opción múltiple
    generateMultipleChoiceQuestion() {
        if (this.state.characterPool.length < 3) return null;

        const correctItem = getRandomItem(this.state.characterPool);
        const options = [correctItem];

        // Obtener 2 opciones incorrectas del pool
        const availableOptions = this.state.characterPool.filter(item => item.char !== correctItem.char);

        while (options.length < 3 && availableOptions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableOptions.length);
            const option = availableOptions.splice(randomIndex, 1)[0];
            options.push(option);
        }

        // Si no hay suficientes opciones, rellenar con opciones del sistema completo
        if (options.length < 3) {
            const allChars = [];
            for (let rowId in this.state.system.rows) {
                const row = this.state.system.rows[rowId];
                Object.entries(row.characters).forEach(([char, reading]) => {
                    if (!options.find(o => o.char === char)) {
                        allChars.push({ char, reading });
                    }
                });
            }

            while (options.length < 3 && allChars.length > 0) {
                const randomIndex = Math.floor(Math.random() * allChars.length);
                const option = allChars.splice(randomIndex, 1)[0];
                options.push(option);
            }
        }

        // Mezclar opciones
        const shuffledOptions = shuffleArray(options);
        const correctIndex = shuffledOptions.findIndex(opt => opt.char === correctItem.char);

        return {
            type: 'multiple-choice',
            direction: 'choose',
            character: correctItem.char,
            reading: correctItem.reading,
            correctAnswer: correctItem.reading,
            correctIndex: correctIndex,
            prompt: correctItem.char,
            options: shuffledOptions.map(opt => opt.reading)
        };
    },

    // Verificar respuesta
    checkAnswer(userAnswer, selectedOptionIndex = null) {
        if (!this.state.currentQuestion) return null;

        let isCorrect = false;

        // Para opción múltiple
        if (this.state.currentQuestion.type === 'multiple-choice' && selectedOptionIndex !== null) {
            isCorrect = selectedOptionIndex === this.state.currentQuestion.correctIndex;
        } else {
            // Para respuesta escrita
            const normalized = normalizeString(userAnswer);
            const correct = normalizeString(this.state.currentQuestion.correctAnswer);
            isCorrect = normalized === correct;
        }

        // Actualizar puntaje
        this.state.score.total++;
        if (isCorrect) {
            this.state.score.correct++;
        } else {
            this.state.score.incorrect++;
        }

        // Agregar al historial
        this.state.questionHistory.push({
            question: this.state.currentQuestion,
            userAnswer: userAnswer || `Opción ${selectedOptionIndex + 1}`,
            isCorrect: isCorrect,
            timestamp: Date.now()
        });

        return {
            isCorrect: isCorrect,
            correctAnswer: this.state.currentQuestion.correctAnswer,
            userAnswer: userAnswer || `Opción ${selectedOptionIndex + 1}`
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
        this.state.endTime = Date.now();
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
            selectedLetters: [],
            characterPool: [],
            wordPool: [],
            currentQuestion: null,
            questionHistory: [],
            usedQuestions: new Set(),
            maxQuestions: null,
            score: { correct: 0, incorrect: 0, total: 0 },
            startTime: null,
            endTime: null,
            secondarySystem: null
        };
    }
};