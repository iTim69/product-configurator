<?php
// receive.php

header('Content-Type: application/json');

// Database connection details
$host = 'localhost';
$dbname = 'vr360_SensorData';
$username = 'vr360_user1'; // Update with your DB username
$password = '3ys2cqzv9B72XJp4'; // Update with your DB password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve the raw POST data
    $data = file_get_contents('php://input');
    
    // Decode the JSON data
    $json = json_decode($data, true);
    
    // Check for JSON decoding errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Bad request
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    // Prepare and execute the SQL insert statement
    $stmt = $pdo->prepare("INSERT INTO Temperatur (temp) VALUES (?)");
    $success =true;
    foreach ($json as $key => $value) {
        //$stmt->execute(['temp' => $key, 'value' => $value]);
        if(!$stmt->execute(array($value))){
            $success =false;
            break;
        };
    }


    if ($success) {
        // Respond with a success message
        echo json_encode(['message' => 'Data received and stored successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to store data']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Only POST method is allowed']);
}
