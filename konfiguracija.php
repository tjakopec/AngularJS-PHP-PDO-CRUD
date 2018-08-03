<?php

$dbhost = "localhost";
$dbuser = "dbuser";
$dbpass = "dbpass";
$dbname = "angularcrud";
$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
$pdo->exec("set names utf8");