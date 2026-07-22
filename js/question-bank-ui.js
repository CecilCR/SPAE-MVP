/* =====================================================
   SPAE MVP v3.3

   QUESTION BANK UI MODULE

   Archivo:
   js/question-bank-ui.js

   Responsabilidad:
   - Componentes visuales del banco de preguntas
   - Mensajes UI
   - Filtros
   - Acciones auxiliares

   NO modifica:
   - app.js
   - estado SPAE
   - lógica de persistencia

===================================================== */



/* =====================================================
   INICIALIZACIÓN UI BANCO
===================================================== */


function iniciarQuestionBankUI(){


console.log(
"Question Bank UI cargado correctamente"
);


}



/* =====================================================
   MENSAJES GENERALES
===================================================== */


function mostrarMensajeBanco(

elemento,

mensaje,

tipo="success"

){


const div =

document.getElementById(elemento);



if(!div){

return;

}



let clase =

tipo==="error"

?

"notice-error"

:

"notice";





div.innerHTML = `

<div class="${clase}">

${mensaje}

</div>

`;



}








/* =====================================================
   LIMPIAR EDITOR DE PREGUNTA
===================================================== */


function limpiarEditorPregunta(){



const campos = [


"contenidoPregunta",

"altA",

"altB",

"altC",

"altD",

"contextoPregunta",

"preguntaTexto",

"resultadoPregunta",

"respuestaEsperada",

"criteriosPregunta",

"retroalimentacionPregunta"


];





campos.forEach(

(id)=>{


const elemento =

document.getElementById(id);



if(elemento){

elemento.value="";


}


}

);



}





/* =====================================================
   BUSCADOR BANCO PREGUNTAS
===================================================== */


function buscarPreguntasSPAE(

texto

){



texto =

texto
.toLowerCase()
.trim();





if(!texto){

return listarPreguntasSPAE();


}






const preguntas =

SPAE.preguntas.filter(

p=>{


const contenido =


(

p.contenido ||

""

)

+

(

p.contexto ||

""

)

+

(

p.pregunta ||

""

)

+

(

p.resultadoAprendizaje ||

""

);





return contenido

.toLowerCase()

.includes(texto);



}

);







if(preguntas.length===0){


return `

<p>

No se encontraron preguntas.

</p>

`;



}







return preguntas.map(

(p,index)=>{


return `


<div class="card">


<h4>

Pregunta encontrada ${index+1}

</h4>



<p>

<strong>

Tipo:

</strong>

${nombreTipoPregunta(p.tipo)}

</p>



<p>

${

p.contenido ||

p.pregunta ||

""

}

</p>



</div>


`;



}

).join("");





}









/* =====================================================
   FILTRAR POR TIPO
===================================================== */


function filtrarPreguntasPorTipo(

tipo

){



if(

tipo==="todos"

){


return listarPreguntasSPAE();


}






const preguntas =

SPAE.preguntas.filter(

p=>

p.tipo===tipo

);





if(preguntas.length===0){


return `

<p>

No existen preguntas de este tipo.

</p>

`;



}







return preguntas.map(

(p,index)=>{


return `


<div class="card">


<h4>

${nombreTipoPregunta(p.tipo)}

</h4>



<p>

${

p.contenido ||

p.pregunta ||

""

}

</p>



</div>


`;


}

).join("");



}











/* =====================================================
   CONTADOR BANCO
===================================================== */


function actualizarContadorBanco(){



const contador =

document.getElementById(

"contadorPreguntas"

);





if(!contador){

return;

}





contador.innerHTML = `

Total preguntas:

<strong>

${

SPAE.preguntas.length

}

</strong>

`;



}











/* =====================================================
   EXPORTAR ESTADO UI
===================================================== */


window.SPAEQuestionBankUI = {


iniciarQuestionBankUI,


mostrarMensajeBanco,


limpiarEditorPregunta,


buscarPreguntasSPAE,


filtrarPreguntasPorTipo,


actualizarContadorBanco



};

