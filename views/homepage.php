<?php
session_start();
if(!isset($_SESSION['username']))
{
	header("location: http://localhost/project1/controller/index.php");
	exit;
}
	require_once('../includes/helper.php');
	render('title', array('title' => '$Finance'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/homepage.css">
	<script src="../views/js/homepage.js"></script>
<?php
	render('header');
?>
	<div class="container">
	<form method=POST class=form-signin  onsubmit="getquote();return false;">
		<img src="gif/$Finance.gif" class="form-signin-heading">
		<input type="text" class=form-control name=quote placeholder="Get Quote" id=symbol>
		<br>
		<button class="btn btn-lg btn-primary btn-block" type=submit>Get Quote</button>
		<p><img class=load id=load src="gif/load.gif"></p>
		<div id=price class="text-muted"></div>
		<div id=buy><label>Quantity: </label><input placeholder=1 type=text class="form-control" id=quantity></div>
		<br>
		<button id=buy2 class="btn btn-primary btn-xs" onclick="buy_share();return false;">Buy</button>
	</form>
	</div>


<?php
	render('footer');
?>
