<?php
include_once '../konfiguracija.php';
$autor = json_decode(file_get_contents('php://input'));
if(!isset($autor->datumrodenja)){
	$autor->datumrodenja=null;
}
$izraz = $pdo->prepare("insert into autor (ime,prezime,datumrodenja) values (:ime,:prezime,:datumrodenja)");
$izraz->execute(json_decode(json_encode($autor), true));
echo "{\"sifra\": " . $pdo->lastInsertId() . "}";
