<?php

require 'vendor/autoload.php'; // Carga las dependencias de Composer

use MongoDB\Client as MongoDBClient;

// Configuración de MongoDB
$mongoClient = new MongoDBClient("mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/?retryWrites=true&w=majority");
$database = $mongoClient->selectDatabase('test');
$collection = $database->selectCollection('users');

// Verificar si se han enviado datos del formulario de login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $user = $collection->findOne(['username' => $username]);

    if ($user && password_verify($password, $user['password'])) {

        session_start();
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];

        header('Location: index.astro');
        exit;
    } else {
        $error = "Credenciales inválidas. Por favor, inténtalo de nuevo.";
    }
}
?>
