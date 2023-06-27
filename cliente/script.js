"use strict"

function rellenarCarnet(){
    let ven = document.querySelectorAll("#actCarnet dl");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                ven[0].children[0].children[1].textContent = d['nomMasc'];
                ven[0].children[1].children[1].textContent = d['fechaNacMasc'];
                ven[0].children[2].children[1].textContent = d['especieMasc'];
                ven[0].children[3].children[1].textContent = d['razaMasc'];
                ven[0].children[4].children[1].textContent = (d['sexoMasc']==0)?"Macho":"Hembra";
                ven[0].children[5].children[1].textContent = (d['convivenciaMasc']==0)?"No":"Sí";
                ven[0].children[6].children[1].textContent = (d['viajeMasc']==0)?"No":"Sí";
                ven[0].children[7].children[1].textContent = "";
                document.querySelector("#actCarnet img").src = (d['imgMasc'])?("/imagen/"+d['imgMasc']):"1.jpg";
                ven[1].children[0].children[1].textContent = d['nomCte'];
                ven[1].children[1].children[1].textContent = d['apPatCte'];
                ven[1].children[2].children[1].textContent = d['apMatCte'];
                window.print();
            } else noti.error("Error al recuperar la lista de pacientes");
        }
    }
    xmlhttp.open("GET", "paciente/"+localStorage.getItem("idMasc"));
    xmlhttp.send();
}

function actualTablaConsultas(v){
    let tbl;
    if (v) tbl = document.querySelector("#actPerfilMascota tbody");
    else tbl = document.querySelector("#actConsultas .formBusqueda tbody");
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let fila = tbl.insertRow();
                    fila.insertCell(-1).textContent = e["idCon"];
                    fila.insertCell(-1).textContent = e["fechaIngresoCon"]+"-"+e["fechaEgresoCon"];
                    fila.insertCell(-1).textContent = e["nomUsu"]+" "+e["apPatUsu"]+" "+e["apMatUsu"];
                    fila.insertCell(-1).textContent = e["motivoCon"];
                    fila.insertCell(-1).textContent = e["descripcionCon"];
                    fila.insertCell(-1).textContent = e["precioCon"];
                });
            } else noti.error("Error al recuperar la lista de consultas");
        }
    }
    xmlhttp.open("GET", "consultas"+(v?("?idMasc="+v):""));
    xmlhttp.send();
}

function actualInvCantidad(sel){
    sel.parentNode.nextElementSibling.children[1].max = sel.selectedOptions[0].dataset.cant;
}

function actualListaMedicamentosEx(id){
    let tbl = document.getElementById(id);
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let opt = document.createElement("option");
                    opt.value = e["idMed"];
                    opt.textContent = e["nombreMed"];
                    opt.dataset.cant = e["cantInv"];
                    tbl.appendChild(opt);
                    actualInvCantidad(tbl);
                });
            } else noti.error("Error al recuperar la lista de medicamentos");
        }
    }
    xmlhttp.open("GET", "inventario?invTipo=1");
    xmlhttp.send();
}

function actualListaUsuarios(id){
    let tbl = document.getElementById(id);
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let opt = document.createElement("option");
                    opt.value = e["idUsu"];
                    opt.textContent = e["nomUsu"] + " " + e["apPatUsu"] + " " + e["apMatUsu"];
                    tbl.appendChild(opt);
                });
            } else noti.error("Error al recuperar la lista de usuarios");
        }
    }
    xmlhttp.open("GET", "usuarios");
    xmlhttp.send();
}

function actualListaPacientes(id, n){
    let tbl = document.getElementById(id);
    tbl.textContent = "";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                d.forEach((e) => {
                    let opt = document.createElement("option");
                    opt.value = e["idMasc"];
                    opt.textContent = e["nomMasc"];
                    tbl.appendChild(opt);
                });
            } else noti.error("Error al recuperar la lista de pacientes");
        }
    }
    xmlhttp.open("GET", "pacientes?cteMasc="+n);
    xmlhttp.send();
}

