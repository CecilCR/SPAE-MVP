/* =====================================================
   SPAE MVP v3.3

   QUESTION BANK MODULE

   Banco Profesional de Preguntas

   Responsabilidades:
   - Cargar banco externo JSON
   - Gestionar preguntas almacenadas
   - Buscar y filtrar preguntas
   - Importar preguntas al examen activo

   NO modifica:
   - exam-module.js
   - dashboard.js
   - exporter.js
   - estructura principal SPAE

===================================================== */



/* =====================================================
   ESTADO DEL BANCO
===================================================== */


let SPAE_BANK = {


    version: "1.0",


    preguntas: [],


    cargado: false,


    origen:

    "json/banco-preguntas.json"



};








/* =====================================================
   CARGAR BANCO JSON
===================================================== */


async function cargarBancoPreguntas(){


try{


const respuesta =

await fetch(

SPAE_BANK.origen

);





if(!respuesta.ok){


throw new Error(

"No se pudo cargar banco de preguntas"

);


}






const datos =

await respuesta.json();





SPAE_BANK.preguntas =

Array.isArray(datos.preguntas)

?

datos.preguntas

:

[];






SPAE_BANK.cargado = true;






console.log(

"Banco de preguntas cargado:",

SPAE_BANK.preguntas.length

);






return SPAE_BANK.preguntas;



}

catch(error){



console.error(

"Error cargando banco",

error

);





SPAE_BANK.preguntas=[];






return [];



}



}









/* =====================================================
   AGREGAR PREGUNTA AL BANCO
===================================================== */


function agregarPreguntaBanco(pregunta){



if(!pregunta){


return false;


}






const nuevaPregunta = {


id:

Date.now().toString(),



fecha:

new Date().toISOString(),



...pregunta



};







SPAE_BANK.preguntas.push(

nuevaPregunta

);







guardarBancoLocal();



return true;



}









/* =====================================================
   ELIMINAR PREGUNTA DEL BANCO
===================================================== */


function eliminarPreguntaBanco(id){



SPAE_BANK.preguntas =

SPAE_BANK.preguntas.filter(

p =>

p.id !== id

);





guardarBancoLocal();



}









/* =====================================================
   BUSCAR PREGUNTAS
===================================================== */


function buscarPreguntasBanco(texto){



if(!texto){


return SPAE_BANK.preguntas;


}





texto =

texto

.toLowerCase()

.trim();







return SPAE_BANK.preguntas.filter(

p=>{



const contenido =

JSON.stringify(p)

.toLowerCase();





return contenido.includes(texto);



}


);



}









/* =====================================================
   FILTRAR POR TIPO
===================================================== */


function filtrarPreguntasPorTipo(tipo){



if(!tipo || tipo==="todos"){


return SPAE_BANK.preguntas;


}





return SPAE_BANK.preguntas.filter(

p =>

p.tipo===tipo

);



}









/* =====================================================
   FILTRAR POR NIVEL BLOOM
===================================================== */


function filtrarPreguntasPorNivel(nivel){



if(!nivel || nivel==="todos"){


return SPAE_BANK.preguntas;


}





return SPAE_BANK.preguntas.filter(

p =>

p.nivelCognitivo===nivel

);



}









/* =====================================================
   OBTENER PREGUNTA POR ID
===================================================== */


function obtenerPreguntaBanco(id){



return SPAE_BANK.preguntas.find(

p =>

p.id===id

);



}









/* =====================================================
   INSERTAR PREGUNTA EN EXAMEN ACTUAL
===================================================== */


function agregarPreguntaBancoAExamen(id){



const pregunta =

obtenerPreguntaBanco(id);





if(!pregunta){


console.error(

"Pregunta no encontrada"

);


return false;


}







if(!SPAE.preguntas){


SPAE.preguntas=[];


}






const copia =

JSON.parse(

JSON.stringify(pregunta)

);






/*

Nuevo identificador

para evitar conflictos

*/


copia.id =

Date.now().toString();






SPAE.preguntas.push(

copia

);






if(typeof actualizarBlueprint === "function"){


actualizarBlueprint();


}







if(typeof guardarSPAE === "function"){


guardarSPAE();


}







return true;



}









/* =====================================================
   EXPORTAR BANCO A JSON
===================================================== */


function exportarBancoPreguntas(){



const contenido =

JSON.stringify(

{

version:

SPAE_BANK.version,


preguntas:

SPAE_BANK.preguntas


},

null,

4

);







const blob =

new Blob(

[contenido],

{


type:

"application/json;charset=utf-8"


}

);







const enlace =

document.createElement("a");





enlace.href =

URL.createObjectURL(blob);






enlace.download =

"banco-preguntas.json";





enlace.click();



}









/* =====================================================
   PERSISTENCIA LOCAL
===================================================== */


function guardarBancoLocal(){



localStorage.setItem(

"SPAE_BANK",

JSON.stringify(

SPAE_BANK

)

);



}









/* =====================================================
   RECUPERAR BANCO LOCAL
===================================================== */


function recuperarBancoLocal(){



const datos =

localStorage.getItem(

"SPAE_BANK"

);






if(datos){



try{


SPAE_BANK =

JSON.parse(datos);



}

catch(error){


console.error(

"Error recuperando banco local",

error

);



}



}



}









/* =====================================================
   NORMALIZACIÓN
===================================================== */


function normalizarPreguntaBanco(p){



return {


id:

p.id ||

Date.now().toString(),



tipo:

p.tipo ||

"opcion_multiple",



contenido:

p.contenido ||

"",



alternativas:

p.alternativas ||

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
   PREPARACIÓN DEL BANCO
===================================================== */


async function prepararBancoPreguntas(){



recuperarBancoLocal();





if(

!SPAE_BANK.cargado

){


await cargarBancoPreguntas();


}






SPAE_BANK.preguntas =

SPAE_BANK.preguntas.map(

normalizarPreguntaBanco

);






guardarBancoLocal();



console.log(

"Banco preparado correctamente"

);



}









/* =====================================================
   INICIALIZACIÓN SEGURA

===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


prepararBancoPreguntas();


}

);
