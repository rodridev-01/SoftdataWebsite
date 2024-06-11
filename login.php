<?php
require 'includes/conex.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verificar las credenciales en la base de datos
    $query = $collection->findOne(['username' => $username]);

    if ($query && password_verify($password, $query['password'])) {
        // Las credenciales son válidas, inicia la sesión
        session_start();
        $_SESSION['username'] = $query['username'];
        $_SESSION['email'] = $query['email'];

        // Redirige al usuario a otra página después del inicio de sesión
        header('Location: dashboard.php');
        exit;
    } else {
        // Las credenciales son inválidas, mostrar un mensaje de error
        $error = "Credenciales inválidas. Por favor, inténtalo de nuevo.";
    }
}
?>