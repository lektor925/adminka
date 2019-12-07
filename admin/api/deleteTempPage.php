<?php

$file = '../../sfsdrhnfdgrrhjhj6435349_dsfsd9089.html';

if (file_exists($file)){
    unlink($file);
} else {
    header('HTTP/1/0 400 Bad Request');
}
