<?php
session_start();
	$path = "../includes/proxy.php";
	if(file_exists($path)) {
		require_once($path);
	}
	$handle = @fopen("http://download.finance.yahoo.com/d/quotes.csv?s={$_GET['symbol']}&f=e1l1", "r", false, $cxContext);
	if ($handle !== FALSE)
	{
		$data = fgetcsv($handle);
		$price = $data[1];
		fclose($handle);
	}
	else
	{
		$data['info'] = "Error Internet";
		print(json_encode($data));
		exit;
	}
	//connect db
	require_once('../includes/sql.php');
	$query = $dbh->query("SELECT * FROM balance where user_id='{$_SESSION['user_id']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	$balance = $user1['balance'] - ($_GET['quantity'] * $price);
	if($balance < 0)
	{
		$data['info'] = "funds";
		print(json_encode($data));
		exit;
	}
	$sql = "UPDATE balance SET balance=:balance WHERE user_id=:user_id";
	$query = $dbh->prepare($sql);
	$query->execute( array(
		':balance' => $balance,
		':user_id' => $_SESSION['user_id'])
	);
	$query = $dbh->query("SELECT * FROM shares where symbol='{$_GET['symbol']}' AND user_id='{$_SESSION['user_id']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	if(isset($user1['symbol']))
	{
		$user1['spent'] += ($price * $_GET['quantity']);
		$sql = "UPDATE shares SET quantity=:quantity, spent=:spent WHERE user_id=:user_id AND symbol=:symbol;";
		$quantity = $user1['quantity'] + $_GET['quantity'];
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':quantity' => $quantity,
			':symbol' => $_GET['symbol'],
			':spent' => $user1['spent'],
			':user_id' => $_SESSION['user_id'])
		);
	}
	else
	{
		$spent = ($price * $_GET['quantity']);
		$sql = "INSERT INTO shares (user_id,symbol,quantity,spent) VALUES (:user_id,:symbol,:quantity,:spent);";
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':user_id' => $_SESSION['user_id'],
			':symbol' => $_GET['symbol'],
			':spent' => $spent,
			':quantity' => $_GET['quantity'])
		);
	}
	$data['info'] = "ok";
	//output json
	print(json_encode($data));
	$dbh = null;
?>
