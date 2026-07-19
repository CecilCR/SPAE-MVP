document.addEventListener("DOMContentLoaded", () => {

    const content = document.getElementById("content");

    content.innerHTML = `
        <h2>SPAE MVP operativo</h2>

        <button onclick="saludar()">
            Probar botón
        </button>
    `;

});


function saludar(){

    alert("El botón funciona correctamente.");

}
