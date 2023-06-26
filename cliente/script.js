"use strict"
function rellenarPerfil(idMasc){
    let ven = document.getElementById("actPerfilMascota");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        // Limpiar
        ven.children[0].children[0].src = "imagen/2016-04-13_carrot-updating-or-repairing_by-David-Revoy.jpg";
        ven.children[1].children[0].children[1].textContent = "";
        ven.children[1].children[1].children[1].textContent = "";
        ven.children[1].children[2].children[1].textContent = "";
        ven.children[1].children[3].children[1].textContent = "";
        ven.children[1].children[4].children[1].textContent = "";
        ven.children[1].children[5].children[1].textContent = "";
        ven.children[1].children[6].children[1].textContent = "";
        ven.children[1].children[7].children[1].textContent = "";
        ven.children[1].children[8].children[1].textContent = "";
        ven.children[3].children[1].textContent = "";
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                ven.children[0].children[0].src = "/imagen/"+d['imgMasc'];
                ven.children[1].children[0].children[1].textContent = d['nomMasc'];
                ven.children[1].children[1].children[1].textContent = d['idMasc'];
                ven.children[1].children[2].children[1].textContent = d['fechaNacMasc'];
                ven.children[1].children[3].children[1].textContent = d['especieMasc'];
                ven.children[1].children[4].children[1].textContent = d['razaMasc'];
                ven.children[1].children[5].children[1].textContent = (d['sexoMasc']==0)?"Macho":"Hembra";
                ven.children[1].children[6].children[1].textContent = (d['convivenciaMasc']==0)?"No":"Sí";
                ven.children[1].children[7].children[1].textContent = (d['viajeMasc']==0)?"No":"Sí";
                ven.children[1].children[8].children[1].textContent = d['microchipMasc']||"—";
                ven.children[3].children[1].textContent = "";
            } else noti.error("Error al recuperar la lista de pacientes");
        }
    }
    xmlhttp.open("GET", "paciente/"+idMasc);
    xmlhttp.send();
}

function actualTablaPacientes(cteMasc){
    let tbl = document.querySelector("#actPacientes .formBusqueda table:nth-of-type(2) tbody");
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let fila = tbl.insertRow();
                    fila.insertCell(-1).textContent = e["idMasc"];
                    fila.insertCell(-1).textContent = e["nomMasc"];
                    fila.insertCell(-1).textContent = e["especieMasc"];
                    fila.insertCell(-1).textContent = e["razaMasc"];
                    fila.insertCell(-1).textContent = (e["sexoMasc"] == "0")?"Macho":"Hembra";
                    fila.insertCell(-1).textContent = e["fechaNacMasc"];
                    let btnAct = document.createElement("button");
                    btnAct.type = "button";
                    btnAct.classList.add("accion");
                    btnAct.textContent = "Perfil";
                    btnAct.addEventListener("click", (e) => estPantalla("actPerfilMascota", e.target.parentNode.parentNode.children[0].textContent) );
                    fila.insertCell(-1).appendChild(btnAct);
                });
            } else noti.error("Error al recuperar la lista de pacientes");
        }
    }
    xmlhttp.open("GET", "pacientes?cteMasc="+cteMasc);
    xmlhttp.send();
}

function actualListaClientes(){
    let tbl = document.getElementById("selPacientesDueno");
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let opt = document.createElement("option");
                    opt.value = e["idCte"];
                    opt.textContent = e["nomCte"] + " " + e["apPatCte"] + " " + e["apMatCte"];
                    tbl.appendChild(opt);
                });
            } else noti.error("Error al recuperar la lista de clientes");
        }
    }
    xmlhttp.open("GET", "clientes");
    xmlhttp.send();
}

