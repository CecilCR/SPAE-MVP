/* =====================================================
   GUARDAR PREGUNTA v2
===================================================== */


function guardarPregunta(){



const tipo =

document.getElementById(
"tipoPregunta"
).value;



let pregunta = crearPreguntaBase();



pregunta.id = generateID();


pregunta.tipo = tipo;



pregunta.competencia =

document.getElementById(
"preguntaCompetencia"
).value;



pregunta.resultado =

document.getElementById(
"preguntaResultado"
).value;



pregunta.retroalimentacion =

document.getElementById(
"preguntaRetroalimentacion"
).value;



/* ==========================
   OPCIÓN MÚLTIPLE
========================== */


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



/* ==========================
   CASO APLICACIÓN
========================== */


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



/* ==========================
   CASO ANÁLISIS
========================== */


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



/* ==========================
   ABIERTA
========================== */


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



SPAE.preguntas.push(pregunta);



saveProject();



alert(

"Pregunta agregada correctamente."

);



renderApp();



}
