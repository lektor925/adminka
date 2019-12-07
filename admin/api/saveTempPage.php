<?php
$_POST = json_decode(file_get_contents('php://input'), true);

$newfile = '../../sfsdrhnfdgrrhjhj6435349_dsfsd9089.html';

if ($_POST['html']){
    file_put_contents($newfile, $_POST['html']);
} else {
    header('HTTP/1/0 400 Bad Request');
}