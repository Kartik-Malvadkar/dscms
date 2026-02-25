<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $title = $data['title'];
    $amount = $data['amount'];

    $sql = "INSERT INTO expenses (title, amount) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sd", $title, $amount);
    $stmt->execute();

    echo json_encode(["status" => "success"]);
} else {
    $result = $conn->query("SELECT * FROM expenses ORDER BY id DESC");
    $rows = [];

    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    echo json_encode($rows);
}
?>