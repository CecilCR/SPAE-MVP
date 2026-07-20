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
            <h2>5. Vista previa del Examen</h2>
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

        <p><strong>Curso:</strong> ${SPAE.curso.nombre ? "Configurado" : "Pendiente"}</p>

        <p><strong>Evaluación:</strong> ${SPAE.evaluacion.nombre ? "Configurada" : "Pendiente"}</p>

        <p><strong>Preguntas registradas:</strong> ${SPAE.preguntas.length}</p>

        <p><strong>Blueprint:</strong> Automático</p>

        <p><strong>Vista previa:</strong> Automática</p>

        <p><strong>Exportación:</strong> Disponible al finalizar.</p>

    `;

}


/* =====================================================
   CURSO
   ===================================================== */

function renderCurso() {

    return `

        <div class="form-group">
            <label>Nombre del curso</label>
            <input id="cursoNombre" value="${SPAE.curso.nombre}" type="text">
        </div>

        <div class="form-group">
            <label>Programa académico</label>
            <input id="cursoPrograma" value="${SPAE.curso.programa}" type="text">
        </div>

        <div class="form-group">
            <label>Nivel del curso</label>
            <input id="cursoNivel" value="${SPAE.curso.nivel}" type="text">
        </div>

        <div class="form-group">
            <label>Periodo académico</label>
            <input id="cursoPeriodo" value="${SPAE.curso.periodo}" type="text">
        </div>

        <button class="primary-button" onclick="saveCurso()">
            Guardar
        </button>

        ${renderResumenCurso()}

    `;

}


function renderResumenCurso() {

    return `

        <div class="summary">

            <h3>Resumen del Curso</h3>

            <p><strong>Curso:</strong> ${SPAE.curso.nombre || "-"}</p>

            <p><strong>Programa:</strong> ${SPAE.curso.programa || "-"}</p>

            <p><strong>Nivel:</strong> ${SPAE.curso.nivel || "-"}</p>

            <p><strong>Periodo:</strong> ${SPAE.curso.periodo || "-"}</p>

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

            <select id="evaluacionTipo">

                ${renderTipoEvaluacion()}

            </select>

        </div>


        <div class="form-group">
            <label>Tiempo estimado (minutos)</label>
            <input
                id="evaluacionTiempo"
                value="${SPAE.evaluacion.tiempo}"
                type="number">
        </div>


        <div class="form-group">
            <label>Ponderación (%)</label>
            <input
                id="evaluacionPonderacion"
                value="${SPAE.evaluacion.ponderacion}"
                type="number">
        </div>


        <div class="form-group">
            <label>Competencias (una por línea)</label>

            <textarea
                id="competencias"
                rows="5">${SPAE.evaluacion.competencias}</textarea>
        </div>


        <div class="form-group">
            <label>Resultados de aprendizaje (uno por línea)</label>

            <textarea
                id="resultados"
                rows="5">${SPAE.evaluacion.resultados}</textarea>
        </div>


        <button
            class="primary-button"
            onclick="saveEvaluacion()">

            Guardar

        </button>


        ${renderResumenEvaluacion()}

    `;

}


function renderTipoEvaluacion() {

    const opciones = [

        "Examen Parcial",
        "Examen Final",
        "Práctica Calificada",
        "Control de Lectura",
        "Trabajo Aplicado",
        "Caso de Estudio",
        "Evaluación Integradora",
        "Otro"

    ];

    return opciones.map(opcion => {

        const selected =
            SPAE.evaluacion.tipo === opcion
                ? "selected"
                : "";

        return `
            <option ${selected}>
                ${opcion}
            </option>
        `;

    }).join("");

}


function renderResumenEvaluacion() {

    const competencias =
        contarLineas(SPAE.evaluacion.competencias);

    const resultados =
        contarLineas(SPAE.evaluacion.resultados);


    return `

        <div class="summary">

            <h3>Resumen de la Evaluación</h3>

            <p><strong>Nombre:</strong>
            ${SPAE.evaluacion.nombre || "-"}</p>

            <p><strong>Tipo:</strong>
            ${SPAE.evaluacion.tipo || "-"}</p>

            <p><strong>Tiempo estimado:</strong>
            ${SPAE.evaluacion.tiempo || "-"} minutos</p>

            <p><strong>Ponderación:</strong>
            ${SPAE.evaluacion.ponderacion || "-"} %</p>

            <p><strong>Competencias registradas:</strong>
            ${competencias}</p>

            <p><strong>Resultados de aprendizaje registrados:</strong>
            ${resultados}</p>

        </div>

    `;

}


function saveEvaluacion() {

    SPAE.evaluacion.nombre =
        document.getElementById("evaluacionNombre").value.trim();

    SPAE.evaluacion.tipo =
        document.getElementById("evaluacionTipo").value;

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

  const competencias = SPAE.evaluacion.competencias || [];
  const resultados = SPAE.evaluacion.resultados || [];

  return `

    <section class="card">

      <h2>3. Preguntas</h2>

      <p>
      Seleccione la experiencia evaluativa que desea incorporar al instrumento.
      </p>

      <label>Experiencia evaluativa</label>

      <select id="tipoPregunta">

        <option value="opcion_multiple">
        Seleccionar la mejor respuesta
        </option>

        <option value="caso_aplicacion">
        Aplicar conceptos a un contexto profesional
        </option>

        <option value="caso_analisis">
        Analizar una situación y proponer soluciones
        </option>

        <option value="pregunta_abierta">
        Elaborar una respuesta argumentada
        </option>

      </select>

      <div id="formPregunta"></div>

      <br>

      <button onclick="guardarPregunta()">
      Agregar pregunta
      </button>

    </section>

    <section class="card">

      <h2>Preguntas registradas</h2>

      <div id="listaPreguntas">

      ${renderListaPreguntas()}

      </div>

    </section>

  `;

}


/* =====================================================
   FORMULARIOS
===================================================== */


function renderFormularioPregunta() {

  const tipo = document.getElementById("tipoPregunta").value;

  const competencias = SPAE.evaluacion.competencias || [];
  const resultados = SPAE.evaluacion.resultados || [];

  const selectCompetencias = `

      <label>Competencia asociada</label>

      <select id="competenciaPregunta">

      ${competencias.map(c =>
        `<option value="${c}">${c}</option>`
      ).join("")}

      </select>

      <label>Resultado de aprendizaje</label>

      <select id="resultadoPregunta">

      ${resultados.map(r =>
        `<option value="${r}">${r}</option>`
      ).join("")}

      </select>

      <label>Retroalimentación (opcional)</label>

      <textarea id="retroalimentacionPregunta"></textarea>

  `;


  if (tipo === "opcion_multiple") {

    document.getElementById("formPregunta").innerHTML = `

      <label>Enunciado</label>
      <textarea id="enunciado"></textarea>

      <label>Alternativa A</label>
      <input id="altA">

      <label>Alternativa B</label>
      <input id="altB">

      <label>Alternativa C</label>
      <input id="altC">

      <label>Alternativa D</label>
      <input id="altD">

      <label>Respuesta correcta</label>

      <select id="respuestaCorrecta">

        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>

      </select>

      ${selectCompetencias}

    `;

  }


  if (tipo === "caso_aplicacion") {

    document.getElementById("formPregunta").innerHTML = `

      <label>Situación profesional</label>

      <textarea id="situacion"></textarea>

      <label>Pregunta</label>

      <textarea id="pregunta"></textarea>

      ${selectCompetencias}

    `;

  }


  if (tipo === "caso_analisis") {

    document.getElementById("formPregunta").innerHTML = `

      <label>Descripción del caso</label>

      <textarea id="caso"></textarea>

      <label>Preguntas orientadoras
      (una por línea)</label>

      <textarea id="orientadoras"></textarea>

      ${selectCompetencias}

    `;

  }


  if (tipo === "pregunta_abierta") {

    document.getElementById("formPregunta").innerHTML = `

      <label>Pregunta</label>

      <textarea id="preguntaAbierta"></textarea>

      ${selectCompetencias}

    `;

  }

}
if (document.getElementById("tipoPregunta")) {

    renderFormularioPregunta();

    document
        .getElementById("tipoPregunta")
        .addEventListener(
            "change",
            renderFormularioPregunta
        );

}

/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPregunta() {

  const tipo = document.getElementById("tipoPregunta").value;

  const pregunta = {

    id: Date.now(),
    tipo,
    competencia:
      document.getElementById("competenciaPregunta").value,

    resultado:
      document.getElementById("resultadoPregunta").value,

    retroalimentacion:
      document.getElementById("retroalimentacionPregunta").value

  };


  if (tipo === "opcion_multiple") {

    pregunta.enunciado =
      document.getElementById("enunciado").value;

    pregunta.alternativas = [

      document.getElementById("altA").value,
      document.getElementById("altB").value,
      document.getElementById("altC").value,
      document.getElementById("altD").value

    ];

    pregunta.correcta =
      document.getElementById("respuestaCorrecta").value;

  }


  if (tipo === "caso_aplicacion") {

    pregunta.situacion =
      document.getElementById("situacion").value;

    pregunta.pregunta =
      document.getElementById("pregunta").value;

  }


  if (tipo === "caso_analisis") {

    pregunta.caso =
      document.getElementById("caso").value;

    pregunta.orientadoras =
      document.getElementById("orientadoras").value;

  }


  if (tipo === "pregunta_abierta") {

    pregunta.pregunta =
      document.getElementById("preguntaAbierta").value;

  }


  SPAE.preguntas.push(pregunta);

  saveData();
  render();

}


/* =====================================================
   LISTADO DE PREGUNTAS
===================================================== */


function renderListaPreguntas() {

  if (SPAE.preguntas.length === 0) {

    return "<p>No existen preguntas registradas.</p>";

  }


  return SPAE.preguntas.map((p, index) => `

    <div class="card">

      <h3>Pregunta ${index + 1}</h3>

      <p><strong>Tipo:</strong> ${p.tipo}</p>

      <p><strong>Competencia:</strong> ${p.competencia}</p>

      <p><strong>Resultado:</strong> ${p.resultado}</p>

      <button onclick="eliminarPregunta(${p.id})">
      Eliminar
      </button>

    </div>

  `).join("");

}


/* =====================================================
   ELIMINAR PREGUNTA
===================================================== */


function eliminarPregunta(id){

  SPAE.preguntas =
    SPAE.preguntas.filter(p => p.id !== id);

  saveData();
  render();

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

        <p>Se actualizará automáticamente.</p>

    `;

}


/* =====================================================
   VISTA PREVIA
   ===================================================== */

function renderVistaPrevia() {

    return `

        <p>
            El instrumento de evaluación será construido automáticamente.
        </p>

    `;

}


/* =====================================================
   EXPORTACIÓN
   ===================================================== */

function renderExportacion() {

    return `

        <ul>
            <li>HTML</li>
            <li>Word (.docx)</li>
            <li>JSON</li>
        </ul>

    `;

}


/* =====================================================
   UTILIDADES
   ===================================================== */

function contarLineas(texto) {

    if (!texto.trim()) {

        return 0;

    }

    return texto
        .split("\n")
        .filter(linea => linea.trim() !== "")
        .length;

}
