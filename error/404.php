<?php	
	require_once('../includes/helper.php');
	render('title', array('title' => '404-Page Not Found'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/signin.css">
<?php
	render('header');
?>
	<div class=container>
		<h1>Sorry, requested Page Not Found :(</h1>
	</div>
<?php
	render('footer');
?>
