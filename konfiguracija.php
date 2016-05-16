<?php

$dbhost = "localhost";
$dbuser = "tjakopec";
$dbpass = "tjakopec";
$dbname = "tjakopec_1";
$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
$pdo->exec("set names utf8");