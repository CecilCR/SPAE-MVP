/* =====================================================
   SPAE MVP v4.0

   SISTEMA PROFESIONAL DE AUTORÍA DE EVALUACIONES

   BLOQUE 1/8

   NÚCLEO DEL SISTEMA

   - Estado global
   - Persistencia
   - Inicialización
   - Router
   - Estructura SPA

===================================================== */



/* =====================================================
   ESTADO GLOBAL SPAE
===================================================== */


let SPAE = {


    version: "SPAE MVP v4.0",


    fecha: new Date().toISOString(),


    curso: {

        nombre: "",
        programa: "",
        nivel: "",
        periodo: ""

    },


    evaluacion: {

        nombre: "",
        tipo: "sumativa",
        tiempo: 0,
        ponderacion: 0

    },


    competencias: [],


    resultados: [],


    preguntas: [],


    blueprint: {


        preguntasMCQ: 0,

        casos: 0,

        abiertas: 0


    }


};





/* =====================================================
   CARGAR PROYECTO
===================================================== */


function cargarSPAE(){


    const datos = localStorage.getItem(
        "SPAE_MVP"
    );


    if(datos){


        try{


            SPAE = JSON.parse(datos);


            console.log(
                "SPAE cargado correctamente"
            );


        }
        catch(error){


            console.error(
                "Error cargando SPAE",
                error
            );


        }


    }


}







/* =====================================================
   GUARDAR PROYECTO
===================================================== */


function guardarSPAE(){


    SPAE.fecha =
        new Date().toISOString();



    localStorage.setItem(

        "SPAE_MVP",

        JSON.stringify(SPAE)

    );


    console.log(
        "SPAE guardado"
    );


}









/* =====================================================
   INICIO SPAE
===================================================== */


function iniciarSPAE(){


    try{


        cargarSPAE();


        renderApp();


    }
    catch(error){


        console.error(

            "Error iniciando SPAE",

            error

        );


    }


}









/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderApp(){


    const app =
        document.getElementById(
            "app"
        );



    if(!app){


        console.error(

            "No existe contenedor #app"

        );


        return;


    }






    app.innerHTML = `



<div class="spae-layout">



<aside class="menu">



<h3>

SPAE MVP

</h3>




<button onclick="abrirModulo('curso')">

1. Curso

</button>




<button onclick="abrirModulo('evaluacion')">

2. Evaluación

</button>




<button onclick="abrirModulo('preguntas')">

3. Preguntas

</button>




<button onclick="abrirModulo('blueprint')">

4. Blueprint

</button>




<button onclick="abrirModulo('vistaPrevia')">

5. Vista previa

</button>




<button onclick="abrirModulo('exportar')">

6. Exportar

</button>




<button onclick="abrirModulo('bancoPreguntas')">

7. Banco de preguntas

</button>




</aside>







<main id="workspace">



<h2>

Seleccione un módulo

</h2>



<p>

SPAE listo para iniciar.

</p>



</main>





</div>



`;



}









/* =====================================================
   ROUTER PRINCIPAL
===================================================== */


function abrirModulo(nombre){


    const workspace =

        document.getElementById(

            "workspace"

        );



    if(!workspace){

        return;

    }





    switch(nombre){


        case "curso":


            workspace.innerHTML =

            typeof renderCurso === "function"

            ?

            renderCurso()

            :

            moduloNoDisponible(
                "Curso"
            );


        break;





        case "evaluacion":


            workspace.innerHTML =

            typeof renderEvaluacion === "function"

            ?

            renderEvaluacion()

            :

            moduloNoDisponible(
                "Evaluación"
            );


        break;





        case "preguntas":


            workspace.innerHTML =

            typeof renderPreguntas === "function"

            ?

            renderPreguntas()

            :

            moduloNoDisponible(
                "Preguntas"
            );


        break;





        case "blueprint":


            workspace.innerHTML =

            typeof renderBlueprint === "function"

            ?

            renderBlueprint()

            :

            moduloNoDisponible(
                "Blueprint"
            );


        break;





        case "vistaPrevia":


            workspace.innerHTML =

            typeof renderVistaPrevia === "function"

            ?

            renderVistaPrevia()

            :

            moduloNoDisponible(
                "Vista previa"
            );


        break;





        case "exportar":


            workspace.innerHTML =

            typeof renderExportar === "function"

            ?

            renderExportar()

            :

            moduloNoDisponible(
                "Exportar"
            );


        break;





        case "bancoPreguntas":


            workspace.innerHTML =

            typeof renderBancoPreguntas === "function"

            ?

            renderBancoPreguntas()

            :

            moduloNoDisponible(
                "Banco de preguntas"
            );


        break;






        default:


            workspace.innerHTML =

            moduloNoDisponible(
                nombre
            );



    }



}









