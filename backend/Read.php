<?php
include_once '../konfiguracija.php';
if(isset($_GET["sifra"])){
	$izraz = $pdo->prepare("select * from autor where sifra=:sifra");
	$izraz->execute($_GET);
	$autor = $izraz->fetch(PDO::FETCH_OBJ);
	$autor->datumrodenja = date( 'Y-m-d', strtotime( $autor->datumrodenja ) );
	echo json_encode($autor);	
}else{
	$izraz = $pdo->prepare("select * from autor");
	$izraz->execute();
	echo json_encode($izraz->fetchAll(PDO::FETCH_OBJ));
}
