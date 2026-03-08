<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';

if (!$email || !$password || !$role) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing login data"
    ]);
    exit;
}

/* CHECK USER */

$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {

    echo json_encode([
        "status" => "not_found"
    ]);
    exit;
}

$user = $result->fetch_assoc();

/* PASSWORD VERIFY */

if (!password_verify($password, $user['password'])) {

    echo json_encode([
        "status" => "invalid_password"
    ]);
    exit;
}

/* ROLE VERIFY */

if ($user['role'] !== $role) {

    echo json_encode([
        "status" => "role_mismatch"
    ]);
    exit;
}

/* REMOVE PASSWORD FROM RESPONSE */

unset($user['password']);

echo json_encode([
    "status" => "success",
    "user" => $user
]);