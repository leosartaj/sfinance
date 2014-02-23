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

function check_reg(info) {
	var check = 0;
	if(!reg.alpha.exec(info.first)) {
		$('#warning_first').addClass("form-group has-error");
		$('#firstl').fadeIn();
		check = 1;
	}
	else {
		$('#firstl').hide();
		$('#warning_first').removeClass("form-group has-error");
	}
	if(!reg.alpha.exec(info.last)) {
		$('#warning_last').addClass("form-group has-error");
		$('#lastl').fadeIn();
		check = 1;
	}
	else {
		$('#lastl').hide();
		$('#warning_last').removeClass("form-group has-error");
	}
	if(!reg.email.exec(info.email)) {
		$('#warning_email').addClass("form-group has-error");
		$('#emaill').fadeIn();
		check = 1;
	}
	else {
		$('#emaill').hide();
		$('#warning_email').removeClass("form-group has-error");
	}
	if(!reg.user.exec(info.username) || username.length < 6) {
		$('#warning_newname').addClass("form-group has-error");
		$('#newnamel').fadeIn();
		check = 1;
	}
	else {
		$('#newnamel').hide();
		$('#warning_newname').removeClass("form-group has-error");
	}
	if(!reg.user.exec(info.password) || password.length < 6) {
		$('#warning_newpassword').addClass("form-group has-error");
		$('#newpasswordl').fadeIn();
		check = 1;
	}
	else {
		$('#newpasswordl').hide();
		$('#warning_newpasswordl').removeClass("form-group has-error");
	}
	return check;

}

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
	$('#form_reg').submit(function() {
		var info = {
			'first': $('#first').val(),
			'last': $('#last').val(),
			'email': $('#email').val(),
			'username': $('#username_new').val(),
			'password': $('#password_new').val()
		};
		var check = check_reg(info);
		if(check === 1) {
			return false;
		}
		$.ajax({
			url: "../model/registerajax.php",
			data: {
				'first': info.first,
				'last': info.last,
				'email': info.email,
				'username': info.username,
				'password': info.password
			},
			success: function(data) {
				data = JSON.parse(data);
				if(data.value === "correct") {

					window.location = "../homepage";
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
