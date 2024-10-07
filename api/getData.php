<?php


//Prepared Statements from https://www.w3schools.com/php/php_mysql_prepared_statements.asp
// Database connection details
$servername = 'localhost';
$dbname = 'vr360_SensorData';
$username = 'vr360_user1'; // Update with your DB username
$password = '---'; // Update with your DB password

try{
    // Create connection
    $con = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $con->prepare("SELECT * FROM Temperature ORDER BY id DESC LIMIT 1");
    $stmt->execute();

    
    // // set the resulting array to associative
    $result = $stmt->fetch(PDO::FETCH_ASSOC);  
    $temperature = $result['temperature'];

    $json = json_encode(['temperature' => $temperature]); //json_encode erstellt json darstellung aus array: json_encode['a'=>1, 'b'=>2]  ==> {"a":1, "b":2}

    echo $json;

    // if($result){
    //     // Output the result (for example, temperature and timestamp)
    //     echo "Last Temperature Entry: " . $result['temperature'] . "°C\n";
    //     echo "Recorded at: " . $result['id'] . "\n";
    // } else
    // {
    //     echo "No data found in the database.";  
    // }

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$con =null;

?>
