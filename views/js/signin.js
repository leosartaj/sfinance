function check() {
	var user_reg = /^(?:[0-9a-zA-Z]+)$/;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	if((user_reg.exec(username)) === null) {
		document.getElementById("warning_name").className = "form-group has-error";
		document.getElementById("length").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_name").className = "";
		document.getElementById("length").style.display = "none";
	}

	if((user_reg.exec(password)) === null) {
		document.getElementById("warning_pass").className = "form-group has-error";
		document.getElementById("length1").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_pass").className = "";
		document.getElementById("length1").style.display = "none";
	}

	var xhr = new XMLHttpRequest();

	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	// construct URL
	var url = "http://localhost/project1/model/signinajax.php?username=" + username + "&" + "password=" + password;

	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		    if(xhr.responseText === "correct")
			    window.location = "http://localhost/project1/views/homepage.php";
		    else
		    {
			document.getElementById("check").className = "form-group has-error";
			document.getElementById("auth").style.display = "inline";
		    }
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}
function register() {
	var alpha_reg = /^(?:[a-zA-Z]+)$/;
	var email_reg = /^(?:[0-9a-z._]+)(?:[\@])(?:[a-z.]+)(?:[.])(?:[a-z]+)$/;
	var user_reg = /^(?:[0-9a-zA-Z]+)$/;
	var first = document.getElementById("first").value;
	var username = document.getElementById("username_new").value;
	var password = document.getElementById("password_new").value;
	var last = document.getElementById("last").value;
	var email = document.getElementById("email").value;
	if((alpha_reg.exec(first)) === null) {
		document.getElementById("warning_first").className = "form-group has-error";
		document.getElementById("firstl").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_first").className = "";
		document.getElementById("firstl").style.display = "none";
	}
	if((alpha_reg.exec(last)) === null) {
		document.getElementById("warning_last").className = "form-group has-error";
		document.getElementById("lastl").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_last").className = "";
		document.getElementById("lastl").style.display = "none";
	}
	if((email_reg.exec(email)) === null) {
		document.getElementById("warning_email").className = "form-group has-error";
		document.getElementById("emaill").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_email").className = "";
		document.getElementById("emaill").style.display = "none";
	}
	if((user_reg.exec(username)) === null || username.length < 6) {
		document.getElementById("warning_newname").className = "form-group has-error";
		document.getElementById("newnamel").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_newname").className = "";
		document.getElementById("newnamel").style.display = "none";
	}
	if((user_reg.exec(password)) === null || password.length < 6) {
		document.getElementById("warning_newpassword").className = "form-group has-error";
		document.getElementById("newpasswordl").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_newpassword").className = "";
		document.getElementById("newpasswordl").style.display = "none";
	}

	var xhr = new XMLHttpRequest();

	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}

	var username = document.getElementById("username_new").value;
	var password = document.getElementById("password_new").value;
	var email = document.getElementById("email").value;
	var first = document.getElementById("first").value;
	var last = document.getElementById("last").value;

	// construct URL
	var url = "http://localhost/project1/model/registerajax.php?username=" + username + "&" + "password=" + password + "&" + "email=" + email + "&" + "first=" + first + "&" + "last=" + last;

	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		    if(xhr.responseText === "1")
			    window.location = "http://localhost/project1/views/homepage.php";
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}

function toggle() {
	if(document.getElementById("register").style.display == "none")
	{
		document.getElementById("register").style.display = "inline";
		document.getElementById("login").style.display = "none";
	}
	else
	{
		document.getElementById("login").style.display = "inline";
		document.getElementById("register").style.display = "none";
	}

}


