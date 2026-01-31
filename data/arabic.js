// Datos completos de Árabe
const ARABIC_DATA = {
    id: 'arabic',
    name: 'Árabe',
    nameEs: 'Árabe',
    description: 'Alfabeto árabe (Abjad)',

    // Modos de prueba disponibles
    testModes: [
        {
            id: 'letter-to-romaji',
            name: 'Letra → Transcripción',
            description: 'Ver un carácter y escribir su lectura'
        },
        {
            id: 'romaji-to-letter',
            name: 'Transcripción → Letra',
            description: 'Ver la lectura y escribir el carácter'
        },
        {
            id: 'vowel-marks',
            name: 'Marcas Vocálicas',
            description: 'Practicar las marcas vocálicas (harakat)'
        },
        {
            id: 'word-no-vowels',
            name: 'Palabras sin Vocales',
            description: 'Leer palabras sin marcas vocálicas'
        },
        {
            id: 'word-with-vowels',
            name: 'Palabras con Vocales',
            description: 'Leer palabras con marcas vocálicas'
        },
        {
            id: 'letter-combinations',
            name: 'Combinaciones de Letras',
            description: 'Practicar letras conectadas'
        },
        {
            id: 'word-to-romaji',
            name: 'Palabra → Transcripción',
            description: 'Transcribir palabras árabes'
        },
        {
            id: 'romaji-to-word',
            name: 'Transcripción → Palabra',
            description: 'Escribir palabras en árabe'
        }
    ],

    // Caracteres organizados
    rows: {
        'alif-ha': {
            name: 'Alif a Ha (ا-ح)',
            characters: {
                'ا': 'alif',
                'ب': 'ba',
                'ت': 'ta',
                'ث': 'tha',
                'ج': 'jim',
                'ح': 'ha'
            }
        },
        'kha-sin': {
            name: 'Kha a Sin (خ-س)',
            characters: {
                'خ': 'kha',
                'د': 'dal',
                'ذ': 'dhal',
                'ر': 'ra',
                'ز': 'za',
                'س': 'sin'
            }
        },
        'shin-ain': {
            name: 'Shin a Ain (ش-ع)',
            characters: {
                'ش': 'shin',
                'ص': 'sad',
                'ض': 'dad',
                'ط': 'ta',
                'ظ': 'za',
                'ع': 'ain'
            }
        },
        'ghain-ya': {
            name: 'Ghain a Ya (غ-ي)',
            characters: {
                'غ': 'ghain',
                'ف': 'fa',
                'ق': 'qaf',
                'ك': 'kaf',
                'ل': 'lam',
                'م': 'mim',
                'ن': 'nun',
                'ه': 'ha',
                'و': 'waw',
                'ي': 'ya'
            }
        }
    },

    // Marcas vocálicas (harakat)
    vowelMarks: {
        'fatha': { mark: 'َ', name: 'Fatha', sound: 'a' },
        'kasra': { mark: 'ِ', name: 'Kasra', sound: 'i' },
        'damma': { mark: 'ُ', name: 'Damma', sound: 'u' },
        'sukun': { mark: 'ْ', name: 'Sukun', sound: '(silencio)' },
        'shadda': { mark: 'ّ', name: 'Shadda', sound: '(doble)' },
        'tanwin-fath': { mark: 'ً', name: 'Tanwin Fath', sound: 'an' },
        'tanwin-kasr': { mark: 'ٍ', name: 'Tanwin Kasr', sound: 'in' },
        'tanwin-damm': { mark: 'ٌ', name: 'Tanwin Damm', sound: 'un' }
    },

    // Combinaciones de letras (conectadas)
    letterCombinations: [
        { native: 'بَ', romaji: 'ba', components: ['ب', 'fatha'] },
        { native: 'بِ', romaji: 'bi', components: ['ب', 'kasra'] },
        { native: 'بُ', romaji: 'bu', components: ['ب', 'damma'] },
        { native: 'تَ', romaji: 'ta', components: ['ت', 'fatha'] },
        { native: 'تِ', romaji: 'ti', components: ['ت', 'kasra'] },
        { native: 'تُ', romaji: 'tu', components: ['ت', 'damma'] },
        { native: 'نَ', romaji: 'na', components: ['ن', 'fatha'] },
        { native: 'نِ', romaji: 'ni', components: ['ن', 'kasra'] },
        { native: 'نُ', romaji: 'nu', components: ['ن', 'damma'] },
        { native: 'مَ', romaji: 'ma', components: ['م', 'fatha'] },
        { native: 'مِ', romaji: 'mi', components: ['م', 'kasra'] },
        { native: 'مُ', romaji: 'mu', components: ['م', 'damma'] }
    ],

    // Palabras para principiantes (sin vocales)
    beginnerWordsNoVowels: [
        { native: 'بيت', romaji: 'bayt', meaning: 'casa', difficulty: 1 },
        { native: 'كتاب', romaji: 'kitab', meaning: 'libro', difficulty: 1 },
        { native: 'ماء', romaji: 'maa', meaning: 'agua', difficulty: 1 },
        { native: 'نور', romaji: 'noor', meaning: 'luz', difficulty: 1 },
        { native: 'باب', romaji: 'bab', meaning: 'puerta', difficulty: 1 },
        { native: 'شمس', romaji: 'shams', meaning: 'sol', difficulty: 1 },
        { native: 'قلم', romaji: 'qalam', meaning: 'pluma', difficulty: 1 },
        { native: 'حب', romaji: 'hubb', meaning: 'amor', difficulty: 1 },
        { native: 'ولد', romaji: 'walad', meaning: 'niño', difficulty: 1 },
        { native: 'بنت', romaji: 'bint', meaning: 'niña', difficulty: 1 },
        { native: 'يوم', romaji: 'yawm', meaning: 'día', difficulty: 1 },
        { native: 'ليل', romaji: 'layl', meaning: 'noche', difficulty: 1 },
        { native: 'سماء', romaji: 'samaa', meaning: 'cielo', difficulty: 1 },
        { native: 'أرض', romaji: 'ard', meaning: 'tierra', difficulty: 1 },
        { native: 'بحر', romaji: 'bahr', meaning: 'mar', difficulty: 1 },
        { native: 'جبل', romaji: 'jabal', meaning: 'montaña', difficulty: 1 },
        { native: 'شجر', romaji: 'shajar', meaning: 'árbol', difficulty: 1 },
        { native: 'ورد', romaji: 'ward', meaning: 'rosa', difficulty: 1 },
        { native: 'قمر', romaji: 'qamar', meaning: 'luna', difficulty: 1 },
        { native: 'نجم', romaji: 'najm', meaning: 'estrella', difficulty: 1 }
    ],

    // Palabras para principiantes (con vocales)
    beginnerWordsWithVowels: [
        { native: 'بَيْت', romaji: 'bayt', meaning: 'casa', difficulty: 1 },
        { native: 'كِتَاب', romaji: 'kitab', meaning: 'libro', difficulty: 1 },
        { native: 'مَاء', romaji: 'maa', meaning: 'agua', difficulty: 1 },
        { native: 'نُور', romaji: 'noor', meaning: 'luz', difficulty: 1 },
        { native: 'بَاب', romaji: 'bab', meaning: 'puerta', difficulty: 1 },
        { native: 'شَمْس', romaji: 'shams', meaning: 'sol', difficulty: 1 },
        { native: 'قَلَم', romaji: 'qalam', meaning: 'pluma', difficulty: 1 },
        { native: 'حُبّ', romaji: 'hubb', meaning: 'amor', difficulty: 1 },
        { native: 'وَلَد', romaji: 'walad', meaning: 'niño', difficulty: 1 },
        { native: 'بِنْت', romaji: 'bint', meaning: 'niña', difficulty: 1 },
        { native: 'يَوْم', romaji: 'yawm', meaning: 'día', difficulty: 1 },
        { native: 'لَيْل', romaji: 'layl', meaning: 'noche', difficulty: 1 },
        { native: 'سَمَاء', romaji: 'samaa', meaning: 'cielo', difficulty: 1 },
        { native: 'أَرْض', romaji: 'ard', meaning: 'tierra', difficulty: 1 },
        { native: 'بَحْر', romaji: 'bahr', meaning: 'mar', difficulty: 1 }
    ],

    // Palabras adicionales
    beginnerWords: [
        { native: 'مدينة', romaji: 'madina', meaning: 'ciudad', difficulty: 2 },
        { native: 'مدرسة', romaji: 'madrasa', meaning: 'escuela', difficulty: 2 },
        { native: 'صديق', romaji: 'sadiq', meaning: 'amigo', difficulty: 2 },
        { native: 'عائلة', romaji: 'aila', meaning: 'familia', difficulty: 2 },
        { native: 'طعام', romaji: 'taam', meaning: 'comida', difficulty: 2 },
        { native: 'حليب', romaji: 'halib', meaning: 'leche', difficulty: 2 },
        { native: 'خبز', romaji: 'khubz', meaning: 'pan', difficulty: 2 },
        { native: 'يد', romaji: 'yad', meaning: 'mano', difficulty: 1 },
        { native: 'عين', romaji: 'ayn', meaning: 'ojo', difficulty: 1 },
        { native: 'اسم', romaji: 'ism', meaning: 'nombre', difficulty: 1 },
        { native: 'سلام', romaji: 'salam', meaning: 'paz', difficulty: 1 },
        { native: 'علم', romaji: 'ilm', meaning: 'conocimiento', difficulty: 1 },
        { native: 'فن', romaji: 'fann', meaning: 'arte', difficulty: 1 },
        { native: 'رجل', romaji: 'rajul', meaning: 'hombre', difficulty: 1 },
        { native: 'امرأة', romaji: 'imraa', meaning: 'mujer', difficulty: 2 }
    ]
};