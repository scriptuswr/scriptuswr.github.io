// Datos completos de Ruso (Cirílico)
const RUSSIAN_DATA = {
    id: 'russian',
    name: 'Russian',
    nameEs: 'Ruso',
    description: 'Alfabeto cirílico ruso',

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
            id: 'word-to-romaji',
            name: 'Palabra → Transcripción',
            description: 'Transcribir palabras rusas'
        },
        {
            id: 'romaji-to-word',
            name: 'Transcripción → Palabra',
            description: 'Escribir palabras en cirílico'
        }
    ],

    // Caracteres organizados
    rows: {
        'vowels': {
            name: 'Vocales',
            characters: {
                'А': 'a',
                'Е': 'ye',
                'Ё': 'yo',
                'И': 'i',
                'О': 'o',
                'У': 'u',
                'Ы': 'y',
                'Э': 'e',
                'Ю': 'yu',
                'Я': 'ya'
            }
        },
        'consonants-1': {
            name: 'Consonantes 1',
            characters: {
                'Б': 'b',
                'В': 'v',
                'Г': 'g',
                'Д': 'd',
                'Ж': 'zh',
                'З': 'z'
            }
        },
        'consonants-2': {
            name: 'Consonantes 2',
            characters: {
                'К': 'k',
                'Л': 'l',
                'М': 'm',
                'Н': 'n',
                'П': 'p',
                'Р': 'r'
            }
        },
        'consonants-3': {
            name: 'Consonantes 3',
            characters: {
                'С': 's',
                'Т': 't',
                'Ф': 'f',
                'Х': 'kh',
                'Ц': 'ts',
                'Ч': 'ch'
            }
        },
        'consonants-4': {
            name: 'Consonantes 4',
            characters: {
                'Ш': 'sh',
                'Щ': 'shch',
                'Ъ': '(signo duro)',
                'Ь': '(signo blando)'
            }
        }
    },

    // Palabras para principiantes
    beginnerWords: [
        { native: 'мама', romaji: 'mama', meaning: 'mamá', difficulty: 1 },
        { native: 'папа', romaji: 'papa', meaning: 'papá', difficulty: 1 },
        { native: 'дом', romaji: 'dom', meaning: 'casa', difficulty: 1 },
        { native: 'вода', romaji: 'voda', meaning: 'agua', difficulty: 1 },
        { native: 'хлеб', romaji: 'khleb', meaning: 'pan', difficulty: 1 },
        { native: 'молоко', romaji: 'moloko', meaning: 'leche', difficulty: 1 },
        { native: 'книга', romaji: 'kniga', meaning: 'libro', difficulty: 1 },
        { native: 'стол', romaji: 'stol', meaning: 'mesa', difficulty: 1 },
        { native: 'стул', romaji: 'stul', meaning: 'silla', difficulty: 1 },
        { native: 'окно', romaji: 'okno', meaning: 'ventana', difficulty: 1 },
        { native: 'дверь', romaji: 'dver', meaning: 'puerta', difficulty: 1 },
        { native: 'город', romaji: 'gorod', meaning: 'ciudad', difficulty: 1 },
        { native: 'школа', romaji: 'shkola', meaning: 'escuela', difficulty: 1 },
        { native: 'друг', romaji: 'drug', meaning: 'amigo', difficulty: 1 },
        { native: 'семья', romaji: 'semya', meaning: 'familia', difficulty: 1 },
        { native: 'любовь', romaji: 'lyubov', meaning: 'amor', difficulty: 2 },
        { native: 'солнце', romaji: 'solntse', meaning: 'sol', difficulty: 2 },
        { native: 'луна', romaji: 'luna', meaning: 'luna', difficulty: 1 },
        { native: 'звезда', romaji: 'zvezda', meaning: 'estrella', difficulty: 2 },
        { native: 'небо', romaji: 'nebo', meaning: 'cielo', difficulty: 1 },
        { native: 'земля', romaji: 'zemlya', meaning: 'tierra', difficulty: 2 },
        { native: 'море', romaji: 'more', meaning: 'mar', difficulty: 1 },
        { native: 'река', romaji: 'reka', meaning: 'río', difficulty: 1 },
        { native: 'гора', romaji: 'gora', meaning: 'montaña', difficulty: 1 },
        { native: 'лес', romaji: 'les', meaning: 'bosque', difficulty: 1 },
        { native: 'дерево', romaji: 'derevo', meaning: 'árbol', difficulty: 1 },
        { native: 'цветок', romaji: 'tsvetok', meaning: 'flor', difficulty: 2 },
        { native: 'кошка', romaji: 'koshka', meaning: 'gato', difficulty: 1 },
        { native: 'собака', romaji: 'sobaka', meaning: 'perro', difficulty: 1 },
        { native: 'рука', romaji: 'ruka', meaning: 'mano/brazo', difficulty: 1 },
        { native: 'нога', romaji: 'noga', meaning: 'pie/pierna', difficulty: 1 },
        { native: 'голова', romaji: 'golova', meaning: 'cabeza', difficulty: 1 },
        { native: 'глаз', romaji: 'glaz', meaning: 'ojo', difficulty: 1 },
        { native: 'имя', romaji: 'imya', meaning: 'nombre', difficulty: 1 },
        { native: 'время', romaji: 'vremya', meaning: 'tiempo', difficulty: 2 },
        { native: 'день', romaji: 'den', meaning: 'día', difficulty: 1 },
        { native: 'ночь', romaji: 'noch', meaning: 'noche', difficulty: 1 },
        { native: 'утро', romaji: 'utro', meaning: 'mañana', difficulty: 1 },
        { native: 'вечер', romaji: 'vecher', meaning: 'tarde', difficulty: 1 },
        { native: 'здравствуйте', romaji: 'zdravstvuyte', meaning: 'hola (formal)', difficulty: 3 },
        { native: 'привет', romaji: 'privet', meaning: 'hola', difficulty: 2 },
        { native: 'спасибо', romaji: 'spasibo', meaning: 'gracias', difficulty: 2 },
        { native: 'пожалуйста', romaji: 'pozhaluysta', meaning: 'por favor', difficulty: 3 },
        { native: 'да', romaji: 'da', meaning: 'sí', difficulty: 1 },
        { native: 'нет', romaji: 'net', meaning: 'no', difficulty: 1 }
    ]
};