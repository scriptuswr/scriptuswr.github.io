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
            description: 'Ver un carácter y escribir su lectura',
            supports: 'letters'
        },
        {
            id: 'romaji-to-letter',
            name: 'Romaji → Letra',
            description: 'Ver la lectura y escribir el carácter',
            supports: 'letters'
        },
        {
            id: 'multiple-choice-letters',
            name: 'Opción Múltiple (Letras)',
            description: 'Ver letra y elegir la lectura correcta entre 3 opciones',
            supports: 'letters'
        },
        {
            id: 'word-to-romaji',
            name: 'Palabra → Romaji',
            description: 'Transcribir palabras en hiragana a romaji',
            supports: 'words'
        },
        {
            id: 'romaji-to-word',
            name: 'Romaji → Palabra',
            description: 'Escribir palabras en hiragana desde romaji',
            supports: 'words'
        },
        {
            id: 'multiple-choice-words',
            name: 'Opción Múltiple (Palabras)',
            description: 'Ver palabra y elegir el significado correcto',
            supports: 'words'
        },
        {
            id: 'combined-kana',
            name: 'Hiragana + Katakana',
            description: 'Practicar ambos alfabetos combinados',
            requiresSecondary: 'katakana',
            supports: 'letters'
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
        { native: 'せんせい', romaji: 'sensei', meaning: 'maestro', difficulty: 2 },
        { native: 'みず', romaji: 'mizu', meaning: 'agua', difficulty: 1 },
        { native: 'ほん', romaji: 'hon', meaning: 'libro', difficulty: 1 },
        { native: 'かみ', romaji: 'kami', meaning: 'papel/dios/cabello', difficulty: 1 },
        { native: 'いし', romaji: 'ishi', meaning: 'piedra', difficulty: 1 },
        { native: 'つち', romaji: 'tsuchi', meaning: 'tierra', difficulty: 1 },
        { native: 'ひ', romaji: 'hi', meaning: 'fuego/sol/día', difficulty: 1 },
        { native: 'かぜ', romaji: 'kaze', meaning: 'viento', difficulty: 1 },
        { native: 'うみ', romaji: 'umi', meaning: 'mar', difficulty: 1 },
        { native: 'ほし', romaji: 'hoshi', meaning: 'estrella', difficulty: 1 },
        { native: 'つき', romaji: 'tsuki', meaning: 'luna', difficulty: 1 },
        { native: 'くさ', romaji: 'kusa', meaning: 'hierba', difficulty: 1 },
        { native: 'むし', romaji: 'mushi', meaning: 'insecto', difficulty: 1 },
        { native: 'とり', romaji: 'tori', meaning: 'pájaro', difficulty: 1 },
        { native: 'さかな', romaji: 'sakana', meaning: 'pescado', difficulty: 1 },
        { native: 'にく', romaji: 'niku', meaning: 'carne', difficulty: 1 },
        { native: 'たまご', romaji: 'tamago', meaning: 'huevo', difficulty: 2 },
        { native: 'こめ', romaji: 'kome', meaning: 'arroz', difficulty: 1 },
        { native: 'あたま', romaji: 'atama', meaning: 'cabeza', difficulty: 2 },
        { native: 'かた', romaji: 'kata', meaning: 'hombro', difficulty: 1 },
        { native: 'あし', romaji: 'ashi', meaning: 'pie/pierna', difficulty: 1 },
        { native: 'みみ', romaji: 'mimi', meaning: 'oreja', difficulty: 1 },
        { native: 'はな', romaji: 'hana', meaning: 'nariz', difficulty: 1 },
        { native: 'のど', romaji: 'nodo', meaning: 'garganta', difficulty: 1 },
        { native: 'せなか', romaji: 'senaka', meaning: 'espalda', difficulty: 2 },
        { native: 'こえ', romaji: 'koe', meaning: 'voz', difficulty: 1 },
        { native: 'ちち', romaji: 'chichi', meaning: 'padre', difficulty: 1 },
        { native: 'はは', romaji: 'haha', meaning: 'madre', difficulty: 1 },
        { native: 'あに', romaji: 'ani', meaning: 'hermano mayor', difficulty: 1 },
        { native: 'あね', romaji: 'ane', meaning: 'hermana mayor', difficulty: 1 },
        { native: 'おとうと', romaji: 'otouto', meaning: 'hermano menor', difficulty: 2 },
        { native: 'いもうと', romaji: 'imouto', meaning: 'hermana menor', difficulty: 2 },
        { native: 'そふ', romaji: 'sofu', meaning: 'abuelo', difficulty: 1 },
        { native: 'そぼ', romaji: 'sobo', meaning: 'abuela', difficulty: 1 },
        { native: 'おじ', romaji: 'oji', meaning: 'tío', difficulty: 1 },
        { native: 'おば', romaji: 'oba', meaning: 'tía', difficulty: 1 },
        { native: 'いとこ', romaji: 'itoko', meaning: 'primo/a', difficulty: 2 },
        { native: 'むすこ', romaji: 'musuko', meaning: 'hijo', difficulty: 2 },
        { native: 'むすめ', romaji: 'musume', meaning: 'hija', difficulty: 2 },
        { native: 'おとこ', romaji: 'otoko', meaning: 'hombre', difficulty: 2 },
        { native: 'おんな', romaji: 'onna', meaning: 'mujer', difficulty: 2 },
        { native: 'こども', romaji: 'kodomo', meaning: 'niño', difficulty: 2 },
        { native: 'あかちゃん', romaji: 'akachan', meaning: 'bebé', difficulty: 3 },
        { native: 'なまえ', romaji: 'namae', meaning: 'nombre', difficulty: 2 },
        { native: 'くに', romaji: 'kuni', meaning: 'país', difficulty: 1 },
        { native: 'むら', romaji: 'mura', meaning: 'pueblo', difficulty: 1 },
        { native: 'みち', romaji: 'michi', meaning: 'camino', difficulty: 1 },
        { native: 'はし', romaji: 'hashi', meaning: 'puente/palillos', difficulty: 1 },
        { native: 'もん', romaji: 'mon', meaning: 'puerta', difficulty: 1 },
        { native: 'まど', romaji: 'mado', meaning: 'ventana', difficulty: 1 },
        { native: 'かべ', romaji: 'kabe', meaning: 'pared', difficulty: 1 },
        { native: 'ゆか', romaji: 'yuka', meaning: 'suelo', difficulty: 1 },
        { native: 'てんき', romaji: 'tenki', meaning: 'clima', difficulty: 2 },
        { native: 'あつい', romaji: 'atsui', meaning: 'caliente/caluroso', difficulty: 2 },
        { native: 'さむい', romaji: 'samui', meaning: 'frío', difficulty: 2 },
        { native: 'すずしい', romaji: 'suzushii', meaning: 'fresco', difficulty: 3 },
        { native: 'あたたかい', romaji: 'atatakai', meaning: 'cálido', difficulty: 3 },
        { native: 'いろ', romaji: 'iro', meaning: 'color', difficulty: 1 },
        { native: 'あか', romaji: 'aka', meaning: 'rojo', difficulty: 1 },
        { native: 'あお', romaji: 'ao', meaning: 'azul', difficulty: 1 },
        { native: 'しろ', romaji: 'shiro', meaning: 'blanco', difficulty: 1 },
        { native: 'くろ', romaji: 'kuro', meaning: 'negro', difficulty: 1 },
        { native: 'きいろ', romaji: 'kiiro', meaning: 'amarillo', difficulty: 2 },
        { native: 'みどり', romaji: 'midori', meaning: 'verde', difficulty: 2 },
        { native: 'ちゃいろ', romaji: 'chairo', meaning: 'marrón', difficulty: 3 },
        { native: 'はる', romaji: 'haru', meaning: 'primavera', difficulty: 1 },
        { native: 'なつ', romaji: 'natsu', meaning: 'verano', difficulty: 1 },
        { native: 'あき', romaji: 'aki', meaning: 'otoño', difficulty: 1 },
        { native: 'ふゆ', romaji: 'fuyu', meaning: 'invierno', difficulty: 1 },
        { native: 'ひる', romaji: 'hiru', meaning: 'mediodía', difficulty: 1 },
        { native: 'ばん', romaji: 'ban', meaning: 'noche', difficulty: 1 },
        { native: 'きのう', romaji: 'kinou', meaning: 'ayer', difficulty: 2 },
        { native: 'きょう', romaji: 'kyou', meaning: 'hoy', difficulty: 2 },
        { native: 'あした', romaji: 'ashita', meaning: 'mañana', difficulty: 2 },
        { native: 'いま', romaji: 'ima', meaning: 'ahora', difficulty: 1 },
        { native: 'まえ', romaji: 'mae', meaning: 'delante/antes', difficulty: 1 },
        { native: 'うしろ', romaji: 'ushiro', meaning: 'detrás', difficulty: 2 },
        { native: 'よこ', romaji: 'yoko', meaning: 'lado', difficulty: 1 },
        { native: 'なか', romaji: 'naka', meaning: 'dentro', difficulty: 1 },
        { native: 'そと', romaji: 'soto', meaning: 'fuera', difficulty: 1 },
        { native: 'ちかく', romaji: 'chikaku', meaning: 'cerca', difficulty: 2 },
        { native: 'とおく', romaji: 'tooku', meaning: 'lejos', difficulty: 2 }
    ]
};