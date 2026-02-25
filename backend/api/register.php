<?php
error_reporting(0); // Hide warnings (important for clean JSON)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "invalid_request"]);
    exit;
}

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$passwordRaw = $data['password'] ?? '';

if (empty($name) || empty($email) || empty($passwordRaw)) {
    echo json_encode(["status" => "missing_fields"]);
    exit;
}

$password = password_hash($passwordRaw, PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "prepare_failed"]);
    exit;
}

$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>