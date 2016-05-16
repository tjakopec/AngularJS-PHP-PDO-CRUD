<?php
include_once '../konfiguracija.php';
$autor = json_decode(file_get_contents('php://input'));
$izraz = $pdo->prepare("delete autor where sifra=:sifra");
$izraz->execute(array("sifra" => $autor->sifra));
echo "{\"sifra\": " . $autor->sifra . "}";