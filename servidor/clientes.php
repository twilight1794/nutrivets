<?php

function Clientes_GET(){
    global $mysqli;
    $objLista = [];
    $resultado = $mysqli->query("SELECT * FROM `clientes`;");
    while ($fila = $resultado->fetch_assoc()){
        $obj = [
            "idCte" => $fila['idCte'],
            "nomCte" => $fila['nomCte'],
            "apPatCte" => $fila['apPatCte'],
            "apMatCte" => $fila['apMatCte'],
            "telCte" => $fila['telCte'],
            "calleCte" => $fila['calleCte'],
            "tipoCalleCte" => $fila['tipoCalleCte'],
            "pobCte" => $fila['pobCte'],
            "tipoPobCte" => $fila['tipoPobCte'],
            "munCte" => $fila['munCte'],
            "cpCte" => $fila['cpCte'],
            "edoCte" => $fila['edoCte'],
        ];
        array_push($objLista, $obj);
    }
    header("Content-Type: application/json", true);
    echo json_encode($objLista);
}

function Clientes_POST(){
    global $mysqli;
    if (!isset($_POST['txtClientesNombre']) or !isset($_POST['txtClientesApPat']) or !isset($_POST['selClientesTipoCalle']) or !isset($_POST['txtClientesCalle']) or !isset($_POST['txtClientesEmail']) or !isset($_POST['selClientesTipoLoc']) or !isset($_POST['txtClientesLoc']) or !isset($_POST['txtClientesTel']) or !isset($_POST['txtClientesCP']) or !isset($_POST['txtClientesMun']) or !isset($_POST['selClientesEdo'])){
        http_response_code(400);
        echo "Faltan datos para la operación";
        exit();
    }
    $consulta = "INSERT INTO `clientes` (`telCte`, `nomCte`, `apPatCte`, `apMatCte`, `emailCte`, `calleCte`, `tipoCalleCte`, `pobCte`, `tipoPobCte`, `munCte`, `cpCte`, `edoCte`) VALUES ('".$_POST['txtClientesTel']."','".$_POST['txtClientesNombre']."','".$_POST['txtClientesApPat']."','".$_POST['txtClientesApMat']."','".$_POST['txtClientesEmail']."','".$_POST['txtClientesCalle']."','".$_POST['selClientesTipoCalle']."','".$_POST['txtClientesLoc']."','".$_POST['selClientesTipoLoc']."','".$_POST['txtClientesMun']."','".$_POST['txtClientesCP']."','".$_POST['selClientesEdo']."')";
    if ($mysqli->query($consulta)) http_response_code(204);
    else {
        http_response_code(500);
        echo ("Falló creación de cliente");
    }
    exit();
}

?>