/* =====================================================
   SPAE MVP
   SISTEMA PROFESIONAL DE AUTORÍA DE EVALUACIONES

   MÓDULO 0
   CONFIGURACIÓN + ESTADO + PERSISTENCIA
===================================================== */


/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */

const SPAE_CONFIG = {

    nombre: "SPAE MVP",

    version: "R0.1",

    almacenamiento:
        "SPAE_PROJECT"

};



/* =====================================================
   ESTADO PRINCIPAL DE LA APLICACIÓN
===================================================== */


let SPAE = {


    /* -----------------------------
       DATOS DEL CURSO
    ----------------------------- */

    curso: {

        nombre: "",

        programa: "",

        nivel: "",

        periodo: ""

    },


    /* -----------------------------
       DATOS DE LA EVALUACIÓN
    ----------------------------- */

    evaluacion: {

        nombre: "",

        tipo: "",

        tiempo: "",

        ponderacion: "",

        competencias: "",

        resultados: ""

    },


    /* -----------------------------
       BANCO DE PREGUNTAS
    ----------------------------- */

    preguntas: [],



    /* -----------------------------
       CONFIGURACIÓN BLUEPRINT
    ----------------------------- */

    blueprint: {

        preguntasMCQ: 0,

        casos: 0,

        abiertas: 0

    },


    /* -----------------------------
       ESTADO DE NAVEGACIÓN
    ----------------------------- */

    vistaActual: "curso"


};



/* =====================================================
   PERSISTENCIA LOCAL
===================================================== */


/**
 * Guarda el proyecto completo
 */

function saveProject(){


    localStorage.setItem(

        SPAE_CONFIG.almacenamiento,

        JSON.stringify(SPAE)

    );


}



/**
 * Recupera proyecto guardado
 */

function loadProject(){


    const datos =

        localStorage.getItem(

            SPAE_CONFIG.almacenamiento

        );



    if(datos){


        SPAE = JSON.parse(datos);


    }


}



/**
 * Reinicia proyecto
 */

function resetProject(){


    localStorage.removeItem(

        SPAE_CONFIG.almacenamiento

    );



    location.reload();


}



/* =====================================================
   UTILIDADES GENERALES
===================================================== */


/**
 * Genera identificadores únicos
 */

function generateID(){


    return Date.now();



}



/**
 * Sanitización básica de texto
 */

function cleanText(texto){


    if(!texto){

        return "";

    }


    return texto.trim();



}



/* =====================================================
   CARGA INICIAL DEL SISTEMA
===================================================== */


loadProject();
/* =====================================================
   SPAE MVP

   MÓDULO 1
   MOTOR DE APLICACIÓN
===================================================== */


/* =====================================================
   NAVEGACIÓN PRINCIPAL
===================================================== */


function cambiarVista(vista){


    SPAE.vistaActual = vista;


    renderApp();


}



/* =====================================================
   MENÚ PRINCIPAL
===================================================== */


function renderMenu(){


return `

<nav class="spae-menu">


<button 
onclick="cambiarVista('curso')">

1. Curso

</button>



<button 
onclick="cambiarVista('evaluacion')">

2. Evaluación

</button>



<button 
onclick="cambiarVista('preguntas')">

3. Preguntas

</button>



<button 
onclick="cambiarVista('blueprint')">

4. Blueprint

</button>



<button 
onclick="cambiarVista('preview')">

5. Vista previa

</button>



<button 
onclick="cambiarVista('exportacion')">

6. Exportar

</button>


</nav>


`;

}



/* =====================================================
   MOTOR PRINCIPAL DE RENDERIZADO
===================================================== */


