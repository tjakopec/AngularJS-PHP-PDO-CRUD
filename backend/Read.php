<?php
include_once '../konfiguracija.php';
if(isset($_GET["sifra"])){
	$izraz = $pdo->prepare("select * from autor where sifra=:sifra");
	$izraz->execute(array("sifra" => $_GET["sifra"]));
	$autor = $izraz->fetch(PDO::FETCH_OBJ);
	$autor->datumrodenja = date( 'Y-m-d', strtotime( $autor->datumrodenja ) );
	echo json_encode($autor);	
}else{
	$data=new stdClass();
	$izraz = $pdo->prepare("select count(sifra) from autor where concat(sifra, ' ',ime, ' ',prezime) like :uvjet");
	$izraz->execute(array("uvjet"=> "%" . $_GET["uvjet"] . "%"));
	$data->ukupno = $izraz->fetchColumn(0);
	$izraz = $pdo->prepare("select * from autor where concat(sifra, ' ',ime, ' ',prezime) like :uvjet limit :brojStranice,10");
	$uvjet= "%" . $_GET["uvjet"] . "%";
	$izraz->bindParam("uvjet", $uvjet);
	$izraz->bindValue("brojStranice", (int)$_GET["brojStranice"], PDO::PARAM_INT);
	$izraz->execute();
	$data->autori = $izraz->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($data);
}
