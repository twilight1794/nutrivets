<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

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

if (count($uri) == 0){
    http_response_code(400);
    echo "No URI";
    exit();
}
echo $metodo;
echo var_dump($uri);
exit();

switch ($uri[0]){
    case "pacientes":
        require "pacientes.php";
        break;
    case "paciente":
        require "pacientes.php";
        break;
    case "clientes":
        require "clientes.php";
        break;
    case "cliente":
        require "clientes.php";
        break;
    case "inventario":
        require "inventario.php";
        if (count($uri) > 2){
            
        } else {
            if ($metodo == "GET") Inventario.GET();
            else if ($metodo == "POST") Inventario.POST();
        }
        break;
    case "usuarios":
        require "usuarios.php";
        break;
    case "usuario":
        require "usuarios.php";
        break;
    case "sesion":
        
    default:
        die("URI desconocida");
        break;
}

?>