<?php
session_start();
    	$auth = base64_encode('069.5035:ferrari501');
	$aContext = array(
	    'http' => array(
		'proxy' => 'tcp://10.1.1.16:80',
		'request_fulluri' => true,
		'header' => "Proxy-Authorization: Basic $auth",
	    ),
	);
	$cxContext = stream_context_create($aContext);
    // try to get quote
	$handle = @fopen("http://download.finance.yahoo.com/d/quotes.csv?s={$_GET['symbol']}&f=e1l1", "r", false, $cxContext);
    if ($handle !== FALSE)
    {
        $data = fgetcsv($handle);
	$price = $data[1];
        fclose($handle);
    }
    else
    {
	print("Error internet");
	exit;
    }
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '';
	$dbh = new PDO($connect, $user, $pass);
	$query = $dbh->query("SELECT * FROM balance where user_id='{$_SESSION['user_id']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	$balance = $user1['balance'] - ($_GET['quantity'] * $price);
	if($balance < 0)
	{
		print("insufficient funds");
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
		$sql = "UPDATE shares SET quantity=:quantity WHERE user_id=:user_id AND symbol=:symbol;";
		$quantity = $user1['quantity'] + $_GET['quantity'];
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':quantity' => $quantity,
			':symbol' => $_GET['symbol'],
			':user_id' => $_SESSION['user_id'])
		);
		print("CHECK");
	}
	else
	{
		$sql = "INSERT INTO shares (user_id,symbol,quantity) VALUES (:user_id,:symbol,:quantity);";
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':user_id' => $_SESSION['user_id'],
			':symbol' => $_GET['symbol'],
			':quantity' => $_GET['quantity'])
		);
		print("CHECKED");
	}
	print_r($_SESSION);
	print($balance);
	$dbh = null;
?>