/* =====================================================
   MENSAJE MÓDULO NO DISPONIBLE
===================================================== */


function moduloNoDisponible(nombre){


return `



<section class="card">



<h2>

${nombre}

</h2>



<p>

Módulo pendiente de integración.

</p>



</section>



`;


}









/* =====================================================
   ARRANQUE AUTOMÁTICO
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    iniciarSPAE();


}

);
/* =====================================================

SPAE MVP v3.1

BLOQUE 2/9

ROUTER
MENÚ PRINCIPAL
NAVEGACIÓN DE MÓDULOS

===================================================== */



/* =====================================================
   RENDER PRINCIPAL DE LA APLICACIÓN
===================================================== */


function renderApp(){



const app =

document.getElementById(

"app"

);




if(!app){


console.error(

"No existe el contenedor #app"

);


return;


}





app.innerHTML = `



<div class="spae-layout">



<aside class="menu">



<h3>

SPAE MVP

</h3>





<button onclick="abrirModulo('curso')">

1. Curso

</button>





<button onclick="abrirModulo('evaluacion')">

2. Evaluación

</button>





<button onclick="abrirModulo('preguntas')">

3. Preguntas

</button>





<button onclick="abrirModulo('blueprint')">

4. Blueprint

</button>





<button onclick="abrirModulo('vistaPrevia')">

5. Vista previa

</button>





<button onclick="abrirModulo('exportar')">

6. Exportar

</button>





<button onclick="abrirModulo('bancoPreguntas')">

7. Banco de preguntas

</button>





</aside>







<main id="workspace">



<h2>

Seleccione un módulo.

</h2>



</main>





</div>



`;



}









/* =====================================================
   ROUTER SPAE
===================================================== */


function abrirModulo(nombre){



const workspace =

document.getElementById(

"workspace"

);





if(!workspace){


console.error(

"No existe workspace"

);


return;


}







switch(nombre){



case "curso":



if(typeof renderCurso === "function"){


workspace.innerHTML =

renderCurso();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Curso"

);


}


break;







case "evaluacion":



if(typeof renderEvaluacion === "function"){


workspace.innerHTML =

renderEvaluacion();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Evaluación"

);


}


break;







case "preguntas":



if(typeof renderPreguntas === "function"){


workspace.innerHTML =

renderPreguntas();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Preguntas"

);


}


break;







case "blueprint":



if(typeof renderBlueprint === "function"){


workspace.innerHTML =

renderBlueprint();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Blueprint"

);


}


break;







case "vistaPrevia":



if(typeof renderVistaPrevia === "function"){


workspace.innerHTML =

renderVistaPrevia();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Vista previa"

);


}


break;







case "exportar":



if(typeof renderExportar === "function"){


workspace.innerHTML =

renderExportar();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Exportar"

);


}


break;







case "bancoPreguntas":



if(typeof renderBancoPreguntas === "function"){


workspace.innerHTML =

renderBancoPreguntas();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Banco de preguntas"

);


}


break;







default:



workspace.innerHTML =

mensajeModuloPendiente(

"Módulo desconocido"

);



}



}









/* =====================================================
   MENSAJE TEMPORAL DE MÓDULO
===================================================== */


function mensajeModuloPendiente(nombre){



return `



<section class="card">



<h2>

${nombre}

</h2>



<p>

Módulo pendiente de integración.

</p>



</section>



`;



}
/* =====================================================

SPAE MVP v3.1

BLOQUE 3/9

MÓDULO CURSO

===================================================== */





/* =====================================================
   RENDER MÓDULO CURSO
===================================================== */


