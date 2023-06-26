<?php

function Pacientes_GET(){
    global $mysqli;
    $objLista = [];
    if (!isset($_GET['cteMasc'])){
        http_response_code(400);
        echo "Falta especificar un dueño";
        exit();
    }
    $resultado = $mysqli->query("SELECT * FROM `mascotas` WHERE cteMasc = ".$_GET['cteMasc'].";");
    if ($resultado){
        while ($fila = $resultado->fetch_assoc()){
            $obj = [
                "idMasc" => $fila['idMasc'],
                "nomMasc" => $fila['nomMasc'],
                "fechaNacMasc" => $fila['fechaNacMasc'],
                "razaMasc" => $fila['razaMasc'],
                "sexoMasc" => $fila['sexoMasc'],
                "especieMasc" => $fila['especieMasc'],
            ];
            array_push($objLista, $obj);
        }
    }
    header("Content-Type: application/json", true);
    echo json_encode($objLista);
}

function Pacientes_POST(){
    global $mysqli;
    if (!isset($_POST['txtPacientesNombre']) or !isset($_POST['selPacientesSexo']) or !isset($_POST['txtPacientesEspecie']) or !isset($_POST['txtPacientesRaza']) or !isset($_POST['txtPacientesFNac']) or !isset($_POST['selPacientesDueno']) or !isset($_POST['selPacientesConv']) or !isset($_POST['selPacientesViaje'])){
        http_response_code(400);
        echo "Faltan datos para la operación";
        exit();
    }

    if (!empty($_FILES['arcPacientesImagen'] ?? null)){
        $nombre = $_FILES['arcPacientesImagen']['name'];
        $nombreTemporal = $_FILES['arcPacientesImagen']['tmp_name'];
        $rutaFinal = getcwd() . '/../imagen/' . basename($nombre);
        if (isset($nombre)){
            $arcExtension = strtolower(pathinfo($nombre,PATHINFO_EXTENSION));
            if (!in_array($arcExtension, ['jpeg', 'jpg', 'png'])){
                http_response_code(415);
                echo 'Tipo de imagen inválido';
                exit();
            }
            if (!move_uploaded_file($nombreTemporal, $rutaFinal)){
                http_response_code(500);
                echo "Falló subida de imagen";
                exit();
            }
        }
    }

    $consulta = "INSERT INTO `mascotas` (`nomMasc`, `viajeMasc`, `convivenciaMasc`, `fechaNacMasc`, `razaMasc`, `sexoMasc`, `especieMasc`, `microchipMasc`, `imgMasc`, `cteMasc`) VALUES ('".$_POST['txtPacientesNombre']."',".$_POST['selPacientesViaje'].",".$_POST['selPacientesConv'].",'".$_POST['txtPacientesFNac']."','".$_POST['txtPacientesRaza']."',".$_POST['selPacientesSexo'].",'".$_POST['txtPacientesEspecie']."','".$_POST['txtPacientesMicrochip']."','".basename($nombre)."','".$_POST['selPacientesDueno']."')";
    echo "5.Consulta: ".$consulta;

    if ($mysqli->query($consulta)) http_response_code(204);
    else {
        http_response_code(400);
        echo "Falló creación de paciente";
    }
}

function Paciente_GET($id){
    global $mysqli;
    if (!isset($id)){
        http_response_code(400);
        echo "Falta especificar un paciente";
        exit();
    }
    $resultado = $mysqli->query("SELECT * FROM `mascotas` WHERE idMasc = '$id';");
    if ($resultado and $resultado->num_rows > 0){
        $fila = $resultado->fetch_assoc();
        $obj = [
            "idMasc" => $fila['idMasc'],
            "nomMasc" => $fila['nomMasc'],
            "viajeMasc" => $fila['viajeMasc'],
            "convivenciaMasc" => $fila['convivenciaMasc'],
            "fechaNacMasc" => $fila['fechaNacMasc'],
            "razaMasc" => $fila['razaMasc'],
            "sexoMasc" => $fila['sexoMasc'],
            "especieMasc" => $fila['especieMasc'],
            "microchipMasc" => $fila['microchipMasc'],
            "imgMasc" => $fila['imgMasc'],
            "observMasc" => $fila['observMasc'],
        ];
        $resultado_cte = $mysqli->query("SELECT * FROM `clientes` WHERE idCte = '".$fila['cteMasc']."';");
        if ($resultado_cte->num_rows > 0){
            $fila_cte = $resultado_cte->fetch_assoc();
            $obj["nomCte"] = $fila_cte['nomCte'];
            $obj["apPatCte"] = $fila_cte['apPatCte'];
            $obj["apMatCte"] = $fila_cte['apMatCte'];
        }
        header("Content-Type: application/json", true);
        echo json_encode($obj);
    }
}

?>