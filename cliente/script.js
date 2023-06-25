"use strict"

function estPantalla(id){
    let p = document.getElementById(id);
    if (p){
        Array.from(document.querySelectorAll("body>article")).forEach((e) => {
            e.removeAttribute("aria-active");
        });
        p.setAttribute("aria-active", "page");
        document.querySelector("h1 span").textContent = p.getAttribute("aria-label").toUpperCase();
        // Botones
        console.log(id);
        document.getElementById("btnCerrarSesion").hidden = (id == "actLogin" || id == "actRegistro");
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
    window.noti = new Notyf({"position": {x: "right", y: "top"}, "duration": 5000});

    /* Datalist con select */
    Array.from(document.querySelectorAll("select[data-list]")).forEach((e) => {
        let id = e.dataset.list;
        e.innerHTML = document.getElementById(id).innerHTML;
    });

    document.cookie.split(";").some((e) => {
        let p = e.split("=");
        if (p[0] == "sesion") estPantalla("actMain");
        else estPantalla("actLogin");
    });

    // Métodos de botones
    document.getElementById("btnRegresarMenu").addEventListener("click", () => estPantalla("actMain") );
    document.getElementById("btnMainPacientes").addEventListener("click", () => estPantalla("actPacientes"));
    document.getElementById("btnMainInventario").addEventListener("click", () => estPantalla("actInv"));
    document.getElementById("btnInvMateriales").addEventListener("click", () => estPantalla("actMateriales"));
    document.getElementById("btnInvMedicamentos").addEventListener("click", () => estPantalla("actMedicamentos"));
    document.getElementById("btnLoginRegistrar").addEventListener("click", () => estPantalla("actRegistro"));
    document.getElementById("btnCerrarSesion").addEventListener("click", () => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                Array.from(document.getElementsByClassName("usuario")).forEach(e => e.textContent = "" );
                estPantalla("actLogin");
            }
        }
        xmlhttp.open("DELETE", "sesion");
        xmlhttp.send();
    });

    // Métodos de formulario
    document.querySelector("#actLogin form").addEventListener("submit", (e) => {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==200){
                    let d = JSON.parse(xmlhttp.responseText);
                    Array.from(document.getElementsByClassName("usuario")).forEach(e => e.textContent = d["nomUsu"]+" "+d["apPatUsu"]+" "+d["apMatUsu"] );
                    estPantalla("actMain");
                } else if (xmlhttp.status==401) noti.error("Usuario o contraseña incorrecta");
                else noti.error("Faltan datos para iniciar sesión");
            }
        }
        xmlhttp.open("POST", "sesion");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("usuario="+encodeURIComponent(document.getElementById("txtLoginEmail").value)+"&contra="+encodeURIComponent(document.getElementById("txtLoginContra").value));
    });
    document.querySelector("#actRegistro form").addEventListener("submit", (e) => {
        e.preventDefault();
        let contra = document.getElementById("txtRegistroContra").value;
        let contra2 = document.getElementById("txtRegistroContra2").value;
        if (contra != contra2){
            noti.error("Las contraseñas no son iguales");
            return false;
        }
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==204){
                    noti.success("¡Usuario creado!");
                    estPantalla("actLogin");
                } else if (xmlhttp.status==400) noti.error("Faltan datos para la operación");
                else if (xmlhttp.status==403) noti.error("El usuario con ese correo ya existe");
                else noti.error("Error del servidor al crear usuario");
            }
        }
        xmlhttp.open("POST", "usuarios");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(
            "nomUsu="+encodeURIComponent(document.getElementById("txtRegistroNombre").value)+
            "&apPatUsu="+encodeURIComponent(document.getElementById("txtRegistroApPat").value)+
            "&apMatUsu="+encodeURIComponent(document.getElementById("txtRegistroApMat").value)+
            "&telUsu="+encodeURIComponent(document.getElementById("txtRegistroTel").value)+
            "&emailUsu="+encodeURIComponent(document.getElementById("txtRegistroCorreo").value)+
            "&contraUsu="+encodeURIComponent(contra)+"&tipoUsu=0"
        );
    });
});