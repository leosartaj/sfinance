<?php
session_start();
if(!isset($_SESSION['username']))
{
	header("location: http://localhost/project1/controller/index.php");
	exit;
}
	require_once("../includes/helper.php");
	render('title', array('title' => 'sfinance'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/dashboard.css">
	<script src="../views/js/dashboard.js"></script>
<?php
	render('header');
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '13123016';
	$dbh = new PDO($connect, $user, $pass);
	$query = $dbh->query("SELECT symbol,quantity,spent FROM shares where user_id='{$_SESSION['user_id']}'");
	$query2 = $dbh->query("SELECT balance FROM balance where user_id='{$_SESSION['user_id']}'");
	$user1 = $query->fetchAll(PDO::FETCH_ASSOC);
	$user2 = $query2->fetch(PDO::FETCH_ASSOC);
	$count = $query->rowCount();
	$_SESSION['count'] = $count;
?>
<div class="table-responsive">
<table class="table table-condensed table-hover table-bordered dashboard"">
	<caption class=caption1><h3>Shares</h3></caption>
	<thead>
		<td>Symbol</td>
		<td>Quantity</td>
		<td>Avg. Price</td>
		<td>Present Price</td>
		<td>Net</td>
	</thead>
<?php
	for($i = 0; $i < $count; $i++)
	{
		echo("<tr>");
		echo("<td id=\"symbol$i\">{$user1[$i]['symbol']}</td>");
		echo("<td id=\"q$i\">{$user1[$i]['quantity']}</td>");
		$spent = ($user1[$i]['spent']/$user1[$i]['quantity']);
		echo("<td id=\"spent$i\" name=spent$i>");printf("%.2f",$spent);echo("</td>");
		echo("<td id=\"price$i\" name=price$i onclick=\"get_price($i);\"><a>Click</a></td>");
		echo("<td id=\"net$i\" name=net$i></td>");
		echo("<td class=\"sell_quantity\" id=\"quantity$i\"><input id=\"quantity1$i\" type=text placeholder=Quantity></td>");
		echo("<td id=\"sell$i\" onclick=\"quantity_display($i);\" name=sell class=\"active\" ><a>Sell</a></td>");
		echo("</tr>");
	}
?>
</table>
</div>
	<p><span class="help-block bal"><strong>Available Balance: </strong><span id="avail-balance"><?= $user2['balance'] ?></span>$</span></p>
<?php
	render('footer');
?>