function actualTablaClientes(v){
    let tbl;
    if (v == 0) tbl = document.querySelector("#actClientes .formBusqueda tbody");
    else if (v == 1) tbl = document.querySelector("#actPacientes .formBusqueda table:nth-of-type(1) tbody");
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let fila = tbl.insertRow();
                    fila.insertCell(-1).textContent = e["idCte"];
                    fila.insertCell(-1).textContent = e["nomCte"] + " " + e["apPatCte"] + " " + e["apMatCte"];
                    fila.insertCell(-1).textContent = e["telCte"];
                    fila.insertCell(-1).textContent = Array.from(document.getElementById("dlVialidad").children).find((e2) => e2.value == e["tipoCalleCte"]).textContent + " " + e["calleCte"];
                    fila.insertCell(-1).textContent = Array.from(document.getElementById("dlLocalidad").children).find((e2) => e2.value == e["tipoPobCte"]).textContent + " " + e["pobCte"];
                    fila.insertCell(-1).textContent = e["cpCte"];
                    fila.insertCell(-1).textContent = e["munCte"] + ", " + Array.from(document.getElementById("dlEstado").children).find((e2) => e2.value == e["edoCte"]).textContent;
                    if (v == 1){
                        let btnAct = document.createElement("button");
                        btnAct.type = "button";
                        btnAct.classList.add("accion");
                        btnAct.textContent = "Mascotas";
                        btnAct.addEventListener("click", (e) => actualTablaPacientes(e.target.parentNode.parentNode.children[0].textContent) );
                        fila.insertCell(-1).appendChild(btnAct);
                    }
                });
            } else noti.error("Error al recuperar la lista de clientes");
        }
    }
    xmlhttp.open("GET", "clientes");
    xmlhttp.send();
}

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
            case "actMedicamentos": case "actMateriales": case "actPacientesMenu": case "actInv":
                btnRegresar.hidden = false; break;
            default:
                btnRegresar.hidden = true;
        }
        let btnRegresarPaciente = document.getElementById("btnRegresarMenuPaciente");
        switch (id){
            case "actConsultas": case "actConsultaNueva": case "actClientes": case "actPacientes": case "actPerfilMascota":
                btnRegresarPaciente.hidden = false; break;
            default:
                btnRegresarPaciente.hidden = true;
        }
        let btnRegresarPerfil = document.getElementById("btnRegresarPerfilPaciente");
        switch (id){
            case "actCarnet":
                btnRegresarPerfil.hidden = false; break;
            default:
                btnRegresarPerfil.hidden = true;
        }
        let btnConsultarCarnet = document.getElementById("btnConsultarCarnet");
        switch (id){
            case "actPerfilMascota":
                btnConsultarCarnet.hidden = false; break;
            default:
                btnConsultarCarnet.hidden = true;
        }
        // Actualización de listados
        switch (id){
            case "actClientes":
                actualTablaClientes(0); break;
            case "actPacientes":
                actualListaClientes();
                actualTablaClientes(1);
                break;
            case "actMateriales":
                actualTablaInventario(0); break;
            case "actMedicamentos":
                actualTablaInventario(1); break;
            case "actPerfilMascota":
                rellenarPerfil(arguments[1]);
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

    // ¿Hay sesión?
    document.cookie.split(";").some((e) => {
        let p = e.split("=");
        if (p[0] == "sesion"){
            Array.from(document.getElementsByClassName("usuario")).forEach(e => e.textContent = localStorage.getItem("usuario") );
            estPantalla("actMain");
        }
        else estPantalla("actLogin");
    });

    // Obligatoriedad
    Array.from(document.querySelectorAll("[required]")).forEach((e) => e.previousElementSibling.classList.add("requerido") );

    // Métodos de botones
    document.getElementById("btnMainPacientesMenu").addEventListener("click", () => estPantalla("actPacientesMenu"));
    document.getElementById("btnPAcientesMClientes").addEventListener("click", () => estPantalla("actClientes") );
    document.getElementById("btnPacientesMPacientes").addEventListener("click", () => estPantalla("actPacientes") );
    document.getElementById("btnPacientesMConsultaNueva").addEventListener("click", () => estPantalla("actConsultaNueva") );
    document.getElementById("btnPacientesMConsultas").addEventListener("click", () => estPantalla("actConsultas") );
    document.getElementById("btnMainInventario").addEventListener("click", () => estPantalla("actInv"));
    document.getElementById("btnInvMateriales").addEventListener("click", () => estPantalla("actMateriales"));
    document.getElementById("btnInvMedicamentos").addEventListener("click", () => estPantalla("actMedicamentos"));
    document.getElementById("btnLoginRestablecer").addEventListener("click", () => noti.success("Contacte al administrador para restablecer su contraseña."));
    document.getElementById("btnLoginRegistrar").addEventListener("click", () => estPantalla("actRegistro"));

    /* Botones barra superior */
    document.getElementById("btnRegresarMenu").addEventListener("click", () => estPantalla("actMain") );
    document.getElementById("btnRegresarMenuPaciente").addEventListener("click", () => estPantalla("actPacientesMenu") );
    document.getElementById("btnCerrarSesion").addEventListener("click", () => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                Array.from(document.getElementsByClassName("usuario")).forEach(e => e.textContent = "" );
                localStorage.removeItem("usuario");
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
                    let usu = d["nomUsu"]+" "+d["apPatUsu"]+" "+d["apMatUsu"];
                    Array.from(document.getElementsByClassName("usuario")).forEach(e => e.textContent = usu );
                    localStorage.setItem("usuario", usu);
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
    document.querySelector("#actClientes form").addEventListener("submit", (e) => {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==204){
                    noti.success("¡Cliente creado!");
                    actualTablaClientes(0);
                } else if (xmlhttp.status==400) noti.error("Faltan datos para la operación");
                else noti.error("Hubo un error al registrar al cliente");
            }
        }
        xmlhttp.open("POST", "clientes");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(
            "txtClientesTel="+encodeURIComponent(document.getElementById("txtClientesTel").value)+
            "&txtClientesNombre="+encodeURIComponent(document.getElementById("txtClientesNombre").value)+
            "&txtClientesApPat="+encodeURIComponent(document.getElementById("txtClientesApPat").value)+
            "&txtClientesApMat="+encodeURIComponent(document.getElementById("txtClientesApMat").value)+
            "&txtClientesEmail="+encodeURIComponent(document.getElementById("txtClientesEmail").value)+
            "&txtClientesCalle="+encodeURIComponent(document.getElementById("txtClientesCalle").value)+
            "&selClientesTipoCalle="+encodeURIComponent(document.getElementById("selClientesTipoCalle").value)+
            "&txtClientesLoc="+encodeURIComponent(document.getElementById("txtClientesLoc").value)+
            "&selClientesTipoLoc="+encodeURIComponent(document.getElementById("selClientesTipoLoc").value)+
            "&txtClientesMun="+encodeURIComponent(document.getElementById("txtClientesMun").value)+
            "&txtClientesCP="+encodeURIComponent(document.getElementById("txtClientesCP").value)+
            "&selClientesEdo="+encodeURIComponent(document.getElementById("selClientesEdo").value)
        );
    });
    document.querySelector("#actPacientes form").addEventListener("submit", (e) => {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==204){
                    noti.success("¡Paciente creado!");
                    actualTablaPacientes();
                    actualTablaClientes(1);
                } else if (xmlhttp.status==400) noti.error("Faltan datos para la operación");
                else noti.error("Hubo un error al registrar al paciente");
            }
        }
        xmlhttp.open("POST", "pacientes");
        const formData = new FormData();
        formData.append("txtPacientesNombre", document.getElementById("txtPacientesNombre").value);
        formData.append("selPacientesViaje", document.getElementById("selPacientesViaje").value);
        formData.append("selPacientesConv", document.getElementById("selPacientesConv").value);
        formData.append("txtPacientesFNac", document.getElementById("txtPacientesFNac").value);
        formData.append("txtPacientesRaza", document.getElementById("txtPacientesRaza").value);
        formData.append("selPacientesSexo", document.getElementById("selPacientesSexo").value);
        formData.append("txtPacientesEspecie", document.getElementById("txtPacientesEspecie").value);
        formData.append("txtPacientesMicrochip", document.getElementById("txtPacientesMicrochip").value);
        formData.append("selPacientesDueno", document.getElementById("selPacientesDueno").value);
        formData.append("arcPacientesImagen", document.getElementById("arcPacientesImagen").files[0]);
        xmlhttp.send(formData);
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
    });

    // Eventos de widgets
    Array.from(document.querySelectorAll("input[type=\"file\"]")).forEach((e) => {
        e.addEventListener("change", (e2) => e2.target.previousElementSibling.value = e2.target.files[0].name );
        e.previousElementSibling.addEventListener("click", (e2) => e2.target.nextElementSibling.click() );
        e.nextElementSibling.addEventListener("click", (e2) => {
            e2.target.previousElementSibling.previousElementSibling.value = "";
            e2.target.previousElementSibling.value = "";
        });
    });
});