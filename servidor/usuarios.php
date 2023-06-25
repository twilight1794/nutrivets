<?php

function Usuarios_POST(){
    global $mysqli;
    if (!isset($_POST['nomUsu']) or !isset($_POST['apPatUsu']) or !isset($_POST['emailUsu']) or !isset($_POST['contraUsu']) or !isset($_POST['tipoUsu']) or !isset($_POST['telUsu'])){
        http_response_code(400);
        echo "Faltan datos para la operación";
        exit();
    }
    // Comprobar inexistencia
    $consulta = "SELECT * FROM `usuarios` WHERE emailUsu = \"".$_POST['emailUsu']."\"";
    $resultado = $mysqli->query($consulta);
    if ($resultado->num_rows > 0){
        http_response_code(403);
        echo "Usuario existente";
        exit();
    }
    // Validar algunos datos
    if ($_POST['tipoUsu'] != "0" and $_POST['tipoUsu'] != "1"){
        http_response_code(400);
        echo "Tipo de usuario erróneo";
        exit();
    }
    // Agregar usuario
    $hash = sha1($_POST['emailUsu'].$_POST['contraUsu']);
    $consulta = "INSERT INTO `usuarios` (`nomUsu`, `apPatUsu`, `apMatUsu`, `emailUsu`, `contraUsu`, `tipoUsu`, `telUsu`) VALUES ('".$_POST['nomUsu']."', '".$_POST['apPatUsu']."', '".$_POST['apMatUsu']."', '".$_POST['emailUsu']."', '$hash', '".$_POST['tipoUsu']."', '".$_POST['telUsu']."');";
    if ($mysqli->query($consulta)){
        http_response_code(204);
    } else {
        http_response_code(500);
        echo "Error al crear usuario";
    }
    exit();
}
?>