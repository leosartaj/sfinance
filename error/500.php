<?php	
	require_once('../includes/helper.php');
	render('title', array('title' => '500 - Internal Server Error'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/signin.css">
<?php
	render('header');
?>
	<div class=container>
		<h1>We regret, but something went wrong. Keep Calm, we are fixing it :)</h1>
	</div>
<?php
	render('footer');
?>

