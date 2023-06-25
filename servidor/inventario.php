<?php

class Inventario {
    public static GET(){
        $resultado = $mysqli->query("SELECT * FROM inventario;");
        $obj = [];
        while ($fila = $resultado->fetch_assoc()){
            array_push($obj, $fila);
        }
        header("Content-Type: application/json", true);
        echo json_encode($obj);
    }
    public static POST(){
        $tipo = $_POST['txtInvTipo'];
        if ($tipo == "0"){ // Material
            $consulta1 = "INSERT INTO `inventario`(`minCantInv`, `cantInv`, `precioInv`) VALUES ($_POST['txtMaterialesCantMin'],$_POST['txtMaterialesCantTot'],$_POST['txtMaterialesPrecio'])";
            if ($resultado1 = $mysqli->query($consulta1)){
                $consulta2 = "INSERT INTO `materiales`(`nombreMat`, `invMat`) VALUES ($_POST['txtMaterialesNombre'],"..$resultado1->insert_id..")";
                if ($resultado2 = $mysqli->query($consulta2)){}
                else {
                    http_response_code(500);
                    echo ("Falló material 2");
                    exit();
                }
            } else {
                http_response_code(500);
                echo ("Falló material 1");
                exit();
            }
        } else if ($tipo == "1"){ // Medicamento
            $consulta1 = "INSERT INTO `inventario`(`minCantInv`, `cantInv`, `precioInv`) VALUES ($_POST['txtMedicamentoCantMin'],$_POST['txtMedicamentoCantTot'],$_POST['txtMedicamentoPrecio'])";
            if ($resultado1 = $mysqli->query($consulta1)){
                $consulta2 = "INSERT INTO `medicamentos`(`nombreMed`, `labMed`, `principioActMed`, `formaVentaMed`, `invMed`) VALUES ($_POST['txtMedicamentoNombre'],$_POST['txtMedicamentoLab'],$_POST['txtMedicamentoPrincipio'],$_POST['_txtMedicamentoForma'],"..$resultado1->insert_id..")";
                if ($resultado2 = $mysqli->query($consulta2)){}
                else {
                    http_response_code(500);
                    echo ("Falló medicamento 2");
                    exit();
                }
            } else {
                http_response_code(500);
                echo ("Falló medicamento 1");
                exit();
            }
        }
    }
}

?>