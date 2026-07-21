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

   MÓDULO 2

   GESTIÓN DE EVALUACIÓN

===================================================== */



function renderEvaluacion(){


return `


<section class="card">


<h2>

2. Evaluación

</h2>



<label>

Nombre evaluación

</label>



<input

id="nombreEvaluacion"

value="${

SPAE.evaluacion?.nombre || ""

}"

>



<br><br>



<label>

Tipo

</label>



<select id="tipoEvaluacion">


<option value="formativa">

Formativa

</option>


<option value="sumativa">

Sumativa

</option>


</select>



<br><br>




<label>

Tiempo (minutos)

</label>



<input

id="tiempoEvaluacion"

type="number"

value="${

SPAE.evaluacion?.tiempo || ""

}"

>



<br><br>



<label>

Ponderación (%)

</label>



<input

id="ponderacionEvaluacion"

type="number"

value="${

SPAE.evaluacion?.ponderacion || ""

}"

>



<br><br>




<button onclick="guardarEvaluacionSPAE()">

Guardar evaluación

</button>




<div id="mensajeEvaluacion">

</div>



</section>


`;

}







function guardarEvaluacionSPAE(){



if(!SPAE.evaluacion){


SPAE.evaluacion={};


}





SPAE.evaluacion.nombre =

document.getElementById(

"nombreEvaluacion"

).value.trim();







SPAE.evaluacion.tipo =

document.getElementById(

"tipoEvaluacion"

).value;







SPAE.evaluacion.tiempo =

Number(

document.getElementById(

"tiempoEvaluacion"

).value

);







SPAE.evaluacion.ponderacion =

Number(

document.getElementById(

"ponderacionEvaluacion"

).value

);








localStorage.setItem(

"SPAE",

JSON.stringify(SPAE)

);







const mensaje =

document.getElementById(

"mensajeEvaluacion"

);





if(mensaje){


mensaje.innerHTML =

`

<p>

<strong>

Evaluación guardada correctamente.

</strong>

</p>

`;



}





}






/* =====================================================

FIN MÓDULO 2

===================================================== */
/* =====================================================

   SPAE MVP

   MÓDULO 3B v2.1

   GESTIÓN DE PREGUNTAS

   - Separación pedagógica de campos
   - Control duplicados
   - Compatible JSON v3

===================================================== */







/* =====================================================
   RENDER PREGUNTAS
===================================================== */


function renderPreguntas(){



return `



<section class="card">


<h2>

3. Banco de preguntas

</h2>




<h3>

Nueva pregunta

</h3>





<label>

Tipo:

</label>



<select id="tipoPregunta">


<option value="opcion_multiple">

Opción múltiple

</option>



<option value="caso_aplicacion">

Caso de aplicación

</option>



<option value="abierta">

Pregunta abierta

</option>


</select>





<br><br>




<label>

Contenido / Enunciado

</label>



<textarea

id="contenidoPregunta"

rows="5"

></textarea>







<label>

Situación del caso

</label>



<textarea

id="situacionPregunta"

rows="6"

></textarea>







<label>

Pregunta específica

</label>



<textarea

id="preguntaPregunta"

rows="3"

></textarea>







<h3>

Alternativas

</h3>



<input id="altA" placeholder="Alternativa A">


<input id="altB" placeholder="Alternativa B">


<input id="altC" placeholder="Alternativa C">


<input id="altD" placeholder="Alternativa D">





<label>

Respuesta correcta

</label>



<input

id="respuestaCorrecta"

placeholder="Ejemplo: A"

>







<h3>

Retroalimentación docente

</h3>





<label>

Justificación

</label>



<textarea

id="justificacionPregunta"

rows="4"

></textarea>








<label>

Respuesta esperada

</label>



<textarea

id="respuestaEsperadaPregunta"

rows="4"

></textarea>







<label>

Criterios de evaluación

</label>



<textarea

id="criteriosPregunta"

rows="4"

></textarea>







<label>

Competencia

</label>



<input

id="competenciaPregunta"

>







<label>

Resultado de aprendizaje

</label>



<input

id="resultadoPregunta"

>







<br><br>




<button onclick="guardarPreguntaSPAE()">

Guardar pregunta

</button>





<div id="mensajePregunta">

</div>




</section>


`;

}









