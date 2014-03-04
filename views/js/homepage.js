var global = {};

var reg = {
	"sym": /^(?:[a-zA-Z.]+)$/,
	"num": /^(?:[0-9]+)$/
};

function check_s(symbol) {
	if(!reg.sym.exec(symbol)) {
		$('#price').html("Plese fill a vald symbol");
		return 1;
	}
};

$(document).ready(function() {
	$('#form_quote').submit(function() {
		global.quote_symbol = $('#symbol').val();
		$('#buy2').hide();
		$('#buy').hide();
		$('#funds').hide();
		$('#error1').hide();
		$('#button').hide();
		$('#load').fadeIn();
		var check = check_s(global.quote_symbol);
		if(check === 1) {
			return false;
		}
		global.quote_symbol = global.quote_symbol.toUpperCase();
		$.ajax({
			url: "../model/quoteajax.php",
			data: {
				'symbol1': global.quote_symbol
			},
			success: function(data) {
				if(data.price1 !== "Error") {
					$('#load').hide();
					if(data.price1 != 0) {
					    var write = global.quote_symbol + ": " + data.price1 + "$ ";
					    $('#price').html(write);
					    $('#button').fadeIn();
					}
					else {
						$('#price').html("Incorrect Symbol");
					}
				}
				else {
					$('#load').hide();
					$('#price').html("error internet");
				}
			}
		});
		return false;
	});
	$('#button').click(function() {
		$('#buy').fadeIn();
		$('#button').hide();
		$('#buy2').fadeIn();
		$('#funds').hide();
		$('#error1').hide();
		return false;
	});

	$('#buy2').click(function () {
		var quantity = $('#quantity').val();
		if(!reg.num.exec(quantity))
		{
			$('#warning_q').addClass("form-group has-error");
			$('#length').fadeIn();
			return false;
		}
		else {
			$('#warning_q').removeClass("form-group has-error");
			$('#length').hide();
		}	
		$('#load1').fadeIn();
		$('#funds').hide();
		$('#error1').hide();
		$.ajax({
			url: "../model/buyajax.php",
			data: {
				'symbol': global.quote_symbol,
				'quantity': quantity
			},
			success: function(data) {
				if(data.info === "ok") {
					$('#load1').hide();
					$('#buy2').hide();
					$('#buy').hide();
					$('#funds').hide();
					$('#error1').hide();
					$('#button').fadeIn();
				}
				else if(data.info === "funds") {
					$('#load1').hide();
					$('#funds').fadeIn();
				}
				else {
					$('#load1').hide();
					$('#error1').fadeIn();
				}
			}
		});
		return false;
	});
});
