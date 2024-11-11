<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $phone_number = $_POST['phone_number'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Niepoprawny format adresu e-mail.";
        exit;
    }

    if (!preg_match('/^\d{9}$/', $phone_number)) {
        echo "Numer telefonu musi zawierać dokładnie 9 cyfr.";
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        echo "Email jest już używany.";
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (email, password, phone_number) VALUES (?, ?, ?)");
        $stmt->execute([$email, $hashedPassword, $phone_number]);
        
        echo "Rejestracja udana.";
    }
} else {
    echo "Niepoprawne żądanie.";
}
?>
