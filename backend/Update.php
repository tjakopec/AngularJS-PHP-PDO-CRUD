<?php
include_once '../konfiguracija.php';
$autor = json_decode(file_get_contents('php://input'));
$izraz = $pdo->prepare("update autor set ime=:ime,prezime=:prezime, datumrodenja=:datumrodenja where sifra=:sifra");
$izraz->execute(json_decode(json_encode($autor), true));
echo "{\"sifra\": " . $autor->sifra . "}";