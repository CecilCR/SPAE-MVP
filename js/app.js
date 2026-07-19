/* =====================================================
   SPAE MVP
   Sistema Profesional de Autoría de Evaluaciones
   ===================================================== */


/* =====================================================
   ESTADO DE LA APLICACIÓN
   ===================================================== */

const SPAE = {

    currentStep: 1,

    curso: {},

    evaluacion: {},

    preguntas: [],

    blueprint: {},

    examen: {}

};


/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProject();
    renderStep();

});


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function saveProject() {

    localStorage.setItem(
        "SPAE_PROJECT",
        JSON.stringify(SPAE)
    );

}


function loadProject() {

    const savedProject =
        localStorage.getItem("SPAE_PROJECT");

    if (savedProject) {

        const project =
            JSON.parse(savedProject);

        Object.assign(SPAE, project);

    }

}


/* =====================================================
   RENDERIZADO GENERAL
   ===================================================== */

function renderStep() {

    document.getElementById("current-step").textContent =
        SPAE.currentStep;

    const container =
        document.getElementById("content");


    switch (SPAE.currentStep) {

        case 1:
            renderCurso(container);
            break;

        case 2:
            renderEvaluacion(container);
            break;

        case 3:
            renderPreguntas(container);
            break;

        case 4:
            renderBlueprint(container);
            break;

        case 5:
            renderExamen(container);
            break;

        case 6:
            renderExportacion(container);
            break;

        default:
            SPAE.currentStep = 1;
            renderCurso(container);

    }

}


/* =====================================================
   PASO 1
   CURSO
   ===================================================== */

function renderCurso(container) {

    container.innerHTML = `

        <h2>Paso 1 - Crear Curso</h2>

        <div class="card">

            <p>
                Registre la información general del curso.
            </p>

        </div>

        <button
            class="primary-button"
            onclick="nextStep()">

            Continuar

        </button>

    `;

}


/* =====================================================
   PASO 2
   EVALUACIÓN
   ===================================================== */

function renderEvaluacion(container) {

    container.innerHTML = `

        <h2>Paso 2 - Configurar Evaluación</h2>

        <div class="card">

            <p>
                Configure los datos básicos de la evaluación.
            </p>

        </div>

        <button
            class="secondary-button"
            onclick="previousStep()">

            Volver

        </button>

        <button
            class="primary-button"
            onclick="nextStep()">

            Continuar

        </button>

    `;

}


/* =====================================================
   PASO 3
   PREGUNTAS
   ===================================================== */

function renderPreguntas(container) {

    container.innerHTML = `

        <h2>Paso 3 - Crear Preguntas</h2>

        <div class="card">

            <p>
                Cree las preguntas que formarán parte
                del instrumento de evaluación.
            </p>

        </div>

        <button
            class="secondary-button"
            onclick="previousStep()">

            Volver

        </button>

        <button
            class="primary-button"
            onclick="nextStep()">

            Continuar

        </button>

    `;

}


/* =====================================================
   PASO 4
   BLUEPRINT
   ===================================================== */

function renderBlueprint(container) {

    container.innerHTML = `

        <h2>Paso 4 - Blueprint</h2>

        <div class="card">

            <p>
                El blueprint será generado automáticamente
                a partir de la información registrada.
            </p>

        </div>

        <button
            class="secondary-button"
            onclick="previousStep()">

            Volver

        </button>

        <button
            class="primary-button"
            onclick="nextStep()">

            Continuar

        </button>

    `;

}


/* =====================================================
   PASO 5
   EXAMEN
   ===================================================== */

function renderExamen(container) {

    container.innerHTML = `

        <h2>Paso 5 - Vista Previa del Examen</h2>

        <div class="card">

            <p>
                El examen será construido automáticamente.
            </p>

        </div>

        <button
            class="secondary-button"
            onclick="previousStep()">

            Volver

        </button>

        <button
            class="primary-button"
            onclick="nextStep()">

            Continuar

        </button>

    `;

}


/* =====================================================
   PASO 6
   EXPORTACIÓN
   ===================================================== */

function renderExportacion(container) {

    container.innerHTML = `

        <h2>Paso 6 - Exportación</h2>

        <div class="card">

            <p>
                El MVP permitirá exportar proyectos en
                formato JSON y exámenes en HTML.
            </p>

        </div>

        <button
            class="secondary-button"
            onclick="previousStep()">

            Volver

        </button>

        <button
            class="primary-button"
            onclick="restartProject()">

            Nuevo Proyecto

        </button>

    `;

}


/* =====================================================
   NAVEGACIÓN
   ===================================================== */

function nextStep() {

    if (SPAE.currentStep < 6) {

        SPAE.currentStep++;

        saveProject();

        renderStep();

    }

}


function previousStep() {

    if (SPAE.currentStep > 1) {

        SPAE.currentStep--;

        saveProject();

        renderStep();

    }

}


function restartProject() {

    SPAE.currentStep = 1;

    saveProject();

    renderStep();

}
