<?php
session_start();
if(isset($_SESSION['username']))
	session_destroy();
	require_once('../includes/helper.php');
	render('title', array('title' => '$Finance'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/signin.css">
	<script src="../views/js/signin.js"></script>
<?php
	render('header');
?>
	<div class="login" id="login">
		<form class="form-signin" role="form" onsubmit="check();return false;" method=post>
		  <h2 class="form-signin-heading">Please Sign in</h2>
		<div id="warning_name">
		  <label class="control-label" id="length">username should be atleast 6 characters</label>
		  <input type="text" class="form-control" name=username placeholder="Username" id=username autofocus>
		</div>
		<div id="warning_pass">
		  <label class="control-label pass" id="length1">password should be atleast 6 characters</label>
		  <input type="password" name="password" class="form-control" placeholder="Password" id=password >
		</div>
		<div id="check">
			<label class="control-label auth" id="auth">username or password incorrect</label>
		</div>
		  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		<label>Not already a user, <a onclick=toggle(); >Sign Up </a>now</label>
		</form>
	</div>
	<div class="register" id="register">
		<form class="form-signin" role="form" onsubmit="register(); return false;" method=POST>
		  <h2 class="form-signin-heading">Register</h2>
		  <input type="text" class="form-control" id=first placeholder="First Name" autofocus>
		  <input type="text" class="form-control" id=last placeholder="Last Name" autofocus>
		  <input type="text" class="form-control" id=email placeholder="Email-Address">
		  <input type="text" class="form-control" id=username_new placeholder="Username" autofocus>
		  <input type="password" class="form-control" id=password_new placeholder="Password">
		  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		<label>Already a user,<a onclick=toggle(); >Login</a></label>
		</form>
	</div>
<?php
	render('footer');
?>
