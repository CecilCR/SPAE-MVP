/* =====================================================
   SPAE MVP v3.1

   SISTEMA PROFESIONAL DE AUTORÍA DE EVALUACIONES

   BLOQUE 1/3

   - Estado global
   - Persistencia
   - Curso
   - Router
   - Evaluación

===================================================== */



/* =====================================================
   ESTADO GLOBAL SPAE
===================================================== */


let SPAE = {


    version: "SPAE MVP v3.1",


    fecha:
        new Date().toISOString(),


    curso: {


        nombre: "",

        programa: "",

        nivel: "",

        periodo: ""


    },


    evaluacion: {


        nombre: "",

        tipo: "sumativa",

        tiempo: 0,

        ponderacion: 0


    },


    competencias: [],


    resultados: [],


    preguntas: [],


    blueprint: {


        preguntasMCQ: 0,

        casos: 0,

        abiertas: 0


    }


};







/* =====================================================
   CARGAR PROYECTO GUARDADO
===================================================== */


function cargarSPAE(){


const datos =

localStorage.getItem(

"SPAE_MVP"

);



if(datos){


try{


SPAE =

JSON.parse(datos);



console.log(

"SPAE cargado correctamente"

);



}

catch(error){


console.error(

"Error cargando SPAE",

error

);



}



}



}







/* =====================================================
   GUARDAR PROYECTO
===================================================== */


function guardarSPAE(){



SPAE.fecha =

new Date().toISOString();




localStorage.setItem(

"SPAE_MVP",

JSON.stringify(SPAE)

);





console.log(

"SPAE guardado"

);



}









/* =====================================================
   MÓDULO 1

   CONTROL PRINCIPAL

   ROUTER

===================================================== */



