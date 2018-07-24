<?php
header('Content-type: application/json');
$login = $_POST['alias'];
$pass = $_POST['password'];
if ($pass == "12345") {
    echo '{"success": true, "message": "Добро пожаловать, ' . $login.'"}';
} else {
    echo '{"success": false, "message": "Неправильный пароль или логин"}';
}
?>