<?php
$_POST = json_decode(file_get_contents('php://input'), true);

$file = '../../'.$_POST['pageName'];
$newhtml = $_POST['html'];

if ($newhtml && $file){
    file_put_contents($file, $newhtml);
} else {
    header('HTTP/1/0 400 Bad Request');
}