function rellenarPerfil(idMasc){
    let ven = document.querySelector("#actPerfilMascota>div:first-child");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        // Limpiar
        ven.children[0].children[0].src = "1.jpg";
        ven.children[1].children[0].children[1].textContent = "";
        ven.children[1].children[1].children[1].textContent = "";
        ven.children[1].children[2].children[1].textContent = "";
        ven.children[1].children[3].children[1].textContent = "";
        ven.children[1].children[4].children[1].textContent = "";
        ven.children[1].children[5].children[1].textContent = "";
        ven.children[1].children[6].children[1].textContent = "";
        ven.children[1].children[7].children[1].textContent = "";
        ven.children[1].children[8].children[1].textContent = "";
        ven.parentNode.children[2].children[1].textContent = "";
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                let d = JSON.parse(xmlhttp.responseText);
                if (d['imgMasc']) ven.children[0].children[0].src = "/imagen/"+d['imgMasc'];
                ven.children[1].children[0].children[1].textContent = d['nomMasc'];
                ven.children[1].children[1].children[1].textContent = d['idMasc'];
                ven.children[1].children[2].children[1].textContent = d['fechaNacMasc'];
                ven.children[1].children[3].children[1].textContent = d['especieMasc'];
                ven.children[1].children[4].children[1].textContent = d['razaMasc'];
                ven.children[1].children[5].children[1].textContent = (d['sexoMasc']==0)?"Macho":"Hembra";
                ven.children[1].children[6].children[1].textContent = (d['convivenciaMasc']==0)?"No":"Sí";
                ven.children[1].children[7].children[1].textContent = (d['viajeMasc']==0)?"No":"Sí";
                ven.children[1].children[8].children[1].textContent = d['microchipMasc']||"—";
                ven.parentNode.children[2].children[1].textContent = "";
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

function actualListaClientes(id){
    let tbl = document.getElementById(id);
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
                if (id == "selConsultaNuevaCliente"){
                    tbl.addEventListener("change", (e) => actualListaPacientes("selConsultaNuevaPaciente", e.target.value));
                    actualListaPacientes("selConsultaNuevaPaciente", document.getElementById("selConsultaNuevaCliente").value);
                }
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
                actualListaClientes("selPacientesDueno");
                actualTablaClientes(1);
                break;
            case "actMateriales":
                actualTablaInventario(0); break;
            case "actMedicamentos":
                actualTablaInventario(1); break;
            case "actPerfilMascota":
                localStorage.setItem("idMasc", arguments[1]);
                rellenarPerfil(arguments[1]);
                actualTablaConsultas(arguments[1]);
                break;
            case "actConsultaNueva":
                actualListaClientes("selConsultaNuevaCliente");
                actualListaUsuarios("selConsultaNuevaDoctor");
                break;
            case "actConsultas":
                actualTablaConsultas();
            case "actCarnet":
                rellenarCarnet(localStorage.getItem("idMasc"));
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
    document.getElementById("btnConsultaNuevaAnadMed").addEventListener("click", () => {
        let medFila = document.createElement("div");
        medFila.classList.add("prescripcion");
        let idNum = Math.floor(Math.random() * Math.random() * 10000);
        let field1 = document.createElement("fieldset");
        let label1 = document.createElement("label");
        label1.textContent = "Medicamento";
        label1.setAttribute("for", "selConsultaNuevoMedicamento-"+idNum);
        let sel1 = document.createElement("select");
        sel1.id = "selConsultaNuevoMedicamento-"+idNum;
        sel1.addEventListener("change", (e) => actualInvCantidad(e.target) );
        field1.append(label1, sel1);
        let field2= document.createElement("fieldset");
        let label2 = document.createElement("label");
        label2.textContent = "Cantidad";
        label2.setAttribute("for", "selConsultaNuevoMedicamentoCant-"+idNum);
        let sel2 = document.createElement("input");
        sel2.type = "number";
        sel2.id =  "selConsultaNuevoMedicamentoCant-"+idNum;
        field2.append(label2, sel2);
        let field3= document.createElement("fieldset");
        let label3 = document.createElement("label");
        label3.textContent = "Indicaciones";
        label3.setAttribute("for", "selConsultaNuevoMedicamentoInd-"+idNum);
        let sel3 = document.createElement("input");
        sel3.type = "text";
        sel3.id =  "selConsultaNuevoMedicamentoInd-"+idNum;
        field3.append(label3, sel3);
        let btnBorrar = document.createElement("button");
        btnBorrar.textContent = "🗙";
        btnBorrar.type = "button";
        btnBorrar.addEventListener("click", (e) => e.target.parentNode.parentNode.removeChild(e.target.parentNode));
        medFila.append(field1, field2, field3, btnBorrar);
        document.getElementById("frmNuevaConsulta").appendChild(medFila);
        actualListaMedicamentosEx(sel1.id);
    });
    document.getElementById("imprimirEsto").addEventListener("click", (e) => window.print() );

    /* Botones barra superior */
    document.getElementById("btnRegresarMenu").addEventListener("click", () => estPantalla("actMain") );
    document.getElementById("btnRegresarMenuPaciente").addEventListener("click", () => estPantalla("actPacientesMenu") );
    document.getElementById("btnRegresarPerfilPaciente").addEventListener("click", () => estPantalla("actPerfilMascota") );
    document.getElementById("btnConsultarCarnet").addEventListener("click", () => estPantalla("actCarnet") );
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
    document.getElementById("frmNuevaConsulta").addEventListener("submit", (e) => {
        e.preventDefault();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==204){
                    noti.success("¡Consulta creada!");
                    actualTablaClientes(0);
                } else if (xmlhttp.status==400) noti.error("Faltan datos para la operación");
                //else noti.error("Hubo un error al registrar la consulta");
            }
        }
        xmlhttp.open("POST", "consultas");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let prescripciones = document.getElementsByClassName("prescripcion");
        let prescripcionesCon = "";
        let cont = 1;
        Array.from(prescripciones).forEach((e2) => {
            prescripcionesCon += "&selConsultaNuevaMedicamento-"+cont+"="+e2.children[0].children[1].value+"&selConsultaNuevaMedicamentoCant-"+cont+"="+e2.children[1].children[1].value+"&selConsultaNuevaMedicamentoInd-"+cont+"="+encodeURIComponent(e2.children[2].children[1].value);
            cont++;
        });
        xmlhttp.send(
            "selConsultaNuevaCliente="+encodeURIComponent(document.getElementById("selConsultaNuevaCliente").value)+
            "&selConsultaNuevaPaciente="+encodeURIComponent(document.getElementById("selConsultaNuevaPaciente").value)+
            "&txtConsultaNuevaFIngreso="+encodeURIComponent(document.getElementById("txtConsultaNuevaFIngreso").value)+
            "&txtConsultaNuevaFEgreso="+encodeURIComponent(document.getElementById("txtConsultaNuevaFEgreso").value)+
            "&selConsultaNuevaDoctor="+encodeURIComponent(document.getElementById("selConsultaNuevaDoctor").value)+
            "&txtConsultaNuevaMotivo="+encodeURIComponent(document.getElementById("txtConsultaNuevaMotivo").value)+
            "&txtConsultaNuevaPrecio="+encodeURIComponent(document.getElementById("txtConsultaNuevaPrecio").value)+
            "&textConsultaNuevaDescripcion="+encodeURIComponent(document.getElementById("textConsultaNuevaDescripcion").value)+
            "&hiddenConsultaNuevaNumMeds="+prescripciones.length.toString()+prescripcionesCon
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
    });
    document.getElementById("txtConsultasFiltro").addEventListener("change", (e) => {
        let v = e.target.value;
        let t = e.target.parentElement.nextElementSibling.children[1];
        if (v == "") Array.from(t.rows).forEach((e2) => e2.hidden = false);
        else Array.from(t.rows).forEach((e2) => e2.hidden = (e2.cells[1].textContent.indexOf(v) == -1));
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