<?php

require 'vendor/autoload.php'; 

use MongoDB\Client as MongoDBClient;
use MongoDB\BSON\ObjectId as MongoDBObjectId;

$mongoClient = new MongoDBClient("mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/?retryWrites=true&w=majority");
$database = $mongoClient->selectDatabase('test');
$collection = $database->selectCollection('users');

$insertOneResult = $collection->insertOne([
    'username' => 'SoyunTest',
    'email' => 'text@example.com',
    'password' => 'contraseña_encriptada'
]);

if ($insertOneResult->getInsertedCount() === 1) {
    echo "Usuario registrado con éxito";
} else {
    echo "Error al registrar el usuario";
}

$user = $collection->findOne(['username' => 'ejemplo']);

if ($user) {
    echo "Usuario encontrado: " . $user['username'];
} else {
    echo "Usuario no encontrado";
}

?>
