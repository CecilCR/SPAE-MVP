/* =====================================================
   SPAE MVP
   ===================================================== */


/* =====================================================
   ESTADO DE LA APLICACIÓN
   ===================================================== */

const SPAE = {

    curso: {
        nombre: ""
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

    const data = localStorage.getItem(
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

    const content =
        document.getElementById("content");


    content.innerHTML = `

        <section class="card">

            <h2>1. Curso</h2>

            ${renderCurso()}

        </section>


        <section class="card">

            <h2>2. Evaluación</h2>

            <p>Pendiente de implementación.</p>

        </section>


        <section class="card">

            <h2>3. Preguntas</h2>

            <p>Pendiente de implementación.</p>

        </section>


        <section class="card">

            <h2>4. Blueprint</h2>

            <p>Se generará automáticamente.</p>

        </section>


        <section class="card">

            <h2>5. Vista Previa del Examen</h2>

            <p>Pendiente de implementación.</p>

        </section>


        <section class="card">

            <h2>6. Exportación</h2>

            <p>Pendiente de implementación.</p>

        </section>

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
                type="text"
                id="cursoNombre"
                value="${SPAE.curso.nombre || ""}"
                placeholder="Ejemplo: Gestión Organizacional">

        </div>


        <button
            class="primary-button"
            onclick="saveCurso()">

            Guardar Curso

        </button>

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


    saveProject();


    alert(
        "Curso guardado correctamente."
    );

}
