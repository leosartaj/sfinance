<?php
session_start();
//authenticating
if(!isset($_SESSION['username']))
{
	header("location: ../sfinance/main");
	exit;
}
	require_once("../includes/helper.php");
//templates and linking
	render('title', array('title' => 'sfinance'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/dashboard.css">
	<script src="../views/js/dashboard.js"></script>
<?php
	render('header');
//db selection
	$connect = 'mysql:host=localhost;dbname=sfinance';
	$user = 'root';
	$pass = '13123016';
	$dbh = new PDO($connect, $user, $pass);
//querying for shares bought
	$query = $dbh->query("SELECT symbol,quantity,spent FROM shares where user_id='{$_SESSION['user_id']}'");
	$query2 = $dbh->query("SELECT balance FROM balance where user_id='{$_SESSION['user_id']}'");
	$user1 = $query->fetchAll(PDO::FETCH_ASSOC);
	$user2 = $query2->fetch(PDO::FETCH_ASSOC);
	$count = $query->rowCount();
	$_SESSION['count'] = $count;
?>
<div class="table-responsive">
<table class="table table-condensed table-hover table-bordered dashboard">
	<caption class=caption1><h3>Shares</h3></caption>
	<thead>
		<td>Symbol</td>
		<td>Quantity</td>
		<td>Avg. Price</td>
		<td>Present Price</td>
		<td>Net</td>
		<td id=qt>Quantity</td>
	</thead>
<?php
//populating table
	for($i = 0; $i < $count; $i++)
	{
		echo("<tr>");
		echo("<td id=\"symbol$i\">{$user1[$i]['symbol']}</td>");
		echo("<td id=\"q$i\">{$user1[$i]['quantity']}</td>");
		$spent = ($user1[$i]['spent']/$user1[$i]['quantity']);
		echo("<td id=\"spent$i\" name=spent$i>");printf("%.2f",$spent);echo("</td>");
		echo("<td id=\"price$i\" name=price$i></td>");
		echo("<td id=\"net$i\" name=net$i></td>");
		echo("<td class=\"sell_quantity\" id=\"quantity$i\"><input id=\"quantity1$i\" type=text value=0></td>");
		echo("</tr>");
	}
?>
</table>
</div>
<!-- additional info and error messages -->
	<p><span class="help-block bal1" id=bal1><strong>Sorry, Unable to reach server, try again :P</strong></span></p>
	<p><span class="help-block bal"><strong><a id=sell_cn>Sell</a></strong></span></p>
	<p><span class="help-block bal"><strong>Available Balance: </strong><span id="avail-balance"><?= $user2['balance'] ?></span>$</span></p>
	<p><span class="help-block bal"><strong><a id=sell_sh>Sell Shares</a></strong></span></p>
	<p><img class=load id=load src="../views/gif/load.gif"></p>
<?php
	render('footer');
?>
