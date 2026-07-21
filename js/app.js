/* =====================================================
   SPAE MVP

   MÓDULO 0 v2

   ESTADO DEL SISTEMA
   MODELO DE DATOS CENTRAL

===================================================== */


/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */


const SPAE_CONFIG = {


    version: "0.2",


    nombre: "SPAE MVP",


    descripcion:
    "Sistema Profesional de Autoría de Evaluaciones"



};



/* =====================================================
   ESTADO PRINCIPAL SPAE
===================================================== */


let SPAE = {


    /* =========================
       INFORMACIÓN DEL CURSO
    ========================= */


    curso:{


        nombre:"",


        programa:"",


        nivel:"",


        periodo:""



    },




    /* =========================
       INFORMACIÓN EVALUACIÓN
    ========================= */


    evaluacion:{


        nombre:"",


        tipo:"",


        tiempo:"",


        ponderacion:"",


        competencias:[],


        resultados:[]



    },




    /* =========================
       BANCO DE PREGUNTAS
    ========================= */


    preguntas:[],




    /* =========================
       ESTRUCTURA EVALUATIVA
    ========================= */


    blueprint:{


        preguntasMCQ:0,


        casos:0,


        abiertas:0



    },





    /* =========================
       CONFIGURACIÓN SISTEMA
    ========================= */


    configuracion:{


        vistaActual:"dashboard"


    }



};






/* =====================================================
   CREAR PLANTILLA DE PREGUNTA
===================================================== */


function crearPreguntaBase(){



return {


    id:null,



    /* Tipo de pregunta */

    tipo:"",




    /* =====================
       CONTENIDO GENERAL
    ===================== */


    contenido:"",




    /* =====================
       OPCIÓN MÚLTIPLE
    ===================== */


    alternativas:[


        "",

        "",

        "",

        ""

    ],


    respuestaCorrecta:"",





    /* =====================
       CASOS
    ===================== */


    situacion:"",


    pregunta:"",


    preguntas:"",





    /* =====================
       INFORMACIÓN DOCENTE
    ===================== */


    justificacion:"",


    respuestaEsperada:"",


    criterios:"",





    /* =====================
       ALINEACIÓN PEDAGÓGICA
    ===================== */


    competencia:"",


    resultado:"",





    /* =====================
       RETROALIMENTACIÓN
    ===================== */


    retroalimentacion:""



};



}






/* =====================================================
   GENERADOR SIMPLE DE IDENTIFICADORES
===================================================== */


function generarID(){



return Date.now();



}







/* =====================================================
   PERSISTENCIA LOCAL
===================================================== */


function saveProject(){



localStorage.setItem(

"SPAE_DATA",

JSON.stringify(SPAE)

);



}







/* =====================================================
   CARGAR PROYECTO
===================================================== */


function loadProject(){



const datos =

localStorage.getItem(

"SPAE_DATA"

);




if(datos){



try{


SPAE = JSON.parse(datos);



}


catch(error){



console.error(

"Error cargando proyecto SPAE",

error

);



}



}



}







/* =====================================================
   INICIALIZACIÓN DEL ESTADO
===================================================== */


function inicializarSPAE(){



loadProject();



console.log(

"SPAE estado inicializado"

);



}
/* =====================================================
   SPAE MVP

   MÓDULO 1 v2

   CONTROL PRINCIPAL
   NAVEGACIÓN
   ROUTER

===================================================== */



/* =====================================================
   INICIO DE SPAE
===================================================== */


function iniciarSPAE(){


try{


    if(typeof inicializarSPAE === "function"){

        inicializarSPAE();

    }


    renderApp();


}
catch(error){


    console.error(

        "Error iniciando SPAE",

        error

    );


    alert(

        "SPAE no pudo iniciar correctamente."

    );


}


}






