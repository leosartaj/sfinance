<?php
session_start();
	require('../includes/PasswordHash.php');
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '13123016';
	$dbh = new PDO($connect, $user, $pass);
	$query = $dbh->query("SELECT * FROM users where username='{$_GET['username']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	$hasher = new PasswordHash(8,false);
	$check = $hasher->CheckPassword($_GET['password'], $user1['password']);
	if($check === true)
	{
		if(isset($user1['username']))
		{
			print("correct");
		}
			$_SESSION['username'] = $_GET['username'];
			$_SESSION['user_id'] = $user1['user_id'];
	}
	$dbh = null;
?>
