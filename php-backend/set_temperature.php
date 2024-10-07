<?php
// fetch.php


// $json = file_get_contents('php://input');
// $data = json_decode($json);
// echo 'Hello Json:' .  $json;
// print_r($data);


//php helper function
function debug_to_console($data) {
  $output = $data;
  if (is_array($output))
      $output = implode(',', $output);

  echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}



//Prepared Statements from https://www.w3schools.com/php/php_mysql_prepared_statements.asp
// Database connection details
$servername = 'localhost';
$dbname = 'vr360_SensorData';
$username = 'vr360_user1'; // Update with your DB username
$password = '3ys2cqzv9B72XJp4'; // Update with your DB password

// Create connection
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    // prepare sql and bind parameters
    $stmt = $conn->prepare("INSERT INTO Temperature (temperature)
    VALUES (:temperature)");
    $stmt->bindParam(':temperature', $temperature);
  

    //Receive Data
    $data = file_get_contents('php://input');
    $array = json_decode($data);
    //extract temperature
    $temperature = $array->temperature; 

    //encode server response send to sender
    $response = json_encode(['temperature' => $temperature]);
    echo "new entry created:" . $response . "\n";  
    // debug_to_console("Test");
    //debug_to_console($temperature);

    //write data to db:
    $stmt -> execute();


    echo "\nNew records created successfully";
  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  $conn = null; //close connection

// // Respond with the fetched data
// echo json_encode(['fetched_data' => $data], JSON_PRETTY_PRINT);

?>