function renderApp(){



const app =

document.getElementById("app");



if(!app){


console.error(

"SPAE: No existe contenedor #app"

);


return;


}




let contenido = "";




switch(SPAE.vistaActual){



case "curso":


contenido = renderCurso();


break;



case "evaluacion":


contenido = renderEvaluacion();


break;



case "preguntas":


contenido = renderPreguntas();


break;



case "blueprint":


contenido = renderBlueprint();


break;



case "preview":


contenido = renderPreview();


break;



case "exportacion":


contenido = renderExportacion();


break;



default:


contenido = `

<section class="card">

<h2>SPAE MVP</h2>

<p>
Seleccione un módulo.
</p>

</section>

`;



}




app.innerHTML = `


<header class="spae-header">


<h1>
SPAE MVP
</h1>


<p>
Sistema Profesional de Autoría de Evaluaciones
</p>


</header>



${renderMenu()}



<main class="spae-container">


${contenido}


</main>



`;



}




/* =====================================================
   MENSAJE DE INICIO
===================================================== */


function iniciarSPAE(){


console.log(

"SPAE MVP cargado correctamente"

);



renderApp();



}



/* =====================================================
   INICIALIZACIÓN DEL SISTEMA
===================================================== */


document.addEventListener(

"DOMContentLoaded",

iniciarSPAE

);
/* =====================================================
   SPAE MVP

   MÓDULO 2
   CURSO
===================================================== */


/* =====================================================
   VISTA CURSO
===================================================== */


function renderCurso(){


return `


<section class="card">


<h2>
1. Curso
</h2>



<label>
Nombre del curso
</label>


<input

id="cursoNombre"

value="${SPAE.curso.nombre}"

placeholder="Ejemplo: Liderazgo">


<label>
Programa académico
</label>


<input

id="cursoPrograma"

value="${SPAE.curso.programa}"

placeholder="Ejemplo: Administración">



<label>
Nivel del curso
</label>


<input

id="cursoNivel"

value="${SPAE.curso.nivel}"

placeholder="Ejemplo: 7 ciclo">



<label>
Periodo académico
</label>


<input

id="cursoPeriodo"

value="${SPAE.curso.periodo}"

placeholder="Ejemplo: 2026 I">



<br>


<button onclick="guardarCurso()">

Guardar

</button>



</section>




<section class="card">


<h2>
Resumen del Curso
</h2>



<p>
<strong>
Curso:
</strong>

${SPAE.curso.nombre || "-"}

</p>



<p>
<strong>
Programa:
</strong>

${SPAE.curso.programa || "-"}

</p>



<p>
<strong>
Nivel:
</strong>

${SPAE.curso.nivel || "-"}

</p>



<p>
<strong>
Periodo:
</strong>

${SPAE.curso.periodo || "-"}

</p>



</section>


`;

}



/* =====================================================
   GUARDAR CURSO
===================================================== */


function guardarCurso(){



SPAE.curso.nombre =

cleanText(

document.getElementById(
"cursoNombre"
).value

);



SPAE.curso.programa =

cleanText(

document.getElementById(
"cursoPrograma"
).value

);



SPAE.curso.nivel =

cleanText(

document.getElementById(
"cursoNivel"
).value

);



SPAE.curso.periodo =

cleanText(

document.getElementById(
"cursoPeriodo"
).value

);



saveProject();



alert(

"Curso guardado correctamente."

);



renderApp();



}
/* =====================================================
   SPAE MVP

   MÓDULO 3
   EVALUACIÓN
===================================================== */


/* =====================================================
   VISTA EVALUACIÓN
===================================================== */