function renderCurso(){



return `



<section class="card">



<h2>

1. Curso

</h2>





<div class="form-group">


<label>

Nombre del curso

</label>



<input

id="nombreCurso"

type="text"

value="${SPAE.curso.nombre || ""}"

placeholder="Ejemplo: Gestión de las Relaciones en las Organizaciones"

>


</div>







<div class="form-group">


<label>

Programa académico

</label>



<input

id="programaCurso"

type="text"

value="${SPAE.curso.programa || ""}"

placeholder="Ejemplo: Administración de Empresas"

>


</div>







<div class="form-group">


<label>

Nivel

</label>



<input

id="nivelCurso"

type="text"

value="${SPAE.curso.nivel || ""}"

placeholder="Ejemplo: Media carrera / Ejecutivo"

>


</div>







<div class="form-group">


<label>

Periodo académico

</label>



<input

id="periodoCurso"

type="text"

value="${SPAE.curso.periodo || ""}"

placeholder="Ejemplo: 2026-I"

>


</div>








<button

class="primary-button"

onclick="guardarCursoSPAE()"

>

Guardar curso

</button>







<div id="mensajeCurso"

class="notice"

>

</div>





</section>



`;

}









/* =====================================================
   GUARDAR CURSO
===================================================== */


function guardarCursoSPAE(){



const nombre =

document.getElementById(

"nombreCurso"

);





const programa =

document.getElementById(

"programaCurso"

);





const nivel =

document.getElementById(

"nivelCurso"

);





const periodo =

document.getElementById(

"periodoCurso"

);







if(!nombre ||

!programa ||

!nivel ||

!periodo){



console.error(

"Campos de curso no encontrados"

);



return;


}








SPAE.curso.nombre =

nombre.value.trim();







SPAE.curso.programa =

programa.value.trim();







SPAE.curso.nivel =

nivel.value.trim();







SPAE.curso.periodo =

periodo.value.trim();







guardarSPAE();








const mensaje =

document.getElementById(

"mensajeCurso"

);






if(mensaje){



mensaje.innerHTML = `



<p>

Curso guardado correctamente.

</p>



`;



}





}
/* =====================================================

SPAE MVP v3.1

BLOQUE 4/9

MÓDULO EVALUACIÓN

===================================================== */





/* =====================================================
   RENDER MÓDULO EVALUACIÓN
===================================================== */


function renderEvaluacion(){



return `



<section class="card">



<h2>

2. Evaluación

</h2>







<div class="form-group">


<label>

Nombre de la evaluación

</label>



<input

id="nombreEvaluacion"

type="text"

value="${SPAE.evaluacion.nombre || ""}"

placeholder="Ejemplo: Examen Sumativo Nuevos Entornos Organizacionales 2026"

>


</div>









<div class="form-group">


<label>

Tipo de evaluación

</label>



<select

id="tipoEvaluacion"

>



<option value="formativa"

${SPAE.evaluacion.tipo==="formativa" ? "selected" : ""}

>

Formativa

</option>





<option value="sumativa"

${SPAE.evaluacion.tipo==="sumativa" ? "selected" : ""}

>

Sumativa

</option>



</select>


</div>









<div class="form-group">


<label>

Tiempo estimado (minutos)

</label>



<input

id="tiempoEvaluacion"

type="number"

value="${SPAE.evaluacion.tiempo || 0}"

>


</div>









<div class="form-group">


<label>

Ponderación (%)

</label>



<input

id="ponderacionEvaluacion"

type="number"

value="${SPAE.evaluacion.ponderacion || 0}"

>


</div>









<button

class="primary-button"

onclick="guardarEvaluacionSPAE()"

>

Guardar evaluación

</button>







<div

id="mensajeEvaluacion"

class="notice"

>

</div>







</section>



`;

}









/* =====================================================
   GUARDAR EVALUACIÓN
===================================================== */


function guardarEvaluacionSPAE(){



const nombre =

document.getElementById(

"nombreEvaluacion"

);





const tipo =

document.getElementById(

"tipoEvaluacion"

);





const tiempo =

document.getElementById(

"tiempoEvaluacion"

);





const ponderacion =

document.getElementById(

"ponderacionEvaluacion"

);







if(

!nombre ||

!tipo ||

!tiempo ||

!ponderacion

){



console.error(

"Campos de evaluación no encontrados"

);



return;


}







SPAE.evaluacion.nombre =

nombre.value.trim();







SPAE.evaluacion.tipo =

tipo.value;







SPAE.evaluacion.tiempo =

Number(

tiempo.value

);







SPAE.evaluacion.ponderacion =

Number(

ponderacion.value

);







guardarSPAE();









const mensaje =

document.getElementById(

"mensajeEvaluacion"

);







if(mensaje){



mensaje.innerHTML = `



<p>

Evaluación guardada correctamente.

</p>



`;



}





}
/* =====================================================

SPAE MVP v3.1

BLOQUE 5/9

MÓDULO 3
PREGUNTAS

===================================================== */





