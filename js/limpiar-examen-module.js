/* =====================================================

SPAE MVP

BLOQUE 10D

MÓDULO LIMPIAR EXAMEN

limpiar-examen-module.js


Responsabilidades:

- Eliminar preguntas del examen actual
- Mantener curso
- Mantener evaluación
- Mantener banco de preguntas
- Actualizar Blueprint
- Guardar estado SPAE


===================================================== */







/* =====================================================
   LIMPIAR PREGUNTAS DEL EXAMEN
===================================================== */


function limpiarPreguntasExamen(){



const confirmar = confirm(


"¿Está seguro de eliminar todas las preguntas del examen actual?"

);



if(!confirmar){


return false;


}








/*
 Verificar estructura SPAE
*/


if(

typeof SPAE === "undefined"

){


console.error(

"No existe objeto SPAE"

);


return false;


}







/*
 Eliminar solamente preguntas

 NO elimina:

 - Curso
 - Evaluación
 - Banco

*/


SPAE.preguntas = [];








/*
 Actualizar Blueprint

*/


if(

typeof actualizarBlueprint === "function"

){



actualizarBlueprint();



}








/*
 Guardar cambios

*/


if(

typeof guardarSPAE === "function"

){



guardarSPAE();



}








alert(

"Preguntas del examen eliminadas correctamente."

);



console.log(

"SPAE preguntas limpiadas."

);






return true;



}









/* =====================================================
   LIMPIAR EXAMEN COMPLETO
   (OPCIONAL PARA PRUEBAS)
===================================================== */


function limpiarEvaluacionCompleta(){



const confirmar = confirm(


"Se eliminarán preguntas y datos de la evaluación actual. ¿Continuar?"

);



if(!confirmar){



return false;



}






if(

typeof SPAE !== "undefined"

){



SPAE.preguntas=[];



SPAE.evaluacion={};



}





if(

typeof guardarSPAE === "function"

){



guardarSPAE();



}





alert(

"Evaluación limpiada."

);



return true;



}









/* =====================================================
   BOTÓN AUXILIAR UI
===================================================== */


function mostrarBotonLimpiarExamen(){



return `



<button

onclick="limpiarPreguntasExamen()"

>


Limpiar preguntas del examen


</button>



`;



}









/* =====================================================
   FIN MÓDULO 10D

===================================================== */
