<?php

$host = 'localhost:3306';
$dbname = 'lore_connect';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Połączenie z bazą nie powiodło się: " . $e->getMessage();
    exit;
}
?>