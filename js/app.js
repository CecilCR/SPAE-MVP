/* =====================================================
   SPAE MVP
   Sistema Profesional de Autoría de Evaluaciones
   ===================================================== */


/* =====================================================
   ESTADO DE LA APLICACIÓN
   ===================================================== */

const SPAE = {

    curso: {
        nombre: "",
        programa: "",
        nivel: "",
        periodo: ""
    },

    evaluacion: {
        nombre: "",
        tipo: "",
        tiempo: "",
        ponderacion: "",
        competencias: "",
        resultados: ""
    },

    preguntas: [],

    blueprint: {},

    examen: {}

};


/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProject();
    renderApp();

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

    const data = localStorage.getItem("SPAE_PROJECT");

    if (data) {

        Object.assign(
            SPAE,
            JSON.parse(data)
        );

    }

}


/* =====================================================
   RENDER PRINCIPAL
   ===================================================== */

function renderApp() {

    const container = document.getElementById("content");


    container.innerHTML = `

        <section class="card">
            <h2>Estado del Instrumento</h2>
            ${renderEstadoInstrumento()}
        </section>

        <section class="card">
            <h2>1. Curso</h2>
            ${renderCurso()}
        </section>

        <section class="card">
            <h2>2. Evaluación</h2>
            ${renderEvaluacion()}
        </section>

        <section class="card">
            <h2>3. Preguntas</h2>
            ${renderPreguntas()}
        </section>

        <section class="card">
            <h2>4. Blueprint</h2>
            ${renderBlueprint()}
        </section>

        <section class="card">
            <h2>5. Vista Previa del Examen</h2>
            ${renderVistaPrevia()}
        </section>

        <section class="card">
            <h2>6. Exportación</h2>
            ${renderExportacion()}
        </section>

    `;

}


/* =====================================================
   ESTADO DEL INSTRUMENTO
   ===================================================== */

function renderEstadoInstrumento() {

    return `

        <p><strong>Curso:</strong>
        ${SPAE.curso.nombre ? "Configurado" : "Pendiente"}</p>

        <p><strong>Evaluación:</strong>
        ${SPAE.evaluacion.nombre ? "Configurada" : "Pendiente"}</p>

        <p><strong>Preguntas:</strong>
        ${SPAE.preguntas.length} registradas</p>

        <p><strong>Blueprint:</strong>
        Automático</p>

        <p><strong>Vista previa:</strong>
        Automática</p>

        <p><strong>Exportación:</strong>
        Disponible al finalizar.</p>

    `;

}


/* =====================================================
   CURSO
   ===================================================== */

function renderCurso() {

    return `

        <div class="form-group">
            <label>Nombre del curso</label>
            <input
                id="cursoNombre"
                value="${SPAE.curso.nombre}"
                type="text">
        </div>

        <div class="form-group">
            <label>Programa académico</label>
            <input
                id="cursoPrograma"
                value="${SPAE.curso.programa}"
                type="text">
        </div>

        <div class="form-group">
            <label>Nivel del curso</label>
            <input
                id="cursoNivel"
                value="${SPAE.curso.nivel}"
                type="text">
        </div>

        <div class="form-group">
            <label>Periodo académico</label>
            <input
                id="cursoPeriodo"
                value="${SPAE.curso.periodo}"
                type="text">
        </div>

        <button
            class="primary-button"
            onclick="saveCurso()">

            Guardar

        </button>

        ${renderResumenCurso()}

    `;

}


function renderResumenCurso() {

    return `

        <div class="summary">

            <h3>Resumen del Curso</h3>

            <p><strong>Curso:</strong>
            ${SPAE.curso.nombre || "-"}</p>

            <p><strong>Programa:</strong>
            ${SPAE.curso.programa || "-"}</p>

            <p><strong>Nivel:</strong>
            ${SPAE.curso.nivel || "-"}</p>

            <p><strong>Periodo:</strong>
            ${SPAE.curso.periodo || "-"}</p>

        </div>

    `;

}


function saveCurso() {

    SPAE.curso.nombre =
        document.getElementById("cursoNombre").value.trim();

    SPAE.curso.programa =
        document.getElementById("cursoPrograma").value.trim();

    SPAE.curso.nivel =
        document.getElementById("cursoNivel").value.trim();

    SPAE.curso.periodo =
        document.getElementById("cursoPeriodo").value.trim();

    saveProject();
    renderApp();

}


