/* =====================================================
   SPAE MVP

   MÓDULO LIMPIAR EXAMEN

   Responsabilidad:
   - Eliminar preguntas del examen actual
   - Mantener banco de preguntas intacto
   - Actualizar blueprint
   - Guardar estado SPAE

===================================================== */


/* =====================================================
   LIMPIAR TODAS LAS PREGUNTAS DEL EXAMEN
===================================================== */


function limpiarPreguntasExamen(){


    if(!confirm(
        "¿Está seguro de eliminar todas las preguntas del examen actual?"
    )){


        return;


    }





    if(!Array.isArray(SPAE.preguntas)){


        SPAE.preguntas = [];


    }
    else{


        SPAE.preguntas = [];


    }





    if(typeof actualizarBlueprint === "function"){


        actualizarBlueprint();


    }






    if(typeof guardarSPAE === "function"){


        guardarSPAE();


    }






    console.log(
        "Preguntas del examen eliminadas correctamente"
    );






    alert(
        "Examen limpiado correctamente."
    );






    if(typeof abrirModulo === "function"){


        abrirModulo("preguntas");


    }



}









/* =====================================================
   LIMPIAR SOLO SI EXISTE SPAE
===================================================== */


function cantidadPreguntasExamen(){


    if(
        SPAE &&
        Array.isArray(SPAE.preguntas)
    ){


        return SPAE.preguntas.length;


    }


    return 0;


}
