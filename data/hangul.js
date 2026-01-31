// Datos completos de Hangul
const HANGUL_DATA = {
    id: 'hangul',
    name: 'Hangul',
    nameEs: 'Hangul',
    description: 'Escritura tradicional coreana alternativa al Hanja',

    // Modos de prueba disponibles
    testModes: [
        {
            id: 'letter-to-romaji',
            name: 'Letra → Romanización',
            description: 'Ver un carácter y escribir su lectura'
        },
        {
            id: 'romaji-to-letter',
            name: 'Romanización → Letra',
            description: 'Ver la lectura y escribir el carácter'
        },
        {
            id: 'multiple-choice',
            name: 'Opción Múltiple',
            description: 'Ver letra y elegir la lectura correcta entre 3 opciones'
        },
        {
            id: 'syllable-blocks-2',
            name: 'Bloques Silábicos (2 letras)',
            description: 'Combinar consonante + vocal'
        },
        {
            id: 'syllable-blocks-3',
            name: 'Bloques Silábicos (3 letras)',
            description: 'Combinar consonante + vocal + consonante final'
        },
        {
            id: 'word-to-romaji',
            name: 'Palabra → Romanización',
            description: 'Transcribir palabras coreanas'
        },
        {
            id: 'romaji-to-word',
            name: 'Romanización → Palabra',
            description: 'Escribir palabras en hangul'
        }
    ],

    // Caracteres organizados
    rows: {
        'basic-vowels': {
            name: 'Vocales Básicas',
            characters: {
                'ㅏ': 'a',
                'ㅓ': 'eo',
                'ㅗ': 'o',
                'ㅜ': 'u',
                'ㅡ': 'eu',
                'ㅣ': 'i'
            }
        },
        'compound-vowels': {
            name: 'Vocales Compuestas',
            characters: {
                'ㅐ': 'ae',
                'ㅔ': 'e',
                'ㅑ': 'ya',
                'ㅕ': 'yeo',
                'ㅛ': 'yo',
                'ㅠ': 'yu',
                'ㅒ': 'yae',
                'ㅖ': 'ye',
                'ㅘ': 'wa',
                'ㅙ': 'wae',
                'ㅚ': 'oe',
                'ㅝ': 'wo',
                'ㅞ': 'we',
                'ㅟ': 'wi',
                'ㅢ': 'ui'
            }
        },
        'basic-consonants': {
            name: 'Consonantes Básicas',
            characters: {
                'ㄱ': 'g/k',
                'ㄴ': 'n',
                'ㄷ': 'd/t',
                'ㄹ': 'r/l',
                'ㅁ': 'm',
                'ㅂ': 'b/p',
                'ㅅ': 's',
                'ㅇ': 'ng/-',
                'ㅈ': 'j',
                'ㅎ': 'h'
            }
        },
        'aspirated-consonants': {
            name: 'Consonantes Aspiradas',
            characters: {
                'ㅋ': 'k',
                'ㅌ': 't',
                'ㅍ': 'p',
                'ㅊ': 'ch'
            }
        },
        'tense-consonants': {
            name: 'Consonantes Tensas',
            characters: {
                'ㄲ': 'kk',
                'ㄸ': 'tt',
                'ㅃ': 'pp',
                'ㅆ': 'ss',
                'ㅉ': 'jj'
            }
        }
    },

    // Bloques silábicos de 2 letras (consonante + vocal)
    syllableBlocks2: [
        { native: '가', romaji: 'ga', components: ['ㄱ', 'ㅏ'] },
        { native: '나', romaji: 'na', components: ['ㄴ', 'ㅏ'] },
        { native: '다', romaji: 'da', components: ['ㄷ', 'ㅏ'] },
        { native: '라', romaji: 'ra', components: ['ㄹ', 'ㅏ'] },
        { native: '마', romaji: 'ma', components: ['ㅁ', 'ㅏ'] },
        { native: '바', romaji: 'ba', components: ['ㅂ', 'ㅏ'] },
        { native: '사', romaji: 'sa', components: ['ㅅ', 'ㅏ'] },
        { native: '아', romaji: 'a', components: ['ㅇ', 'ㅏ'] },
        { native: '자', romaji: 'ja', components: ['ㅈ', 'ㅏ'] },
        { native: '하', romaji: 'ha', components: ['ㅎ', 'ㅏ'] },
        { native: '고', romaji: 'go', components: ['ㄱ', 'ㅗ'] },
        { native: '노', romaji: 'no', components: ['ㄴ', 'ㅗ'] },
        { native: '도', romaji: 'do', components: ['ㄷ', 'ㅗ'] },
        { native: '로', romaji: 'ro', components: ['ㄹ', 'ㅗ'] },
        { native: '모', romaji: 'mo', components: ['ㅁ', 'ㅗ'] },
        { native: '보', romaji: 'bo', components: ['ㅂ', 'ㅗ'] },
        { native: '소', romaji: 'so', components: ['ㅅ', 'ㅗ'] },
        { native: '오', romaji: 'o', components: ['ㅇ', 'ㅗ'] },
        { native: '조', romaji: 'jo', components: ['ㅈ', 'ㅗ'] },
        { native: '호', romaji: 'ho', components: ['ㅎ', 'ㅗ'] }
    ],

    // Bloques silábicos de 3 letras (consonante + vocal + consonante final)
    syllableBlocks3: [
        { native: '간', romaji: 'gan', components: ['ㄱ', 'ㅏ', 'ㄴ'] },
        { native: '갈', romaji: 'gal', components: ['ㄱ', 'ㅏ', 'ㄹ'] },
        { native: '감', romaji: 'gam', components: ['ㄱ', 'ㅏ', 'ㅁ'] },
        { native: '갑', romaji: 'gap', components: ['ㄱ', 'ㅏ', 'ㅂ'] },
        { native: '강', romaji: 'gang', components: ['ㄱ', 'ㅏ', 'ㅇ'] },
        { native: '한', romaji: 'han', components: ['ㅎ', 'ㅏ', 'ㄴ'] },
        { native: '할', romaji: 'hal', components: ['ㅎ', 'ㅏ', 'ㄹ'] },
        { native: '함', romaji: 'ham', components: ['ㅎ', 'ㅏ', 'ㅁ'] },
        { native: '합', romaji: 'hap', components: ['ㅎ', 'ㅏ', 'ㅂ'] },
        { native: '항', romaji: 'hang', components: ['ㅎ', 'ㅏ', 'ㅇ'] },
        { native: '산', romaji: 'san', components: ['ㅅ', 'ㅏ', 'ㄴ'] },
        { native: '살', romaji: 'sal', components: ['ㅅ', 'ㅏ', 'ㄹ'] },
        { native: '삼', romaji: 'sam', components: ['ㅅ', 'ㅏ', 'ㅁ'] },
        { native: '밤', romaji: 'bam', components: ['ㅂ', 'ㅏ', 'ㅁ'] },
        { native: '밥', romaji: 'bap', components: ['ㅂ', 'ㅏ', 'ㅂ'] },
        { native: '방', romaji: 'bang', components: ['ㅂ', 'ㅏ', 'ㅇ'] },
        { native: '말', romaji: 'mal', components: ['ㅁ', 'ㅏ', 'ㄹ'] },
        { native: '만', romaji: 'man', components: ['ㅁ', 'ㅏ', 'ㄴ'] },
        { native: '물', romaji: 'mul', components: ['ㅁ', 'ㅜ', 'ㄹ'] },
        { native: '문', romaji: 'mun', components: ['ㅁ', 'ㅜ', 'ㄴ'] }
    ],

    // Palabras para principiantes
    beginnerWords: [
        { native: '사랑', romaji: 'sarang', meaning: 'amor', difficulty: 1 },
        { native: '물', romaji: 'mul', meaning: 'agua', difficulty: 1 },
        { native: '밥', romaji: 'bap', meaning: 'arroz', difficulty: 1 },
        { native: '집', romaji: 'jip', meaning: 'casa', difficulty: 1 },
        { native: '나무', romaji: 'namu', meaning: 'árbol', difficulty: 1 },
        { native: '하늘', romaji: 'haneul', meaning: 'cielo', difficulty: 1 },
        { native: '책', romaji: 'chaek', meaning: 'libro', difficulty: 1 },
        { native: '친구', romaji: 'chingu', meaning: 'amigo', difficulty: 1 },
        { native: '학교', romaji: 'hakgyo', meaning: 'escuela', difficulty: 1 },
        { native: '가족', romaji: 'gajok', meaning: 'familia', difficulty: 1 },
        { native: '음식', romaji: 'eumsik', meaning: 'comida', difficulty: 1 },
        { native: '시간', romaji: 'sigan', meaning: 'tiempo', difficulty: 1 },
        { native: '아침', romaji: 'achim', meaning: 'mañana', difficulty: 1 },
        { native: '저녁', romaji: 'jeonyeok', meaning: 'tarde', difficulty: 1 },
        { native: '사람', romaji: 'saram', meaning: 'persona', difficulty: 1 },
        { native: '고양이', romaji: 'goyangi', meaning: 'gato', difficulty: 1 },
        { native: '개', romaji: 'gae', meaning: 'perro', difficulty: 1 },
        { native: '꽃', romaji: 'kkot', meaning: 'flor', difficulty: 1 },
        { native: '달', romaji: 'dal', meaning: 'luna', difficulty: 1 },
        { native: '별', romaji: 'byeol', meaning: 'estrella', difficulty: 1 },
        { native: '바다', romaji: 'bada', meaning: 'mar', difficulty: 1 },
        { native: '산', romaji: 'san', meaning: 'montaña', difficulty: 1 },
        { native: '도시', romaji: 'dosi', meaning: 'ciudad', difficulty: 1 },
        { native: '나라', romaji: 'nara', meaning: 'país', difficulty: 1 },
        { native: '눈', romaji: 'nun', meaning: 'ojo/nieve', difficulty: 1 },
        { native: '손', romaji: 'son', meaning: 'mano', difficulty: 1 },
        { native: '발', romaji: 'bal', meaning: 'pie', difficulty: 1 },
        { native: '머리', romaji: 'meori', meaning: 'cabeza/cabello', difficulty: 1 },
        { native: '이름', romaji: 'ireum', meaning: 'nombre', difficulty: 1 },
        { native: '문', romaji: 'mun', meaning: 'puerta', difficulty: 1 },
        { native: '한국', romaji: 'hanguk', meaning: 'Corea', difficulty: 1 },
        { native: '김치', romaji: 'gimchi', meaning: 'kimchi', difficulty: 1 },
        { native: '안녕', romaji: 'annyeong', meaning: 'hola', difficulty: 1 },
        { native: '감사', romaji: 'gamsa', meaning: 'gracias', difficulty: 1 },
        { native: '사진', romaji: 'sajin', meaning: 'foto', difficulty: 1 }
    ]
};