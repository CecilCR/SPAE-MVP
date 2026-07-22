/* =====================================================
   SPAE MVP v3.3

   QUESTION BANK MODULE

   Archivo:
   js/question-bank-module.js

   Responsabilidad:
   - Gestionar banco externo de preguntas
   - Cargar JSON
   - Persistencia local
   - Buscar y filtrar preguntas
   - Importar preguntas al examen actual

   Compatibilidad:
   - app.js
   - SPAE.preguntas
   - Blueprint existente

===================================================== */



/* =====================================================
   ESTADO DEL BANCO DE PREGUNTAS
===================================================== */


let SPAE_BANK = {


    version:

    "SPAE QUESTION BANK v1.0",


    origen:

    "json/banco-preguntas.json",


    preguntas:

    [],


    cargado:

    false



};








/* =====================================================
   CARGAR BANCO DESDE JSON
===================================================== */


async function cargarBancoPreguntas(){


try{


const respuesta =

await fetch(

SPAE_BANK.origen

);





if(!respuesta.ok){


throw new Error(

"No se encontró banco-preguntas.json"

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






SPAE_BANK.preguntas =

SPAE_BANK.preguntas.map(

normalizarPreguntaBanco

);






guardarBancoLocal();






console.log(

"Banco cargado:",

SPAE_BANK.preguntas.length,

"preguntas"

);






return SPAE_BANK.preguntas;



}

catch(error){



console.warn(

"Banco externo no disponible:",

error.message

);





SPAE_BANK.preguntas=[];






return [];



}



}









/* =====================================================
   GUARDAR BANCO LOCAL
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





if(!datos){


return;


}





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









/* =====================================================
   PREPARAR BANCO
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
   NORMALIZACIÓN DE PREGUNTAS
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
   BUSCAR EN BANCO
===================================================== */


function buscarPreguntasBanco(texto){



if(

!texto ||

texto.trim()===""

){


return SPAE_BANK.preguntas;


}






texto =

texto

.toLowerCase()

.trim();






return SPAE_BANK.preguntas.filter(

p=>{



const cadena =


JSON.stringify(p)

.toLowerCase();






return cadena.includes(texto);



}

);



}









/* =====================================================
   FILTRAR POR TIPO
===================================================== */


function filtrarBancoPorTipo(tipo){



if(

!tipo ||

tipo==="todos"

){


return SPAE_BANK.preguntas;


}






return SPAE_BANK.preguntas.filter(

p=>

p.tipo===tipo

);



}









/* =====================================================
   FILTRAR POR NIVEL BLOOM
===================================================== */


function filtrarBancoPorNivel(nivel){



if(

!nivel ||

nivel==="todos"

){


return SPAE_BANK.preguntas;


}






return SPAE_BANK.preguntas.filter(

p=>

p.nivelCognitivo===nivel

);



}









/* =====================================================
   OBTENER PREGUNTA
===================================================== */


function obtenerPreguntaBanco(id){



return SPAE_BANK.preguntas.find(

p=>

p.id===id

);



}









/* =====================================================
   AGREGAR PREGUNTA AL EXAMEN ACTUAL
===================================================== */


function agregarPreguntaBancoAExamen(id){



const pregunta =

obtenerPreguntaBanco(id);





if(!pregunta){



console.error(

"Pregunta no encontrada en banco"

);



return false;



}







/*

Evita referencias compartidas

*/

const copia =

JSON.parse(

JSON.stringify(

pregunta

)

);







copia.id =

Date.now().toString();







if(

typeof SPAE === "undefined"

){



console.error(

"SPAE no disponible"

);



return false;



}








if(

!Array.isArray(

SPAE.preguntas

)

){



SPAE.preguntas=[];



}






SPAE.preguntas.push(

copia

);






if(

typeof actualizarBlueprint === "function"

){


actualizarBlueprint();


}






if(

typeof guardarSPAE === "function"

){


guardarSPAE();


}






return true;



}









/* =====================================================
   AGREGAR NUEVA PREGUNTA AL BANCO
===================================================== */


function agregarPreguntaAlBanco(pregunta){



const nueva =

normalizarPreguntaBanco(

pregunta

);






SPAE_BANK.preguntas.push(

nueva

);






guardarBancoLocal();






return nueva;



}









/* =====================================================
   ELIMINAR DEL BANCO
===================================================== */


function eliminarPreguntaBanco(id){



SPAE_BANK.preguntas =

SPAE_BANK.preguntas.filter(

p=>

p.id!==id

);






guardarBancoLocal();



}









/* =====================================================
   EXPORTAR BANCO
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
   INICIALIZACIÓN
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


prepararBancoPreguntas();


}

);
