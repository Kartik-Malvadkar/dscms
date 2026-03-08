<?php

// show errors during development
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status"=>"invalid_request"]);
    exit;
}

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$passwordRaw = $data['password'] ?? '';
$role = $data['role'] ?? 'operator';

if(empty($name) || empty($email) || empty($passwordRaw)){
    echo json_encode(["status"=>"missing_fields"]);
    exit;
}

$password = password_hash($passwordRaw, PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

$stmt = $conn->prepare($sql);

if(!$stmt){
    echo json_encode([
        "status"=>"error",
        "message"=>$conn->error
    ]);
    exit;
}

$stmt->bind_param("ssss",$name,$email,$password,$role);

if($stmt->execute()){
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode([
        "status"=>"error",
        "message"=>$stmt->error
    ]);
}