/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderApp(){



const app =

document.getElementById("app")

||
document.getElementById("content");





if(!app){


console.error(

"Contenedor principal #content no encontrado"

);


return;


}






app.innerHTML = `



<div class="spae-layout">



<aside class="menu">



<h3>

SPAE MVP

</h3>





<button onclick="abrirModulo('curso')">

1. Curso

</button>





<button onclick="abrirModulo('evaluacion')">

2. Evaluación

</button>





<button onclick="abrirModulo('preguntas')">

3. Preguntas

</button>





<button onclick="abrirModulo('blueprint')">

4. Blueprint

</button>





<button onclick="abrirModulo('vistaPrevia')">

5. Vista previa

</button>





<button onclick="abrirModulo('exportar')">

6. Exportar

</button>



</aside>





<main id="workspace">



<h2>

SPAE iniciado correctamente.

Seleccione un módulo.

</h2>



</main>





</div>



`;



}









/* =====================================================
   ABRIR MÓDULOS
===================================================== */


function abrirModulo(nombre){



const workspace =

document.getElementById(

"workspace"

);





if(!workspace){


return;


}





switch(nombre){



case "curso":



workspace.innerHTML =

renderCurso();



break;





case "evaluacion":



workspace.innerHTML =

renderEvaluacion();



break;





case "preguntas":



workspace.innerHTML =

renderPreguntas();



break;





case "blueprint":



workspace.innerHTML =

renderBlueprint();



break;





case "vistaPrevia":



workspace.innerHTML =

renderVistaPrevia();



break;





case "exportar":



workspace.innerHTML =

renderExportar();



break;





default:



workspace.innerHTML = `


<h3>

Módulo no encontrado

</h3>


`;



}



}







/* =====================================================
   EXPORTAR
   PLACEHOLDER TEMPORAL

   Será reemplazado por MÓDULO 7 v2

===================================================== */


function renderExportar(){



return `



<section class="card">


<h2>

6. Exportación

</h2>



<p>

Módulo de exportación pendiente.

</p>



</section>



`;



}







/* =====================================================
   EVENTO INICIAL
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


iniciarSPAE();



}

);
/* =====================================================
   SPAE MVP

   MÓDULO 2 v2

   GESTIÓN DEL CURSO

===================================================== */



/* =====================================================
   RENDER DEL MÓDULO CURSO
===================================================== */


function renderCurso(){


return `


<section class="card">


<h2>

1. Información del curso

</h2>




<label>

Nombre del curso

</label>


<input

id="cursoNombre"

value="${SPAE.curso.nombre || ""}"

placeholder="Ejemplo: Liderazgo"



>



<label>

Programa académico

</label>


<input

id="cursoPrograma"

value="${SPAE.curso.programa || ""}"

placeholder="Ejemplo: Administración"



>




<label>

Nivel / ciclo

</label>


<input

id="cursoNivel"

value="${SPAE.curso.nivel || ""}"

placeholder="Ejemplo: Media carrera"



>



<label>

Periodo académico

</label>


<input

id="cursoPeriodo"

value="${SPAE.curso.periodo || ""}"

placeholder="Ejemplo: 2026-I"



>




<br><br>



<button onclick="guardarCurso()">

Guardar curso

</button>



<div id="mensajeCurso">

</div>



</section>



`;

}







/* =====================================================
   GUARDAR CURSO
===================================================== */


function guardarCurso(){



const nombre =

document.getElementById(

"cursoNombre"

).value.trim();





const programa =

document.getElementById(

"cursoPrograma"

).value.trim();





const nivel =

document.getElementById(

"cursoNivel"

).value.trim();





const periodo =

document.getElementById(

"cursoPeriodo"

).value.trim();







if(!nombre){



mostrarMensajeCurso(

"Debe ingresar el nombre del curso"

);



return;

}



/* ==========================
   ACTUALIZACIÓN DEL ESTADO
========================== */


SPAE.curso.nombre = nombre;



SPAE.curso.programa = programa;



SPAE.curso.nivel = nivel;



SPAE.curso.periodo = periodo;





saveProject();





mostrarMensajeCurso(

"Curso guardado correctamente"

);





}








/* =====================================================
   MENSAJE
===================================================== */


function mostrarMensajeCurso(texto){



const zona =

document.getElementById(

"mensajeCurso"

);



if(zona){



zona.innerHTML = `


<p>

<strong>

${texto}

</strong>

</p>


`;



}



}
/* =====================================================
   SPAE MVP

   MÓDULO 3 v2

   GESTIÓN DE EVALUACIÓN

===================================================== */





