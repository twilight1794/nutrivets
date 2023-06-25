<?php

function Sesion_POST(){
    global $mysqli;
    if (isset($_POST['usuario']) and isset($_POST['contra'])){
        $consulta = "SELECT * FROM `usuarios` WHERE emailUsu = \"".$_POST['usuario']."\"";
        $resultado = $mysqli->query($consulta);
        if ($resultado->num_rows > 0){
            $fila = $resultado->fetch_assoc();
            $hash = sha1($_POST['usuario'].$_POST['contra']);
            if ($fila['contraUsu'] == $hash){
                setcookie("sesion", $hash, time()+50000);
                setcookie("contra", "", time()-3600);
                header("Content-Type: application/json", true);
                echo json_encode($fila);
            } else {
                echo "Hash: ".$hash;
                echo "Contra: ".$_POST['contra'];
                http_response_code(401);
                echo "Contraseña errónea";
                exit();
            }
        } else {
            http_response_code(401);
            echo "Usuario erróneo";
            exit();
        }
    } else {
        http_response_code(400);
        echo "Faltan datos para sesión";
        exit();
    }
}

function Sesion_DELETE(){
    setcookie("sesion", "", time()-36000);
}
?>