<?php
session_start();
//applying logout
if(isset($_SESSION['username']))
	{
		session_destroy();
		header('Location: main');
		exit;
	}
	require_once('../includes/helper.php');
//templates and links
	render('title', array('title' => '$Finance'));
?>
	<link rel="stylesheet" type="text/css" href="../views/css/signin.css">
	<script src="../views/js/signin.js"></script>
<?php
	render('header');
?>
<!-- Login Form -->
	<div class="login" id="login">
		<form class="form-signin" role="form" id=form_log method=get>
		  <h2 class="form-signin-heading">Please Sign in</h2>
		<div id="warning_name">
		  <label class="control-label" id="length">Please give a valid username</label>
		  <input type="text" class="form-control" name=username placeholder="Username" id=username autofocus>
		</div>
		<div id="warning_pass">
		  <label class="control-label pass" id="length1">Please give a valid password</label>
		  <input type="password" name="password" class="form-control" placeholder="Password" id=password >
		</div>
		<div id="check">
			<label class="control-label auth" id="auth">username or password incorrect</label>
		</div>
		  <button class="btn btn-lg btn-primary btn-block" type="submit" id=sign_in>Sign in</button>
		<label>Not already a user, <a id="tog_reg" >Sign Up </a>now</label>
		</form>
	</div>
<!--  Register Form -->
	<div class="register" id="register">
		<form class="form-signin" role="form" id=form_reg method=get>
		  <h2 class="form-signin-heading">Register</h2>
		<div id="warning_first">
		  <label class="control-label first" id="firstl">Please fill a valid name</label>
		  <input type="text" class="form-control" id=first placeholder="First Name" autofocus>
		</div>
		<div id="warning_last">
		  <label class="control-label last" id="lastl">Please fill a valid name</label>
		  <input type="text" class="form-control" id=last placeholder="Last Name" autofocus>
		</div>
		<div id="warning_email">
		  <label class="control-label email" id="emaill">Please fill valid email</label>
		  <input type="text" class="form-control" id=email placeholder="Email-Address">
		</div>
		<div id="warning_newname">
		  <label class="control-label newname" id="newnamel">Please give a valid username</label>
		  <input type="text" class="form-control" id=username_new placeholder="Username" autofocus>
		</div>
		<div id="warning_newpassword">
		  <label class="control-label newpassword" id="newpasswordl">Please give a valid password</label>
		  <input type="password" class="form-control" id=password_new placeholder="Password">
		</div>
		  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		<label>Already a user,<a id=tog_login >Login</a></label>
		</form>
	</div>
<?php
	render('footer');
?>