function iniciarSPAE(){


try{


cargarSPAE();


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








function renderApp(){



const app =

document.getElementById(

"app"

);





if(!app){


console.error(

"Contenedor principal #app no encontrado"

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

Seleccione un módulo.

</h2>



</main>





</div>


`;



}









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


workspace.innerHTML =

`

<h3>

Módulo no encontrado

</h3>

`;



}



}










/* =====================================================
   MÓDULO 0

   CURSO

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

id="nombreCurso"

value="${SPAE.curso.nombre}"

>





<br><br>



<label>

Programa

</label>


<input

id="programaCurso"

value="${SPAE.curso.programa}"

>





<br><br>



<label>

Nivel

</label>


<input

id="nivelCurso"

value="${SPAE.curso.nivel}"

>





<br><br>



<label>

Periodo

</label>


<input

id="periodoCurso"

value="${SPAE.curso.periodo}"

>





<br><br>



<button onclick="guardarCursoSPAE()">

Guardar curso

</button>



<div id="mensajeCurso">

</div>



</section>


`;

}









function guardarCursoSPAE(){



SPAE.curso.nombre =

document.getElementById(

"nombreCurso"

).value.trim();





SPAE.curso.programa =

document.getElementById(

"programaCurso"

).value.trim();





SPAE.curso.nivel =

document.getElementById(

"nivelCurso"

).value.trim();





SPAE.curso.periodo =

document.getElementById(

"periodoCurso"

).value.trim();





guardarSPAE();





document.getElementById(

"mensajeCurso"

).innerHTML =


`

<p>

Curso guardado correctamente.

</p>

`;



}










/* =====================================================
   MÓDULO 2

   EVALUACIÓN

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

value="${SPAE.evaluacion.nombre}"

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

value="${SPAE.evaluacion.tiempo}"

>





<br><br>



<label>

Ponderación (%)

</label>


<input

id="ponderacionEvaluacion"

type="number"

value="${SPAE.evaluacion.ponderacion}"

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





guardarSPAE();





document.getElementById(

"mensajeEvaluacion"

).innerHTML =


`

<p>

Evaluación guardada correctamente.

</p>

`;



}
/* =====================================================
   INICIO SPAE
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


iniciarSPAE();


}

);
/* =====================================================

SPAE MVP v3.3

BLOQUE 2A/3

MÓDULO 3

BANCO DE PREGUNTAS

RENDER + EDITORES

===================================================== */





function renderPreguntas(){


return `



<section class="card">



<h2>

3. Banco de preguntas

</h2>




<label>

Tipo de pregunta

</label>




<select

id="tipoPregunta"

onchange="cambiarTipoPregunta()"

>



<option value="opcion_multiple">

Opción múltiple

</option>



<option value="caso_analisis">

Caso de análisis

</option>



<option value="caso_aplicacion">

Caso de aplicación

</option>



<option value="abierta">

Pregunta abierta

</option>



</select>





<div id="editorPregunta">



${renderEditorPorTipo("opcion_multiple")}



</div>





<hr>



<h3>

Preguntas registradas

</h3>



<div id="listaPreguntas">



${listarPreguntasSPAE()}



</div>



</section>



`;

}









/* =====================================================

CAMBIO DE TIPO DE PREGUNTA

===================================================== */


function cambiarTipoPregunta(){



const tipo =

document.getElementById(

"tipoPregunta"

).value;





document.getElementById(

"editorPregunta"

).innerHTML =



renderEditorPorTipo(tipo);



}









/* =====================================================

EDITOR SEGÚN TIPO

===================================================== */


function renderEditorPorTipo(tipo){



let formulario="";





/* ===============================
   OPCIÓN MÚLTIPLE
================================ */


if(tipo==="opcion_multiple"){



formulario += `



<label>

Contenido / Enunciado

</label>



<textarea

id="contenidoPregunta"

rows="6"

></textarea>





<h3>

Alternativas

</h3>




<label>

Alternativa A

</label>



<input

id="altA"

>





<label>

Alternativa B

</label>



<input

id="altB"

>





<label>

Alternativa C

</label>



<input

id="altC"

>





<label>

Alternativa D

</label>



<input

id="altD"

>





<label>

Respuesta correcta

</label>



<select

id="respuestaCorrecta"

>


<option>A</option>

<option>B</option>

<option>C</option>

<option>D</option>


</select>



`;



}





/* ===============================
   CASOS Y ABIERTAS
================================ */



else{


formulario += `



<label>

Contexto

</label>




<textarea

id="contextoPregunta"

rows="8"

placeholder="Situación profesional u organizacional"

></textarea>





<br><br>





<label>

Pregunta / Instrucción

</label>




<textarea

id="preguntaTexto"

rows="6"

placeholder="Pregunta que debe responder el estudiante o tarea que debe desarrollar"

></textarea>




`;



}







/* ===============================
   CAMPOS COMUNES
================================ */



formulario += `



<br><br>



<label>

Nivel cognitivo (Bloom)

</label>



<select

id="competenciaPregunta"

>



<option value="RECORDAR">

Recordar

</option>



<option value="COMPRENDER">

Comprender

</option>



<option value="APLICAR">

Aplicar

</option>



<option value="ANALIZAR">

Analizar

</option>



<option value="EVALUAR">

Evaluar

</option>



<option value="CREAR">

Crear

</option>



</select>







<br><br>





<label>

Resultado de aprendizaje

</label>




<textarea

id="resultadoPregunta"

rows="3"

placeholder="Ejemplo: Analiza situaciones organizacionales identificando causas y alternativas de intervención."

></textarea>







<br><br>





<label>

Respuesta esperada

</label>




<textarea

id="respuestaEsperada"

rows="5"

></textarea>







<br><br>





<label>

Criterios de evaluación

</label>




<textarea

id="criteriosPregunta"

rows="5"

></textarea>







<br><br>





<label>

Retroalimentación

</label>




<textarea

id="retroalimentacionPregunta"

rows="5"

></textarea>







<br><br>





<button

onclick="guardarPreguntaSPAE()"

>

Guardar pregunta

</button>





<div id="mensajePregunta">

</div>



`;





return formulario;



}
/* =====================================================

SPAE MVP v3.3

BLOQUE 2B/3

GUARDADO
NORMALIZACIÓN
LISTADO

===================================================== */







/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPreguntaSPAE(){



const tipo =

document.getElementById(

"tipoPregunta"

).value;





let pregunta = {


id:

Date.now().toString(),



tipo:



tipo,



contenido:"",



alternativas:[],



respuestaCorrecta:"",



contexto:"",



pregunta:"",



nivelCognitivo:"",



resultadoAprendizaje:"",



respuestaEsperada:"",



criterios:"",



retroalimentacion:""



};







/* =====================================
   OPCIÓN MÚLTIPLE
===================================== */


if(tipo==="opcion_multiple"){



pregunta.contenido =

document.getElementById(

"contenidoPregunta"

).value.trim();





pregunta.alternativas = [


document.getElementById("altA").value.trim(),


document.getElementById("altB").value.trim(),


document.getElementById("altC").value.trim(),


document.getElementById("altD").value.trim()


];





pregunta.respuestaCorrecta =

document.getElementById(

"respuestaCorrecta"

).value;



}







/* =====================================
   CASOS Y ABIERTAS
===================================== */


else{



pregunta.contexto =

document.getElementById(

"contextoPregunta"

).value.trim();





pregunta.pregunta =

document.getElementById(

"preguntaTexto"

).value.trim();



}








/* =====================================
   CAMPOS COMUNES
===================================== */



pregunta.nivelCognitivo =

document.getElementById(

"competenciaPregunta"

).value;







pregunta.resultadoAprendizaje =

document.getElementById(

"resultadoPregunta"

).value.trim();







pregunta.respuestaEsperada =

document.getElementById(

"respuestaEsperada"

).value.trim();







pregunta.criterios =

document.getElementById(

"criteriosPregunta"

).value.trim();







pregunta.retroalimentacion =

document.getElementById(

"retroalimentacionPregunta"

).value.trim();









SPAE.preguntas.push(

pregunta

);







actualizarBlueprint();







guardarSPAE();







document.getElementById(

"mensajePregunta"

).innerHTML =


`

<p>

Pregunta guardada correctamente.

</p>

`;







document.getElementById(

"listaPreguntas"

).innerHTML =

listarPreguntasSPAE();



}












/* =====================================================
   NORMALIZACIÓN DE DATOS
===================================================== */


function normalizarPreguntasSPAE(){



if(!SPAE.preguntas){


SPAE.preguntas=[];


return;


}







SPAE.preguntas =

SPAE.preguntas.map(p=>{





/*
 Compatibilidad versiones anteriores
*/



p.tipo =

p.tipo ||

"opcion_multiple";






p.contexto =

p.contexto ||

"";






p.pregunta =

p.pregunta ||

"";






p.resultadoAprendizaje =

p.resultadoAprendizaje ||

p.resultado ||

"";






p.nivelCognitivo =

p.nivelCognitivo ||

p.competencia ||

"";






p.respuestaEsperada =

p.respuestaEsperada ||

"";






p.criterios =

p.criterios ||

"";






p.retroalimentacion =

p.retroalimentacion ||

"";






p.alternativas =

p.alternativas ||

[];






return p;



});







guardarSPAE();



}













/* =====================================================
   NOMBRE TIPO PREGUNTA
===================================================== */


function nombreTipoPregunta(tipo){



const tipos={


"opcion_multiple":

"Opción múltiple",



"caso_analisis":

"Caso de análisis",



"caso_aplicacion":

"Caso de aplicación",



"abierta":

"Pregunta abierta"



};





return tipos[tipo] || tipo;



}









/* =====================================================
   LISTADO DE PREGUNTAS
===================================================== */



function listarPreguntasSPAE(){





if(!SPAE.preguntas ||

SPAE.preguntas.length===0){



return `


<p>

No existen preguntas registradas.

</p>


`;



}








return SPAE.preguntas.map(

(p,index)=>{





let contenido="";






if(

p.tipo==="opcion_multiple"

){



contenido = `



<strong>

Contenido:

</strong>


<br>


${p.contenido}



<br><br>



<strong>

Respuesta correcta:

</strong>


${p.respuestaCorrecta}



`;



}





else{



contenido = `



<strong>

Contexto:

</strong>


<br>


${p.contexto || "-"}





<br><br>





<strong>

Pregunta / Instrucción:

</strong>


<br>


${p.pregunta || "-"}



`;



}








return `



<div class="card">



<h4>

Pregunta ${index+1}

</h4>





<p>

<strong>

Tipo:

</strong>


${nombreTipoPregunta(p.tipo)}

</p>






<p>

<strong>

Nivel cognitivo:

</strong>


${mostrarNivelBloom(p.nivelCognitivo)}

</p>






<p>

<strong>

Resultado de aprendizaje:

</strong>


${obtenerResultadoPregunta(p)}

</p>





<p>

${contenido}

</p>



</div>



`;



}

).join("");



}
/* =====================================================

SPAE MVP v3.3

BLOQUE 2C/3

BLUEPRINT
MIGRACIÓN
COMPATIBILIDAD

===================================================== */








/* =====================================================
   ACTUALIZAR BLUEPRINT
===================================================== */


function actualizarBlueprint(){



if(!SPAE.blueprint){


SPAE.blueprint = {


preguntasMCQ:0,

casos:0,

abiertas:0


};


}






SPAE.blueprint.preguntasMCQ =

SPAE.preguntas.filter(

p=>

p.tipo==="opcion_multiple"

).length;








SPAE.blueprint.casos =

SPAE.preguntas.filter(

p=>

p.tipo==="caso_analisis"

||

p.tipo==="caso_aplicacion"

).length;








SPAE.blueprint.abiertas =

SPAE.preguntas.filter(

p=>

p.tipo==="abierta"

).length;







guardarSPAE();



}









/* =====================================================
   MIGRACIÓN DE PROYECTOS ANTIGUOS
===================================================== */



function migrarPreguntasSPAE(){



if(!SPAE.preguntas){



SPAE.preguntas=[];



return;



}







SPAE.preguntas =



SPAE.preguntas.map(p=>{





/*
 ===============================
 Tipo pregunta
 ===============================
*/



p.tipo =

p.tipo ||

"opcion_multiple";






/*
 ===============================
 Contexto
 ===============================
*/



if(

!p.contexto

&&

p.situacion

){


p.contexto =

p.situacion;


}






p.contexto =

p.contexto ||

"";






/*
 ===============================
 Pregunta
 ===============================
*/



p.pregunta =

p.pregunta ||

"";







/*
 ===============================
 Nivel cognitivo
 ===============================
*/



if(

!p.nivelCognitivo

&&

p.competencia

){



p.nivelCognitivo =

normalizarBloom(

p.competencia

);



}







p.nivelCognitivo =

p.nivelCognitivo ||

"ANALIZAR";








/*
 ===============================
 Resultado aprendizaje
 ===============================
*/



p.resultadoAprendizaje =

p.resultadoAprendizaje ||

p.resultado ||

"";








/*
 ===============================
 Retroalimentación
 ===============================
*/



if(

!p.retroalimentacion

&&

p.justificacion

){



p.retroalimentacion =

p.justificacion;


}






p.retroalimentacion =

p.retroalimentacion ||

"";







p.respuestaEsperada =

p.respuestaEsperada ||

"";






p.criterios =

p.criterios ||

"";







p.alternativas =

p.alternativas ||

[];







return p;



});








actualizarBlueprint();



guardarSPAE();



}









/* =====================================================
   NORMALIZAR BLOOM
===================================================== */


function normalizarBloom(valor){



if(!valor){

return "";

}



valor =

valor.toString()

.toUpperCase()

.trim();







const equivalencias={



"RECORDAR":

"RECORDAR",



"COMPRENDER":

"COMPRENDER",



"APLICAR":

"APLICAR",



"APLICACIÓN":

"APLICAR",



"ANALISIS":

"ANALIZAR",



"ANÁLISIS":

"ANALIZAR",



"ANALIZAR":

"ANALIZAR",



"EVALUAR":

"EVALUAR",



"CREAR":

"CREAR"



};







return equivalencias[valor]

||


valor;



}









/* =====================================================
   PREPARAR DATOS PARA EXPORTACIÓN JSON
===================================================== */



function prepararExportacionSPAE(){



migrarPreguntasSPAE();






return {


version:

SPAE.version,



fecha:

new Date().toISOString(),




curso:

SPAE.curso,



evaluacion:

SPAE.evaluacion,



competencias:

SPAE.competencias,



resultados:

SPAE.resultados,



preguntas:

SPAE.preguntas,



blueprint:

SPAE.blueprint



};



}
/* =====================================================

SPAE MVP v3.3

BLOQUE 2D/3

NORMALIZACIÓN
MIGRACIÓN
VALIDACIÓN PREGUNTAS

===================================================== */






/* =====================================================
   NORMALIZAR NIVEL BLOOM
===================================================== */


function normalizarNivelBloom(valor){


if(!valor){

return "ANALIZAR";

}



valor = valor
.toString()
.toUpperCase()
.trim();




const mapa = {


"RECORDAR":
"RECORDAR",


"COMPRENDER":
"COMPRENDER",


"APLICAR":
"APLICAR",


"APLICACIÓN":
"APLICAR",


"ANALISIS":
"ANALIZAR",


"ANÁLISIS":
"ANALIZAR",


"ANALIZAR":
"ANALIZAR",


"EVALUAR":
"EVALUAR",


"CREAR":
"CREAR"


};




return mapa[valor] || "ANALIZAR";



}








/* =====================================================
   TEXTO VISIBLE BLOOM
===================================================== */


function mostrarNivelBloom(valor){



const mapa={


"RECORDAR":
"Recordar",


"COMPRENDER":
"Comprender",


"APLICAR":
"Aplicar",


"ANALIZAR":
"Analizar",


"EVALUAR":
"Evaluar",


"CREAR":
"Crear"


};



return mapa[valor] || valor;



}









/* =====================================================
   MIGRAR PREGUNTA INDIVIDUAL
===================================================== */


function migrarPreguntaSPAE(p){



return {



id:

p.id ||

Date.now(),






tipo:

p.tipo ||

"opcion_multiple",






/* NUEVO MODELO */


contenido:

p.contenido ||

p.Contenido ||

"",





alternativas:

p.alternativas ||

p.Alternativas ||

[],






respuestaCorrecta:

p.respuestaCorrecta ||

"",





contexto:

p.contexto ||

p.situacion ||

"",






pregunta:

p.pregunta ||

"",





nivelCognitivo:

normalizarNivelBloom(

p.nivelCognitivo ||

p.competencia

),





resultadoAprendizaje:

p.resultadoAprendizaje ||

p.resultado ||

"",





respuestaEsperada:

p.respuestaEsperada ||

"",





criterios:

p.criterios ||

"",





retroalimentacion:

p.retroalimentacion ||

p.justificacion ||

""



};



}









/* =====================================================
   MIGRAR TODO EL BANCO
===================================================== */


function migrarBancoPreguntas(){



if(!Array.isArray(SPAE.preguntas)){


SPAE.preguntas=[];


return;


}





SPAE.preguntas =


SPAE.preguntas.map(

p=>

migrarPreguntaSPAE(p)

);





guardarSPAE();




console.log(

"Banco de preguntas migrado correctamente"

);



}









/* =====================================================
   DATOS PARA LISTADO
===================================================== */


function obtenerNivelPregunta(p){



return mostrarNivelBloom(

p.nivelCognitivo ||

p.competencia ||

"ANALIZAR"

);



}







function obtenerResultadoPregunta(p){



return (

p.resultadoAprendizaje ||

p.resultado ||

"NO DEFINIDO"

);



}









/* =====================================================
   VALIDACIÓN ANTES DE GUARDAR
===================================================== */


function validarPregunta(p){



let errores=[];






if(

!p.contenido &&

!p.contexto

){


errores.push(

"Debe ingresar contenido o contexto."

);


}







if(

p.tipo==="opcion_multiple"

&&

p.alternativas.length<4

){


errores.push(

"Debe completar las cuatro alternativas."

);


}







if(

!p.nivelCognitivo

){


errores.push(

"Debe seleccionar nivel cognitivo Bloom."

);


}







if(

!p.resultadoAprendizaje

){


errores.push(

"Debe ingresar resultado de aprendizaje."

);


}







return errores;



}









/* =====================================================
   INICIALIZACIÓN AUTOMÁTICA
===================================================== */


function prepararBancoSPAE(){



migrarBancoPreguntas();



}
/* =====================================================

SPAE MVP v3.3

BLOQUE 3A/3

VISTA PREVIA

ESTUDIANTE / DOCENTE

===================================================== */







/* =====================================================
   MÓDULO VISTA PREVIA
===================================================== */


function renderVistaPrevia(){


return `


<section class="card">


<h2>

5. Vista previa

</h2>



<p>

Seleccione la versión que desea visualizar.

</p>




<button onclick="mostrarVistaEstudiante()">

Vista estudiante

</button>




<button onclick="mostrarVistaDocente()">

Vista docente

</button>





<div id="vistaPreviaContenido">


</div>




</section>


`;

}









/* =====================================================
   VISTA ESTUDIANTE
===================================================== */


function mostrarVistaEstudiante(){



const contenedor =

document.getElementById(

"vistaPreviaContenido"

);




if(!contenedor){

return;

}







contenedor.innerHTML = `



<div class="examen">



<h2>

EXAMEN

</h2>



<p>

Evaluación:

${SPAE.evaluacion.nombre}

</p>



<p>

Programa:

${SPAE.curso.programa}

</p>




<p>

Curso:

${SPAE.curso.nombre}

</p>




<p>

Tiempo:

${SPAE.evaluacion.tiempo}

minutos

</p>




<hr>



${SPAE.preguntas

.map(

(p,index)=>

renderPreguntaEstudiante(

p,

index+1

)

)

.join("")}



</div>


`;



}









/* =====================================================
   VISTA DOCENTE
===================================================== */


function mostrarVistaDocente(){



const contenedor =

document.getElementById(

"vistaPreviaContenido"

);





if(!contenedor){

return;

}








contenedor.innerHTML = `



<div class="documento-docente">



<h2>

CLAVE DOCENTE

</h2>




<p>

Evaluación:

${SPAE.evaluacion.nombre}

</p>




<p>

Programa:

${SPAE.curso.programa}

</p>




<p>

Curso:

${SPAE.curso.nombre}

</p>





<hr>




${SPAE.preguntas

.map(

(p,index)=>

renderPreguntaDocente(

p,

index+1

)

)

.join("")}



</div>



`;



}









/* =====================================================
   RENDER PREGUNTA ESTUDIANTE
===================================================== */


function renderPreguntaEstudiante(

p,

numero

){



let html = `



<section class="pregunta">



<h3>

PREGUNTA ${numero}

</h3>





`;







/*
 OPCIÓN MÚLTIPLE
*/



if(

p.tipo==="opcion_multiple"

){



html += `



<p>

${p.contenido}

</p>



`;





if(p.alternativas){



html += p.alternativas

.map(

(a,i)=>`



<p>

${String.fromCharCode(65+i)}.

${a}

</p>

`

)

.join("");



}



}







/*
 CASOS Y ABIERTAS
*/



else{



html += `



<p>

${p.contexto}

</p>




<p>

${p.pregunta}

</p>



`;



}







html += `



<br>



Respuesta:

________________________



</section>



`;







return html;



}









/* =====================================================
   RENDER PREGUNTA DOCENTE
===================================================== */


function renderPreguntaDocente(

p,

numero

){



let html = `



<section class="pregunta-docente">



<h3>

PREGUNTA ${numero}

</h3>



`;







if(

p.tipo==="opcion_multiple"

){



html += `



<strong>

ENUNCIADO:

</strong>



<p>

${p.contenido}

</p>



<strong>

ALTERNATIVAS:

</strong>



`;





html += p.alternativas

.map(

(a,i)=>



<p>

${String.fromCharCode(65+i)}.

${a}

</p>



)

.join("");





html += `



<p>

<strong>

Respuesta correcta:

</strong>


${p.respuestaCorrecta}

</p>



`;



}






else{



html += `



<strong>

CONTEXTO:

</strong>



<p>

${p.contexto}

</p>





<strong>

PREGUNTA / INSTRUCCIÓN:

</strong>



<p>

${p.pregunta}

</p>



`;



}







html += `



<p>

<strong>

Nivel cognitivo:

</strong>


${mostrarNivelBloom(

p.nivelCognitivo

)}



</p>






<p>

<strong>

Resultado de aprendizaje:

</strong>


${obtenerResultadoPregunta(p)}

</p>





<p>

<strong>

Respuesta esperada:

</strong>


${p.respuestaEsperada || "-"}

</p>





<p>

<strong>

Criterios:

</strong>


${p.criterios || "-"}

</p>





<p>

<strong>

Retroalimentación:

</strong>


${p.retroalimentacion || "-"}

</p>




<hr>



</section>



`;







return html;



}
/* =====================================================

SPAE MVP v3.3

BLOQUE 3B/3

EXPORTACIÓN PROFESIONAL

JSON
TXT ESTUDIANTE
TXT DOCENTE

===================================================== */







/* =====================================================
   MÓDULO EXPORTAR
===================================================== */


function renderExportar(){


return `


<section class="card">


<h2>

6. Exportar

</h2>



<p>

Seleccione el formato de exportación.

</p>




<button onclick="exportarJSONSPAE()">

Exportar proyecto JSON

</button>



<br><br>



<button onclick="exportarEstudianteTXT()">

Exportar examen estudiante

</button>



<br><br>



<button onclick="exportarDocenteTXT()">

Exportar clave docente

</button>



<div id="mensajeExportacion">


</div>



</section>


`;

}









/* =====================================================
   DESCARGA ARCHIVO UTF-8
===================================================== */


function descargarArchivo(

contenido,

nombre

){



const blob = new Blob(

[

"\ufeff" + contenido

],

{

type:

"text/plain;charset=utf-8"

}

);





const enlace =

document.createElement(

"a"

);





enlace.href =

URL.createObjectURL(blob);





enlace.download =

nombre;





document.body.appendChild(enlace);



enlace.click();





document.body.removeChild(enlace);



}









/* =====================================================
   EXPORTAR JSON
===================================================== */


function exportarJSONSPAE(){



const proyecto =

prepararExportacionSPAE();





const contenido =

JSON.stringify(

proyecto,

null,

4

);





const blob = new Blob(

[

"\ufeff" + contenido

],

{


type:

"application/json;charset=utf-8"


}

);





const enlace =

document.createElement(

"a"

);





enlace.href =

URL.createObjectURL(blob);





enlace.download =

"spae_proyecto.json";





enlace.click();





mostrarMensajeExportacion(

"Proyecto JSON exportado correctamente."

);



}









/* =====================================================
   EXPORTAR ESTUDIANTE TXT
===================================================== */


function exportarEstudianteTXT(){



const texto =

generarTextoEstudiante();





descargarArchivo(

texto,

"examen_estudiante.txt"

);





mostrarMensajeExportacion(

"Examen estudiante exportado."

);



}









/* =====================================================
   GENERAR TEXTO ESTUDIANTE
===================================================== */


function generarTextoEstudiante(){



let texto = "";





texto +=

"EXAMEN\n\n";






texto +=

"Evaluación: "

+

SPAE.evaluacion.nombre

+

"\n";





texto +=

"Programa: "

+

SPAE.curso.programa

+

"\n";





texto +=

"Curso: "

+

SPAE.curso.nombre

+

"\n";






texto +=

"Tiempo: "

+

SPAE.evaluacion.tiempo

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








if(

p.tipo==="opcion_multiple"

){





texto +=

p.contenido

+

"\n\n";







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



});







}



else{



texto +=

p.contexto

+

"\n\n";




texto +=

p.pregunta

+

"\n";



}






texto +=

"\nRespuesta:\n";





texto +=

"____________________________________\n\n";





}



);







return texto;



}









