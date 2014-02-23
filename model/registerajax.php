<?php
session_start();
	require_once('../includes/PasswordHash.php');
	$hasher = new PasswordHash(8,false);
	$password = $_GET['password'];
	$_GET['password'] = $hasher->HashPassword($password);
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '13123016';
	$dbh = new PDO($connect, $user, $pass);
	$sql = "INSERT INTO info_users (first,last,email) VALUES (:first,:last,:email);";
	$query = $dbh->prepare($sql);
	$query->execute( array(
		':first' => $_GET['first'],
		':last' => $_GET['last'],
		':email' => $_GET['email'])
	);
	$query = $dbh->query("SELECT * FROM info_users where email='{$_GET['email']}'");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	$sql = "INSERT INTO users (user_id,username,password) VALUES (:user_id,:username,:password);INSERT INTO balance (user_id) VALUE (:user_id);";
	$query2 = $dbh->prepare($sql);
	$query2->execute( array(
		':user_id' => $user1['user_id'],
		':username' => $_GET['username'],
		':password' => $_GET['password'])
	);
	$_SESSION['username'] = $_GET['username'];
	$_SESSION['user_id'] = $user1['user_id'];
	$data['value'] = "correct";
	print(json_encode($data));
	$dbh = null;
?>
