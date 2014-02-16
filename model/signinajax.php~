<?php
session_start();
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '';
	$dbh = new PDO($connect, $user, $pass);

	$query = $dbh->query("SELECT * FROM users where username='{$_GET['username']}' AND password='{$_GET['password']}'");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	if(isset($user1['username']))
	{
		print("correct");
	}
		$_SESSION['username'] = $_GET['username'];
		$_SESSION['user_id'] = $user1['user_id'];
	$dbh = null;
?>
