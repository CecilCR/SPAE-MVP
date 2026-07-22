/* =====================================================
   SPAE MVP v3.3

   QUESTION BANK UI MODULE

   Archivo:
   js/question-bank-ui.js

   Responsabilidad:
   - Interfaz del banco de preguntas
   - Búsqueda
   - Filtros
   - Visualización
   - Importación al examen activo

   NO modifica:
   - app.js
   - exam-module.js
   - dashboard.js
   - exporter.js

===================================================== */



/* =====================================================
   RENDER PRINCIPAL BANCO DE PREGUNTAS
===================================================== */


function renderBancoPreguntas(){


return `


<section class="card bank-container">


<h2>

7. Banco profesional de preguntas

</h2>


<p>

Repositorio reutilizable de preguntas SPAE.

</p>



<div class="bank-toolbar">


<input

id="buscarBanco"

placeholder="Buscar preguntas..."

onkeyup="actualizarBusquedaBanco()"

>


<select

id="filtroTipoBanco"

onchange="actualizarFiltroBanco()"

>


<option value="todos">

Todos los tipos

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



<select

id="filtroNivelBanco"

onchange="actualizarFiltroBanco()"

>


<option value="todos">

Todos los niveles

</option>


<option value="RECORDAR">

Recordar

</option>


<option value="COMPRENDER">

Comprender

</option>


<option value="APLICAR">

Aplicar

</option>


<option value="ANALIZAR">

Analizar

</option>


<option value="EVALUAR">

Evaluar

</option>


<option value="CREAR">

Crear

</option>


</select>



</div>



<br>


<div id="contadorBanco">


</div>



<hr>



<div id="listaBancoPreguntas">


${renderListaBancoPreguntas()}


</div>



</section>


`;

}





/* =====================================================
   LISTAR PREGUNTAS DEL BANCO
===================================================== */


function renderListaBancoPreguntas(){



if(

typeof SPAE_BANK === "undefined"

){


return `

<p>

Banco no disponible.

</p>

`;

}



if(

!SPAE_BANK.preguntas ||

SPAE_BANK.preguntas.length===0

){


return `

<p>

No existen preguntas en el banco.

</p>

`;

}



return SPAE_BANK.preguntas.map(

(p,index)=>{


return `



<div class="bank-card">



<h4>

Pregunta ${index+1}

</h4>



<p>

<strong>

Tipo:

</strong>

${

nombreTipoPregunta(

p.tipo

)

}

</p>




<p>

<strong>

Nivel:

</strong>

${

mostrarNivelBloom(

p.nivelCognitivo

)

}

</p>




<p>

${

p.contenido ||

p.pregunta ||

p.contexto ||

""

}

</p>



<div class="bank-actions">


<button

class="primary-button"

onclick="usarPreguntaBanco('${p.id}')"

>

Agregar al examen

</button>



</div>



</div>



`;



}

).join("");



}









/* =====================================================
   ACTUALIZAR BÚSQUEDA
===================================================== */


function actualizarBusquedaBanco(){



const texto =

document.getElementById(

"buscarBanco"

).value;





let preguntas =

buscarPreguntasBanco(

texto

);





mostrarResultadosBanco(

preguntas

);



}









/* =====================================================
   FILTROS BANCO
===================================================== */


function actualizarFiltroBanco(){



const tipo =

document.getElementById(

"filtroTipoBanco"

).value;



const nivel =

document.getElementById(

"filtroNivelBanco"

).value;






let preguntas =

SPAE_BANK.preguntas;






if(tipo !== "todos"){


preguntas = preguntas.filter(

p =>

p.tipo===tipo

);


}





if(nivel !== "todos"){


preguntas = preguntas.filter(

p =>

p.nivelCognitivo===nivel

);


}






mostrarResultadosBanco(

preguntas

);



}









/* =====================================================
   MOSTRAR RESULTADOS
===================================================== */


function mostrarResultadosBanco(

preguntas

){



const contenedor =

document.getElementById(

"listaBancoPreguntas"

);





if(!contenedor){

return;

}





if(

preguntas.length===0

){


contenedor.innerHTML =

`

<p>

No se encontraron preguntas.

</p>

`;



return;


}





contenedor.innerHTML =

preguntas.map(

(p,index)=>{


return `



<div class="bank-card">


<h4>

Pregunta ${index+1}

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

p.contexto ||

p.pregunta

}

</p>



<button

class="primary-button"

onclick="usarPreguntaBanco('${p.id}')"

>

Agregar al examen

</button>



</div>


`;



}

).join("");





actualizarContadorBanco(

preguntas.length

);



}









/* =====================================================
   IMPORTAR AL EXAMEN ACTUAL
===================================================== */


function usarPreguntaBanco(id){



const resultado =

agregarPreguntaBancoAExamen(

id

);





if(resultado){



alert(

"Pregunta agregada al examen correctamente."

);





if(typeof actualizarBlueprint==="function"){


actualizarBlueprint();


}



}



}









/* =====================================================
   CONTADOR
===================================================== */


function actualizarContadorBanco(

cantidad

){



const contador =

document.getElementById(

"contadorBanco"

);





if(!contador){

return;

}



contador.innerHTML = `


Total preguntas disponibles:

<strong>

${cantidad}

</strong>


`;



}









/* =====================================================
   INICIALIZACIÓN UI
===================================================== */


function iniciarQuestionBankUI(){



console.log(

"Question Bank UI iniciado"

);



}









/* =====================================================
   API PÚBLICA
===================================================== */


window.SPAEQuestionBankUI = {


renderBancoPreguntas,


renderListaBancoPreguntas,


actualizarBusquedaBanco,


actualizarFiltroBanco,


usarPreguntaBanco,


actualizarContadorBanco,


iniciarQuestionBankUI


};
