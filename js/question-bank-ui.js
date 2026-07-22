/* =====================================================
   SPAE MVP v3.3

   MÓDULO BANCO DE PREGUNTAS
   INTERFAZ DE USUARIO

   Archivo:
   js/question-bank-ui.js

===================================================== */


/* =====================================================
   RENDER MÓDULO BANCO DE PREGUNTAS
===================================================== */


function renderBancoPreguntas(){


return `


<section class="card">


<h2>

7. Banco de preguntas

</h2>



<p>

Repositorio externo de preguntas reutilizables.

</p>



<hr>



<button

class="primary-button"

onclick="inicializarBanco()"

>

Cargar banco de preguntas

</button>




<br><br>





<div id="mensajeBancoPreguntas">


</div>





<h3>

Preguntas disponibles

</h3>




<div id="listaBancoPreguntas">


<p>

Presione "Cargar banco de preguntas".

</p>


</div>




<br>




<button

class="secondary-button"

onclick="importarSeleccionadas()"

>

Importar preguntas seleccionadas

</button>





</section>



`;



}








/* =====================================================
   MOSTRAR MENSAJE BANCO
===================================================== */


function mostrarMensajeBanco(mensaje){


const div =

document.getElementById(

"mensajeBancoPreguntas"

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








/* =====================================================
   RECARGAR LISTADO BANCO
===================================================== */


function actualizarVistaBanco(){



const lista =

document.getElementById(

"listaBancoPreguntas"

);



if(lista){


lista.innerHTML =

listarBancoPreguntas();


}



}








/* =====================================================
   SOBRESCRIBIR INICIALIZACIÓN
   CON ACTUALIZACIÓN VISUAL

===================================================== */


async function cargarBancoUI(){


try{


await cargarBancoPreguntasJSON();



actualizarVistaBanco();



mostrarMensajeBanco(

"Banco cargado correctamente."

);



}

catch(error){



console.error(

error

);



mostrarMensajeBanco(

"Error cargando banco de preguntas."

);



}



}








/* =====================================================
   SELECCIONAR TODAS
===================================================== */


function seleccionarTodasBanco(){



BANCO_PREGUNTAS.forEach(

(p,index)=>{


const check =

document.getElementById(

`preguntaBanco_${index}`

);



if(check){

check.checked = true;

}


}

);



}








/* =====================================================
   DESELECCIONAR TODAS
===================================================== */


function deseleccionarTodasBanco(){



BANCO_PREGUNTAS.forEach(

(p,index)=>{


const check =

document.getElementById(

`preguntaBanco_${index}`

);



if(check){

check.checked = false;

}


}

);



}








/* =====================================================
   ACTUALIZAR IMPORTACIÓN
===================================================== */


function importarDesdeBancoUI(){



const indices =

obtenerIndicesSeleccionadosBanco();



if(indices.length===0){


mostrarMensajeBanco(

"No hay preguntas seleccionadas."

);


return;


}




importarPreguntasBanco(indices);




mostrarMensajeBanco(

`${indices.length} preguntas incorporadas al examen.`

);



}








/* =====================================================
   ESTADÍSTICAS DEL BANCO
===================================================== */


function resumenBancoPreguntas(){



if(!BANCO_PREGUNTAS ||

BANCO_PREGUNTAS.length===0){


return "";

}



let total =

BANCO_PREGUNTAS.length;



let mcq =

BANCO_PREGUNTAS.filter(

p=>p.tipo==="opcion_multiple"

).length;




let casos =

BANCO_PREGUNTAS.filter(

p=>

p.tipo==="caso_analisis"

||

p.tipo==="caso_aplicacion"

).length;




let abiertas =

BANCO_PREGUNTAS.filter(

p=>

p.tipo==="abierta"

).length;



return `


<div class="summary">


<h3>

Resumen banco

</h3>


<p>

Total preguntas:

<strong>

${total}

</strong>

</p>


<p>

Opción múltiple:

<strong>

${mcq}

</strong>

</p>


<p>

Casos:

<strong>

${casos}

</strong>

</p>


<p>

Abiertas:

<strong>

${abiertas}

</strong>

</p>



</div>


`;



}








/* =====================================================
   EXTENSIÓN VISUAL DEL LISTADO
===================================================== */


function renderResumenBanco(){


const contenedor =

document.getElementById(

"mensajeBancoPreguntas"

);



if(contenedor){



contenedor.innerHTML =

resumenBancoPreguntas();



}



}
