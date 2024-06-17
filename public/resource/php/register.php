<?php
require 'vendor/autoload.php'; 

use MongoDB\Client as MongoDBClient;

$mongoClient = new MongoDBClient("mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/?retryWrites=true&w=majority");
$database = $mongoClient->selectDatabase('test');
$collection = $database->selectCollection('users');


$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];


$userExists = $collection->findOne(['username' => $username]);

if ($userExists) {
    echo "El nombre de usuario ya está en uso. Por favor, elige otro.";
} else {

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $insertOneResult = $collection->insertOne([
        'username' => $username,
        'email' => $email,
        'password' => $hashedPassword
    ]);

    if ($insertOneResult->getInsertedCount() === 1) {
        echo "Usuario registrado con éxito";
    } else {
        echo "Error al registrar el usuario";
    }
}
?>