/* =====================================================
   RENDER DEL MÓDULO EVALUACIÓN
===================================================== */


function renderEvaluacion(){


return `


<section class="card">


<h2>

2. Configuración de evaluación

</h2>




<label>

Nombre de la evaluación

</label>


<input

id="evaluacionNombre"

value="${SPAE.evaluacion.nombre || ""}"

placeholder="Ejemplo: Examen Final Liderazgo"



>




<label>

Tipo de evaluación

</label>



<select id="evaluacionTipo">



<option value="sumativa"

${SPAE.evaluacion.tipo==="sumativa"?"selected":""}

>

Sumativa

</option>



<option value="formativa"

${SPAE.evaluacion.tipo==="formativa"?"selected":""}

>

Formativa

</option>



<option value="diagnostica"

${SPAE.evaluacion.tipo==="diagnostica"?"selected":""}

>

Diagnóstica

</option>



</select>





<label>

Tiempo disponible (minutos)

</label>



<input

id="evaluacionTiempo"

type="number"

value="${SPAE.evaluacion.tiempo || ""}"

placeholder="Ejemplo: 90"



>




<label>

Ponderación (%)

</label>



<input

id="evaluacionPonderacion"

type="number"

value="${SPAE.evaluacion.ponderacion || ""}"

placeholder="Ejemplo: 30"



>





<label>

Competencias evaluadas

</label>



<textarea

id="evaluacionCompetencias"

placeholder="Una competencia por línea"

>${

Array.isArray(SPAE.evaluacion.competencias)

?

SPAE.evaluacion.competencias.join("\n")

:

""

}

</textarea>







<label>

Resultados de aprendizaje

</label>



<textarea

id="evaluacionResultados"

placeholder="Un resultado por línea"

>${

Array.isArray(SPAE.evaluacion.resultados)

?

SPAE.evaluacion.resultados.join("\n")

:

""

}

</textarea>







<br><br>



<button onclick="guardarEvaluacion()">

Guardar evaluación

</button>




<div id="mensajeEvaluacion">

</div>



</section>



`;

}








/* =====================================================
   GUARDAR EVALUACIÓN
===================================================== */


function guardarEvaluacion(){



const nombre =

document.getElementById(

"evaluacionNombre"

).value.trim();





const tipo =

document.getElementById(

"evaluacionTipo"

).value;





const tiempo =

document.getElementById(

"evaluacionTiempo"

).value;





const ponderacion =

document.getElementById(

"evaluacionPonderacion"

).value;





const competenciasTexto =

document.getElementById(

"evaluacionCompetencias"

).value;





const resultadosTexto =

document.getElementById(

"evaluacionResultados"

).value;







if(!nombre){



mostrarMensajeEvaluacion(

"Debe ingresar el nombre de la evaluación"

);



return;

}





/* =========================
   ACTUALIZAR MODELO SPAE
========================= */



SPAE.evaluacion.nombre = nombre;



SPAE.evaluacion.tipo = tipo;



SPAE.evaluacion.tiempo = tiempo;



SPAE.evaluacion.ponderacion = ponderacion;





SPAE.evaluacion.competencias =

competenciasTexto

.split("\n")

.filter(

x=>x.trim()!==""

);





SPAE.evaluacion.resultados =

resultadosTexto

.split("\n")

.filter(

x=>x.trim()!==""

);







saveProject();





mostrarMensajeEvaluacion(

"Evaluación guardada correctamente"

);



}








/* =====================================================
   MENSAJE
===================================================== */


function mostrarMensajeEvaluacion(texto){



const zona =

document.getElementById(

"mensajeEvaluacion"

);





if(zona){



zona.innerHTML = `



<p>

<strong>

${texto}

</strong>

</p>



`;



}



}
/* =====================================================
   SPAE MVP

   MÓDULO 4 v2

   CONSTRUCTOR DE PREGUNTAS

===================================================== */



