<?php
session_start();
	$path = "../includes/proxy.php";
	if(file_exists($path)) {
		require_once($path);
	}
	//loop for query
	for($i = 1; ; $i++) 
	{
		$symbol = 'symbol'.$i;
		$quantityx = 'quantity'.$i;
		$p = 'price'.$i;
		if(!isset($_GET[$symbol]))
		{
			break;
		}
		//opening csv file
		$handle = @fopen("http://download.finance.yahoo.com/d/quotes.csv?s={$_GET[$symbol]}&f=e1l1", "r", false, $cxContext);
		if ($handle !== FALSE)
		{
			$data1 = fgetcsv($handle);
			$price = $data1[1];
			fclose($handle);
		}
		else
		{
			$data[$p] = "Error";
			continue;
		}
		//connecting db
		require('../includes/sql.php');
		$query = $dbh->query("SELECT quantity,spent FROM shares WHERE user_id='{$_SESSION['user_id']}' AND symbol='{$_GET[$symbol]}';");
		$user1 = $query->fetch(PDO::FETCH_ASSOC);
		if($user1['quantity'] < $_GET[$quantityx])
		{
			$data[$p] = "Qt";
			continue;
		}
		$quantity = $user1['quantity'] - $_GET[$quantityx]; 
		$spent = $user1['spent'] - ($price * $_GET[$quantityx]);
		if($quantity != 0)
		{
			$sql = "UPDATE shares SET quantity=:quantity,spent=:spent WHERE user_id=:user_id AND symbol=:symbol;";
			$query = $dbh->prepare($sql);
			$query->execute( array(
				':quantity' => $quantity,
				':spent' => $spent,
				':symbol' => $_GET[$symbol],
				':user_id' => $_SESSION['user_id'])
			);
			$spent = $spent/$quantity;
		}
		else
		{
			$sql = "DELETE from shares WHERE user_id=:user_id AND symbol=:symbol;";
			$query = $dbh->prepare($sql);
			$query->execute( array(
				':symbol' => $_GET[$symbol],
				':user_id' => $_SESSION['user_id'])
			);
		}
		$query = $dbh->query("SELECT balance FROM balance where user_id='{$_SESSION['user_id']}';");
		$user1 = $query->fetch(PDO::FETCH_ASSOC);
		$balance = $user1['balance'] + ($_GET[$quantityx] * $price);
		$sql = "UPDATE balance SET balance=:balance WHERE user_id=:user_id;";
		$query = $dbh->prepare($sql);
		$query->execute( array(
			':balance' => $balance,
			':user_id' => $_SESSION['user_id'])
		);
		$qt = 'quantity'.$i;
		$spentx = 'spent'.$i;
		$data[$qt] = $quantity;
		$data[$p] = $price;
		$data[$spentx] = $spent;	
	}
	$data['balance'] = $balance;
	//output json
	print(json_encode($data));
?>
