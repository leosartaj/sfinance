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
	    print("Error in ajax call");
	    exit;
    }
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '13123016';
	$dbh = new PDO($connect, $user, $pass);
	$query = $dbh->query("SELECT quantity FROM shares WHERE user_id='{$_SESSION['user_id']}' AND symbol='{$_GET['symbol']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	if($user1['quantity'] < $_GET['quantity'])
	{
		print("yes");
		exit;
	}
	$quantity = $user1['quantity'] - $_GET['quantity']; 
	if($quantity != 0)
	{
		$sql = "UPDATE shares SET quantity=:quantity WHERE user_id=:user_id AND symbol=:symbol;";
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':quantity' => $quantity,
			':symbol' => $_GET['symbol'],
			':user_id' => $_SESSION['user_id'])
		);
	}
	else
	{
		$sql = "DELETE from shares WHERE user_id=:user_id AND symbol=:symbol;";
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':symbol' => $_GET['symbol'],
			':user_id' => $_SESSION['user_id'])
		);
	}
	$query = $dbh->query("SELECT balance FROM balance where user_id='{$_SESSION['user_id']}';");
	$user1 = $query->fetch(PDO::FETCH_ASSOC);
	$balance = $user1['balance'] + ($_GET['quantity'] * $price);
	$sql = "UPDATE balance SET balance=:balance WHERE user_id=:user_id;";
	$query = $dbh->prepare($sql);
	$query->execute( array(
		':balance' => $balance,
		':user_id' => $_SESSION['user_id'])
	);
	$data = array('quantity' => $quantity, 'balance' => $balance);
	print(json_encode($data));
?>