function renderEvaluacion(){


return `


<section class="card">


<h2>
2. Evaluación
</h2>



<label>
Nombre de la evaluación
</label>


<input

id="evaluacionNombre"

value="${SPAE.evaluacion.nombre}"

placeholder="Ejemplo: Examen Final">



<label>
Tipo de evaluación
</label>


<select id="evaluacionTipo">


<option value="Examen Parcial"
${SPAE.evaluacion.tipo==="Examen Parcial"?"selected":""}>

Examen Parcial

</option>


<option value="Examen Final"
${SPAE.evaluacion.tipo==="Examen Final"?"selected":""}>

Examen Final

</option>


<option value="Trabajo Aplicativo"
${SPAE.evaluacion.tipo==="Trabajo Aplicativo"?"selected":""}>

Trabajo Aplicativo

</option>


<option value="Proyecto"
${SPAE.evaluacion.tipo==="Proyecto"?"selected":""}>

Proyecto

</option>


</select>




<label>
Tiempo estimado (minutos)
</label>


<input

type="number"

id="evaluacionTiempo"

value="${SPAE.evaluacion.tiempo}"

placeholder="Ejemplo: 120">





<label>
Ponderación (%)
</label>


<input

type="number"

id="evaluacionPonderacion"

value="${SPAE.evaluacion.ponderacion}"

placeholder="Ejemplo: 20">





<label>
Competencias
</label>


<textarea

id="evaluacionCompetencias"

placeholder="Una competencia por línea">${SPAE.evaluacion.competencias}</textarea>





<label>
Resultados de aprendizaje
</label>


<textarea

id="evaluacionResultados"

placeholder="Un resultado por línea">${SPAE.evaluacion.resultados}</textarea>





<br>


<button onclick="guardarEvaluacion()">

Guardar

</button>



</section>





<section class="card">


<h2>
Resumen de la Evaluación
</h2>



<p>

<strong>
Nombre:
</strong>

${SPAE.evaluacion.nombre || "-"}

</p>




<p>

<strong>
Tipo:
</strong>

${SPAE.evaluacion.tipo || "-"}

</p>




<p>

<strong>
Tiempo estimado:
</strong>

${SPAE.evaluacion.tiempo || "-"} minutos

</p>




<p>

<strong>
Ponderación:
</strong>

${SPAE.evaluacion.ponderacion || "-"} %

</p>




<p>

<strong>
Competencias registradas:
</strong>

${contarLineas(
SPAE.evaluacion.competencias
)}

</p>




<p>

<strong>
Resultados de aprendizaje registrados:
</strong>

${contarLineas(
SPAE.evaluacion.resultados
)}

</p>



</section>


`;

}



/* =====================================================
   GUARDAR EVALUACIÓN
===================================================== */


function guardarEvaluacion(){



SPAE.evaluacion.nombre =

cleanText(

document.getElementById(
"evaluacionNombre"
).value

);



SPAE.evaluacion.tipo =

document.getElementById(
"evaluacionTipo"
).value;





SPAE.evaluacion.tiempo =

cleanText(

document.getElementById(
"evaluacionTiempo"
).value

);





SPAE.evaluacion.ponderacion =

cleanText(

document.getElementById(
"evaluacionPonderacion"
).value

);





SPAE.evaluacion.competencias =

cleanText(

document.getElementById(
"evaluacionCompetencias"
).value

);





SPAE.evaluacion.resultados =

cleanText(

document.getElementById(
"evaluacionResultados"
).value

);





saveProject();



alert(

"Evaluación guardada correctamente."

);



renderApp();



}



/* =====================================================
   UTILIDAD
===================================================== */


function contarLineas(texto){


if(!texto){

return 0;

}


return texto

.split("\n")

.filter(

linea => linea.trim() !== ""

)

.length;


}
/* =====================================================
   SPAE MVP

   MÓDULO 4
   PREGUNTAS
===================================================== */


/* =====================================================
   VISTA PRINCIPAL PREGUNTAS
===================================================== */


function renderPreguntas(){


return `


<section class="card">


<h2>
3. Preguntas
</h2>


<p>
Construya las preguntas considerando la experiencia
evaluativa que desea desarrollar.
</p>



<label>
Tipo de pregunta
</label>


<select id="tipoPregunta"
onchange="renderFormularioPregunta()">


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



<div id="formPregunta">

</div>



<br>


<button onclick="guardarPregunta()">

Agregar pregunta

</button>



</section>





<section class="card">


<h2>
Preguntas registradas
</h2>


${renderListaPreguntas()}


</section>


`;

}



/* =====================================================
   FORMULARIO DINÁMICO
===================================================== */


