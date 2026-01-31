// Datos completos de Katakana
const KATAKANA_DATA = {
    id: 'katakana',
    name: 'Katakana',
    nameEs: 'Katakana',
    description: 'Escritura fonética japonesa para palabras extranjeras',

    // Modos de prueba disponibles
    testModes: [
        {
            id: 'letter-to-romaji',
            name: 'Letra → Romaji',
            description: 'Ver un carácter y escribir su lectura'
        },
        {
            id: 'romaji-to-letter',
            name: 'Romaji → Letra',
            description: 'Ver la lectura y escribir el carácter'
        },
        {
            id: 'word-to-romaji',
            name: 'Palabra → Romaji',
            description: 'Transcribir palabras en katakana a romaji'
        },
        {
            id: 'romaji-to-word',
            name: 'Romaji → Palabra',
            description: 'Escribir palabras en katakana desde romaji'
        },
        {
            id: 'combined-kana',
            name: 'Katakana + Hiragana',
            description: 'Practicar ambos alfabetos combinados',
            requiresSecondary: 'hiragana'
        }
    ],

    // Filas de caracteres organizadas
    rows: {
        'a-row': {
            name: 'Fila A (ア行)',
            characters: {
                'ア': 'a',
                'イ': 'i',
                'ウ': 'u',
                'エ': 'e',
                'オ': 'o'
            }
        },
        'ka-row': {
            name: 'Fila Ka (カ行)',
            characters: {
                'カ': 'ka',
                'キ': 'ki',
                'ク': 'ku',
                'ケ': 'ke',
                'コ': 'ko'
            }
        },
        'sa-row': {
            name: 'Fila Sa (サ行)',
            characters: {
                'サ': 'sa',
                'シ': 'shi',
                'ス': 'su',
                'セ': 'se',
                'ソ': 'so'
            }
        },
        'ta-row': {
            name: 'Fila Ta (タ行)',
            characters: {
                'タ': 'ta',
                'チ': 'chi',
                'ツ': 'tsu',
                'テ': 'te',
                'ト': 'to'
            }
        },
        'na-row': {
            name: 'Fila Na (ナ行)',
            characters: {
                'ナ': 'na',
                'ニ': 'ni',
                'ヌ': 'nu',
                'ネ': 'ne',
                'ノ': 'no'
            }
        },
        'ha-row': {
            name: 'Fila Ha (ハ行)',
            characters: {
                'ハ': 'ha',
                'ヒ': 'hi',
                'フ': 'fu',
                'ヘ': 'he',
                'ホ': 'ho'
            }
        },
        'ma-row': {
            name: 'Fila Ma (マ行)',
            characters: {
                'マ': 'ma',
                'ミ': 'mi',
                'ム': 'mu',
                'メ': 'me',
                'モ': 'mo'
            }
        },
        'ya-row': {
            name: 'Fila Ya (ヤ行)',
            characters: {
                'ヤ': 'ya',
                'ユ': 'yu',
                'ヨ': 'yo'
            }
        },
        'ra-row': {
            name: 'Fila Ra (ラ行)',
            characters: {
                'ラ': 'ra',
                'リ': 'ri',
                'ル': 'ru',
                'レ': 're',
                'ロ': 'ro'
            }
        },
        'wa-row': {
            name: 'Fila Wa (ワ行)',
            characters: {
                'ワ': 'wa',
                'ヲ': 'wo',
                'ン': 'n'
            }
        },
        'ga-row': {
            name: 'Fila Ga (ガ行)',
            characters: {
                'ガ': 'ga',
                'ギ': 'gi',
                'グ': 'gu',
                'ゲ': 'ge',
                'ゴ': 'go'
            }
        },
        'za-row': {
            name: 'Fila Za (ザ行)',
            characters: {
                'ザ': 'za',
                'ジ': 'ji',
                'ズ': 'zu',
                'ゼ': 'ze',
                'ゾ': 'zo'
            }
        },
        'da-row': {
            name: 'Fila Da (ダ行)',
            characters: {
                'ダ': 'da',
                'ヂ': 'ji',
                'ヅ': 'zu',
                'デ': 'de',
                'ド': 'do'
            }
        },
        'ba-row': {
            name: 'Fila Ba (バ行)',
            characters: {
                'バ': 'ba',
                'ビ': 'bi',
                'ブ': 'bu',
                'ベ': 'be',
                'ボ': 'bo'
            }
        },
        'pa-row': {
            name: 'Fila Pa (パ行)',
            characters: {
                'パ': 'pa',
                'ピ': 'pi',
                'プ': 'pu',
                'ペ': 'pe',
                'ポ': 'po'
            }
        }
    },

    // Palabras extranjeras comunes
    beginnerWords: [
        { native: 'アメリカ', romaji: 'amerika', meaning: 'América', difficulty: 1 },
        { native: 'カメラ', romaji: 'kamera', meaning: 'cámara', difficulty: 1 },
        { native: 'コーヒー', romaji: 'koohii', meaning: 'café', difficulty: 1 },
        { native: 'テスト', romaji: 'tesuto', meaning: 'examen', difficulty: 1 },
        { native: 'ノート', romaji: 'nooto', meaning: 'cuaderno', difficulty: 1 },
        { native: 'メニュー', romaji: 'menyuu', meaning: 'menú', difficulty: 1 },
        { native: 'ラジオ', romaji: 'rajio', meaning: 'radio', difficulty: 1 },
        { native: 'タクシー', romaji: 'takushii', meaning: 'taxi', difficulty: 1 },
        { native: 'ホテル', romaji: 'hoteru', meaning: 'hotel', difficulty: 1 },
        { native: 'バス', romaji: 'basu', meaning: 'autobús', difficulty: 1 },
        { native: 'ケーキ', romaji: 'keeki', meaning: 'pastel', difficulty: 1 },
        { native: 'サラダ', romaji: 'sarada', meaning: 'ensalada', difficulty: 1 },
        { native: 'スープ', romaji: 'suupu', meaning: 'sopa', difficulty: 1 },
        { native: 'チーズ', romaji: 'chiizu', meaning: 'queso', difficulty: 1 },
        { native: 'パン', romaji: 'pan', meaning: 'pan', difficulty: 1 },
        { native: 'ミルク', romaji: 'miruku', meaning: 'leche', difficulty: 1 },
        { native: 'ワイン', romaji: 'wain', meaning: 'vino', difficulty: 1 },
        { native: 'ビール', romaji: 'biiru', meaning: 'cerveza', difficulty: 1 },
        { native: 'テレビ', romaji: 'terebi', meaning: 'televisión', difficulty: 1 },
        { native: 'エアコン', romaji: 'eakon', meaning: 'aire acondicionado', difficulty: 2 },
        { native: 'カレー', romaji: 'karee', meaning: 'curry', difficulty: 1 },
        { native: 'ピザ', romaji: 'piza', meaning: 'pizza', difficulty: 1 },
        { native: 'スキー', romaji: 'sukii', meaning: 'esquí', difficulty: 1 },
        { native: 'テニス', romaji: 'tenisu', meaning: 'tenis', difficulty: 1 },
        { native: 'サッカー', romaji: 'sakkaa', meaning: 'fútbol', difficulty: 1 },
        { native: 'ドア', romaji: 'doa', meaning: 'puerta', difficulty: 1 },
        { native: 'ベッド', romaji: 'beddo', meaning: 'cama', difficulty: 1 },
        { native: 'デスク', romaji: 'desuku', meaning: 'escritorio', difficulty: 1 },
        { native: 'ペン', romaji: 'pen', meaning: 'bolígrafo', difficulty: 1 },
        { native: 'バッグ', romaji: 'baggu', meaning: 'bolsa', difficulty: 1 },
        { native: 'コンピューター', romaji: 'konpyuutaa', meaning: 'computadora', difficulty: 2 },
        { native: 'インターネット', romaji: 'intaanetto', meaning: 'internet', difficulty: 2 },
        { native: 'レストラン', romaji: 'resutoran', meaning: 'restaurante', difficulty: 2 },
        { native: 'アイスクリーム', romaji: 'aisukuriimu', meaning: 'helado', difficulty: 2 },
        { native: 'チョコレート', romaji: 'chokoreeto', meaning: 'chocolate', difficulty: 2 }
    ]
};