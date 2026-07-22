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
