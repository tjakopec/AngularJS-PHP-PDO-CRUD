<?php 
if(isset($_POST["kreiraj"]) && $_POST["broj"]>0){
	include_once 'konfiguracija.php';
	$imena = file("ime.txt");
	$prezimena=file("prezime.txt");
	$pdo->beginTransaction();
	$izraz = $pdo->prepare("insert into autor (ime,prezime,datumrodenja) values (:ime,:prezime,:datumrodenja)");
	$brojac=0;
	while($_POST["broj"]>0){
		$int= mt_rand(161055681,1262055681);
		$izraz->execute(array(
		"ime"=>$imena[array_rand($imena)],
		"prezime"=>$prezimena[array_rand($prezimena)],
		"datumrodenja"=>date("Y-m-d H:i:s",$int)
		));
		
		if(++$brojac % 2000 == 0){
			$pdo->commit();
			$pdo->beginTransaction();
		}
		
		$_POST["broj"]--;
	}
	$pdo->commit();
}

header("location: index.html");
