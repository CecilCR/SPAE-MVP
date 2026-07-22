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
   
   SPAE MVP v3.1

   BLOQUE 2/3

   MÓDULO 3B

   BANCO DE PREGUNTAS DINÁMICO


===================================================== */



/* =====================================================
   RENDER BANCO DE PREGUNTAS
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


<select id="tipoPregunta"
onchange="cambiarTipoPregunta()">


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
   FORMULARIOS DINÁMICOS
===================================================== */


function renderEditorPorTipo(tipo){


let html="";





if(tipo==="opcion_multiple"){


html += `


<label>

Contenido

</label>


<textarea id="contenidoPregunta"
rows="5"></textarea>



<h3>

Alternativas

</h3>



<input id="altA"
placeholder="Alternativa A">


<br><br>


<input id="altB"
placeholder="Alternativa B">


<br><br>


<input id="altC"
placeholder="Alternativa C">


<br><br>


<input id="altD"
placeholder="Alternativa D">


<br><br>



<label>

Respuesta correcta

</label>


<select id="respuestaCorrecta">


<option>A</option>

<option>B</option>

<option>C</option>

<option>D</option>


</select>


`;



}







if(tipo==="caso_analisis"){


html += `


<label>

Contexto

</label>


<textarea id="contextoPregunta"
rows="7"></textarea>



<br><br>



<label>

Pregunta

</label>


<textarea id="preguntaTexto"
rows="4"></textarea>



`;



}







if(tipo==="caso_aplicacion"){


html += `


<label>

Contexto

</label>


<textarea id="contextoPregunta"
rows="7"></textarea>



<br><br>



<label>

Pregunta

</label>


<textarea id="preguntaTexto"
rows="4"></textarea>



`;



}








if(tipo==="abierta"){


html += `


<label>

Pregunta

</label>


<textarea id="preguntaTexto"
rows="4"></textarea>



`;



}







html += `


<br><br>


<label>

Competencia

</label>


<input id="competenciaPregunta"
placeholder="Ejemplo: ANÁLISIS">



<br><br>



<label>

Resultado

</label>


<input id="resultadoPregunta"
placeholder="Ejemplo: APLICACIÓN">



<br><br>



<label>

Respuesta esperada

</label>


<textarea id="respuestaEsperada"
rows="4"></textarea>




<br><br>



<label>

Criterios

</label>


<textarea id="criteriosPregunta"
rows="4"></textarea>




<br><br>



<label>

Retroalimentación

</label>


<textarea id="retroalimentacionPregunta"
rows="4"></textarea>




<br><br>



<button onclick="guardarPreguntaSPAE()">

Guardar pregunta

</button>



<div id="mensajePregunta">

</div>



`;





return html;



}









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



tipo: tipo,



contenido:"",


contexto:"",


pregunta:"",


alternativas:[],


respuestaCorrecta:"",



competencia:
document.getElementById(
"competenciaPregunta"
).value.trim(),



resultado:
document.getElementById(
"resultadoPregunta"
).value.trim(),



respuestaEsperada:
document.getElementById(
"respuestaEsperada"
).value.trim(),



criterios:
document.getElementById(
"criteriosPregunta"
).value.trim(),



retroalimentacion:
document.getElementById(
"retroalimentacionPregunta"
).value.trim()



};








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










if(

tipo==="caso_analisis"

||

tipo==="caso_aplicacion"

){



pregunta.contexto =

document.getElementById(

"contextoPregunta"

).value.trim();




pregunta.pregunta =

document.getElementById(

"preguntaTexto"

).value.trim();



}







if(tipo==="abierta"){



pregunta.pregunta =

document.getElementById(

"preguntaTexto"

).value.trim();



}








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

Pregunta registrada correctamente.

</p>

`;





document.getElementById(

"listaPreguntas"

).innerHTML =

listarPreguntasSPAE();



}









/* =====================================================
   LISTADO
===================================================== */


function listarPreguntasSPAE(){



if(

SPAE.preguntas.length===0

){



return `


<p>

No existen preguntas registradas.

</p>


`;



}







let html="";





SPAE.preguntas.forEach(

(p,index)=>{



html += `


<div class="card">


<h4>

Pregunta ${index+1}

</h4>


<p>

Tipo: ${p.tipo}

</p>


<p>

${

p.contenido ||

p.contexto ||

p.pregunta ||

"Sin contenido"

}

</p>


</div>



`;



});





return html;



}









/* =====================================================
   BLUEPRINT AUTOMÁTICO
===================================================== */


function actualizarBlueprint(){



SPAE.blueprint = {


preguntasMCQ:

SPAE.preguntas.filter(

p=>p.tipo==="opcion_multiple"

).length,



casos:

SPAE.preguntas.filter(

p=>

p.tipo==="caso_analisis"

||

p.tipo==="caso_aplicacion"

).length,



abiertas:

SPAE.preguntas.filter(

p=>p.tipo==="abierta"

).length



};



}
