// Funciones de utilidad para la aplicación

// Obtener todos los sistemas de escritura
function getAllWritingSystems() {
    return {
        hiragana: HIRAGANA_DATA,
        katakana: KATAKANA_DATA,
        hangul: HANGUL_DATA,
        arabic: ARABIC_DATA,
        russian: RUSSIAN_DATA,
        georgian: GEORGIAN_DATA
    };
}

// Obtener un sistema de escritura específico
function getWritingSystem(systemId) {
    const systems = getAllWritingSystems();
    return systems[systemId] || null;
}

// Mezclar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Obtener elemento aleatorio
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Normalizar string para comparación
function normalizeString(str) {
    return str.toLowerCase().trim().replace(/\s+/g, '');
}

// Verificar respuesta
function checkAnswer(userAnswer, correctAnswer, alternatives = []) {
    const normalized = normalizeString(userAnswer);
    const correct = normalizeString(correctAnswer);

    if (normalized === correct) return true;

    return alternatives.some(alt => normalizeString(alt) === normalized);
}

// Formatear porcentaje
function formatPercentage(value) {
    return Math.round(value * 100);
}

// Guardar en localStorage
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
        return false;
    }
}

// Cargar desde localStorage
function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error al cargar desde localStorage:', e);
        return defaultValue;
    }
}

// Limpiar localStorage
function clearStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Error al limpiar localStorage:', e);
        return false;
    }
}

// Obtener pool de caracteres desde filas seleccionadas
function getCharacterPool(system, selectedRows) {
    const pool = [];

    selectedRows.forEach(rowId => {
        const row = system.rows[rowId];
        if (row) {
            Object.entries(row.characters).forEach(([char, reading]) => {
                pool.push({ char, reading });
            });
        }
    });

    return pool;
}

// Filtrar palabras por caracteres seleccionados
function filterWordsByCharacters(words, characterPool) {
    const allowedChars = new Set(characterPool.map(c => c.char));

    return words.filter(word => {
        const nativeWord = word.native;
        for (let char of nativeWord) {
            if (!allowedChars.has(char)) {
                return false;
            }
        }
        return true;
    });
}

// Calcular precisión
function calculateAccuracy(correct, total) {
    if (total === 0) return 0;
    return (correct / total) * 100;
}

// Obtener calificación basada en porcentaje
function getGrade(percentage) {
    if (percentage >= 95) return { grade: 'A+', color: 'success', message: '¡Excelente!' };
    if (percentage >= 90) return { grade: 'A', color: 'success', message: '¡Sobresaliente!' };
    if (percentage >= 85) return { grade: 'A-', color: 'success', message: '¡Muy bien!' };
    if (percentage >= 80) return { grade: 'B+', color: 'success', message: '¡Buen trabajo!' };
    if (percentage >= 75) return { grade: 'B', color: 'info', message: 'Bien' };
    if (percentage >= 70) return { grade: 'B-', color: 'info', message: 'Aceptable' };
    if (percentage >= 65) return { grade: 'C+', color: 'warning', message: 'Necesitas mejorar' };
    if (percentage >= 60) return { grade: 'C', color: 'warning', message: 'Sigue practicando' };
    return { grade: 'F', color: 'error', message: 'Sigue intentando' };
}

// Formatear tiempo (segundos a mm:ss)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Obtener icono del sistema
function getSystemIcon(systemId) {
    const icons = {
        hiragana: 'あ',
        katakana: 'ア',
        hangul: '한',
        arabic: 'ع',
        russian: 'Я',
        georgian: 'ა'
    };
    return icons[systemId] || '✏️';
}

// Obtener descripción del modo de prueba
function getTestModeDescription(systemId, modeId) {
    const system = getWritingSystem(systemId);
    if (!system) return '';

    const mode = system.testModes.find(m => m.id === modeId);
    return mode ? mode.description : '';
}