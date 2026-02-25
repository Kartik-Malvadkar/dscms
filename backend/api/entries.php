<?php
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

include("../config/db.php");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {

    $result = $conn->query("
        SELECT entries.*, services.service_name 
        FROM entries
        JOIN services ON entries.service_id = services.id
        ORDER BY entries.id DESC
    ");

    $entries = [];

    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }

    echo json_encode($entries);
}

elseif ($method === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $customer = $data['customer_name'];
    $service_id = $data['service_id'];
    $price = $data['price'];

    $stmt = $conn->prepare("
        INSERT INTO entries (customer_name, service_id, price)
        VALUES (?, ?, ?)
    ");

    $stmt->bind_param("sid", $customer, $service_id, $price);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
?>