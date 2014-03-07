<?php
session_start();
	//include for password hashing
	require_once('../includes/PasswordHash.php');
	$hasher = new PasswordHash(8,false);
	$password = $_GET['password'];
	//one-way hashing
	$_GET['password'] = $hasher->HashPassword($password);
	//connecting db
	require_once('../includes/sql.php');
	$query = $dbh->query("SELECT email FROM info_users where email='{$_GET['email']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	if(isset($user1['email']))
	{
		$data['email'] = "email";
		$check = 1;
	}
	$query = $dbh->query("SELECT username FROM users where username='{$_GET['username']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	if(isset($user1['username']))
	{
		$data['name'] = "username";
		$check = 1;
	}
	if($check === 1)
	{
		print(json_encode($data));
		exit;
	}
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
	//output json
	print(json_encode($data));
	$dbh = null;
?>
