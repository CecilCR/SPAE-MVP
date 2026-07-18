/*********************************
SPAE MVP
*********************************/

const SPAE = {

    currentStep: 1,

    curso: {},

    evaluacion: {},

    preguntas: [],

    blueprint: {},

    examen: {}

};


/*********************************
INICIALIZACIÓN
*********************************/

document.addEventListener("DOMContentLoaded", () => {

    loadProject();
    renderStep();

});


/*********************************
LOCAL STORAGE
*********************************/

function saveProject(){

    localStorage.setItem(
        "SPAE_PROJECT",
        JSON.stringify(SPAE)
    );

}


function loadProject(){

    const data = localStorage.getItem("SPAE_PROJECT");

    if(data){

        const project = JSON.parse(data);

        Object.assign(SPAE, project);

    }

}


/*********************************
RENDERIZADO
*********************************/

function renderStep(){

    document.getElementById("current-step").textContent =
    SPAE.currentStep;

    const content =
    document.getElementById("content");


    switch(SPAE.currentStep){

        case 1:
            renderCurso(content);
            break;

        case 2:
            renderEvaluacion(content);
            break;

        case 3:
            renderPreguntas(content);
            break;

        case 4:
            renderBlueprint(content);
            break;

        case 5:
            renderExamen(content);
            break;

        case 6:
            renderExportacion(content);
            break;

    }

}


/*********************************
CURSO
*********************************/

function renderCurso(container){

    container.innerHTML = `

    <h2>Crear Curso</h2>

    <p>Formulario pendiente de implementación.</p>

    <button
        class="primary-button"
        onclick="nextStep()">
        Continuar
    </button>

    `;

}


/*********************************
EVALUACIÓN
*********************************/

function renderEvaluacion(container){

    container.innerHTML = `

    <h2>Configurar Evaluación</h2>

    <p>Formulario pendiente de implementación.</p>

    <button
        class="primary-button"
        onclick="nextStep()">
        Continuar
    </button>

    `;

}


/*********************************
PREGUNTAS
*********************************/

function renderPreguntas(container){

    container.innerHTML = `

    <h2>Preguntas</h2>

    <p>Módulo pendiente de implementación.</p>

    <button
        class="primary-button"
        onclick="nextStep()">
        Continuar
    </button>

    `;

}


/*********************************
BLUEPRINT
*********************************/

function renderBlueprint(container){

    container.innerHTML = `

    <h2>Blueprint</h2>

    <p>Generación automática pendiente.</p>

    <button
        class="primary-button"
        onclick="nextStep()">
        Continuar
    </button>

    `;

}


/*********************************
EXAMEN
*********************************/

function renderExamen(container){

    container.innerHTML = `

    <h2>Vista Previa del Examen</h2>

    <p>Construcción automática pendiente.</p>

    <button
        class="primary-button"
        onclick="nextStep()">
        Continuar
    </button>

    `;

}


/*********************************
EXPORTACIÓN
*********************************/

function renderExportacion(container){

    container.innerHTML = `

    <h2>Exportación</h2>

    <p>HTML y JSON pendientes de implementación.</p>

    <button
        class="secondary-button"
        onclick="restartWizard()">
        Nuevo Proyecto
    </button>

    `;

}


/*********************************
NAVEGACIÓN
*********************************/

function nextStep(){

    if(SPAE.currentStep < 6){

        SPAE.currentStep++;

        saveProject();

        renderStep();

    }

}


function restartWizard(){

    SPAE.currentStep = 1;

    saveProject();

    renderStep();

}
