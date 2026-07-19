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

    const data =
        localStorage.getItem(
            "SPAE_PROJECT"
        );

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

    const container =
        document.getElementById(
            "content"
        );


    container.innerHTML = `

        <section class="card">

            <h2>1. Curso</h2>

            ${renderCurso()}

        </section>


        <section class="card">

            <h2>2. Evaluación</h2>

            <div class="notice">
                <p>
                    Módulo pendiente de implementación.
                </p>
            </div>

        </section>


        <section class="card">

            <h2>3. Preguntas</h2>

            <div class="notice">
                <p>
                    Módulo pendiente de implementación.
                </p>
            </div>

        </section>


        <section class="card">

            <h2>4. Blueprint</h2>

            <div class="notice">
                <p>
                    El Blueprint pedagógico será generado automáticamente.
                </p>
            </div>

        </section>


        <section class="card">

            <h2>5. Vista Previa del Examen</h2>

            <div class="notice">
                <p>
                    La vista previa del examen será construida automáticamente.
                </p>
            </div>

        </section>


        <section class="card">

            <h2>6. Exportación</h2>

            <div class="notice">
                <p>
                    Los formatos HTML, Word y JSON estarán disponibles
                    al finalizar la construcción del instrumento.
                </p>
            </div>

        </section>

    `;

}


/* =====================================================
   MÓDULO CURSO
   ===================================================== */

function renderCurso() {

    return `

        <div class="form-group">

            <label>Nombre del curso</label>

            <input
                type="text"
                id="cursoNombre"
                value="${SPAE.curso.nombre}"
                placeholder="Ejemplo: Liderazgo Organizacional">

        </div>


        <div class="form-group">

            <label>Programa académico</label>

            <input
                type="text"
                id="cursoPrograma"
                value="${SPAE.curso.programa}"
                placeholder="Ejemplo: Administración de Empresas">

        </div>


        <div class="form-group">

            <label>Nivel del curso</label>

            <input
                type="text"
                id="cursoNivel"
                value="${SPAE.curso.nivel}"
                placeholder="Ejemplo: Media Carrera">

        </div>


        <div class="form-group">

            <label>Periodo académico</label>

            <input
                type="text"
                id="cursoPeriodo"
                value="${SPAE.curso.periodo}"
                placeholder="Ejemplo: 2026-01">

        </div>


        <button
            class="primary-button"
            onclick="saveCurso()">

            Guardar

        </button>


        ${renderResumenCurso()}

    `;

}


/* =====================================================
   RESUMEN DEL CURSO
   ===================================================== */

function renderResumenCurso() {

    return `

        <div class="summary">

            <h3>Resumen del Curso</h3>

            <p>
                <strong>Curso:</strong>
                ${SPAE.curso.nombre || "-"}
            </p>

            <p>
                <strong>Programa:</strong>
                ${SPAE.curso.programa || "-"}
            </p>

            <p>
                <strong>Nivel:</strong>
                ${SPAE.curso.nivel || "-"}
            </p>

            <p>
                <strong>Periodo:</strong>
                ${SPAE.curso.periodo || "-"}
            </p>

        </div>

    `;

}


/* =====================================================
   GUARDAR CURSO
   ===================================================== */

function saveCurso() {

    SPAE.curso.nombre =
        document
            .getElementById("cursoNombre")
            .value
            .trim();


    SPAE.curso.programa =
        document
            .getElementById("cursoPrograma")
            .value
            .trim();


    SPAE.curso.nivel =
        document
            .getElementById("cursoNivel")
            .value
            .trim();


    SPAE.curso.periodo =
        document
            .getElementById("cursoPeriodo")
            .value
            .trim();


    saveProject();


    renderApp();


    alert(
        "La información del curso se ha guardado correctamente."
    );

}
