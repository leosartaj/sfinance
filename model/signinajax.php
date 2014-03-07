<?php
session_start();
	//include for password hashing
	require('../includes/PasswordHash.php');
	//connecting db
	require_once('../includes/sql.php');
	$hasher = new PasswordHash(8,false);
	//checking for hashed password
	$check = $hasher->CheckPassword($_GET['password'], $user1['password']);
	if($check === true)
	{
		if(isset($user1['username']))
		{
			$data['value'] = "correct";
			//output json
			print(json_encode($data));
		}
			$_SESSION['username'] = $_GET['username'];
			$_SESSION['user_id'] = $user1['user_id'];
	}
	else 
	{
		$data['value'] = "no";
		//output json
		print(json_encode($data));
	}
	$dbh = null;
?>