function renderFormularioPregunta(){


const contenedor =

document.getElementById(
"formPregunta"
);



if(!contenedor){

return;

}



const competencias =

SPAE.evaluacion.competencias

?

SPAE.evaluacion.competencias
.split("\n")
.filter(x=>x.trim())

:

[];




const resultados =

SPAE.evaluacion.resultados

?

SPAE.evaluacion.resultados
.split("\n")
.filter(x=>x.trim())

:

[];




const relaciones = `


<label>
Competencia asociada
</label>


<select id="preguntaCompetencia">


${competencias.map(c=>`

<option value="${c}">
${c}
</option>

`).join("")}


</select>



<label>
Resultado de aprendizaje
</label>


<select id="preguntaResultado">


${resultados.map(r=>`

<option value="${r}">
${r}
</option>

`).join("")}


</select>



<label>
Retroalimentación
</label>


<textarea
id="preguntaRetroalimentacion">
</textarea>


`;



const tipo =

document.getElementById(
"tipoPregunta"
).value;




switch(tipo){



case "opcion_multiple":


contenedor.innerHTML = `


<label>
Enunciado
</label>


<textarea id="preguntaTexto">

</textarea>




<label>
Alternativa A
</label>

<input id="altA">



<label>
Alternativa B
</label>

<input id="altB">



<label>
Alternativa C
</label>

<input id="altC">



<label>
Alternativa D
</label>

<input id="altD">



<label>
Respuesta correcta
</label>


<select id="respuestaCorrecta">

<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>

</select>



${relaciones}


`;


break;




case "caso_aplicacion":


contenedor.innerHTML = `


<label>
Situación profesional
</label>


<textarea id="casoSituacion">

</textarea>




<label>
Pregunta de aplicación
</label>


<textarea id="casoPregunta">

</textarea>



${relaciones}


`;


break;




case "caso_analisis":


contenedor.innerHTML = `


<label>
Situación o problema organizacional
</label>


<textarea id="analisisSituacion">

</textarea>



<label>
Preguntas orientadoras
</label>


<textarea id="analisisPreguntas">

</textarea>



${relaciones}


`;


break;




case "pregunta_abierta":


contenedor.innerHTML = `


<label>
Pregunta abierta
</label>


<textarea id="abiertaPregunta">

</textarea>



<label>
Criterio esperado de respuesta
</label>


<textarea id="abiertaCriterio">

</textarea>



${relaciones}


`;


break;


}



}



/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPregunta(){



const tipo =

document.getElementById(
"tipoPregunta"
).value;




let pregunta = {


id:

generateID(),


tipo:


tipo,


competencia:

document.getElementById(
"preguntaCompetencia"
).value,


resultado:

document.getElementById(
"preguntaResultado"
).value,


retroalimentacion:

document.getElementById(
"preguntaRetroalimentacion"
).value


};





if(tipo==="opcion_multiple"){


pregunta.contenido =

document.getElementById(
"preguntaTexto"
).value;



pregunta.alternativas=[


document.getElementById("altA").value,


document.getElementById("altB").value,


document.getElementById("altC").value,


document.getElementById("altD").value


];



pregunta.respuestaCorrecta =

document.getElementById(
"respuestaCorrecta"
).value;


}




if(tipo==="caso_aplicacion"){


pregunta.situacion =

document.getElementById(
"casoSituacion"
).value;



pregunta.pregunta =

document.getElementById(
"casoPregunta"
).value;


}





if(tipo==="caso_analisis"){


pregunta.situacion =

document.getElementById(
"analisisSituacion"
).value;



pregunta.preguntas =

document.getElementById(
"analisisPreguntas"
).value;


}





if(tipo==="pregunta_abierta"){


pregunta.contenido =

document.getElementById(
"abiertaPregunta"
).value;



pregunta.criterio =

document.getElementById(
"abiertaCriterio"
).value;


}





SPAE.preguntas.push(pregunta);



saveProject();



alert(

"Pregunta agregada correctamente."

);



renderApp();


}





/* =====================================================
   LISTADO
===================================================== */