function renderPreguntas(){


return `



<section class="card">


<h2>

3. Preguntas

</h2>





<div class="form-group">


<label>

Tipo de pregunta

</label>




<select

id="tipoPregunta"

onchange="cambiarTipoPregunta()"

>



<option value="opcion_multiple">

Opción múltiple

</option>



<option value="caso_aplicacion">

Caso de aplicación

</option>



<option value="abierta">

Pregunta abierta

</option>



</select>


</div>





<div id="editorPregunta">


${renderEditorPregunta("opcion_multiple")}


</div>





</section>


`;

}








/* =====================================================
 CAMBIO TIPO PREGUNTA
===================================================== */


function cambiarTipoPregunta(){



const tipo =

document.getElementById(

"tipoPregunta"

).value;





document.getElementById(

"editorPregunta"

).innerHTML =

renderEditorPregunta(tipo);



}









/* =====================================================
 EDITOR DINÁMICO
===================================================== */


function renderEditorPregunta(tipo){



let html="";







if(tipo==="opcion_multiple"){



html += `


<div class="form-group">


<label>

Enunciado

</label>



<textarea

id="contenidoPregunta"

rows="5"

></textarea>



</div>




<div class="form-group">


<label>

Alternativa A

</label>


<input id="altA">


</div>





<div class="form-group">


<label>

Alternativa B

</label>


<input id="altB">


</div>





<div class="form-group">


<label>

Alternativa C

</label>


<input id="altC">


</div>





<div class="form-group">


<label>

Alternativa D

</label>


<input id="altD">


</div>






<div class="form-group">


<label>

Respuesta correcta

</label>



<select id="respuestaCorrecta">


<option>A</option>

<option>B</option>

<option>C</option>

<option>D</option>


</select>



</div>


`;



}







else{


html += `


<div class="form-group">


<label>

Contexto profesional

</label>



<textarea

id="contextoPregunta"

rows="6"

></textarea>


</div>






<div class="form-group">


<label>

Pregunta / instrucción

</label>



<textarea

id="preguntaTexto"

rows="5"

></textarea>


</div>


`;



}









html += `



<div class="form-group">


<label>

Nivel cognitivo Bloom

</label>



<select id="nivelBloom">


<option>RECORDAR</option>

<option>COMPRENDER</option>

<option>APLICAR</option>

<option>ANALIZAR</option>

<option>EVALUAR</option>

<option>CREAR</option>


</select>



</div>







<div class="form-group">


<label>

Resultado de aprendizaje

</label>



<textarea

id="resultadoAprendizaje"

rows="3"

></textarea>



</div>







<div class="form-group">


<label>

Respuesta esperada

</label>



<textarea

id="respuestaEsperada"

rows="4"

></textarea>



</div>







<div class="form-group">


<label>

Criterios de evaluación

</label>



<textarea

id="criteriosPregunta"

rows="4"

></textarea>



</div>







<div class="form-group">


<label>

Retroalimentación

</label>



<textarea

id="retroalimentacionPregunta"

rows="4"

></textarea>



</div>







<button

class="primary-button"

onclick="guardarPreguntaSPAE()"

>

Guardar pregunta

</button>




<div

id="mensajePregunta"

class="notice"

>


</div>



`;







return html;


}
/* =====================================================
   SPAE MVP v3.4

   BLOQUE 6/8

   MÓDULO 3
   BANCO DE PREGUNTAS

===================================================== */


/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderPreguntas(){


return `

<section class="card">


<h2>
3. Preguntas
</h2>


<label>
Tipo de pregunta
</label>


<select id="tipoPregunta"
onchange="cambiarTipoPregunta()">


<option value="opcion_multiple">
Opción múltiple
</option>


<option value="caso_aplicacion">
Caso de aplicación
</option>


<option value="abierta">
Pregunta abierta
</option>


</select>


<div id="editorPregunta">

${renderEditorPregunta("opcion_multiple")}

</div>


<hr>


<h3>
Preguntas registradas
</h3>


<div id="listaPreguntas">

${listarPreguntasSPAE()}

</div>


</section>

`;

}






/* =====================================================
   CAMBIO DE TIPO
===================================================== */


function cambiarTipoPregunta(){


const tipo =

document.getElementById(
"tipoPregunta"
).value;



document.getElementById(
"editorPregunta"
).innerHTML =

renderEditorPregunta(tipo);



}







/* =====================================================
   EDITOR
===================================================== */


