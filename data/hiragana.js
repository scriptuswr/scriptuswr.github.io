// Datos completos de Hiragana
const HIRAGANA_DATA = {
    id: 'hiragana',
    name: 'Hiragana',
    nameEs: 'Hiragana',
    description: 'Escritura fonética japonesa para palabras nativas',

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
            description: 'Transcribir palabras en hiragana a romaji'
        },
        {
            id: 'romaji-to-word',
            name: 'Romaji → Palabra',
            description: 'Escribir palabras en hiragana desde romaji'
        },
        {
            id: 'combined-kana',
            name: 'Hiragana + Katakana',
            description: 'Practicar ambos alfabetos combinados',
            requiresSecondary: 'katakana'
        }
    ],

    // Filas de caracteres organizadas
    rows: {
        'a-row': {
            name: 'Fila A (あ行)',
            characters: {
                'あ': 'a',
                'い': 'i',
                'う': 'u',
                'え': 'e',
                'お': 'o'
            }
        },
        'ka-row': {
            name: 'Fila Ka (か行)',
            characters: {
                'か': 'ka',
                'き': 'ki',
                'く': 'ku',
                'け': 'ke',
                'こ': 'ko'
            }
        },
        'sa-row': {
            name: 'Fila Sa (さ行)',
            characters: {
                'さ': 'sa',
                'し': 'shi',
                'す': 'su',
                'せ': 'se',
                'そ': 'so'
            }
        },
        'ta-row': {
            name: 'Fila Ta (た行)',
            characters: {
                'た': 'ta',
                'ち': 'chi',
                'つ': 'tsu',
                'て': 'te',
                'と': 'to'
            }
        },
        'na-row': {
            name: 'Fila Na (な行)',
            characters: {
                'な': 'na',
                'に': 'ni',
                'ぬ': 'nu',
                'ね': 'ne',
                'の': 'no'
            }
        },
        'ha-row': {
            name: 'Fila Ha (は行)',
            characters: {
                'は': 'ha',
                'ひ': 'hi',
                'ふ': 'fu',
                'へ': 'he',
                'ほ': 'ho'
            }
        },
        'ma-row': {
            name: 'Fila Ma (ま行)',
            characters: {
                'ま': 'ma',
                'み': 'mi',
                'む': 'mu',
                'め': 'me',
                'も': 'mo'
            }
        },
        'ya-row': {
            name: 'Fila Ya (や行)',
            characters: {
                'や': 'ya',
                'ゆ': 'yu',
                'よ': 'yo'
            }
        },
        'ra-row': {
            name: 'Fila Ra (ら行)',
            characters: {
                'ら': 'ra',
                'り': 'ri',
                'る': 'ru',
                'れ': 're',
                'ろ': 'ro'
            }
        },
        'wa-row': {
            name: 'Fila Wa (わ行)',
            characters: {
                'わ': 'wa',
                'を': 'wo',
                'ん': 'n'
            }
        },
        'ga-row': {
            name: 'Fila Ga (が行)',
            characters: {
                'が': 'ga',
                'ぎ': 'gi',
                'ぐ': 'gu',
                'げ': 'ge',
                'ご': 'go'
            }
        },
        'za-row': {
            name: 'Fila Za (ざ行)',
            characters: {
                'ざ': 'za',
                'じ': 'ji',
                'ず': 'zu',
                'ぜ': 'ze',
                'ぞ': 'zo'
            }
        },
        'da-row': {
            name: 'Fila Da (だ行)',
            characters: {
                'だ': 'da',
                'ぢ': 'ji',
                'づ': 'zu',
                'で': 'de',
                'ど': 'do'
            }
        },
        'ba-row': {
            name: 'Fila Ba (ば行)',
            characters: {
                'ば': 'ba',
                'び': 'bi',
                'ぶ': 'bu',
                'べ': 'be',
                'ぼ': 'bo'
            }
        },
        'pa-row': {
            name: 'Fila Pa (ぱ行)',
            characters: {
                'ぱ': 'pa',
                'ぴ': 'pi',
                'ぷ': 'pu',
                'ぺ': 'pe',
                'ぽ': 'po'
            }
        }
    },

    // Palabras para principiantes
    beginnerWords: [
        { native: 'あい', romaji: 'ai', meaning: 'amor', difficulty: 1 },
        { native: 'いえ', romaji: 'ie', meaning: 'casa', difficulty: 1 },
        { native: 'うえ', romaji: 'ue', meaning: 'arriba', difficulty: 1 },
        { native: 'かお', romaji: 'kao', meaning: 'cara', difficulty: 1 },
        { native: 'き', romaji: 'ki', meaning: 'árbol', difficulty: 1 },
        { native: 'くち', romaji: 'kuchi', meaning: 'boca', difficulty: 1 },
        { native: 'さけ', romaji: 'sake', meaning: 'alcohol', difficulty: 1 },
        { native: 'した', romaji: 'shita', meaning: 'debajo/lengua', difficulty: 1 },
        { native: 'すし', romaji: 'sushi', meaning: 'sushi', difficulty: 1 },
        { native: 'たこ', romaji: 'tako', meaning: 'pulpo', difficulty: 1 },
        { native: 'て', romaji: 'te', meaning: 'mano', difficulty: 1 },
        { native: 'なに', romaji: 'nani', meaning: 'qué', difficulty: 1 },
        { native: 'ねこ', romaji: 'neko', meaning: 'gato', difficulty: 1 },
        { native: 'はな', romaji: 'hana', meaning: 'flor/nariz', difficulty: 1 },
        { native: 'ひと', romaji: 'hito', meaning: 'persona', difficulty: 1 },
        { native: 'ふね', romaji: 'fune', meaning: 'barco', difficulty: 1 },
        { native: 'まち', romaji: 'machi', meaning: 'ciudad', difficulty: 1 },
        { native: 'み', romaji: 'mi', meaning: 'fruta', difficulty: 1 },
        { native: 'め', romaji: 'me', meaning: 'ojo', difficulty: 1 },
        { native: 'もも', romaji: 'momo', meaning: 'durazno', difficulty: 1 },
        { native: 'やま', romaji: 'yama', meaning: 'montaña', difficulty: 1 },
        { native: 'ゆき', romaji: 'yuki', meaning: 'nieve', difficulty: 1 },
        { native: 'よる', romaji: 'yoru', meaning: 'noche', difficulty: 1 },
        { native: 'かわ', romaji: 'kawa', meaning: 'río', difficulty: 1 },
        { native: 'そら', romaji: 'sora', meaning: 'cielo', difficulty: 1 },
        { native: 'あめ', romaji: 'ame', meaning: 'lluvia/caramelo', difficulty: 1 },
        { native: 'いぬ', romaji: 'inu', meaning: 'perro', difficulty: 1 },
        { native: 'うし', romaji: 'ushi', meaning: 'vaca', difficulty: 1 },
        { native: 'かに', romaji: 'kani', meaning: 'cangrejo', difficulty: 1 },
        { native: 'くも', romaji: 'kumo', meaning: 'nube/araña', difficulty: 1 },
        { native: 'あさ', romaji: 'asa', meaning: 'mañana', difficulty: 1 },
        { native: 'ゆめ', romaji: 'yume', meaning: 'sueño', difficulty: 1 },
        { native: 'ちから', romaji: 'chikara', meaning: 'fuerza', difficulty: 2 },
        { native: 'こころ', romaji: 'kokoro', meaning: 'corazón', difficulty: 2 },
        { native: 'ひかり', romaji: 'hikari', meaning: 'luz', difficulty: 2 },
        { native: 'みずうみ', romaji: 'mizuumi', meaning: 'lago', difficulty: 2 },
        { native: 'さくら', romaji: 'sakura', meaning: 'cerezo', difficulty: 2 },
        { native: 'たからもの', romaji: 'takaramono', meaning: 'tesoro', difficulty: 3 },
        { native: 'ともだち', romaji: 'tomodachi', meaning: 'amigo', difficulty: 2 },
        { native: 'せんせい', romaji: 'sensei', meaning: 'maestro', difficulty: 2 }
    ]
};