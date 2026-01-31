function renderSetupScreen(systemId) {
    const system = getWritingSystem(systemId);
    if (!system) return '<div>Error: System not found</div>';

    // Valor actual de cantidad de preguntas (0 = All)
    const currentNum = (typeof App !== 'undefined' && App.state && typeof App.state.selectedNumQuestions !== 'undefined')
        ? App.state.selectedNumQuestions
        : 20;

    const rangeDisabled = currentNum === 0 ? 'disabled' : '';
    const allChecked = currentNum === 0 ? 'checked' : '';

    return `
        <div class="container" style="padding-top: 2rem; padding-bottom: 3rem;">
            <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
                <!-- Back Button -->
                <button class="btn btn-secondary" 
                        onclick="App.goHome()"
                        style="margin-bottom: 2rem;">
                    ← Vuelve al inicio
                </button>
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">
                        ${getSystemIcon(systemId)}
                    </div>
                    <h2 class="text-3xl font-bold" style="margin-bottom: 0.5rem;">
                        ${system.name}
                    </h2>
                    <p style="color: var(--text-secondary);">
                        ${system.description}
                    </p>
                </div>
                
                <!-- Test Mode Selection -->
                <div class="card scale-in" style="margin-bottom: 2rem; animation-delay: 0.1s;">
                    <h3 class="text-xl font-semibold" style="margin-bottom: 1rem;">
                        1. Elige el tipo de test
                    </h3>
                    <div class="grid-auto">
                        <div class="card-clickable" 
                             onclick="App.selectTestMode('letter-to-romaji')"
                             id="mode-letter-to-romaji"
                             style="padding: 1rem; border: 2px solid var(--border); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Letra → Transcripción
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-secondary);">
                                Mira una letra y escribe como se lee
                            </div>
                        </div>
                        
                        <div class="card-clickable" 
                             onclick="App.selectTestMode('romaji-to-letter')"
                             id="mode-romaji-to-letter"
                             style="padding: 1rem; border: 2px solid var(--border); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Transcripción → Letra
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-secondary);">
                                Ve como se lee y escribe la letra
                            </div>
                        </div>
                        
                        <div class="card-clickable" 
                             onclick="App.selectTestMode('word-to-romaji')"
                             id="mode-word-to-romaji"
                             style="padding: 1rem; border: 2px solid var(--border); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Palabra → Transcripción
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-secondary);">
                                Deletrea las palabras en su transcripción
                            </div>
                        </div>
                        
                        <div class="card-clickable" 
                             onclick="App.selectTestMode('romaji-to-word')"
                             id="mode-romaji-to-word"
                             style="padding: 1rem; border: 2px solid var(--border); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Transcripción → Palabra
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-secondary);">
                                Escribe las palabras en su sistema de escritura
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Row Selection -->
                <div class="card scale-in" style="margin-bottom: 2rem; animation-delay: 0.2s;">
                    <h3 class="text-xl font-semibold" style="margin-bottom: 1rem;">
                        2. Selecciona secciones de letras
                    </h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
                        Elige el grupo de letras con el que vas a practicar
                    </p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                        ${Object.entries(system.rows).map(([rowId, row]) => `
                            <label class="checkbox-container" style="flex: 1 1 200px; padding: 0.75rem; border: 2px solid var(--border); border-radius: 0.5rem;">
                                <input type="checkbox" 
                                       class="row-checkbox" 
                                       data-row="${rowId}" 
                                       onchange="App.toggleRow('${rowId}')" 
                                       style="display: none;">
                                <div class="checkbox" id="checkbox-${rowId}"></div>
                                <span style="font-weight: 500; font-size: 0.875rem;">
                                    ${row.name}
                                </span>
                            </label>
                        `).join('')}
                    </div>
                    <button class="btn btn-secondary" 
                            onclick="App.selectAllRows()"
                            style="width: 100%; margin-top: 1rem;">
                        Selecciona todo
                    </button>
                </div>

                <!-- Duration / Number of Questions -->
                <div class="card scale-in" style="margin-bottom: 1.5rem; animation-delay: 0.25s;">
                    <h3 class="text-xl font-semibold" style="margin-bottom: 0.75rem;">
                        3. Duración del test — cantidad de preguntas
                    </h3>
                    <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
                        <input id="num-questions-range" type="range" min="5" max="200" step="1" value="${currentNum === 0 ? 20 : currentNum}"
                               oninput="document.getElementById('num-q-display').innerText=this.value; App.state.selectedNumQuestions=parseInt(this.value); document.getElementById('num-q-all').checked=false;"
                               ${rangeDisabled}
                               style="flex:1;">
                        <div style="min-width:4rem; text-align:center; font-weight:600;">
                            <span id="num-q-display">${currentNum === 0 ? 'All' : currentNum}</span>
                        </div>

                        <label style="margin-left:auto; display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                            <input id="num-q-all" type="checkbox" ${allChecked}
                                   onchange="if(this.checked){document.getElementById('num-questions-range').disabled=true; document.getElementById('num-q-display').innerText='All'; App.state.selectedNumQuestions=0;}else{document.getElementById('num-questions-range').disabled=false; document.getElementById('num-q-display').innerText=document.getElementById('num-questions-range').value; App.state.selectedNumQuestions=parseInt(document.getElementById('num-questions-range').value);}">
                            <span style="font-weight:500; font-size:0.9rem;">Todas las preguntas</span>
                        </label>
                    </div>

                    <div style="margin-top:0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('num-questions-range').value=5; document.getElementById('num-questions-range').dispatchEvent(new Event('input'));">5</button>
                        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('num-questions-range').value=10; document.getElementById('num-questions-range').dispatchEvent(new Event('input'));">10</button>
                        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('num-questions-range').value=20; document.getElementById('num-questions-range').dispatchEvent(new Event('input'));">20</button>
                        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('num-questions-range').value=50; document.getElementById('num-questions-range').dispatchEvent(new Event('input'));">50</button>
                    </div>

                    <p style="color: var(--text-secondary); margin-top:0.75rem; font-size: 0.875rem;">
                        Selecciona cuántas preguntas quieres en este test. Marca "Todas las preguntas" para preguntas infinitas.
                    </p>
                </div>
                
                <!-- Start Button -->
                <button class="btn btn-primary scale-in" 
                        id="start-test-btn"
                        onclick="App.startTest()"
                        disabled
                        style="width: 100%; padding: 1rem; font-size: 1.125rem; animation-delay: 0.3s;">
                    Empezar test
                </button>
            </div>
        </div>
    `;
}