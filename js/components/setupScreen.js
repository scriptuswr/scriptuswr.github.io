function renderSetupScreen(systemId) {
    const system = getWritingSystem(systemId);
    if (!system) return '<div>Error: Sistema no encontrado</div>';

    // Sistemas que permiten selección individual de letras
    const allowIndividualSelection = ['arabic', 'russian', 'georgian'].includes(systemId);

    return `
        <div class="container" style="padding: 3rem 0;">
            <div class="fade-in" style="max-width: 900px; margin: 0 auto;">
                <button class="btn btn-ghost" onclick="App.goHome()" style="margin-bottom: 2rem;">
                    ← Volver al Inicio
                </button>
                
                <div style="text-align: center; margin-bottom: 3rem;">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">${getSystemIcon(systemId)}</div>
                    <h2 class="text-4xl font-bold" style="margin-bottom: 0.75rem;">${system.nameEs}</h2>
                    <p style="color: var(--text-secondary); font-size: 1.1rem;">${system.description}</p>
                </div>
                
                <div class="card scale-in" style="margin-bottom: 2rem;">
                    <h3 class="text-2xl font-semibold" style="margin-bottom: 1.5rem;">1. Modo de Prueba</h3>
                    <div class="grid-auto">
                        ${system.testModes.map(mode => `
                            <div class="selection-box" onclick="App.selectTestMode('${mode.id}')" id="mode-${mode.id}">
                                <div style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1.05rem;">${mode.name}</div>
                                <div style="font-size: 0.9rem; color: var(--text-secondary);">${mode.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card scale-in" style="margin-bottom: 2rem; animation-delay: 0.05s;">
                    <h3 class="text-2xl font-semibold" style="margin-bottom: 1rem;">2. Número de Preguntas</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Selecciona cuántas preguntas quieres responder</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.75rem;">
                        ${[5, 10, 25, 50, 100].map(num => `
                            <div class="selection-box" onclick="App.selectQuestionCount(${num})" id="count-${num}">
                                <div style="font-weight: 600; font-size: 1.5rem; color: var(--accent);">${num}</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">preguntas</div>
                            </div>
                        `).join('')}
                        <div class="selection-box" onclick="App.selectQuestionCount(null)" id="count-unlimited">
                            <div style="font-weight: 600; font-size: 1.25rem; color: var(--accent);">∞</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">ilimitado</div>
                        </div>
                    </div>
                </div>
                
                ${allowIndividualSelection ? `
                <div class="card scale-in" style="margin-bottom: 2rem; animation-delay: 0.1s;">
                    <h3 class="text-2xl font-semibold" style="margin-bottom: 1rem;">3. Modo de Selección</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="selection-box" onclick="App.setSelectionMode('rows')" id="selection-mode-rows">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">Por Grupos</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Seleccionar grupos de letras</div>
                        </div>
                        <div class="selection-box" onclick="App.setSelectionMode('individual')" id="selection-mode-individual">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">Letras Individuales</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Elegir letras específicas</div>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <div class="card scale-in" style="margin-bottom: 2rem; animation-delay: 0.15s;" id="selection-container">
                    <h3 class="text-2xl font-semibold" style="margin-bottom: 1rem;" id="selection-title">${allowIndividualSelection ? '4' : '3'}. Seleccionar Grupos de Caracteres</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Elige qué grupos quieres practicar</p>
                    <div id="rows-selection">
                        <div style="display: grid; gap: 0.75rem;">
                            ${Object.entries(system.rows).map(([rowId, row]) => `
                                <label class="checkbox-container">
                                    <input type="checkbox" class="row-checkbox" data-row="${rowId}" onchange="App.toggleRow('${rowId}')" style="display: none;">
                                    <div class="checkbox" id="checkbox-${rowId}"></div>
                                    <span style="font-weight: 500;">${row.name}</span>
                                </label>
                            `).join('')}
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                            <button class="btn btn-secondary" onclick="App.selectAllRows()" style="flex: 1;">Seleccionar Todos</button>
                            <button class="btn btn-ghost" onclick="App.deselectAllRows()" style="flex: 1;">Deseleccionar Todos</button>
                        </div>
                    </div>
                    
                    ${allowIndividualSelection ? `
                    <div id="individual-selection" style="display: none;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 0.75rem; max-height: 400px; overflow-y: auto; padding: 0.5rem;">
                            ${getAllLettersForSystem(system).map(char => `
                                <div class="selection-box" onclick="App.toggleLetter('${char}')" id="letter-${char.charCodeAt(0)}" 
                                     style="padding: 0.75rem; text-align: center;">
                                    <div style="font-size: 1.5rem; font-weight: 500;">${char}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                            <button class="btn btn-secondary" onclick="App.selectAllLetters()" style="flex: 1;">Seleccionar Todas</button>
                            <button class="btn btn-ghost" onclick="App.deselectAllLetters()" style="flex: 1;">Deseleccionar Todas</button>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <button class="btn btn-primary btn-lg scale-in" id="start-test-btn" onclick="App.startTest()" disabled 
                        style="width: 100%; animation-delay: 0.2s;">
                    Comenzar Prueba
                </button>
            </div>
        </div>
    `;
}

// Obtener todas las letras de un sistema
function getAllLettersForSystem(system) {
    const letters = [];
    for (let rowId in system.rows) {
        const row = system.rows[rowId];
        Object.keys(row.characters).forEach(char => {
            if (!letters.includes(char)) {
                letters.push(char);
            }
        });
    }
    return letters;
}