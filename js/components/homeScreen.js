// Home Screen Component

function renderHomeScreen() {
    const systems = getAllWritingSystems();

    return `
        <div class="container" style="padding-top: 3rem; padding-bottom: 3rem;">
            <div class="fade-in" style="text-align: center; margin-bottom: 3rem;">
                <h2 class="text-4xl font-bold" style="margin-bottom: 1rem;">
                    Elige un sistema de escritura
                </h2>
                <p style="color: var(--text-secondary); font-size: 1.125rem;">
                    Elige un sistema de escritura para practicar
                </p>
            </div>
            
            <div class="grid-auto" style="max-width: 900px; margin: 0 auto;">
                ${Object.entries(systems).map(([id, system], index) => `
                    <div class="card card-hover card-clickable stagger-item" 
                         onclick="App.selectSystem('${id}')"
                         style="animation-delay: ${index * 0.1}s;">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem; height: 4rem; display: flex; align-items: center; justify-content: center;">
                                ${getSystemIcon(id)}
                            </div>
                            <h3 class="text-2xl font-semibold" style="margin-bottom: 0.5rem;">
                                ${system.name}
                            </h3>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">
                                ${system.description}
                            </p>
                            <div style="margin-top: 1.5rem;">
                                <button class="btn btn-primary" style="width: 100%;">
                                    Comienza a aprender
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Get icon for writing system
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