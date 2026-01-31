// Header Component

function renderHeader() {
    const currentTheme = ThemeManager.get();

    return `
        <header class="fade-in" style="padding: 1.5rem 0; border-bottom: 2px solid var(--border);">
            <div class="container">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="text-2xl font-bold" style="font-family: 'Outfit', sans-serif;">
                            Scriptus
                        </h1>
                        <p class="text-sm" style="color: var(--text-secondary); margin-top: 0.25rem;">
                            Maneja todos los sistemas de escritura que quieras
                        </p>
                    </div>
                    
                    <div class="theme-toggle">
                        <div class="theme-option ${currentTheme === 'light' ? 'active' : ''}" 
                             onclick="ThemeManager.set('light')" 
                             data-theme="light">
                            Claro
                        </div>
                        <div class="theme-option ${currentTheme === 'dark' ? 'active' : ''}" 
                             onclick="ThemeManager.set('dark')" 
                             data-theme="dark">
                            Oscuro
                        </div>
                        <div class="theme-option ${currentTheme === 'pink' ? 'active' : ''}" 
                             onclick="ThemeManager.set('pink')" 
                             data-theme="pink">
                            Rosa
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;
}

// Update theme toggle when theme changes
window.addEventListener('themechange', () => {
    const currentTheme = ThemeManager.get();
    document.querySelectorAll('.theme-option').forEach(option => {
        const theme = option.dataset.theme;
        if (theme === currentTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
});