/* =====================================================
   EVALUACIÓN
   ===================================================== */

function renderEvaluacion() {

    return `

        <div class="form-group">
            <label>Nombre de la evaluación</label>
            <input
                id="evaluacionNombre"
                value="${SPAE.evaluacion.nombre}"
                type="text">
        </div>

        <div class="form-group">
            <label>Tipo de evaluación</label>
            <input
                id="evaluacionTipo"
                value="${SPAE.evaluacion.tipo}"
                type="text">
        </div>

        <div class="form-group">
            <label>Tiempo estimado</label>
            <input
                id="evaluacionTiempo"
                value="${SPAE.evaluacion.tiempo}"
                type="text">
        </div>

        <div class="form-group">
            <label>Ponderación</label>
            <input
                id="evaluacionPonderacion"
                value="${SPAE.evaluacion.ponderacion}"
                type="text">
        </div>

        <div class="form-group">
            <label>Competencias</label>
            <textarea
                id="competencias"
                rows="4">${SPAE.evaluacion.competencias}</textarea>
        </div>

        <div class="form-group">
            <label>Resultados de aprendizaje</label>
            <textarea
                id="resultados"
                rows="4">${SPAE.evaluacion.resultados}</textarea>
        </div>

        <button
            class="primary-button"
            onclick="saveEvaluacion()">

            Guardar

        </button>

        ${renderResumenEvaluacion()}

    `;

}


function renderResumenEvaluacion() {

    return `

        <div class="summary">

            <h3>Resumen de la Evaluación</h3>

            <p><strong>Nombre:</strong>
            ${SPAE.evaluacion.nombre || "-"}</p>

            <p><strong>Tipo:</strong>
            ${SPAE.evaluacion.tipo || "-"}</p>

            <p><strong>Tiempo:</strong>
            ${SPAE.evaluacion.tiempo || "-"}</p>

            <p><strong>Ponderación:</strong>
            ${SPAE.evaluacion.ponderacion || "-"}</p>

        </div>

    `;

}


function saveEvaluacion() {

    SPAE.evaluacion.nombre =
        document.getElementById("evaluacionNombre").value.trim();

    SPAE.evaluacion.tipo =
        document.getElementById("evaluacionTipo").value.trim();

    SPAE.evaluacion.tiempo =
        document.getElementById("evaluacionTiempo").value.trim();

    SPAE.evaluacion.ponderacion =
        document.getElementById("evaluacionPonderacion").value.trim();

    SPAE.evaluacion.competencias =
        document.getElementById("competencias").value.trim();

    SPAE.evaluacion.resultados =
        document.getElementById("resultados").value.trim();

    saveProject();
    renderApp();

}


/* =====================================================
   PREGUNTAS
   ===================================================== */

function renderPreguntas() {

    return `

        <p>
            Las preguntas podrán incorporarse mediante:
        </p>

        <ul>
            <li>Crear pregunta.</li>
            <li>Importar Word (.docx).</li>
            <li>Importar JSON.</li>
        </ul>

        <p>
            Funcionalidad en desarrollo para el MVP.
        </p>

    `;

}


/* =====================================================
   BLUEPRINT
   ===================================================== */

function renderBlueprint() {

    return `

        <p><strong>Curso:</strong>
        ${SPAE.curso.nombre || "-"}</p>

        <p><strong>Evaluación:</strong>
        ${SPAE.evaluacion.nombre || "-"}</p>

        <p><strong>Total de preguntas:</strong>
        ${SPAE.preguntas.length}</p>

        <p>
            El Blueprint pedagógico será actualizado automáticamente.
        </p>

    `;

}


/* =====================================================
   VISTA PREVIA DEL EXAMEN
   ===================================================== */

function renderVistaPrevia() {

    return `

        <p>
            La vista previa del instrumento será construida automáticamente.
        </p>

    `;

}


/* =====================================================
   EXPORTACIÓN
   ===================================================== */

function renderExportacion() {

    return `

        <p>Formatos previstos para el MVP:</p>

        <ul>
            <li>HTML</li>
            <li>Word (.docx)</li>
            <li>JSON</li>
        </ul>

    `;

}
