/* =====================================================
   SPAE MVP v3.3
   MÓDULO BANCO DE PREGUNTAS
   js/question-bank-module.js
   ===================================================== */

/* =====================================================
   BANCO DE PREGUNTAS
===================================================== */

let BANCO_PREGUNTAS = [];

/* =====================================================
   CARGAR BANCO DESDE JSON
===================================================== */

async function cargarBancoPreguntasJSON(url = "json/banco-preguntas.json") {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        const data = await response.json();
        if (!Array.isArray(data.preguntas)) {
            console.warn("JSON no contiene array de preguntas válido");
            BANCO_PREGUNTAS = [];
            return;
        }
        BANCO_PREGUNTAS = data.preguntas.map(p => migrarPreguntaBanco(p));
        console.log("Banco de preguntas cargado correctamente:", BANCO_PREGUNTAS.length);
    } catch (error) {
        console.error("Error cargando banco de preguntas:", error);
        BANCO_PREGUNTAS = [];
    }
}

/* =====================================================
   MIGRAR PREGUNTA DE BANCO A FORMATO SPAE
===================================================== */

function migrarPreguntaBanco(p) {
    return {
        id: p.id || Date.now().toString(),
        tipo: p.tipo || "opcion_multiple",
        contenido: p.contenido || "",
        alternativas: p.alternativas || [],
        respuestaCorrecta: p.respuestaCorrecta || "",
        contexto: p.contexto || "",
        pregunta: p.pregunta || "",
        nivelCognitivo: p.nivelCognitivo || "ANALIZAR",
        resultadoAprendizaje: p.resultadoAprendizaje || "",
        respuestaEsperada: p.respuestaEsperada || "",
        criterios: p.criterios || "",
        retroalimentacion: p.retroalimentacion || ""
    };
}

/* =====================================================
   IMPORTAR PREGUNTAS AL PROYECTO SPAE
===================================================== */

function importarPreguntasBanco(indices = []) {
    if (!Array.isArray(indices) || indices.length === 0) {
        console.warn("No se seleccionaron preguntas para importar");
        return;
    }

    indices.forEach(i => {
        const pregunta = BANCO_PREGUNTAS[i];
        if (pregunta) {
            // Evitar duplicados por ID
            if (!SPAE.preguntas.some(p => p.id === pregunta.id)) {
                SPAE.preguntas.push({...pregunta});
            }
        }
    });

    actualizarBlueprint();
    guardarSPAE();

    console.log(`${indices.length} preguntas importadas al proyecto SPAE.`);
}

/* =====================================================
   LISTAR PREGUNTAS DEL BANCO
===================================================== */

function listarBancoPreguntas() {
    if (!BANCO_PREGUNTAS || BANCO_PREGUNTAS.length === 0) {
        return `<p>No hay preguntas disponibles en el banco.</p>`;
    }

    return BANCO_PREGUNTAS.map((p, index) => {
        let contenido = p.tipo === "opcion_multiple"
            ? `<strong>Enunciado:</strong> ${p.contenido}<br>
               <strong>Respuesta correcta:</strong> ${p.respuestaCorrecta}`
            : `<strong>Contexto:</strong> ${p.contexto || "-"}<br>
               <strong>Pregunta:</strong> ${p.pregunta || "-"}`;

        return `
        <div class="card">
            <h4>Pregunta ${index + 1}</h4>
            <p><strong>Tipo:</strong> ${nombreTipoPregunta(p.tipo)}</p>
            <p>${contenido}</p>
            <input type="checkbox" id="preguntaBanco_${index}" /> Seleccionar
        </div>
        `;
    }).join("");
}

/* =====================================================
   OBTENER INDICES SELECCIONADOS
===================================================== */

function obtenerIndicesSeleccionadosBanco() {
    const indices = [];
    BANCO_PREGUNTAS.forEach((p, index) => {
        const checkbox = document.getElementById(`preguntaBanco_${index}`);
        if (checkbox && checkbox.checked) indices.push(index);
    });
    return indices;
}

/* =====================================================
   BOTÓN IMPORTAR SELECCIONADAS
===================================================== */

function importarSeleccionadas() {
    const indices = obtenerIndicesSeleccionadosBanco();
    if (indices.length === 0) {
        alert("No se seleccionó ninguna pregunta.");
        return;
    }
    importarPreguntasBanco(indices);
    alert(`${indices.length} preguntas importadas correctamente.`);
    // Actualizar UI del banco
    document.getElementById("listaBancoPreguntas").innerHTML = listarBancoPreguntas();
}

/* =====================================================
   INICIALIZACIÓN BANCO
===================================================== */

async function inicializarBanco() {
    await cargarBancoPreguntasJSON();
    const listaDiv = document.getElementById("listaBancoPreguntas");
    if (listaDiv) {
        listaDiv.innerHTML = listarBancoPreguntas();
    }
}
