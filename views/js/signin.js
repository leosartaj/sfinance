var reg = {
	"user": /^(?:[0-9a-zA-Z]+)$/,
	"alpha": /^(?:[a-zA-Z]+)$/,
	"email": /^(?:[0-9a-z._]+)(?:[\@])(?:[a-z.]+)(?:[.])(?:[a-z]+)$/
};

function check_log(username, password) {
	var check = 0;
	if((!reg.user.exec(username)) || (username.length < 6)) {
		$('#warning_name').addClass("form-group has-error");
		$('#length').fadeIn();
		check = 1;
	}
	else {
		$('#length').hide();
		$('#warning_name').removeClass("form-group has-error");
	}
	if((!reg.user.exec(password)) || (password.length < 6)) {
		$('#warning_pass').addClass("form-group has-error");
		$('#length1').fadeIn();
		check = 1;
	}
	else {
		$('#length1').hide();
		$('#warning_pass').removeClass("form-group has-error");
	}
	return check;
};

$(document).ready(function() {
	$('#form_log').submit(function() {
		var username = $('#username').val();
		var password = $('#password').val();
		var check = check_log(username, password);
		if(check === 1) {
			return false;
		}
		$.ajax({
			url: "../model/signinajax.php",
			data: {
				'username': username,
				'password': password
			},
			success: function(data) {
				data = JSON.parse(data);
				if(data.value === "correct") {

					window.location = "../homepage";
				}
				else {
					$('#check').addClass("form-group has-error");
					$('#auth').fadeIn();
				}
			}
			});
			return false;
		});
	$('#tog_reg').click(function() {
		$('#login').hide();
		$('#register').fadeIn();
	});
	$('#tog_login').click(function() {
		$('#register').hide();
		$('#login').fadeIn();
	});
});

function register() {
	var first = document.getElementById("first").value;
	var username = document.getElementById("username_new").value;
	var password = document.getElementById("password_new").value;
	var last = document.getElementById("last").value;
	var email = document.getElementById("email").value;
	if((reg.alpha.exec(first)) === null) {
		document.getElementById("warning_first").className = "form-group has-error";
		document.getElementById("firstl").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_first").className = "";
		document.getElementById("firstl").style.display = "none";
	}
	if((reg.alpha.exec(last)) === null) {
		document.getElementById("warning_last").className = "form-group has-error";
		document.getElementById("lastl").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_last").className = "";
		document.getElementById("lastl").style.display = "none";
	}
	if((reg.email.exec(email)) === null) {
		document.getElementById("warning_email").className = "form-group has-error";
		document.getElementById("emaill").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_email").className = "";
		document.getElementById("emaill").style.display = "none";
	}
	if((reg.user.exec(username)) === null || username.length < 6) {
		document.getElementById("warning_newname").className = "form-group has-error";
		document.getElementById("newnamel").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_newname").className = "";
		document.getElementById("newnamel").style.display = "none";
	}
	if((reg.user.exec(password)) === null || password.length < 6) {
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
	var url = "http://localhost/sfinance/model/registerajax.php?username=" + username + "&" + "password=" + password + "&" + "email=" + email + "&" + "first=" + first + "&" + "last=" + last;

	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		    if(xhr.responseText === "1")
			    window.location = "http://localhost/sfinance/homepage";
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}
