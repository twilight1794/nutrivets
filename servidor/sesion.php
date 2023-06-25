<?php

class Sesion {
    public M_POST(){
        if (isset($_POST['usuario']) and isset($_POST['contra'])){
            $consulta = "SELECT * FROM `usuarios` WHERE emailUsu = \"$_POST['usuario']\"";
            $resultado = $mysqli->query($consulta);
            if ($result->num_rows > 0){
                $fila = $resultado->fetch_assoc();
                $hash = sha1($_POST['txtLoginEmail']..$_POST['txtLoginContra']);
                if ($fila['contraUsu'] == $hash){
                    setcookie("sesion", $hash, time()+50000);
                    setcookie("contra", "", time()-3600);
                    header("Content-Type: application/json", true);
                    echo json_encode($fila);
                } else {
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
    public M_DELETE(){
        setcookie("usuario", "", time()-3600);
        setcookie("contra", "", time()-3600);
    }
}

?>