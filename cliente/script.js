"use strict"

function estPantalla(id){
    let p = document.getElementById(id);
    if (p){
        Array.from(document.querySelectorAll("body>article")).forEach((e) => {
            e.removeAttribute("aria-active");
        });
        p.setAttribute("aria-active", "page");
        document.querySelector("h1 span").textContent = p.getAttribute("aria-label").toUpperCase();
        // RegresarMenu
        let btnRegresar = document.getElementById("btnRegresarMenu");
        switch (id){
            case "actMain": case "actInv": case "actLogin": case "actRegistro":
                btnRegresar.hidden = true; break;
            default:
                btnRegresar.hidden = false;
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Preparación preliminar

    /* Datalist con select */
    Array.from(document.querySelectorAll("select[data-list]")).forEach((e) => {
        let id = e.dataset.list;
        e.innerHTML = document.getElementById(id).innerHTML;
    });
    
    document.cookie.split(";").some((e) => {
        let p = e.split("=");
        if (p[0] == "sesion") return true;
        else estPantalla("actLogin");
    });
    
    // Métodos
    document.getElementById("btnRegresarMenu").addEventListener("click", () => estPantalla("actMain") );
    document.getElementById("btnMainPacientes").addEventListener("click", () => estPantalla("actPacientes"));
    document.getElementById("btnMainInventario").addEventListener("click", () => estPantalla("actInv"));
    document.getElementById("btnInvMateriales").addEventListener("click", () => estPantalla("actMateriales"));
    document.getElementById("btnInvMedicamentos").addEventListener("click", () => estPantalla("actMedicamentos"));
    document.getElementById("btnLoginLogin").addEventListener("click", () => estPantalla("actMain"));
    document.getElementById("btnLoginRegistrar").addEventListener("click", () => estPantalla("actRegistro"));
});