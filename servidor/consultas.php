<?php

function Consultas_GET(){
    global $mysqli;
    $objLista = [];
    $filtro = (isset($_GET['idMasc']))?(" WHERE pacienteCon = '".$_GET['idMasc']."';"):";";
    $resultado = $mysqli->query("SELECT * FROM `consultas`".$filtro);
    while ($fila = $resultado->fetch_assoc()){
        $obj = [
            "idCon" => $fila['idCon'],
            "precioCon" => $fila['precioCon'],
            "motivoCon" => $fila['motivoCon'],
            "descripcionCon" => $fila['descripcionCon'],
            "fechaIngresoCon" => $fila['fechaIngresoCon'],
            "fechaEgresoCon" => $fila['fechaEgresoCon'],
        ];
        $resultado_masc = $mysqli->query("SELECT * FROM `mascotas` WHERE idMasc = '".$fila['pacienteCon']."';");
        $fila_masc = $resultado_masc->fetch_assoc();
        $obj['nomMasc'] = $fila_masc['nomMasc'];
        
        $resultado_usu = $mysqli->query("SELECT * FROM `usuarios` WHERE idUsu = '".$fila['doctorCon']."';");
        $fila_usu = $resultado_usu->fetch_assoc();
        $obj['nomUsu'] = $fila_usu['nomUsu'];
        $obj['apPatUsu'] = $fila_usu['apPatUsu'];
        $obj['apMatUsu'] = $fila_usu['apMatUsu'];
        array_push($objLista, $obj);
    }
    header("Content-Type: application/json", true);
    echo json_encode($objLista);
}

function Consultas_POST(){
    global $mysqli;
    if (!isset($_POST['selConsultaNuevaPaciente']) or !isset($_POST['txtConsultaNuevaFIngreso']) or !isset($_POST['txtConsultaNuevaFEgreso']) or !isset($_POST['selConsultaNuevaDoctor']) or !isset($_POST['txtConsultaNuevaMotivo']) or !isset($_POST['txtConsultaNuevaPrecio']) or !isset($_POST['hiddenConsultaNuevaNumMeds'])){
        http_response_code(400);
        echo "Faltan datos para la operación";
        exit();
    }
    $consulta = "INSERT INTO `consultas` (`pacienteCon`, `doctorCon`, `precioCon`, `motivoCon`, `descripcionCon`, `fechaIngresoCon`, `fechaEgresoCon`) VALUES ('".$_POST['selConsultaNuevaPaciente']."', '".$_POST['selConsultaNuevaDoctor']."', '".$_POST['txtConsultaNuevaPrecio']."', '".$_POST['txtConsultaNuevaMotivo']."', '".$_POST['textConsultaNuevaDescripcion']."', '".$_POST['txtConsultaNuevaFIngreso']."', '".$_POST['txtConsultaNuevaFEgreso']."');";
    if ($mysqli->query($consulta)){
        $id_consulta = $mysqli->insert_id;
        $meds = (int) $_POST['hiddenConsultaNuevaNumMeds'];
        for ($i = 1; $i<=$meds; $i++){
            if (!isset($_POST['selConsultaNuevaMedicamento-'.$i]) or !isset($_POST['selConsultaNuevaMedicamentoCant-'.$i])){
                http_response_code(400);
                echo "Faltan datos para la operación de medicamentos";
                exit();
            }
            $consulta_invid = "SELECT invMed FROM `medicamentos` WHERE idMed = '".$_POST['selConsultaNuevaMedicamento-'.$i]."';";
            $resultado_invid = $mysqli->query($consulta_invid);
            if ($resultado_invid->num_rows > 0) $invid = $resultado_invid->fetch_assoc()['invMed'];
            else {
                http_response_code(500);
                echo ("Falló obtención de id de inventario de medicamento");
                exit();
            }
            $consulta_pres = "INSERT INTO `prescripcion` (`conPres`, `medPres`, `cantPres`, `indPres`) VALUES ('".$id_consulta."', '".$_POST['selConsultaNuevaMedicamento-'.$i]."', '".$_POST['selConsultaNuevaMedicamentoCant-'.$i]."', '".$_POST['selConsultaNuevaMedicamentoInd-'.$i]."');";
            if ($mysqli->query($consulta_pres)){
                $consulta_resta = "UPDATE `inventario` SET cantInv = (SELECT cantInv FROM `inventario` WHERE idInv = ".$invid." ) - ".$_POST['selConsultaNuevaMedicamentoCant-'.$i]." WHERE idInv = ".$invid.";";
                if ($mysqli->query($consulta_resta)) http_response_code(204);
                else {
                    http_response_code(500);
                    echo ("Falló actualización de inventario");
                    exit();
                }
            } else {
                http_response_code(500);
                echo ("Falló creación de prescripción");
                exit();
            }
        }
    } else {
        http_response_code(500);
        echo ("Falló creación de consulta");
    }
    exit();
}

?>