function renderListaPreguntas(){


if(

SPAE.preguntas.length===0

){


return `

<p>
No existen preguntas registradas.
</p>

`;



}



return SPAE.preguntas.map((p,index)=>`


<div class="card">


<h3>
Pregunta ${index+1}
</h3>



<p>
<strong>Tipo:</strong>
${p.tipo}
</p>



<p>
<strong>Competencia:</strong>
${p.competencia}
</p>



<p>
<strong>Resultado:</strong>
${p.resultado}
</p>



<button

onclick="eliminarPregunta(${p.id})">

Eliminar

</button>


</div>


`).join("");

}



/* =====================================================
   ELIMINAR
===================================================== */


function eliminarPregunta(id){


SPAE.preguntas =

SPAE.preguntas.filter(

p=>p.id!==id

);



saveProject();



renderApp();



}
/* =====================================================
   SPAE MVP

   MÓDULO 5
   BLUEPRINT DE EVALUACIÓN
===================================================== */


/* =====================================================
   VISTA BLUEPRINT
===================================================== */


function renderBlueprint(){


const preguntas = SPAE.preguntas || [];



const totalMCQ = preguntas.filter(

p => p.tipo === "opcion_multiple"

).length;



const totalCasosAplicacion = preguntas.filter(

p => p.tipo === "caso_aplicacion"

).length;



const totalCasosAnalisis = preguntas.filter(

p => p.tipo === "caso_analisis"

).length;



const totalAbiertas = preguntas.filter(

p => p.tipo === "pregunta_abierta"

).length;



return `


<section class="card">


<h2>
4. Blueprint de Evaluación
</h2>


<p>
Configure la estructura del instrumento evaluativo.
</p>



<label>
Número de preguntas de selección múltiple
</label>


<input

type="number"

id="blueprintMCQ"

value="${SPAE.blueprint.preguntasMCQ || totalMCQ}">





<label>
Casos de aplicación profesional
</label>


<input

type="number"

id="blueprintCasos"

value="${SPAE.blueprint.casos || 
(totalCasosAplicacion + totalCasosAnalisis)}">





<label>
Preguntas abiertas
</label>


<input

type="number"

id="blueprintAbiertas"

value="${SPAE.blueprint.abiertas || totalAbiertas}">





<br>


<button onclick="guardarBlueprint()">

Guardar estructura

</button>



</section>





<section class="card">


<h2>
Resumen del Blueprint
</h2>


<p>

<strong>
Selección múltiple:
</strong>

${SPAE.blueprint.preguntasMCQ || totalMCQ}

</p>



<p>

<strong>
Casos profesionales:
</strong>

${SPAE.blueprint.casos || 
(totalCasosAplicacion + totalCasosAnalisis)}

</p>



<p>

<strong>
Preguntas abiertas:
</strong>

${SPAE.blueprint.abiertas || totalAbiertas}

</p>



<p>

<strong>
Total preguntas:
</strong>

${calcularTotalBlueprint()}

</p>


</section>


`;

}



/* =====================================================
   GUARDAR BLUEPRINT
===================================================== */


function guardarBlueprint(){



SPAE.blueprint.preguntasMCQ =

Number(

document.getElementById(
"blueprintMCQ"
).value

);



SPAE.blueprint.casos =

Number(

document.getElementById(
"blueprintCasos"
).value

);



SPAE.blueprint.abiertas =

Number(

document.getElementById(
"blueprintAbiertas"
).value

);



saveProject();



alert(

"Blueprint guardado correctamente."

);



renderApp();


}



/* =====================================================
   TOTAL DE PREGUNTAS
===================================================== */


function calcularTotalBlueprint(){


return (

Number(
SPAE.blueprint.preguntasMCQ || 0
)

+

Number(
SPAE.blueprint.casos || 0
)

+

Number(
SPAE.blueprint.abiertas || 0
)

);


}
/* =====================================================
   SPAE MVP

   MÓDULO 6
   VISTA PREVIA DEL EXAMEN
===================================================== */


/* =====================================================
   VISTA PRINCIPAL PREVIEW
===================================================== */