/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderPreguntas(){


return `


<section class="card">


<h2>

3. Construcción de preguntas

</h2>



<label>

Tipo de pregunta

</label>



<select id="tipoPregunta"
onchange="renderFormularioPregunta()">



<option value="">

Seleccione tipo

</option>



<option value="opcion_multiple">

Selección múltiple

</option>



<option value="caso_aplicacion">

Caso de aplicación profesional

</option>



<option value="caso_analisis">

Caso de análisis

</option>



<option value="pregunta_abierta">

Pregunta abierta

</option>



</select>




<div id="formularioPregunta">


</div>




<hr>



<h3>

Preguntas registradas

</h3>



<div id="listaPreguntas">


${renderListaPreguntas()}


</div>



</section>



`;

}








/* =====================================================
   FORMULARIO DINÁMICO
===================================================== */


function renderFormularioPregunta(){



const tipo =

document.getElementById(

"tipoPregunta"

)?.value;





const contenedor =

document.getElementById(

"formularioPregunta"

);





if(!contenedor){

return;

}



let html="";





if(tipo==="opcion_multiple"){



html += `



<input id="preguntaTexto"

placeholder="Enunciado de la pregunta">



<input id="altA"

placeholder="Alternativa A">



<input id="altB"

placeholder="Alternativa B">



<input id="altC"

placeholder="Alternativa C">



<input id="altD"

placeholder="Alternativa D">



<input id="respuestaCorrecta"

placeholder="Respuesta correcta (A,B,C o D)">



`;



}







if(tipo==="caso_aplicacion"){



html += `



<textarea id="casoSituacion"

placeholder="Situación profesional">

</textarea>



<textarea id="casoPregunta"

placeholder="Pregunta que debe responder el estudiante">

</textarea>



`;



}







if(tipo==="caso_analisis"){



html += `



<textarea id="analisisSituacion"

placeholder="Caso de análisis">

</textarea>




<textarea id="analisisPreguntas"

placeholder="Preguntas de análisis:

¿Qué conceptos explican la situación?

¿Qué estrategia desarrollaría?">

</textarea>



`;



}







if(tipo==="pregunta_abierta"){



html += `



<textarea id="abiertaPregunta"

placeholder="Pregunta abierta de redacción">

</textarea>




<textarea id="abiertaCriterio"

placeholder="Criterios esperados de respuesta">

</textarea>



`;



}





if(tipo){



html += `



<h4>

Alineación pedagógica

</h4>



<input id="preguntaCompetencia"

placeholder="Competencia evaluada">



<input id="preguntaResultado"

placeholder="Resultado de aprendizaje">



<textarea id="preguntaRetroalimentacion"

placeholder="Retroalimentación esperada">

</textarea>



<br>



<button onclick="guardarPregunta()">

Agregar pregunta

</button>



`;



}



contenedor.innerHTML = html;



}










