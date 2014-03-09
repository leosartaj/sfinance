<?php
session_start();
//authenticating
if(!isset($_SESSION['username']))
{
	header("location: ../sfinance/main");
	exit;
}
	require_once('../includes/helper.php');
//templates and links
	render('title', array('title' => '$Finance'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/homepage.css">
	<script src="../views/js/homepage.js"></script>
<?php
	render('header');
?>
	<div class="container">
<!-- Get Quote -->
	<form method=POST class=form-signin id=form_quote>
		<img src="../views/gif/$Finance.gif" class="form-signin-heading img">
		<input type="text" class=form-control name=quote placeholder="Get Quote" id=symbol>
		<br>
		<button class="btn btn-lg btn-primary btn-block" data-loading-text="Getting Quote" id=get_quote type=submit>Get Quote</button>
		<p><img class=load id=load src="../views/gif/load.gif"></p>
		<div id=price class="text-muted"></div><button id=button class="btn btn-primary btn-xs">Buy Share</button>
		<div id="warning_q">
		<div id=buy><label>Quantity: </label><input placeholder=Quantity type=text class="form-control" id=quantity></div>
		<label class="control-label q" id="length">Please fill a number</label>
		</div>
		<br>
		<button id=buy2 class="btn btn-primary btn-xs">Buy</button>
		<p><img class=load id=load1 src="../views/gif/load.gif"></p>
		<div id=funds class="text-danger">Insufficient Funds</div>
		<div id=error1 class="text-muted">Error Internet</div>
	</form>
	</div>
<?php
	render('footer');
?>
