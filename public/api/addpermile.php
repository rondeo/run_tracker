<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
require_once('checkuserloggedin.php');
set_exception_handler('handleError');


$json_input = file_get_contents("php://input");
$input = json_decode($json_input, true);

$mileStats = [
    "success"=> false,
];

$time = (int)$input['time'];
$mileage = (int)$input['mileage'];
$run_id = (int)$input['run_id']; //$_SESSION['run_id'];

$perMileQuery = "INSERT INTO `miles` SET `time` = $time, `mileage` = $mileage, `run_id` = $run_id";

$perMileResult = mysqli_query($conn, $perMileQuery);

if(!$perMileResult){
    throw new Exception(mysqli_error($conn));
}
if(mysqli_affected_rows($conn)===0)
{
    throw new Exception('Failed to add mile');
}

$mile_id = mysqli_insert_id($conn);

$mileStats['success'] = true;

print(json_encode($mileStats));
