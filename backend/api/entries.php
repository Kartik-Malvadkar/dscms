<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

include("../config/db.php");

$method = $_SERVER['REQUEST_METHOD'];



/* ---------------- GET ENTRIES ---------------- */

if ($method === "GET") {

    $result = $conn->query("
        SELECT 
            entries.id,
            entries.invoice_number,
            entries.quantity,
            entries.amount AS price,
            entries.created_at,
            customers.name AS customer_name,
            customers.mobile,
            services.service_name,
            users.name AS handled_by
        FROM entries
        JOIN customers ON entries.customer_id = customers.id
        JOIN services ON entries.service_id = services.id
        JOIN users ON entries.handled_by = users.id
        ORDER BY entries.id DESC
    ");

    $entries = [];

    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }

    echo json_encode($entries);
    exit;
}



/* ---------------- CREATE ENTRY ---------------- */

if ($method === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'] ?? "";
    $mobile = $data['mobile'] ?? "";
    $address = $data['address'] ?? "";
    $service_id = $data['service_id'] ?? "";
    $quantity = $data['quantity'] ?? 1;
    $user_id = $data['user_id'] ?? "";


    if (!$name || !$service_id || !$user_id) {

        echo json_encode([
            "status" => "error",
            "message" => "Missing required data"
        ]);
        exit;

    }



    /* ---------- CHECK CUSTOMER ---------- */

    $stmt = $conn->prepare("SELECT id FROM customers WHERE name=?");
    $stmt->bind_param("s",$name);
    $stmt->execute();
    $result = $stmt->get_result();


    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $customer_id = $row['id'];

    } else {

        $stmt = $conn->prepare("
            INSERT INTO customers (name,mobile,address)
            VALUES (?,?,?)
        ");

        $stmt->bind_param("sss",$name,$mobile,$address);
        $stmt->execute();

        $customer_id = $stmt->insert_id;
    }



    /* ---------- GET SERVICE PRICE ---------- */

    $stmt = $conn->prepare("SELECT price FROM services WHERE id=?");
    $stmt->bind_param("i",$service_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $service = $result->fetch_assoc();

    $price = $service['price'];

    $total = $price * $quantity;



    /* ---------- GENERATE INVOICE ---------- */

    $invoice = "INV-" . time();



    /* ---------- INSERT ENTRY ---------- */

    $stmt = $conn->prepare("
        INSERT INTO entries
        (invoice_number,customer_id,service_id,quantity,amount,handled_by)
        VALUES (?,?,?,?,?,?)
    ");

    $stmt->bind_param(
        "siiidi",
        $invoice,
        $customer_id,
        $service_id,
        $quantity,
        $total,
        $user_id
    );


    if ($stmt->execute()) {

        echo json_encode([
            "status" => "success"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => $conn->error
        ]);
    }

}