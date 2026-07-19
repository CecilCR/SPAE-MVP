document.addEventListener("DOMContentLoaded", () => {

    const content = document.getElementById("content");

    content.innerHTML = `
        <h2>SPAE MVP OPERATIVO</h2>

        <p>Si puedes leer este mensaje, renderCurso no es el problema.</p>

        <button onclick="saludar()">
            Probar botón
        </button>
    `;

});


function saludar(){

    alert("El botón funciona correctamente.");

}
