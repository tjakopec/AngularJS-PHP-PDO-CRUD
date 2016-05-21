<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Generator autora.php</title>
		<link rel="stylesheet" href="css/bootstrap.min.css">
	</head>
	<body>
		<div class="container">
			<a href="index.html">Povratak na pregled autora</a>
			<form method="post" action="generirajAutore.php">
				<fieldset>
					<legend>Unesite podatke</legend>
					<label for="broj">Ukupno slučajnih autora</label>
					<input type="number" name="broj" id="broj" />
					<input type="submit" value="Kreiraj" class="button" name="kreiraj" />
				</fieldset>
			</form>
		</div>
	</body>
</html>