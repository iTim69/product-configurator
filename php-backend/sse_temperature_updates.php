<?php


$servername = 'localhost';
$dbname = 'vr360_SensorData';
$username = 'vr360_user1'; // Update with your DB username
$password = '3ys2cqzv9B72XJp4'; // Update with your DB password

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $lastTemperatureId = 0; // Keep track of the last temperature ID sent to the frontend


    // Infinite loop for SSE to keep the connection alive
    while (true) {
        // Fetch the latest temperature data added to the database
        $stmt = $pdo->prepare("SELECT id, temperature FROM Temperature ORDER BY id DESC LIMIT 1");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // If a new temperature was added (id is higher than the last one sent)
        if ($result && $result['id'] > $lastTemperatureId) {
            $lastTemperatureId = $result['id']; // Update the last temperature ID

            // Send the new temperature data as SSE
            echo "data: " . json_encode(['temperature' => $result['temperature']]) . "\n\n";
            flush(); // Push data to the client immediately
        }

        // Sleep for a second before checking again (adjust as needed)
        sleep(1);
    }

  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  $conn = null; //close connection



?>