var reg = {
	"num": /^(?:[0-9]+)$/
};

$(document).ready(function() {
	get_price();
});

function sym(i) {
	var sym_obj = {}
	for(j = i; j > 0 ; j--) {
		var name = 'symbol' + j;	
		var x = j - 1;
		sym_obj[name] = $('#symbol' + x).html();
	}		
	return sym_obj;
}

function get_price() {
	var i;
	for(i = 0; ;i++) {
		if($('#price' + i).length === 0) {
			break;
		}
	}
	var obj = sym(i);
	$.ajax({
		url: "../model/quoteajax_m.php",
		data: obj 
		,
		success: function(data) {
			for(j = i - 1;j >= 0; j--) {
				var price = 'price' + (j + 1);
				$('#price' + j).html(data[price]);
				if(data[price] !== "Error") {
					var spent = $('#spent' + j).html();
					var net = (data[price] - spent).toFixed(2);
					$('#net' + j).html(net);
				}
			} 
		}
	});
}

function quantity_display(i) {
	if(document.getElementById("quantity"+i).style.display !== "inline")
		document.getElementById("quantity"+i).style.display = "inline";
	else {
		var quantity = document.getElementById("quantity1"+i).value;
		if(!reg.num.exec(quantity)) {
			return false;
		}
		var xhr = new XMLHttpRequest();
		if (xhr == null)
		{
		 alert("Ajax not supported by your browser!");
		 return;
		}
		var symbol = document.getElementById("symbol"+i).innerHTML;
		// construct URL
		var url = "http://localhost/sfinance/model/dashboardajax.php?quantity=" + quantity + "&symbol=" + symbol;
		xhr.onreadystatechange =
		function()
		{
		// only handle loaded requests
		if (xhr.readyState == 4)
		{
		    if (xhr.status == 200)
		    {
			var data = eval('(' + xhr.responseText + ')');
			document.getElementById("q" + i).innerHTML = data.quantity;
			document.getElementById("avail-balance").innerHTML = data.balance.toPrecision(4);
			document.getElementById("quantity"+i).style.display = "none";
			document.getElementById("price" + i).innerHTML = data.price.toPrecision(2);
			document.getElementById("spent" + i).innerHTML = data.spent.toPrecision(2);
		    }
		    else
			alert("Error with Ajax call!");
		}
		}
		xhr.open("POST", url, true);
		xhr.send(null);
	}
}
