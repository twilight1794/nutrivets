"use strict"

function actualTablaInventario(tipo){
    let tbl = document.querySelector(((tipo==1)?"#actMedicamentos":"#actMateriales")+" .formBusqueda tbody");
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let fila = tbl.insertRow();
                    if (tipo==0){
                        fila.insertCell(-1).textContent = e["idInv"];
                        fila.insertCell(-1).textContent = e["nombreMat"];
                        fila.insertCell(-1).textContent = e["cantInv"];
                        fila.insertCell(-1).textContent = "$"+parseFloat(e["precioInv"]).toFixed(2);
                        fila.insertCell(-1).textContent = e["formaVentaMat"];
                    } else if (tipo == 1){
                        fila.insertCell(-1).textContent = e["idInv"];
                        fila.insertCell(-1).textContent = e["nombreMed"];
                        fila.insertCell(-1).textContent = e["principioActMed"];
                        fila.insertCell(-1).textContent = e["cantInv"];
                        fila.insertCell(-1).textContent = "$"+parseFloat(e["precioInv"]).toFixed(2);
                        fila.insertCell(-1).textContent = e["formaVentaMed"];
                    }
                });
            } else noti.error("Error al recuperar la lista de "+((tipo==1)?"medicamentos":"materiales"));
        }
    }
    xmlhttp.open("GET", "inventario?invTipo="+encodeURIComponent(tipo));
    xmlhttp.send();
}

function estPantalla(id){
    let p = document.getElementById(id);
    if (p){
        Array.from(document.querySelectorAll("body>article")).forEach((e) => {
            e.removeAttribute("aria-active");
        });
        p.setAttribute("aria-active", "page");
        document.querySelector("h1 span").textContent = p.getAttribute("aria-label").toUpperCase();
        // Botones
        document.getElementById("btnCerrarSesion").hidden = (id == "actLogin" || id == "actRegistro");
        let btnRegresar = document.getElementById("btnRegresarMenu");
        switch (id){
            case "actMain": case "actInv": case "actLogin": case "actRegistro":
                btnRegresar.hidden = true; break;
            default:
                btnRegresar.hidden = false;
        }
        // Actualización de listados
        switch (id){
            case "actClientes":
                break;
            case "actPacientes":
                break;
            case "actMateriales":
                actualTablaInventario(0); break;
            case "actMedicamentos":
                actualTablaInventario(1); break;
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
    document.getElementById("btnLoginRestablecer").addEventListener("click", () => noti.success("Contacte al administrador para restablecer su contraseña."));
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
    document.querySelector("#actMedicamentos form").addEventListener("submit", (e) => {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==204){
                    noti.success("¡Medicamento creado!");
                    actualTablaInventario(1);
                } else if (xmlhttp.status==400) noti.error("Faltan datos para la operación");
                else noti.error("Hubo un error al crear el medicamento");
            }
        }
        xmlhttp.open("POST", "inventario");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(
            "txtInvCantMin="+encodeURIComponent(document.getElementById("txtMedicamentoCantMin").value)+
            "&txtInvCantTot="+encodeURIComponent(document.getElementById("txtMedicamentoCantTot").value)+
            "&txtInvPrecio="+encodeURIComponent(document.getElementById("txtMedicamentoPrecio").value)+
            "&txtMedicamentoNombre="+encodeURIComponent(document.getElementById("txtMedicamentoNombre").value)+
            "&txtMedicamentoLab="+encodeURIComponent(document.getElementById("txtMedicamentoLab").value)+
            "&txtMedicamentoPrincipio="+encodeURIComponent(document.getElementById("txtMedicamentoPrincipio").value)+
            "&txtMedicamentoForma="+encodeURIComponent(document.getElementById("txtMedicamentoForma").value)+"&txtInvTipo=1"
        );
    });
    document.querySelector("#actMateriales form").addEventListener("submit", (e) => {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==204){
                    noti.success("¡Material creado!");
                    actualTablaInventario(0);
                } else if (xmlhttp.status==400) noti.error("Faltan datos para la operación");
                else noti.error("Hubo un error al crear el material");
            }
        }
        xmlhttp.open("POST", "inventario");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(
            "txtInvCantMin="+encodeURIComponent(document.getElementById("txtMaterialesCantMin").value)+
            "&txtInvCantTot="+encodeURIComponent(document.getElementById("txtMaterialesCantTot").value)+
            "&txtInvPrecio="+encodeURIComponent(document.getElementById("txtMaterialesPrecio").value)+
            "&txtMaterialesNombre="+encodeURIComponent(document.getElementById("txtMaterialesNombre").value)+
            "&txtMaterialesForma="+encodeURIComponent(document.getElementById("txtMaterialesForma").value)+"&txtInvTipo=0"
        );
    });

    // Eventos de campos de búsqueda
    Array.from(document.querySelectorAll("#txtMaterialesBuscar, #txtMedicamentosBuscar, #txtPacientesBuscar, #txtClientesBuscar")).forEach((e) => {
        e.addEventListener("input", (e2) => {
            let v = e2.target.value;
            let t = e2.target.parentElement.nextElementSibling.children[1];
            if (v == "") Array.from(t.rows).forEach((e3) => e3.hidden = false);
            else {
                Array.from(t.rows).forEach((e3) => {
                    for (let i of e3.cells){
                        if (i.textContent.toLowerCase().indexOf(v) > -1){
                            e3.hidden = false;
                            return;
                        }
                        e3.hidden = true;
                    }
                });
            }
        });
    })
});