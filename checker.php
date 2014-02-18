<?php
	require_once('includes/PasswordHash.php');
	$hasher = new PasswordHash(8, false);
	$hash = $hasher->HashPassword('database');
	$check = $hasher->CheckPassword('database', $hash);
	print($check);
?>