/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPreguntaSPAE(){



if(!SPAE.preguntas){



SPAE.preguntas=[];


}





const id =

Date.now();








const tipo =

document.getElementById(

"tipoPregunta"

).value;









const pregunta = {



id:id,



tipo:tipo,



contenido:

document.getElementById(

"contenidoPregunta"

).value.trim(),




situacion:

document.getElementById(

"situacionPregunta"

).value.trim(),





pregunta:

document.getElementById(

"preguntaPregunta"

).value.trim(),







alternativas:[


document.getElementById("altA").value.trim(),


document.getElementById("altB").value.trim(),


document.getElementById("altC").value.trim(),


document.getElementById("altD").value.trim()


],







respuestaCorrecta:

document.getElementById(

"respuestaCorrecta"

).value.trim().toUpperCase(),







justificacion:

document.getElementById(

"justificacionPregunta"

).value.trim(),







respuestaEsperada:

document.getElementById(

"respuestaEsperadaPregunta"

).value.trim(),







criterios:

document.getElementById(

"criteriosPregunta"

).value.trim(),







competencia:

document.getElementById(

"competenciaPregunta"

).value.trim(),







resultado:

document.getElementById(

"resultadoPregunta"

).value.trim(),







fecha:

new Date().toISOString()



};








/* =====================================================
   CONTROL DUPLICADOS
===================================================== */





const duplicada =

SPAE.preguntas.some(

(p)=>


p.contenido === pregunta.contenido

&&

p.tipo === pregunta.tipo



);







if(duplicada){



mostrarMensajePregunta(

"Esta pregunta ya existe."

);



return;


}









SPAE.preguntas.push(

pregunta

);








guardarSPAE();








mostrarMensajePregunta(

"Pregunta guardada correctamente."

);



}









/* =====================================================
   MENSAJE
===================================================== */


function mostrarMensajePregunta(texto){



const zona =

document.getElementById(

"mensajePregunta"

);





if(zona){



zona.innerHTML=

`

<p>

<strong>

${texto}

</strong>

</p>

`;



}



}









/* =====================================================
   GUARDAR ESTADO GENERAL
===================================================== */


function guardarSPAE(){



localStorage.setItem(

"SPAE",

JSON.stringify(

SPAE

)

);



}









/* =====================================================
   CARGAR ESTADO
===================================================== */


function cargarSPAE(){



const datos =

localStorage.getItem(

"SPAE"

);





if(datos){



SPAE =

JSON.parse(datos);



}



}









/* =====================================================

FIN MÓDULO 3B v2.1

===================================================== */
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


