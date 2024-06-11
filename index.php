<?php
require 'includes/conex.php';
require 'login.php'; 

if (isset($error)) {
    echo '<p style="color: red;">' . $error . '</p>';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
</head>
<body>
    <h2>Iniciar sesión</h2>
    <form action="login.php" method="post">
        <label for="username">Usuario:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" name="login" value="Iniciar sesión">
    </form>
</body>
</html>