function renderPreview(){


const preguntas = SPAE.preguntas || [];



const preguntasMCQ = preguntas.filter(

p => p.tipo === "opcion_multiple"

);



const casosAplicacion = preguntas.filter(

p => p.tipo === "caso_aplicacion"

);



const casosAnalisis = preguntas.filter(

p => p.tipo === "caso_analisis"

);



const preguntasAbiertas = preguntas.filter(

p => p.tipo === "pregunta_abierta"

);




return `


<section class="card">


<h2>
5. Vista previa del examen
</h2>



<div class="exam-preview">



<header>


<h1>

${SPAE.curso.nombre || "Nombre del curso"}

</h1>



<h2>

${SPAE.evaluacion.nombre || "Evaluación"}

</h2>



<p>

Programa:

${SPAE.curso.programa || "-"}

</p>



<p>

Tiempo:

${SPAE.evaluacion.tiempo || "-"}

minutos

</p>



<p>

Ponderación:

${SPAE.evaluacion.ponderacion || "-"} %

</p>


</header>





<hr>



<h2>
Sección I
<br>
Selección de la mejor respuesta
</h2>



${renderPreviewMCQ(preguntasMCQ)}




<h2>
Sección II
<br>
Casos de análisis profesional
</h2>



${renderPreviewCasos(

casosAplicacion,

casosAnalisis

)}





<h2>
Sección III
<br>
Preguntas abiertas
</h2>



${renderPreviewAbiertas(

preguntasAbiertas

)}



</div>


</section>


`;

}



/* =====================================================
   PREVIEW OPCIÓN MÚLTIPLE
===================================================== */


function renderPreviewMCQ(lista){



if(lista.length===0){


return `

<p>
No existen preguntas registradas.
</p>

`;

}



return lista.map(

(p,index)=>`


<div class="question">


<p>

<strong>
${index+1}.
</strong>

${p.contenido}

</p>



<ol type="A">


${p.alternativas.map(

a=>`

<li>
${a}
</li>

`

).join("")}



</ol>


</div>


`

).join("");



}



/* =====================================================
   PREVIEW CASOS
===================================================== */


function renderPreviewCasos(

aplicacion,

analisis

){



let html = "";




aplicacion.forEach(

(p,index)=>{


html += `


<div class="question">


<h3>
Caso ${index+1}
</h3>



<p>

${p.situacion}

</p>



<p>

<strong>
Pregunta:
</strong>

${p.pregunta}

</p>


</div>


`;


});





analisis.forEach(

(p,index)=>{


html += `


<div class="question">


<h3>
Caso de análisis ${index+1}
</h3>



<p>

${p.situacion}

</p>



<p>

<strong>
Preguntas orientadoras:
</strong>

</p>



<p>

${p.preguntas}

</p>


</div>


`;


});




if(html===""){


html = `

<p>
No existen casos registrados.
</p>

`;

}



return html;



}



/* =====================================================
   PREVIEW PREGUNTAS ABIERTAS
===================================================== */


function renderPreviewAbiertas(lista){



if(lista.length===0){


return `

<p>
No existen preguntas abiertas registradas.
</p>

`;

}



return lista.map(

(p,index)=>`


<div class="question">


<p>

<strong>

${index+1}.

</strong>


${p.contenido}

</p>



<p>

<b>
Criterio esperado:
</b>


${p.criterio || "-"}

</p>


</div>


`

).join("");



}
/* =====================================================
   SPAE MVP

   MÓDULO 7
   EXPORTACIÓN
===================================================== */


/* =====================================================
   VISTA EXPORTACIÓN
===================================================== */


