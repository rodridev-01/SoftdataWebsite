<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use MongoDB\Client as MongoDBClient;

$mongoClient = new MongoDBClient("mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/?retryWrites=true&w=majority");
$database = $mongoClient->selectDatabase('test');
$collection = $database->selectCollection('users');

$username = $_POST['username'];
$password = $_POST['password'];

$user = $collection->findOne(['username' => $username]);

if (!$user) {
    echo "Nombre de usuario o contraseña incorrectos";
} else {

    if (password_verify($password, $user['password'])) {
        echo "Inicio de sesión exitoso. Serás redirigido en unos segundos...";
        header("Refresh: 3; URL=https://sofdata.netlify.app"); 
        exit;
    } else {
        echo "Nombre de usuario o contraseña incorrectos";
    }
}
?>


