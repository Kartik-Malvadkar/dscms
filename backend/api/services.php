<?php
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json");

include("../config/db.php");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {

    $result = $conn->query("SELECT * FROM services ORDER BY id DESC");
    $services = [];

    while ($row = $result->fetch_assoc()) {
        $services[] = $row;
    }

    echo json_encode($services);
}

elseif ($method === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['service_name'];
    $price = $data['price'];

    $stmt = $conn->prepare("INSERT INTO services (service_name, price) VALUES (?, ?)");
    $stmt->bind_param("sd", $name, $price);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}

elseif ($method === "DELETE") {

    $id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM services WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "deleted"]);
    }
}
?>