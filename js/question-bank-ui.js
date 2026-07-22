/* =====================================================
   SPAE MVP v3.3

   QUESTION BANK UI MODULE

   Archivo:
   js/question-bank-ui.js

   RESPONSABILIDAD:

   - Interfaz visual Banco de Preguntas
   - Navegación módulo 7
   - Listado banco externo JSON
   - Búsqueda y filtros
   - Selección para incorporar preguntas

   NO MODIFICA:
   - app.js
   - exam-module.js
   - exporter.js
   - dashboard.js

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

Repositorio pedagógico de preguntas reutilizables.

</p>



<hr>



<div class="form-group">


<label>

Buscar pregunta

</label>


<input

id="buscarBancoPregunta"

placeholder="Buscar por contenido, competencia o nivel cognitivo"

onkeyup="filtrarBancoPreguntas()"

>


</div>





<div class="form-group">


<label>

Tipo de pregunta

</label>


<select

id="filtroTipoBanco"

onchange="filtrarBancoPreguntas()"

>


<option value="">

Todas

</option>



<option value="opcion_multiple">

Opción múltiple

</option>



<option value="caso_analisis">

Caso análisis

</option>



<option value="caso_aplicacion">

Caso aplicación

</option>



<option value="abierta">

Abierta

</option>



</select>



</div>





<button

class="primary-button"

onclick="cargarBancoPreguntasJSON()"

>

Actualizar banco JSON

</button>





<br><br>



<div id="mensajeBancoPreguntas">


</div>





<hr>




<h3>

Preguntas disponibles

</h3>



<div id="listaBancoPreguntas">


${renderListaBancoPreguntas()}


</div>



</section>



`;

}









/* =====================================================
   LISTADO BANCO
===================================================== */


function renderListaBancoPreguntas(){



if(

typeof BANCO_PREGUNTAS === "undefined"

||

BANCO_PREGUNTAS.length===0

){


return `


<div class="notice">


<p>

Banco de preguntas vacío.

Cargue json/banco-preguntas.json

</p>


</div>


`;

}



return BANCO_PREGUNTAS

.map(

(p,index)=>{



return `



<div class="card">


<h4>

Pregunta ${index+1}

</h4>




<p>

<strong>

Tipo:

</strong>


${p.tipo || "-"}

</p>





<p>

<strong>

Nivel cognitivo:

</strong>


${p.nivelCognitivo || "-"}

</p>





<p>

<strong>

Resultado aprendizaje:

</strong>


${p.resultadoAprendizaje || "-"}

</p>




<p>

${mostrarContenidoBanco(p)}

</p>





<button

class="secondary-button"

onclick="importarPreguntaBanco(${index})"

>

Agregar al examen

</button>



</div>



`;



}

)

.join("");



}









/* =====================================================
   MOSTRAR CONTENIDO
===================================================== */


function mostrarContenidoBanco(p){



if(

p.tipo==="opcion_multiple"

){


return p.contenido || "";

}



return `


<strong>

Contexto:

</strong>

<br>

${p.contexto || ""}


<br><br>


<strong>

Pregunta:

</strong>

<br>

${p.pregunta || ""}


`;



}









/* =====================================================
   FILTRAR BANCO
===================================================== */


function filtrarBancoPreguntas(){



const texto =


(

document.getElementById(

"buscarBancoPregunta"

)?.value ||

""

)

.toLowerCase();





const tipo =


document.getElementById(

"filtroTipoBanco"

)?.value ||

"";





const resultado =


BANCO_PREGUNTAS.filter(

p=>{



const contenido =


JSON.stringify(p)

.toLowerCase();





const coincideTexto =


contenido.includes(texto);





const coincideTipo =


tipo===""

||

p.tipo===tipo;





return coincideTexto && coincideTipo;



}

);






const contenedor =


document.getElementById(

"listaBancoPreguntas"

);





if(!contenedor){

return;

}



contenedor.innerHTML =



resultado.length===0


?

`

<p>

No se encontraron preguntas.

</p>

`



:

resultado.map(

(p,index)=>



`

<div class="card">


<h4>

Pregunta encontrada

</h4>


<p>

${mostrarContenidoBanco(p)}

</p>


<button

onclick="importarPreguntaBanco(${BANCO_PREGUNTAS.indexOf(p)})"

>

Agregar al examen

</button>



</div>


`

)

.join("");



}









/* =====================================================
   IMPORTAR PREGUNTA AL EXAMEN ACTUAL
===================================================== */


function importarPreguntaBanco(index){



if(

!BANCO_PREGUNTAS[index]

){


alert(

"Pregunta no encontrada"

);


return;

}




if(

typeof SPAE === "undefined"

){


alert(

"SPAE no está disponible"

);


return;


}





const pregunta =


JSON.parse(

JSON.stringify(

BANCO_PREGUNTAS[index]

)

);






if(

!Array.isArray(SPAE.preguntas)

){


SPAE.preguntas=[];


}





pregunta.id =


Date.now().toString();






SPAE.preguntas.push(

pregunta

);






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

"Pregunta incorporada correctamente al examen."

);



}









/* =====================================================
   MENSAJE SISTEMA
===================================================== */


function mostrarMensajeBanco(mensaje){



const div =


document.getElementById(

"mensajeBancoPreguntas"

);





if(div){



div.innerHTML =



`

<div class="notice">

<p>

${mensaje}

</p>

</div>

`;



}



}









/* =====================================================
   REFRESCAR INTERFAZ
===================================================== */


function actualizarVistaBancoPreguntas(){



const lista =


document.getElementById(

"listaBancoPreguntas"

);





if(lista){



lista.innerHTML =


renderListaBancoPreguntas();



}



}



/* =====================================================
   FIN QUESTION BANK UI
===================================================== */
