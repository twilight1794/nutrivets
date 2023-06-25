<?php

function Inventario_GET(){
    global $mysqli;
    $resultado = $mysqli->query("SELECT * FROM `inventario`;");
    $objLista = [];
    if (isset($_GET['invTipo'])) $tipo = $_GET['invTipo'];
    else $tipo = "2";
    while ($fila = $resultado->fetch_assoc()){
        $obj = [
            "idInv" => $fila['idInv'],
            "cantInv" => $fila['cantInv'],
            "precioInv" => $fila['precioInv'],
        ];
        $consulta_mat = "SELECT * FROM materiales WHERE invMat = \"".$fila['idInv']."\";";
        $resultado_mat = $mysqli->query($consulta_mat);
        if ($resultado_mat->num_rows > 0 and ($tipo == "0" or $tipo == "2")){
            $fila_mat = $resultado_mat->fetch_assoc();
            $obj['nombreMat'] = $fila_mat['nombreMat'];
            $obj['formaVentaMat'] = $fila_mat['formaVentaMat'];
            array_push($objLista, $obj);
            continue;
        }
        $consulta_med = "SELECT * FROM medicamentos WHERE invMed = \"".$fila['idInv']."\";";
        $resultado_med = $mysqli->query($consulta_med);
        if ($resultado_med->num_rows > 0 and ($tipo == "1" or $tipo == "2")){

            $fila_med = $resultado_med->fetch_assoc();
            $obj['nombreMed'] = $fila_med['nombreMed'];
            $obj['principioActMed'] = $fila_med['principioActMed'];
            $obj['formaVentaMed'] = $fila_med['formaVentaMed'];
            array_push($objLista, $obj);
            continue;
        }
    }
    header("Content-Type: application/json", true);
    echo json_encode($objLista);
}
function Inventario_POST(){
    global $mysqli;
    if (!isset($_POST['txtInvCantMin']) or !isset($_POST['txtInvCantTot']) or !isset($_POST['txtInvPrecio'])){
        http_response_code(400);
        echo "Faltan datos para la operación";
        exit();
    }
    $tipo = $_POST['txtInvTipo'];
    if (
        ($tipo == "0" and (!isset($_POST['txtMaterialesNombre']) or !isset($_POST['txtMaterialesForma']))) or 
        ($tipo == "1" and (!isset($_POST['txtMedicamentoNombre']) or !isset($_POST['txtMedicamentoLab']) or !isset($_POST['txtMedicamentoPrincipio']) or !isset($_POST['txtMedicamentoForma'])))
    ){
        http_response_code(400);
        echo "Faltan datos para la operación";
        exit();
    }
    $consulta = "INSERT INTO `inventario` (`minCantInv`, `cantInv`, `precioInv`) VALUES ('".$_POST['txtInvCantMin']."','".$_POST['txtInvCantTot']."','".$_POST['txtInvPrecio']."')";
    if ($resultado = $mysqli->query($consulta)){
        $tipo = $_POST['txtInvTipo'];
        if ($tipo == "0"){
            $consulta_mat = "INSERT INTO `materiales` (`nombreMat`, `formaVentaMat`, `invMat`) VALUES ('".$_POST['txtMaterialesNombre']."','".$_POST['txtMaterialesForma']."',".$mysqli->insert_id.")";
            if ($mysqli->query($consulta_mat)) http_response_code(204);
            else {
                http_response_code(500);
                echo ("Falló creación de material");
            }
        } else if ($tipo == "1"){
            $consulta_med = "INSERT INTO `medicamentos` (`nombreMed`, `labMed`, `principioActMed`, `formaVentaMed`, `invMed`) VALUES ('".$_POST['txtMedicamentoNombre']."','".$_POST['txtMedicamentoLab']."','".$_POST['txtMedicamentoPrincipio']."','".$_POST['txtMedicamentoForma']."',".$mysqli->insert_id.")";
            if ($mysqli->query($consulta_med)) http_response_code(204);
            else {
                http_response_code(500);
                echo ("Falló creación de medicamento");
            }
        } else {
            http_response_code(400);
            echo ("Tipo de inventario inválido");
        }
    } else {
        http_response_code(500);
        echo ("Falló creación en inventario");
    }
    exit();
}

function Inventario_x_DELETE(){

}

?>