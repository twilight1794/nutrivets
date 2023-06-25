<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

function str_starts_with($h, $n){
    return (strncmp($h, $n, strlen($n)) === 0);
}

$mysqli = new mysqli("localhost", "nutrivets", "nutrivets", "nutrivets");
if ($mysqli->connect_errno) die("Fallo al conectar a MySQL: " . $mysqli->connect_error);

// Verificar sesión
function verificarSesion(){
    if (isset($_COOKIE['usuario']) and isset($_COOKIE['sesion'])){
        $consulta = "SELECT * FROM `usuarios` WHERE emailUsu = \"".$_COOKIE['usuario']."\"";
        $resultado = $mysqli->query($consulta);
        if ($result->num_rows > 0){
            $fila = $resultado->fetch_assoc();
            $hash = sha1($_COOKIE['usuario'].$_COOKIE['contra']);
            if ($fila['contraUsu'] != $hash){
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
        http_response_code(401);
        echo "Debes iniciar sesión";
        exit();
    }
}

// Ya, autentificado
$metodo = $_SERVER['REQUEST_METHOD'];
$uri = explode("/", substr($_SERVER['REQUEST_URI'], 1));

if (str_starts_with($uri[0], "pacientes")){
    require "pacientes.php";
    if ($metodo == "GET") Pacientes_GET();
    else if ($metodo == "POST") Pacientes_POST();
} else if (str_starts_with($uri[0], "paciente")){
    require "pacientes.php";
    if ($metodo == "GET") Paciente_GET();
} else if (str_starts_with($uri[0], "clientes")){
    require "clientes.php";
    if ($metodo == "GET") Clientes_GET();
    else if ($metodo == "POST") Clientes_POST();
} else if (str_starts_with($uri[0], "cliente")){
    require "clientes.php";
} else if (str_starts_with($uri[0], "inventario")){
    require "inventario.php";
    if (count($uri) > 2){
        if ($metodo == "DELETE") Inventario_x_DELETE();
    } else {
        if ($metodo == "GET") Inventario_GET();
        else if ($metodo == "POST") Inventario_POST();
    }
} else if (str_starts_with($uri[0], "usuarios")){
    require "usuarios.php";
    if ($metodo == "POST") Usuarios_POST();
} else if (str_starts_with($uri[0], "usuario")){
    require "usuarios.php";
} else if (str_starts_with($uri[0], "sesion")){
    require "sesion.php";
    if ($metodo == "POST") Sesion_POST();
    else if ($metodo == "DELETE") Sesion_DELETE();
} else {
    http_response_code(400);
    echo "URI desconocida: ".$_SERVER['REQUEST_URI'];
}
?>