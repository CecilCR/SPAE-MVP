/* =====================================================

   SPAE MVP v3.3

   QUESTION BANK MODULE

   Banco externo de preguntas

   Archivo:
   js/question-bank-module.js


   OBJETIVO:

   - Mantener banco independiente de SPAE
   - Cargar json/banco-preguntas.json
   - Normalizar preguntas
   - Transferir preguntas seleccionadas al examen


===================================================== */



/* =====================================================
   BANCO GLOBAL EXTERNO
===================================================== */


let BANCO_PREGUNTAS = [];





/* =====================================================
   ESTADO DEL BANCO
===================================================== */


let ESTADO_BANCO = {


    cargado:false,


    fechaCarga:null,


    total:0


};







/* =====================================================
   CARGAR BANCO JSON EXTERNO
===================================================== */


async function cargarBancoPreguntasJSON(){


try{



const respuesta = await fetch(

"json/banco-preguntas.json"

);



if(!respuesta.ok){


throw new Error(

"No existe banco-preguntas.json"

);


}






const datos = await respuesta.json();





if(!Array.isArray(datos)){


throw new Error(

"El archivo JSON debe contener un arreglo"

);


}







BANCO_PREGUNTAS = datos.map(

pregunta =>

normalizarPreguntaBanco(pregunta)

);








ESTADO_BANCO.cargado = true;


ESTADO_BANCO.fechaCarga =

new Date().toISOString();


ESTADO_BANCO.total =

BANCO_PREGUNTAS.length;







console.log(

"Banco de preguntas cargado:",

BANCO_PREGUNTAS.length

);





if(typeof renderListaBancoPreguntas === "function"){


const lista =

document.getElementById(

"listaBancoPreguntas"

);



if(lista){


lista.innerHTML =

renderListaBancoPreguntas();


}



}



return BANCO_PREGUNTAS;




}

catch(error){



console.error(

"Error cargando banco de preguntas",

error

);



BANCO_PREGUNTAS=[];



ESTADO_BANCO.cargado=false;



alert(

"No se pudo cargar banco-preguntas.json"

);



return [];



}



}








/* =====================================================
   NORMALIZAR PREGUNTA DEL BANCO
===================================================== */


function normalizarPreguntaBanco(p){



return {



id:

p.id ||

"BP-"+Date.now(),





tipo:

p.tipo ||

"opcion_multiple",





contenido:

p.contenido ||

p.enunciado ||

"",





alternativas:

Array.isArray(

p.alternativas

)

?

p.alternativas

:

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

p.instruccion ||

"",





nivelCognitivo:

normalizarNivelBanco(

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
   NORMALIZAR BLOOM
===================================================== */


function normalizarNivelBanco(valor){



if(!valor){


return "ANALIZAR";


}





valor =

valor

.toString()

.toUpperCase()

.trim();






const mapa={


"RECORDAR":
"RECORDAR",


"COMPRENDER":
"COMPRENDER",


"APLICAR":
"APLICAR",


"APLICACION":
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






return mapa[valor]

||


"ANALIZAR";



}









/* =====================================================
   BUSCAR PREGUNTAS
===================================================== */


function buscarPreguntasBanco(texto){



if(!texto){


return BANCO_PREGUNTAS;


}



texto =

texto

.toLowerCase();





return BANCO_PREGUNTAS.filter(

p=>{


return (

p.contenido

.toLowerCase()

.includes(texto)

||


p.pregunta

.toLowerCase()

.includes(texto)

||


p.resultadoAprendizaje

.toLowerCase()

.includes(texto)


);



}

);



}









/* =====================================================
   FILTRAR POR TIPO
===================================================== */


function filtrarPreguntasBanco(tipo){



if(!tipo){


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
   IMPORTAR PREGUNTAS AL EXAMEN SPAE
===================================================== */


function importarPreguntasBancoSeleccionadas(indices){



if(

!Array.isArray(indices)

){


return;


}







if(!SPAE.preguntas){


SPAE.preguntas=[];


}








indices.forEach(

indice=>{



const pregunta =

BANCO_PREGUNTAS[indice];





if(!pregunta){

return;

}








const copia =

JSON.parse(

JSON.stringify(

pregunta

)

);







copia.id =

Date.now()

+

Math.random();







SPAE.preguntas.push(

copia

);




}

);







if(typeof actualizarBlueprint==="function"){


actualizarBlueprint();


}






if(typeof guardarSPAE==="function"){


guardarSPAE();


}





console.log(

"Preguntas importadas:",

indices.length

);



}









/* =====================================================
   IMPORTAR UNA PREGUNTA
===================================================== */


function importarPreguntaBanco(indice){



importarPreguntasBancoSeleccionadas(

[indice]

);


}









/* =====================================================
   EXPORTAR BANCO JSON
===================================================== */


function exportarBancoPreguntasJSON(){



const contenido =

JSON.stringify(

BANCO_PREGUNTAS,

null,

4

);





const blob =

new Blob(

[contenido],

{


type:

"application/json"

}


);





const enlace =

document.createElement(

"a"

);





enlace.href =

URL.createObjectURL(

blob

);





enlace.download =

"banco-preguntas.json";





enlace.click();



}








/* =====================================================
   INICIALIZACIÓN SEGURA
===================================================== */


function iniciarBancoPreguntas(){



if(

!Array.isArray(BANCO_PREGUNTAS)

){


BANCO_PREGUNTAS=[];


}





console.log(

"Modulo Banco Preguntas activo"

);



}






document.addEventListener(

"DOMContentLoaded",

()=>{


iniciarBancoPreguntas();


}

);