/* =====================================================
   EXPORTAR DOCENTE TXT
===================================================== */


function exportarDocenteTXT(){



const texto =

generarTextoDocente();





descargarArchivo(

texto,

"clave_docente.txt"

);





mostrarMensajeExportacion(

"Clave docente exportada."

);



}









/* =====================================================
   GENERAR TEXTO DOCENTE
===================================================== */


function generarTextoDocente(){



let texto = "";






texto +=

"CLAVE DOCENTE\n\n";





texto +=

"Evaluación: "

+

SPAE.evaluacion.nombre

+

"\n";






texto +=

"Programa: "

+

SPAE.curso.programa

+

"\n";






texto +=

"Curso: "

+

SPAE.curso.nombre

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








if(

p.tipo==="opcion_multiple"

){





texto +=

"ENUNCIADO:\n\n";





texto +=

p.contenido

+

"\n\n";






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



});







texto +=

"\nRESPUESTA CORRECTA: "

+

p.respuestaCorrecta

+

"\n\n";



}







else{





texto +=

"CONTEXTO:\n\n";



texto +=

p.contexto

+

"\n\n";






texto +=

"PREGUNTA / INSTRUCCIÓN:\n\n";



texto +=

p.pregunta

+

"\n\n";



}







texto +=

"Nivel cognitivo: "

+

mostrarNivelBloom(

p.nivelCognitivo

)

+

"\n";







texto +=

"Resultado de aprendizaje: "

+

obtenerResultadoPregunta(p)

+

"\n\n";






texto +=

"RESPUESTA ESPERADA:\n";



texto +=

(

p.respuestaEsperada || "-"

)

+

"\n\n";







texto +=

"CRITERIOS:\n";



texto +=

(

p.criterios || "-"

)

+

"\n\n";







texto +=

"RETROALIMENTACIÓN:\n";



texto +=

(

p.retroalimentacion || "-"

)

+

"\n\n";



}

);







return texto;



}









/* =====================================================
   MENSAJE EXPORTACIÓN
===================================================== */


function mostrarMensajeExportacion(mensaje){



const div =

document.getElementById(

"mensajeExportacion"

);




if(div){


div.innerHTML =

`

<p>

${mensaje}

</p>

`;


}



}

