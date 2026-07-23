/* =====================================================

SPAE MVP

BLOQUE 9A

MÓDULO BANCO DE PREGUNTAS

question-bank-module.js


Responsabilidades:

- Cargar banco JSON externo
- Gestionar preguntas disponibles
- Importar preguntas al examen actual
- Mantener compatibilidad SPAE


===================================================== */





/* =====================================================
   ESTADO BANCO DE PREGUNTAS
===================================================== */


let BANCO_PREGUNTAS = [];

let BANCO_CARGADO = false;








/* =====================================================
   CARGAR BANCO JSON
===================================================== */


async function cargarBancoPreguntasJSON(){



try{


const respuesta =

await fetch(

"json/banco-preguntas.json"

);





if(!respuesta.ok){


throw new Error(

"No se pudo cargar banco-preguntas.json"

);


}





const datos =

await respuesta.json();






if(Array.isArray(datos)){


BANCO_PREGUNTAS = datos;


}

else{


BANCO_PREGUNTAS = [];


}





BANCO_CARGADO = true;





console.log(

"Banco de preguntas cargado:",

BANCO_PREGUNTAS.length

);



return BANCO_PREGUNTAS;



}

catch(error){



console.error(

"Error cargando banco de preguntas",

error

);





BANCO_PREGUNTAS=[];



return [];



}



}









/* =====================================================
   OBTENER BANCO
===================================================== */


function obtenerBancoPreguntas(){


return BANCO_PREGUNTAS;


}









/* =====================================================
   BUSCAR PREGUNTAS
===================================================== */


function buscarPreguntasBanco(

criterio=""

){



if(!criterio){


return BANCO_PREGUNTAS;


}





criterio =

criterio

.toLowerCase()

.trim();







return BANCO_PREGUNTAS.filter(

p=>{


return (



(p.contenido || "")

.toLowerCase()

.includes(criterio)



||



(p.resultadoAprendizaje || "")

.toLowerCase()

.includes(criterio)



||



(p.nivelCognitivo || "")

.toLowerCase()

.includes(criterio)



);



}


);



}









/* =====================================================
   FILTRAR POR TIPO
===================================================== */


function filtrarBancoPorTipo(tipo){



if(!tipo || tipo==="todos"){


return BANCO_PREGUNTAS;


}




return BANCO_PREGUNTAS.filter(

p=>

p.tipo===tipo


);



}









/* =====================================================
   OBTENER PREGUNTA POR ID
===================================================== */


function obtenerPreguntaBanco(id){



return BANCO_PREGUNTAS.find(

p=>

p.id===id


);



}









/* =====================================================
   NORMALIZAR PREGUNTA BANCO
===================================================== */


function normalizarPreguntaBanco(p){



return {



id:

Date.now().toString(),



tipo:

p.tipo ||

"opcion_multiple",



contenido:

p.contenido ||

"",



alternativas:

Array.isArray(p.alternativas)

?

p.alternativas

:

[],



respuestaCorrecta:

p.respuestaCorrecta ||

"",



contexto:

p.contexto ||

"",



pregunta:

p.pregunta ||

"",



nivelCognitivo:

p.nivelCognitivo ||

"ANALIZAR",



resultadoAprendizaje:

p.resultadoAprendizaje ||

"",



respuestaEsperada:

p.respuestaEsperada ||

"",



criterios:

p.criterios ||

"",



retroalimentacion:

p.retroalimentacion ||

""


};



}









/* =====================================================
   IMPORTAR PREGUNTA A SPAE
===================================================== */


function importarPreguntaBanco(id){


const pregunta =

obtenerPreguntaBanco(id);



if(!pregunta){


console.error(

"No existe pregunta en banco:",

id

);


return false;


}






if(!Array.isArray(SPAE.preguntas)){


SPAE.preguntas=[];


}







const existe =

SPAE.preguntas.some(

p =>

p.contenido === pregunta.contenido

);







if(existe){


console.warn(

"Pregunta ya importada:",

pregunta.id

);


return false;


}







const nuevaPregunta =

normalizarPreguntaBanco(

pregunta

);







SPAE.preguntas.push(

nuevaPregunta

);








if(typeof actualizarBlueprint==="function"){


actualizarBlueprint();


}







if(typeof guardarSPAE==="function"){


guardarSPAE();


}







console.log(

"Pregunta importada correctamente",

nuevaPregunta

);







return true;



}








const nuevaPregunta =

normalizarPreguntaBanco(

pregunta

);








SPAE.preguntas.push(

nuevaPregunta

);








if(typeof actualizarBlueprint==="function"){


actualizarBlueprint();


}







if(typeof guardarSPAE==="function"){


guardarSPAE();


}








console.log(

"Pregunta importada correctamente",

nuevaPregunta

);






return true;



}









/* =====================================================
   IMPORTAR VARIAS PREGUNTAS
===================================================== */


function importarPreguntasBanco(ids=[]){



let contador=0;





ids.forEach(

id=>{


if(

importarPreguntaBanco(id)

){


contador++;


}



}

);





return contador;



}









/* =====================================================
   CONTAR POR TIPO
===================================================== */


function resumenBancoPreguntas(){



return {



total:

BANCO_PREGUNTAS.length,



opcion_multiple:

BANCO_PREGUNTAS.filter(

p=>

p.tipo==="opcion_multiple"

).length,



casos:

BANCO_PREGUNTAS.filter(

p=>

p.tipo==="caso_analisis"

||

p.tipo==="caso_aplicacion"

).length,



abiertas:

BANCO_PREGUNTAS.filter(

p=>

p.tipo==="abierta"

).length



};



}









/* =====================================================
   INICIO AUTOMÁTICO
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


cargarBancoPreguntasJSON();



}

);