function renderEditorPregunta(tipo){


let html="";


if(tipo==="opcion_multiple"){


html += `


<label>
Enunciado
</label>


<textarea
id="contenidoPregunta"
rows="5">
</textarea>



<h3>
Alternativas
</h3>


<label>
Alternativa A
</label>

<input id="altA">



<label>
Alternativa B
</label>

<input id="altB">



<label>
Alternativa C
</label>

<input id="altC">



<label>
Alternativa D
</label>

<input id="altD">



<label>
Respuesta correcta
</label>


<select id="respuestaCorrecta">

<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>

</select>


`;



}else{


html += `


<label>
Contexto
</label>


<textarea
id="contextoPregunta"
rows="6">
</textarea>



<label>
Pregunta / instrucción
</label>


<textarea
id="preguntaTexto"
rows="5">
</textarea>


`;

}



html += `


<label>
Nivel cognitivo Bloom
</label>


<select id="nivelPregunta">


<option>
RECORDAR
</option>

<option>
COMPRENDER
</option>

<option>
APLICAR
</option>

<option>
ANALIZAR
</option>

<option>
EVALUAR
</option>

<option>
CREAR
</option>


</select>




<label>
Resultado de aprendizaje
</label>


<textarea
id="resultadoPregunta">
</textarea>




<label>
Respuesta esperada
</label>


<textarea
id="respuestaEsperada">
</textarea>




<label>
Criterios de evaluación
</label>


<textarea
id="criteriosPregunta">
</textarea>




<label>
Retroalimentación
</label>


<textarea
id="retroalimentacionPregunta">
</textarea>




<br>


<button
onclick="guardarPreguntaSPAE()">

Guardar pregunta

</button>


<div id="mensajePregunta">

</div>


`;



return html;


}








/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPreguntaSPAE(){


let tipo =

document.getElementById(
"tipoPregunta"
).value;



let pregunta={


id:
Date.now(),


tipo:tipo,


contenido:"",


alternativas:[],


respuestaCorrecta:"",


contexto:"",


pregunta:"",


nivelCognitivo:"",


resultadoAprendizaje:"",


respuestaEsperada:"",


criterios:"",


retroalimentacion:""


};






if(tipo==="opcion_multiple"){


pregunta.contenido =

document.getElementById(
"contenidoPregunta"
).value;


pregunta.alternativas=[


document.getElementById("altA").value,


document.getElementById("altB").value,


document.getElementById("altC").value,


document.getElementById("altD").value


];


pregunta.respuestaCorrecta =

document.getElementById(
"respuestaCorrecta"
).value;



}


else{


pregunta.contexto =

document.getElementById(
"contextoPregunta"
).value;


pregunta.pregunta =

document.getElementById(
"preguntaTexto"
).value;


}



pregunta.nivelCognitivo =

document.getElementById(
"nivelPregunta"
).value;



pregunta.resultadoAprendizaje =

document.getElementById(
"resultadoPregunta"
).value;



pregunta.respuestaEsperada =

document.getElementById(
"respuestaEsperada"
).value;



pregunta.criterios =

document.getElementById(
"criteriosPregunta"
).value;



pregunta.retroalimentacion =

document.getElementById(
"retroalimentacionPregunta"
).value;






if(!Array.isArray(SPAE.preguntas)){

SPAE.preguntas=[];

}



SPAE.preguntas.push(
pregunta
);



actualizarBlueprint();



guardarSPAE();





document.getElementById(
"mensajePregunta"
).innerHTML=

`

<p>
Pregunta guardada correctamente.
</p>

`;



document.getElementById(
"listaPreguntas"
).innerHTML=

listarPreguntasSPAE();



}








/* =====================================================
   LISTADO
===================================================== */


function listarPreguntasSPAE(){


if(!SPAE.preguntas ||

SPAE.preguntas.length===0){


return `

<p>
No existen preguntas registradas.
</p>

`;

}



return SPAE.preguntas.map(

(p,index)=>{


return `


<div class="card">


<h4>
Pregunta ${index+1}
</h4>


<p>
Tipo:
${p.tipo}
</p>


<p>
Nivel:
${p.nivelCognitivo}
</p>


<p>
${p.contenido || p.pregunta}
</p>


</div>


`;

}

).join("");



}







/* =====================================================
   BLUEPRINT
===================================================== */


