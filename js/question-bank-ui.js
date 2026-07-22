/* =====================================================

SPAE MVP v3.3

QUESTION BANK UI MODULE

Interfaz Banco de Preguntas

NO MODIFICA:
- app.js
- exam-module.js
- dashboard.js

Depende de:
- question-bank-module.js

===================================================== */



/* =====================================================
   RENDER BANCO DE PREGUNTAS
===================================================== */


function renderBancoPreguntas(){


return `


<section class="card">


<h2>

7. Banco de preguntas

</h2>



<p>

Repositorio complementario de preguntas para importar al examen actual.

</p>




<div class="form-group">


<label>

Tipo de pregunta

</label>



<select id="filtroBancoPregunta"
onchange="filtrarBancoPreguntasUI()">



<option value="todos">

Todas

</option>



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


</div>





<button

class="primary-button"

onclick="cargarBancoPreguntasUI()"

>

Cargar banco JSON

</button>





<button

class="secondary-button"

onclick="importarSeleccionadasBanco()"

>

Importar seleccionadas

</button>





<hr>




<h3>

Preguntas disponibles

</h3>




<div id="listaBancoPreguntas">


<p>

Banco no cargado.

</p>


</div>





<div id="mensajeBancoPreguntas">


</div>





</section>



`;

}





/* =====================================================
   CARGAR BANCO DESDE MÓDULO PRINCIPAL
===================================================== */


function cargarBancoPreguntasUI(){


if(
typeof cargarBancoPreguntasJSON !== "function"
){


mostrarMensajeBanco(

"No está disponible el módulo de carga del banco."

);


return;

}



cargarBancoPreguntasJSON();


actualizarVistaBancoPreguntas();



}






/* =====================================================
   ACTUALIZAR LISTADO VISUAL
===================================================== */


function actualizarVistaBancoPreguntas(){


const contenedor =

document.getElementById(

"listaBancoPreguntas"

);




if(!contenedor){

return;

}




if(

typeof BANCO_PREGUNTAS === "undefined"

||

BANCO_PREGUNTAS.length===0

){


contenedor.innerHTML =

`

<p>

No existen preguntas disponibles en el banco.

</p>

`;



return;


}







contenedor.innerHTML =

BANCO_PREGUNTAS

.map(

(p,index)=>{



return `



<div class="card">



<input

type="checkbox"

class="checkBancoPregunta"

value="${index}"

>



<strong>

Pregunta ${index+1}

</strong>



<p>

Tipo:

${nombreTipoPregunta(p.tipo)}

</p>



<p>

${

p.contenido ||

p.contexto ||

"Sin contenido"

}

</p>





</div>



`;



}

)

.join("");



}









/* =====================================================
   FILTRO VISUAL
===================================================== */


function filtrarBancoPreguntasUI(){



const filtro =

document.getElementById(

"filtroBancoPregunta"

).value;





const contenedor =

document.getElementById(

"listaBancoPreguntas"

);





if(!contenedor){

return;

}






if(

typeof BANCO_PREGUNTAS==="undefined"

){

return;

}





let preguntas =

BANCO_PREGUNTAS;






if(filtro!=="todos"){



preguntas =

BANCO_PREGUNTAS.filter(

p=>

p.tipo===filtro

);



}






contenedor.innerHTML =

preguntas

.map(

(p,index)=>{



return `



<div class="card">



<input

type="checkbox"

class="checkBancoPregunta"

data-id="${p.id || index}"

>



<strong>

Pregunta ${index+1}

</strong>




<p>

Tipo:

${nombreTipoPregunta(p.tipo)}

</p>




<p>

${

p.contenido ||

p.contexto ||

"Sin contenido"

}

</p>




</div>



`;



}

)

.join("");



}









/* =====================================================
   IMPORTAR PREGUNTAS SELECCIONADAS
===================================================== */


function importarSeleccionadasBanco(){



if(

typeof BANCO_PREGUNTAS==="undefined"

){


mostrarMensajeBanco(

"Cargue primero el banco de preguntas."

);


return;


}





const seleccionadas =

Array.from(

document.querySelectorAll(

".checkBancoPregunta:checked"

)

);






if(

seleccionadas.length===0

){


mostrarMensajeBanco(

"No seleccionó preguntas."

);


return;


}





seleccionadas.forEach(

(check)=>{



let indice =

check.value ||

check.dataset.id;






let pregunta =

BANCO_PREGUNTAS[indice];





if(pregunta){



SPAE.preguntas.push(

JSON.parse(

JSON.stringify(pregunta)

)

);



}



});







if(

typeof actualizarBlueprint==="function"

){


actualizarBlueprint();


}







if(

typeof guardarSPAE==="function"

){


guardarSPAE();


}





mostrarMensajeBanco(

"Preguntas importadas correctamente."

);



}









/* =====================================================
   MENSAJES
===================================================== */


function mostrarMensajeBanco(texto){



const div =

document.getElementById(

"mensajeBancoPreguntas"

);





if(div){


div.innerHTML =


`

<p>

${texto}

</p>

`;


}



}









/* =====================================================
   COMPATIBILIDAD INICIAL
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


if(

typeof BANCO_PREGUNTAS==="undefined"

){



window.BANCO_PREGUNTAS=[];


}



}

);
