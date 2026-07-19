/* =====================================================
   SPAE MVP
   Sistema Profesional de Autoría de Evaluaciones
   ===================================================== */


/* =====================================================
   ESTADO DE LA APLICACIÓN
   ===================================================== */

const SPAE = {

    curso: {
        nombre: ""
    }

};


/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProject();
    renderCurso();

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

        const project = JSON.parse(data);

        Object.assign(
            SPAE,
            project
        );

    }

}


/* =====================================================
   RENDERIZAR CURSO
   ===================================================== */

function renderCurso() {

    const container =
        document.getElementById("content");


    container.innerHTML = `

        <h2>Paso 1 - Crear Curso</h2>

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
