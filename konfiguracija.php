<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "000000";
$dbname = "angularcrud";
$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
$pdo->exec("set names utf8");