/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPregunta(){



const tipo =

document.getElementById(

"tipoPregunta"

).value;





if(!tipo){



alert(

"Seleccione un tipo de pregunta"

);



return;

}







let pregunta = crearPreguntaBase();





pregunta.id = generarID();





pregunta.tipo = tipo;






/* =========================
   INFORMACIÓN PEDAGÓGICA
========================= */


pregunta.competencia =

document.getElementById(

"preguntaCompetencia"

)?.value || "";




pregunta.resultado =

document.getElementById(

"preguntaResultado"

)?.value || "";




pregunta.retroalimentacion =

document.getElementById(

"preguntaRetroalimentacion"

)?.value || "";









/* =========================
   OPCIÓN MÚLTIPLE
========================= */


if(tipo==="opcion_multiple"){



pregunta.contenido =

document.getElementById(

"preguntaTexto"

).value;





pregunta.alternativas = [


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









/* =========================
   CASO APLICACIÓN
========================= */


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









/* =========================
   CASO ANÁLISIS
========================= */


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









/* =========================
   PREGUNTA ABIERTA
========================= */


if(tipo==="pregunta_abierta"){



pregunta.contenido =

document.getElementById(

"abiertaPregunta"

).value;




pregunta.criterios =

document.getElementById(

"abiertaCriterio"

).value;



}






SPAE.preguntas.push(

pregunta

);



saveProject();




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





return SPAE.preguntas.map(

(p,index)=>{



return `



<div class="question">


<h4>

Pregunta ${index+1}

</h4>



<p>

Tipo:

${p.tipo}

</p>



<p>

${p.contenido ||

p.situacion ||

""}

</p>




<button onclick="eliminarPregunta(${p.id})">

Eliminar

</button>



</div>



`;



}

).join("");



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

   MÓDULO 5 v2

   BLUEPRINT / TABLA DE ESPECIFICACIONES

===================================================== */



/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderBlueprint(){


return `


<section class="card">


<h2>

4. Blueprint de evaluación

</h2>



<p>

Resumen de la estructura del instrumento.

</p>



<button onclick="generarBlueprint()">

Actualizar blueprint

</button>




<div id="resultadoBlueprint">


${mostrarBlueprint()}


</div>



</section>



`;

}







/* =====================================================
   GENERAR BLUEPRINT
===================================================== */


function generarBlueprint(){



let resumen = {


opcion_multiple:0,


caso_aplicacion:0,


caso_analisis:0,


pregunta_abierta:0



};






SPAE.preguntas.forEach(

p=>{


if(resumen[p.tipo]!==undefined){


resumen[p.tipo]++;


}



}

);






SPAE.blueprint = {


preguntasMCQ:

resumen.opcion_multiple,



casos:

resumen.caso_aplicacion +

resumen.caso_analisis,



abiertas:

resumen.pregunta_abierta



};






saveProject();




renderApp();



}







/* =====================================================
   MOSTRAR BLUEPRINT
===================================================== */


function mostrarBlueprint(){



if(

!SPAE.blueprint

){



return `


<p>

No existe información.

</p>


`;



}






return `



<div class="blueprint-summary">



<h3>

Distribución del examen

</h3>



<table>


<tr>

<th>

Tipo

</th>


<th>

Cantidad

</th>


</tr>



<tr>

<td>

Selección múltiple

</td>


<td>

${SPAE.blueprint.preguntasMCQ || 0}

</td>


</tr>



<tr>

<td>

Casos de análisis/aplicación

</td>


<td>

${SPAE.blueprint.casos || 0}

</td>


</tr>




<tr>

<td>

Preguntas abiertas

</td>


<td>

${SPAE.blueprint.abiertas || 0}

</td>


</tr>



</table>





<h3>

Alineación pedagógica

</h3>



${mostrarAlineacion()}



</div>



`;

}









/* =====================================================
   ALINEACIÓN COMPETENCIAS
===================================================== */


function mostrarAlineacion(){



if(

SPAE.preguntas.length===0

){


return `

<p>

No existen preguntas.

</p>

`;



}





return SPAE.preguntas.map(

(p,index)=>{


return `



<div class="alignment-card">


<h4>

Pregunta ${index+1}

</h4>



<p>

<strong>

Tipo:

</strong>

${p.tipo}

</p>



<p>

<strong>

Competencia:

</strong>


${p.competencia || "No definida"}

</p>




<p>

<strong>

Resultado:

</strong>


${p.resultado || "No definido"}

</p>



</div>



`;



}

).join("");



}









/* =====================================================
   CALCULAR PORCENTAJES
===================================================== */


function calcularDistribucion(){



const total =

SPAE.preguntas.length;



if(total===0){

return null;

}



return {


mcq:

Math.round(

(SPAE.blueprint.preguntasMCQ / total)

*100

),



casos:

Math.round(

(SPAE.blueprint.casos / total)

*100

),



abiertas:

Math.round(

(SPAE.blueprint.abiertas / total)

*100

)



};



}
/* =====================================================
   SPAE MVP

   MÓDULO 6 v2

   VISTA PREVIA DEL EXAMEN

===================================================== */



/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderVistaPrevia(){


return `


<section class="card">


<h2>

5. Vista previa del examen

</h2>



<button onclick="mostrarPreviewAlumno()">

Vista estudiante

</button>



<button onclick="mostrarPreviewDocente()">

Vista docente

</button>



<div id="previewExamen">

</div>



</section>



`;

}








/* =====================================================
   VISTA ESTUDIANTE
===================================================== */


function mostrarPreviewAlumno(){



const contenedor =

document.getElementById(

"previewExamen"

);



if(!contenedor){

return;

}





contenedor.innerHTML = `



<div class="exam-preview">


<header>


<h1>

${SPAE.evaluacion.nombre || "Evaluación"}

</h1>



<h2>

${SPAE.curso.nombre || ""}

</h2>



<p>

Programa:

${SPAE.curso.programa || ""}

</p>



<p>

Tiempo:

${SPAE.evaluacion.tiempo || ""}

minutos

</p>



<p>

Ponderación:

${SPAE.evaluacion.ponderacion || ""} %

</p>



</header>



<hr>



${renderPreguntasPreviewAlumno()}



</div>



`;



}








/* =====================================================
   PREGUNTAS ESTUDIANTE
===================================================== */


function renderPreguntasPreviewAlumno(){



if(

SPAE.preguntas.length===0

){



return `


<p>

No existen preguntas registradas.

</p>


`;



}





return SPAE.preguntas.map(

(p,index)=>{


return `



<div class="question">



<h3>

${index+1}

</h3>



${crearContenidoAlumno(p)}



</div>



`;



}

).join("");



}









function crearContenidoAlumno(p){



if(

p.tipo==="opcion_multiple"

){



return `


<p>

${p.contenido}

</p>



<ol type="A">


${p.alternativas.map(

a=>`

<li>${a}</li>

`

).join("")}


</ol>


`;



}







if(

p.tipo==="caso_aplicacion"

){



return `



<h4>

Caso profesional

</h4>



<p>

${p.situacion}

</p>



<p>

<strong>

Pregunta:

</strong>

${p.pregunta}

</p>


`;



}







if(

p.tipo==="caso_analisis"

){



return `



<h4>

Caso de análisis

</h4>



<p>

${p.situacion}

</p>



<p>

${p.preguntas}

</p>


`;



}








if(

p.tipo==="pregunta_abierta"

){



return `



<p>

${p.contenido}

</p>



<br><br>

Respuesta:

<br><br>



`;



}



return "";



}









/* =====================================================
   VISTA DOCENTE
===================================================== */


function mostrarPreviewDocente(){



const contenedor =

document.getElementById(

"previewExamen"

);



if(!contenedor){

return;

}




contenedor.innerHTML = `



<div class="exam-preview docente">



<header>


<h1>

Clave docente

</h1>



<h2>

${SPAE.evaluacion.nombre || ""}

</h2>


</header>



<hr>



${renderPreguntasPreviewDocente()}



</div>



`;



}









/* =====================================================
   PREGUNTAS DOCENTE
===================================================== */


function renderPreguntasPreviewDocente(){



if(

SPAE.preguntas.length===0

){


return `

<p>

No existen preguntas.

</p>

`;



}






return SPAE.preguntas.map(

(p,index)=>{



return `



<div class="question">



<h3>

Pregunta ${index+1}

</h3>



${crearContenidoAlumno(p)}



<hr>



<p>

<strong>

Respuesta correcta:

</strong>

${p.respuestaCorrecta || "No aplica"}

</p>



<p>

<strong>

Justificación:

</strong>

${p.justificacion || "Pendiente"}

</p>



<p>

<strong>

Respuesta esperada:

</strong>

${p.respuestaEsperada || "Pendiente"}

</p>



<p>

<strong>

Criterios:

</strong>

${p.criterios || "Pendiente"}

</p>



</div>



`;



}

).join("");



}
/* =====================================================

   SPAE MVP

   MÓDULO 7A v3

   EXPORTACIÓN JSON PROFESIONAL

   Mejoras:
   - Actualización automática Blueprint
   - Exportación completa del proyecto
   - UTF-8 correcto
   - Validación básica

===================================================== */






/* =====================================================
   VISTA EXPORTACIÓN
===================================================== */


function renderExportar(){


return `


<section class="card">


<h2>

6. Gestión del proyecto

</h2>



<h3>

Exportar proyecto

</h3>



<p>

Genere una copia completa del proyecto SPAE.

</p>




<button onclick="exportarJSON()">

Exportar proyecto JSON

</button>




<div id="mensajeExportacion">

</div>



</section>


`;

}









/* =====================================================
   EXPORTACIÓN JSON
===================================================== */


function exportarJSON(){


try{



/*
   Antes de exportar:

   Actualizar información derivada
   (Blueprint)
*/


if(

typeof generarBlueprint === "function"

){


generarBlueprint();


}






const proyecto = {


version:

"SPAE MVP v3",




fecha:

new Date().toISOString(),





curso:

SPAE.curso || {},





evaluacion:

SPAE.evaluacion || {},





preguntas:

SPAE.preguntas || [],





blueprint:

SPAE.blueprint || {}



};









const contenido =

JSON.stringify(

proyecto,

null,

4

);









const archivo =

new Blob(

[contenido],

{


type:

"application/json;charset=utf-8"


}

);









const url =

URL.createObjectURL(

archivo

);









const enlace =

document.createElement(

"a"

);





enlace.href = url;



enlace.download =

"SPAE_proyecto.json";









document.body.appendChild(

enlace

);





enlace.click();









document.body.removeChild(

enlace

);





URL.revokeObjectURL(

url

);








mostrarMensajeExportacion(

"Proyecto exportado correctamente."

);





}

catch(error){



console.error(

"Error exportando proyecto JSON:",

error

);



mostrarMensajeExportacion(

"Error al exportar proyecto."

);



}



}









/* =====================================================
   MENSAJE EXPORTACIÓN
===================================================== */


function mostrarMensajeExportacion(texto){



const zona =

document.getElementById(

"mensajeExportacion"

);





if(zona){



zona.innerHTML = `


<p>

<strong>

${texto}

</strong>

</p>


`;



}



}








/* =====================================================
   FIN MÓDULO 7A v3

===================================================== */
/* =====================================================

   SPAE MVP

   MÓDULO 7B v3

   IMPORTACIÓN JSON PROFESIONAL

   Mejoras:
   - Validación de archivo
   - Restauración completa del proyecto
   - Reconstrucción automática Blueprint
   - Persistencia inmediata
   - Actualización interfaz

===================================================== */






/* =====================================================
   VISTA IMPORTACIÓN
===================================================== */


function renderImportar(){


return `


<section class="card">


<h2>

Importar proyecto SPAE

</h2>



<p>

Seleccione un archivo SPAE_proyecto.json

</p>



<input

type="file"

id="archivoJSON"

accept=".json"

>



<br><br>



<button onclick="importarJSON()">

Importar proyecto

</button>



<div id="mensajeImportacion">

</div>



</section>


`;

}









/* =====================================================
   IMPORTAR PROYECTO JSON
===================================================== */


function importarJSON(){



try{



const selector =

document.getElementById(

"archivoJSON"

);





if(

!selector ||

selector.files.length === 0

){



mostrarMensajeImportacion(

"Seleccione un archivo JSON."

);



return;


}






const archivo =

selector.files[0];






const lector =

new FileReader();









lector.onload = function(event){



try{



const proyecto =

JSON.parse(

event.target.result

);






validarProyectoJSON(

proyecto

);






/*
   Restaurar información
*/





SPAE.curso =

proyecto.curso || {};





SPAE.evaluacion =

proyecto.evaluacion || {};





SPAE.preguntas =

proyecto.preguntas || [];





SPAE.blueprint =

proyecto.blueprint || {};









/*
   Reconstrucción automática

   evita inconsistencias

*/





if(

typeof generarBlueprint === "function"

){



generarBlueprint();



}









/*
   Guardar proyecto

*/





if(

typeof saveProject === "function"

){



saveProject();



}








mostrarMensajeImportacion(

"Proyecto importado correctamente."

);






/*
   Actualizar interfaz

*/





if(

typeof renderApp === "function"

){



renderApp();



}



}



catch(error){



console.error(

"Error leyendo JSON",

error

);



mostrarMensajeImportacion(

"El archivo no tiene formato SPAE válido."

);



}



};








lector.readAsText(

archivo,

"UTF-8"

);





}

catch(error){



console.error(

"Error importando proyecto",

error

);



mostrarMensajeImportacion(

"Error durante la importación."

);



}



}









/* =====================================================
   VALIDACIÓN PROYECTO
===================================================== */


function validarProyectoJSON(proyecto){



if(

!proyecto ||

typeof proyecto !== "object"

){



throw new Error(

"Proyecto inválido"

);



}






if(

!proyecto.version

){



console.warn(

"Proyecto sin versión SPAE"

);



}






if(

!Array.isArray(

proyecto.preguntas

)

){



proyecto.preguntas = [];



}







}









/* =====================================================
   MENSAJE IMPORTACIÓN
===================================================== */


function mostrarMensajeImportacion(texto){



const zona =

document.getElementById(

"mensajeImportacion"

);





if(zona){



zona.innerHTML = `


<p>

<strong>

${texto}

</strong>

</p>


`;



}



}








/* =====================================================

   FIN MÓDULO 7B v3

===================================================== */
/* =====================================================

   SPAE MVP

   MÓDULO 7C v1

   EXPORTACIÓN WORD

   - Documento estudiante
   - Documento docente

===================================================== */





/* =====================================================
   VISTA EXPORTACIÓN WORD
===================================================== */


function renderExportarWord(){


return `


<section class="card">


<h2>

Exportación Word

</h2>



<button onclick="exportarWordEstudiante()">

Word - Vista estudiante

</button>



<br><br>



<button onclick="exportarWordDocente()">

Word - Vista docente

</button>



<div id="mensajeWord">

</div>



</section>


`;

}









/* =====================================================
   GENERADOR TEXTO ESTUDIANTE
===================================================== */


function construirDocumentoEstudiante(){


let texto = "";



texto += SPAE.evaluacion.nombre + "\n\n";


texto += "Programa: "

+

SPAE.curso.programa

+

"\n";


texto += "Curso: "

+

SPAE.curso.nombre

+

"\n\n";





texto += "INSTRUCCIONES\n\n";





SPAE.preguntas.forEach(

(p,index)=>{



texto +=

(index+1)

+

". ";



if(

p.tipo.includes("caso")

){


texto +=

"CASO DE APLICACIÓN\n\n";


texto +=

p.situacion

+

"\n\n";


texto +=

p.pregunta

+

"\n\n";



}

else{


texto +=

p.contenido

+

"\n\n";



}



texto +=

"Respuesta:\n\n\n";



}

);





return texto;


}









/* =====================================================
   GENERADOR TEXTO DOCENTE
===================================================== */


function construirDocumentoDocente(){



let texto =

construirDocumentoEstudiante();





texto +=

"\n\n====================\n";


texto +=

"CLAVE DOCENTE\n";


texto +=

"====================\n\n";






SPAE.preguntas.forEach(

(p,index)=>{


texto +=

"Pregunta "

+

(index+1)

+

"\n";





texto +=

"Competencia: "

+

(p.competencia || "")

+

"\n";





texto +=

"Resultado: "

+

(p.resultado || "")

+

"\n";





texto +=

"Respuesta correcta: "

+

(p.respuestaCorrecta || "")

+

"\n";





texto +=

"Justificación: "

+

(p.justificacion || "")

+

"\n\n";



}

);






return texto;


}









/* =====================================================
   EXPORTAR WORD ESTUDIANTE
===================================================== */


function exportarWordEstudiante(){



generarArchivoWord(

construirDocumentoEstudiante(),

"Examen_Estudiante.doc"

);


}









/* =====================================================
   EXPORTAR WORD DOCENTE
===================================================== */


function exportarWordDocente(){



generarArchivoWord(

construirDocumentoDocente(),

"Clave_Docente.doc"

);


}









/* =====================================================
   CREACIÓN ARCHIVO WORD
===================================================== */


function generarArchivoWord(contenido,nombre){



const blob = new Blob(

[

"\ufeff",

contenido

],

{

type:

"application/msword;charset=utf-8"

}

);



const url =

URL.createObjectURL(blob);



const enlace =

document.createElement("a");



enlace.href=url;



enlace.download=nombre;



document.body.appendChild(enlace);



enlace.click();



document.body.removeChild(enlace);



URL.revokeObjectURL(url);



mostrarMensajeWord(

"Documento generado correctamente."

);



}









/* =====================================================
   MENSAJE
===================================================== */


function mostrarMensajeWord(texto){



const zona =

document.getElementById(

"mensajeWord"

);



if(zona){


zona.innerHTML=

`

<p><strong>${texto}</strong></p>

`;

}


}







/* =====================================================

FIN MÓDULO 7C v1

===================================================== */