function renderExportacion(){


return `


<section class="card">


<h2>
6. Exportación del instrumento
</h2>



<p>
Seleccione el formato de salida del examen.
</p>



<button onclick="exportarHTML()">

Exportar HTML

</button>


<br><br>



<button onclick="exportarJSON()">

Exportar proyecto JSON

</button>



<br><br>



<label>
Importar proyecto JSON
</label>


<input

type="file"

id="archivoJSON"

accept=".json">



<button onclick="importarJSON()">

Importar JSON

</button>



<hr>



<h3>
Exportación Word
</h3>


<p>

El documento Word permitirá editar,
revisar y distribuir el examen.

</p>



<button onclick="exportarWord()">

Generar documento Word

</button>



</section>


`;

}



/* =====================================================
   EXPORTAR HTML
===================================================== */


function exportarHTML(){


const contenido = `


<!DOCTYPE html>

<html>


<head>

<title>

${SPAE.evaluacion.nombre}

</title>


<meta charset="UTF-8">


</head>


<body>


<h1>

${SPAE.curso.nombre}

</h1>


<h2>

${SPAE.evaluacion.nombre}

</h2>


${renderPreview()}



</body>


</html>


`;



descargarArchivo(

contenido,

"examen_spae.html",

"text/html"

);



}



/* =====================================================
   EXPORTAR JSON
===================================================== */


function exportarJSON(){



const contenido =

JSON.stringify(

SPAE,

null,

2

);



descargarArchivo(

contenido,

"proyecto_spae.json",

"application/json"

);



}



/* =====================================================
   IMPORTAR JSON
===================================================== */


function importarJSON(){



const archivo =

document.getElementById(
"archivoJSON"
).files[0];



if(!archivo){


alert(

"Seleccione un archivo JSON"

);


return;


}



const lector =

new FileReader();



lector.onload = function(e){



try{


SPAE = JSON.parse(

e.target.result

);



saveProject();



alert(

"Proyecto importado correctamente."

);



renderApp();



}

catch(error){


alert(

"El archivo no tiene formato SPAE válido."

);


}



};



lector.readAsText(archivo);



}



/* =====================================================
   EXPORTAR WORD
===================================================== */


function exportarWord(){



const contenido = `


${SPAE.curso.nombre}


${SPAE.evaluacion.nombre}



${renderPreview()}



`;



descargarArchivo(

contenido,

"examen_spae.doc",

"application/msword"

);


}


/* =====================================================
   DESCARGA GENERAL
===================================================== */


function descargarArchivo(

contenido,

nombre,

tipo

){



const blob = new Blob(

[contenido],

{

type: tipo

}

);



const url =

URL.createObjectURL(blob);



const enlace =

document.createElement("a");



enlace.href = url;


enlace.download = nombre;



document.body.appendChild(enlace);



enlace.click();



document.body.removeChild(enlace);



URL.revokeObjectURL(url);



}
/* =====================================================
   SPAE MVP

   MÓDULO 8
   INICIALIZACIÓN FINAL Y VALIDACIÓN
===================================================== */


/* =====================================================
   VALIDACIÓN DEL SISTEMA
===================================================== */


function validarSPAE(){


const errores = [];



if(typeof SPAE === "undefined"){

    errores.push(
        "Estado principal SPAE no disponible."
    );

}



if(typeof renderApp !== "function"){

    errores.push(
        "Motor de renderizado no disponible."
    );

}



if(typeof saveProject !== "function"){

    errores.push(
        "Sistema de persistencia no disponible."
    );

}



if(!document.getElementById("app")){

    errores.push(
        "Contenedor principal #app no encontrado."
    );

}



return errores;


}



/* =====================================================
   INICIO DEL SISTEMA
===================================================== */


function iniciarSistemaSPAE(){


const errores = validarSPAE();



if(errores.length > 0){


console.error(

"SPAE presenta errores:",

errores

);
alert(
errores.join("\n")
);


alert(

"SPAE no pudo iniciar correctamente."

);



return;


}




console.log(

"SPAE MVP OPERATIVO"

);



console.log(

"Versión:",

SPAE_CONFIG.version

);



alert(

"SPAE MVP cargado correctamente."

);



renderApp();



}



/* =====================================================
   EVENTO DE CARGA
===================================================== */


window.addEventListener(

"load",

iniciarSistemaSPAE

);
