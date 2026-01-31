// Datos completos de Georgiano
const GEORGIAN_DATA = {
    id: 'georgian',
    name: 'Georgian',
    nameEs: 'Georgiano',
    description: 'Alfabeto georgiano (Mkhedruli)',

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
            description: 'Transcribir palabras georgianas'
        },
        {
            id: 'romaji-to-word',
            name: 'Transcripción → Palabra',
            description: 'Escribir palabras en georgiano'
        }
    ],

    // Caracteres organizados
    rows: {
        'vowels': {
            name: 'Vocales',
            characters: {
                'ა': 'a',
                'ე': 'e',
                'ი': 'i',
                'ო': 'o',
                'უ': 'u'
            }
        },
        'consonants-1': {
            name: 'Consonantes 1',
            characters: {
                'ბ': 'b',
                'გ': 'g',
                'დ': 'd',
                'ვ': 'v',
                'ზ': 'z',
                'თ': 't',
                'კ': 'k',
                'ლ': 'l'
            }
        },
        'consonants-2': {
            name: 'Consonantes 2',
            characters: {
                'მ': 'm',
                'ნ': 'n',
                'პ': 'p',
                'ჟ': 'zh',
                'რ': 'r',
                'ს': 's',
                'ტ': 't',
                'ფ': 'p'
            }
        },
        'consonants-3': {
            name: 'Consonantes 3',
            characters: {
                'ქ': 'k',
                'ღ': 'gh',
                'ყ': 'q',
                'შ': 'sh',
                'ჩ': 'ch',
                'ც': 'ts',
                'ძ': 'dz',
                'წ': 'ts'
            }
        },
        'consonants-4': {
            name: 'Consonantes 4',
            characters: {
                'ჭ': 'ch',
                'ხ': 'kh',
                'ჯ': 'j',
                'ჰ': 'h'
            }
        }
    },

    // Palabras para principiantes
    beginnerWords: [
        { native: 'მამა', romaji: 'mama', meaning: 'padre', difficulty: 1 },
        { native: 'დედა', romaji: 'deda', meaning: 'madre', difficulty: 1 },
        { native: 'სახლი', romaji: 'sakhli', meaning: 'casa', difficulty: 1 },
        { native: 'წყალი', romaji: 'tsqali', meaning: 'agua', difficulty: 2 },
        { native: 'პური', romaji: 'puri', meaning: 'pan', difficulty: 1 },
        { native: 'რძე', romaji: 'rdze', meaning: 'leche', difficulty: 1 },
        { native: 'წიგნი', romaji: 'tsigni', meaning: 'libro', difficulty: 2 },
        { native: 'მაგიდა', romaji: 'magida', meaning: 'mesa', difficulty: 1 },
        { native: 'სკამი', romaji: 'skami', meaning: 'silla', difficulty: 1 },
        { native: 'ფანჯარა', romaji: 'panjara', meaning: 'ventana', difficulty: 2 },
        { native: 'კარი', romaji: 'kari', meaning: 'puerta', difficulty: 1 },
        { native: 'ქალაქი', romaji: 'kalaqi', meaning: 'ciudad', difficulty: 2 },
        { native: 'სკოლა', romaji: 'skola', meaning: 'escuela', difficulty: 1 },
        { native: 'მეგობარი', romaji: 'megobari', meaning: 'amigo', difficulty: 2 },
        { native: 'ოჯახი', romaji: 'ojakhi', meaning: 'familia', difficulty: 2 },
        { native: 'სიყვარული', romaji: 'siqvaruli', meaning: 'amor', difficulty: 3 },
        { native: 'მზე', romaji: 'mze', meaning: 'sol', difficulty: 1 },
        { native: 'მთვარე', romaji: 'mtvare', meaning: 'luna', difficulty: 2 },
        { native: 'ვარსკვლავი', romaji: 'varskhlavi', meaning: 'estrella', difficulty: 3 },
        { native: 'ცა', romaji: 'tsa', meaning: 'cielo', difficulty: 1 },
        { native: 'დედამიწა', romaji: 'dedamitsa', meaning: 'tierra', difficulty: 3 },
        { native: 'ზღვა', romaji: 'zghva', meaning: 'mar', difficulty: 2 },
        { native: 'მდინარე', romaji: 'mdinare', meaning: 'río', difficulty: 2 },
        { native: 'მთა', romaji: 'mta', meaning: 'montaña', difficulty: 1 },
        { native: 'ტყე', romaji: 'tqe', meaning: 'bosque', difficulty: 1 },
        { native: 'ხე', romaji: 'khe', meaning: 'árbol', difficulty: 1 },
        { native: 'ყვავილი', romaji: 'qvavili', meaning: 'flor', difficulty: 2 },
        { native: 'კატა', romaji: 'kata', meaning: 'gato', difficulty: 1 },
        { native: 'ძაღლი', romaji: 'dzaghli', meaning: 'perro', difficulty: 2 },
        { native: 'ხელი', romaji: 'kheli', meaning: 'mano/brazo', difficulty: 1 },
        { native: 'ფეხი', romaji: 'pekhi', meaning: 'pie/pierna', difficulty: 1 },
        { native: 'თავი', romaji: 'tavi', meaning: 'cabeza', difficulty: 1 },
        { native: 'თვალი', romaji: 'tvali', meaning: 'ojo', difficulty: 1 },
        { native: 'სახელი', romaji: 'sakheli', meaning: 'nombre', difficulty: 1 },
        { native: 'დრო', romaji: 'dro', meaning: 'tiempo', difficulty: 1 },
        { native: 'დღე', romaji: 'dghe', meaning: 'día', difficulty: 1 },
        { native: 'ღამე', romaji: 'ghame', meaning: 'noche', difficulty: 1 },
        { native: 'დილა', romaji: 'dila', meaning: 'mañana', difficulty: 1 },
        { native: 'საღამო', romaji: 'saghamo', meaning: 'tarde', difficulty: 2 },
        { native: 'გამარჯობა', romaji: 'gamarjoba', meaning: 'hola', difficulty: 3 },
        { native: 'მადლობა', romaji: 'madloba', meaning: 'gracias', difficulty: 2 },
        { native: 'გთხოვთ', romaji: 'gtxovt', meaning: 'por favor', difficulty: 3 },
        { native: 'დიახ', romaji: 'diakh', meaning: 'sí', difficulty: 1 },
        { native: 'არა', romaji: 'ara', meaning: 'no', difficulty: 1 },
        { native: 'საქართველო', romaji: 'sakartvelo', meaning: 'Georgia', difficulty: 3 }
    ]
};