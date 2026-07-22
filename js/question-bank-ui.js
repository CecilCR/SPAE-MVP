/* =====================================================
   SPAE MVP v3.3

   QUESTION BANK UI MODULE

   NO modifica módulos existentes

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


<div class="form-group">

<label>
Buscar pregunta
</label>

<input 
id="buscarBancoPregunta"
placeholder="Buscar por contenido, competencia o nivel..."
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

Cargar banco JSON

</button>



<button 
class="secondary-button"
onclick="importarPreguntaBancoSPAE()"
>

Agregar seleccionadas

</button>



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
function renderListaBancoPreguntas(){


if(
!Array.isArray(BANCO_PREGUNTAS) ||
BANCO_PREGUNTAS.length===0
){


return `

<div class="notice">

<p>
Banco de preguntas vacío.
Cargue banco-preguntas.json
</p>

</div>

`;

}



return BANCO_PREGUNTAS.map(

(p,index)=>{


return `


<div class="card">


<input 
type="checkbox"
class="preguntaBancoCheck"
value="${index}"
>


<strong>
Pregunta ${index+1}
</strong>


<p>
${p.contenido || p.pregunta || ""}
</p>


<p>

Nivel:

${p.nivelCognitivo || "-"}

</p>


<p>

Tipo:

${p.tipo || "-"}

</p>



</div>


`;


}

).join("");

}
