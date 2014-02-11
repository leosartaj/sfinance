function check() {
	if(document.getElementById("username").value.length <= 6) {
		alert("Yes");
		return false;
	}
	if(document.getElementById("password").value.length <= 6) {
		alert("Yup");
		return false;
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
function register() {
	if(document.getElementById("first").value === "" || document.getElementById("last").value === "" || document.getElementById("email").value === "") {
		alert("1");
		return false;
	}
	if(document.getElementById("username_new").value.length <= 6) {
		alert("2");
		return false;
	}
	if(document.getElementById("password_new").value.length <= 6) {
		alert("3");
		return false;
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