function renderExportar(){


return `


<section class="card">


<h2>

6. Gestión del proyecto

</h2>



<h3>

Exportar proyecto JSON

</h3>



<p>

Genere una copia completa del proyecto SPAE.

</p>




<button onclick="exportarJSON()">

Exportar proyecto JSON

</button>




<div id="mensajeExportacion">

</div>



<hr>



<h3>

Exportación Word

</h3>



<p>

Genere documentos para estudiante y docente.

</p>



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

   MÓDULO 7C v4

   EXPORTACIÓN WORD PROFESIONAL

===================================================== */





/* =====================================================
   PANEL WORD
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
   DATOS GENERALES
===================================================== */


function obtenerDatosDocumento(){



return {


evaluacion:

(

SPAE.evaluacion?.nombre

||

SPAE.evaluacion?.titulo

||

""

).toUpperCase(),




programa:

(

SPAE.curso?.programa

||

""

).toUpperCase(),




curso:

(

SPAE.curso?.nombre

||

SPAE.curso?.curso

||

""

).toUpperCase(),




tiempo:

SPAE.evaluacion?.tiempo || ""



};


}









/* =====================================================
   TIPO DE PREGUNTA
===================================================== */


function esOpcionMultiple(p){


return (

p.tipo === "opcion_multiple"

);



}





function esCaso(p){


return (

p.tipo === "caso_aplicacion"

||

p.tipo === "caso_analisis"

);



}









/* =====================================================
   VISTA ESTUDIANTE
===================================================== */


function construirDocumentoEstudiante(){



const datos =

obtenerDatosDocumento();





let texto = "";





texto +=

"EXAMEN\n\n";





texto +=

"Evaluación: "

+

datos.evaluacion

+

"\n";





texto +=

"Programa: "

+

datos.programa

+

"\n";





texto +=

"Curso: "

+

datos.curso

+

"\n";





texto +=

"Tiempo: "

+

datos.tiempo

+

" minutos\n\n";








texto +=

"INSTRUCCIONES\n\n";








SPAE.preguntas.forEach(

(p,index)=>{



texto +=

"================================\n";



texto +=

"PREGUNTA "

+

(index+1)

+

"\n";



texto +=

"================================\n\n";









if(esCaso(p)){



texto +=

"SITUACIÓN:\n\n"

+

(p.situacion || "")

+

"\n\n";



texto +=

"PREGUNTA:\n\n"

+

(p.pregunta || p.preguntas || "")

+

"\n\n";



}






else{



texto +=

(p.contenido || "")

+

"\n\n";



}









if(esOpcionMultiple(p)

&&

Array.isArray(p.alternativas)

){



p.alternativas.forEach(

(a,i)=>{



texto +=

String.fromCharCode(65+i)

+

". "

+

a

+

"\n";



}

);



}









texto +=

"\nRespuesta:\n\n";



texto +=

"____________________________________\n\n\n";



}

);







return texto;


}









/* =====================================================
   VISTA DOCENTE
===================================================== */


function construirDocumentoDocente(){



const datos =

obtenerDatosDocumento();





let texto = "";





texto +=

"CLAVE DOCENTE\n\n";





texto +=

"Evaluación: "

+

datos.evaluacion

+

"\n";





texto +=

"Programa: "

+

datos.programa

+

"\n";





texto +=

"Curso: "

+

datos.curso

+

"\n\n";









SPAE.preguntas.forEach(

(p,index)=>{



texto +=

"================================\n";



texto +=

"PREGUNTA "

+

(index+1)

+

"\n";



texto +=

"================================\n\n";









if(esCaso(p)){



texto +=

"SITUACIÓN:\n\n"

+

(p.situacion || "")

+

"\n\n";



texto +=

"PREGUNTA:\n\n"

+

(p.pregunta || p.preguntas || "")

+

"\n\n";



}







else{



texto +=

"ENUNCIADO:\n\n"

+

(p.contenido || "")

+

"\n\n";



}









if(esOpcionMultiple(p)

&&

Array.isArray(p.alternativas)

){



texto +=

"ALTERNATIVAS:\n\n";






p.alternativas.forEach(

(a,i)=>{



texto +=

String.fromCharCode(65+i)

+

". "

+

a

+

"\n";



}

);






texto +=

"\n";



}








texto +=

"COMPETENCIA: "

+

(p.competencia || "")

+

"\n";






texto +=

"RESULTADO: "

+

(p.resultado || "")

+

"\n";








texto +=

"RESPUESTA CORRECTA:\n"

+

(p.respuestaCorrecta || "")

+

"\n\n";








texto +=

"JUSTIFICACIÓN:\n"

+

(p.justificacion || "")

+

"\n\n";








texto +=

"RESPUESTA ESPERADA:\n"

+

(p.respuestaEsperada || "")

+

"\n\n";








texto +=

"CRITERIOS:\n"

+

(p.criterios || "")

+

"\n\n";





}

);







return texto;


}









/* =====================================================
   EXPORTAR ESTUDIANTE
===================================================== */


function exportarWordEstudiante(){



generarArchivoWord(

construirDocumentoEstudiante(),

"Examen_Estudiante.doc"

);



}









/* =====================================================
   EXPORTAR DOCENTE
===================================================== */


function exportarWordDocente(){



generarArchivoWord(

construirDocumentoDocente(),

"Clave_Docente.doc"

);



}









/* =====================================================
   CREAR WORD UTF-8
===================================================== */


function generarArchivoWord(contenido,nombre){



const html =

`

<!DOCTYPE html>

<html lang="es">

<head>

<meta charset="UTF-8">

</head>


<body>


${

contenido.replace(

/\n/g,

"<br>"

)

}


</body>


</html>

`;







const blob =

new Blob(

[html],

{

type:

"application/msword"

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



zona.innerHTML =

`

<p>

<strong>

${texto}

</strong>

</p>

`;



}



}








/* =====================================================

FIN MÓDULO 7C v4

===================================================== */
