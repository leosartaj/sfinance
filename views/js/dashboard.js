//regular expressions
var reg = {
	"num": /^(?:[0-9]+)$/
};

$(document).ready(function() {
	get_price();
	//enables selling mode
	$('#sell_sh').click(function() {
		var i, j, price, check;
		//counts rows
		for(i = 0; ;i++) {
			if($('#price' + i).length === 0) {
				break;
			}
		}
		for(j = i - 1; j > -1; j--) {
			$('#qt').fadeIn();
			$('#quantity' + j).fadeIn();
		}
		$('#sell_sh').hide();
		$('#sell_cn').slideDown();
		//completes sell
		$('#sell_cn').click(function() {
			$('#load').slideDown().css("display", "block");
			for(j = i - 1; j > -1; j--) {
				var quantity = $('#quantity1' + j).val();
				//validates
				if(!reg.num.exec(quantity)) {
					return false;
				}
				var symbol = $('#symbol' + j).html();
			}
			var obj = qt(i);
			$.ajax({
				url: "../model/dashboardajax.php",
				data: obj, 
				success: function(data) {
					$('#load').hide();
					data = JSON.parse(data);
					for(price in data) {
						if(data[price] === "Error") {
							$('.bal1').slideDown().css("display", "block");
							check = 1;
							break;
						}
					}
					//redirects on selling
					if(check !== 1) {
						window.location = "../dashboard";
						return false;
					}
					check = 0;
				}
			});
		});
	});
});

//makes symbol object for ajax call
function sym(i) {
	var sym_obj = {}
	for(j = i; j > 0 ; j--) {
		var name = 'symbol' + j;	
		var x = j - 1;
		sym_obj[name] = $('#symbol' + x).html();
	}		
	return sym_obj;
}

//makes object for ajax call
function qt(i) {
	var qt_obj = {}
	for(j = i; j > 0 ; j--) {
		var name = 'symbol' + j;	
		var name1 = 'quantity' + j;	
		var x = j - 1;
		qt_obj[name] = $('#symbol' + x).html();
		qt_obj[name1] = $('#quantity1' + x).val();
	}		
	return qt_obj;
}

//gets present price
function get_price() {
	$('#load').slideDown().css("display", "block");
	var i;
	//counts rows
	for(i = 0; ;i++) {
		if($('#price' + i).length === 0) {
			break;
		}
	}
	var obj = sym(i);
	$.ajax({
		url: "../model/quoteajax.php",
		data: obj,
		success: function(data) {
			$('#load').fadeOut();
			for(j = i - 1;j >= 0; j--) {
				var price = 'price' + (j + 1);
				$('#price' + j).html(data[price]);
				//gives present price
				if(data[price] !== "Error") {
					var spent = $('#spent' + j).html();
					var net = (data[price] - spent).toFixed(2);
					$('#net' + j).html(net);
				}
			} 
		}
	});
}
