// Gestor de Temas

const ThemeManager = {
    currentTheme: 'light',

    // Inicializar tema
    init() {
        this.currentTheme = loadFromStorage('theme', 'light');
        this.apply(this.currentTheme);
    },

    // Aplicar tema
    apply(theme) {
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-pink');
        document.body.classList.add(`theme-${theme}`);

        this.currentTheme = theme;
        saveToStorage('theme', theme);

        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    },

    // Obtener tema actual
    get() {
        return this.currentTheme;
    },

    // Cambiar a tema específico
    set(theme) {
        if (['light', 'dark', 'pink'].includes(theme)) {
            this.apply(theme);
        }
    },

    // Alternar tema
    toggle() {
        const themes = ['light', 'dark', 'pink'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.apply(themes[nextIndex]);
    }
};