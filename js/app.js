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

    const data =
        localStorage.getItem("SPAE_PROJECT");

    if (data) {

        Object.assign(
            SPAE,
            JSON.parse(data)
        );

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
   CREAR CURSO
   ===================================================== */

function renderCurso(container) {

    container.innerHTML = `

        <h2>Paso 1 - Crear Curso</h2>

        <div class="form-group">

            <label>Nombre del curso</label>

            <input
                type="text"
                id="cursoNombre"
                value="${SPAE.curso.nombre || ""}">

        </div>


        <div class="form-group">

            <label>Programa académico</label>

            <input
                type="text"
                id="cursoPrograma"
                value="${SPAE.curso.programa || ""}">

        </div>


        <div class="form-group">

            <label>Nivel del curso</label>

            <input
                type="text"
                id="cursoNivel"
                value="${SPAE.curso.nivel || ""}">

        </div>


        <div class="form-group">

            <label>Periodo académico</label>

            <input
                type="text"
                id="cursoPeriodo"
                value="${SPAE.curso.periodo || ""}">

        </div>


        <button
            class="secondary-button"
            onclick="saveCurso()">

            Guardar Curso

        </button>


        <button
            class="primary-button"
            onclick="nextStep()">

            Continuar

        </button>

    `;

}


/* =====================================================
   GUARDAR CURSO
   ===================================================== */

function saveCurso() {

    SPAE.curso = {

        nombre:
            document.getElementById("cursoNombre").value.trim(),

        programa:
            document.getElementById("cursoPrograma").value.trim(),

        nivel:
            document.getElementById("cursoNivel").value.trim(),

        periodo:
            document.getElementById("cursoPeriodo").value.trim()

    };


    saveProject();

    alert(
        "La información del curso ha sido guardada correctamente."
    );

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
                Módulo pendiente de implementación.
            </p>

        </div>


        <button
            class="secondary-button"
            onclick="previousStep()">

            Volver

        </button>

    `;

}


/* =====================================================
   PASO 3
   PREGUNTAS
   ===================================================== */

function renderPreguntas(container) {

    container.innerHTML = "<h2>Paso 3 - Preguntas</h2>";

}


/* =====================================================
   PASO 4
   BLUEPRINT
   ===================================================== */

function renderBlueprint(container) {

    container.innerHTML = "<h2>Paso 4 - Blueprint</h2>";

}


/* =====================================================
   PASO 5
   EXAMEN
   ===================================================== */

function renderExamen(container) {

    container.innerHTML = "<h2>Paso 5 - Examen</h2>";

}


/* =====================================================
   PASO 6
   EXPORTACIÓN
   ===================================================== */

function renderExportacion(container) {

    container.innerHTML = "<h2>Paso 6 - Exportación</h2>";

}


/* =====================================================
   NAVEGACIÓN
   ===================================================== */

function nextStep() {

    if (SPAE.currentStep === 1) {

        if (!SPAE.curso.nombre) {

            alert(
                "Debe guardar la información del curso antes de continuar."
            );

            return;

        }

    }


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


/* =====================================================
   REINICIAR PROYECTO
   ===================================================== */

function restartProject() {

    localStorage.removeItem(
        "SPAE_PROJECT"
    );

    location.reload();

}