function actualizarBlueprint(){



if(!SPAE.blueprint){


SPAE.blueprint={

preguntasMCQ:0,

casos:0,

abiertas:0

};


}



SPAE.blueprint.preguntasMCQ =

SPAE.preguntas.filter(

p=>p.tipo==="opcion_multiple"

).length;



SPAE.blueprint.casos =

SPAE.preguntas.filter(

p=>

p.tipo==="caso_aplicacion"

).length;



SPAE.blueprint.abiertas =

SPAE.preguntas.filter(

p=>

p.tipo==="abierta"

).length;



guardarSPAE();



}
/* =====================================================
   SPAE MVP v4.0

   BLOQUE 7/10

   BANCO DE PREGUNTAS

   - Listado
   - Normalización
   - Validación
   - Blueprint automático

===================================================== */


/* =====================================================
   LISTAR PREGUNTAS REGISTRADAS
===================================================== */


function listarPreguntasSPAE(){


if(!SPAE.preguntas || SPAE.preguntas.length===0){


return `

<p>
No existen preguntas registradas.
</p>

`;


}



return SPAE.preguntas.map(

(p,index)=>{


return `


<div class="card">


<h3>

Pregunta ${index+1}

</h3>



<p>

<strong>
Tipo:
</strong>

${p.tipo}

</p>



<p>

<strong>
Nivel cognitivo:
</strong>

${p.nivelCognitivo}

</p>



<p>

<strong>
Resultado aprendizaje:
</strong>

${p.resultadoAprendizaje}

</p>



<hr>


<p>

${p.contenido || p.contexto}

</p>


<button onclick="eliminarPreguntaSPAE(${index})">

Eliminar

</button>


</div>



`;



}

).join("");



}







/* =====================================================
   ELIMINAR PREGUNTA
===================================================== */


function eliminarPreguntaSPAE(index){



if(confirm(

"¿Desea eliminar esta pregunta?"

)){



SPAE.preguntas.splice(

index,

1

);



actualizarBlueprint();


guardarSPAE();



abrirModulo(

"preguntas"

);



}



}








/* =====================================================
   ACTUALIZAR BLUEPRINT
===================================================== */


function actualizarBlueprint(){



if(!SPAE.blueprint){


SPAE.blueprint={


preguntasMCQ:0,

casos:0,

abiertas:0


};


}





const preguntas =

SPAE.preguntas || [];





SPAE.blueprint.preguntasMCQ =

preguntas.filter(

p=>

p.tipo==="opcion_multiple"

).length;







SPAE.blueprint.casos =

preguntas.filter(

p=>

p.tipo==="caso_analisis"

||

p.tipo==="caso_aplicacion"

).length;







SPAE.blueprint.abiertas =

preguntas.filter(

p=>

p.tipo==="abierta"

).length;





guardarSPAE();



}









/* =====================================================
   VALIDACIÓN DE PREGUNTAS
===================================================== */


function validarPreguntaSPAE(p){



let errores=[];





if(!p.tipo){


errores.push(

"Tipo de pregunta no definido"

);


}




if(

p.tipo==="opcion_multiple"

){



if(!p.contenido || p.contenido.trim()===""){


errores.push(

"Falta el enunciado"

);


}




if(

!p.alternativas ||

p.alternativas.length!==4

){


errores.push(

"Debe tener cuatro alternativas"

);


}



}





if(!p.nivelCognitivo){


errores.push(

"Falta nivel cognitivo"

);


}




if(!p.resultadoAprendizaje){


errores.push(

"Falta resultado de aprendizaje"

);


}





return errores;



}









/* =====================================================
   VALIDAR TODO EL BANCO
===================================================== */


function validarBancoPreguntas(){



let errores=[];




SPAE.preguntas.forEach(

(p,index)=>{



const resultado =

validarPreguntaSPAE(p);





if(resultado.length>0){



errores.push(

"Pregunta "

+

(index+1)

+

": "

+

resultado.join(", ")

);



}



}

);






if(errores.length===0){



alert(

"Banco de preguntas válido."

);



}

else{



alert(

errores.join("\n")

);



}



}









/* =====================================================
   NORMALIZAR DATOS
===================================================== */


function normalizarBancoSPAE(){



if(!Array.isArray(SPAE.preguntas)){


SPAE.preguntas=[];


}





SPAE.preguntas =

SPAE.preguntas.map(

p=>{


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

"APLICAR",


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

);




guardarSPAE();



console.log(

"Banco normalizado"

);



}









/* =====================================================
   INICIALIZAR BANCO
===================================================== */


normalizarBancoSPAE();
