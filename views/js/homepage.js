var global = {};
function getquote() {
	var sym_reg = /^(?:[a-zA-Z.]+)$/;
	var symbol = document.getElementById("symbol").value;
	document.getElementById("buy2").style.display = "none";
	document.getElementById("buy").style.display = "none";
	document.getElementById("price").className = "text-muted";
	document.getElementById("funds").style.display= "none";

	var xhr = new XMLHttpRequest();

	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}
	if((sym_reg.exec(symbol)) === null) {
			document.getElementById("price").innerHTML = "Pease fill a valid symbol";
		return false;
	}
	 document.getElementById("load").style.display = "block";
	 global.quote_symbol = document.getElementById("symbol").value;
	 global.quote_symbol = global.quote_symbol.toUpperCase();

	// construct URL
	var url = "http://localhost/sfinance/model/quoteajax.php?symbol=" + global.quote_symbol;

	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		    var quote = eval("(" + xhr.responseText + ")");
			if(quote.price !== "Error") {
				document.getElementById("load").style.display = "none";
				if(quote.price != 0) {
			    document.getElementById("price").innerHTML = global.quote_symbol + ": " + quote.price + "$ " + "<button id=button class=\"btn btn-primary btn-xs\" onclick=\"buy();return false;\"></button>";
			    document.getElementById("button").style.display = "inline";
			    document.getElementById("button").innerHTML = "Buy Share";
				}
				else {
					document.getElementById("price").innerHTML = "Incorrect Symbol";
				}
			}
			else {
				document.getElementById("price").innerHTML = "error internet";
				document.getElementById("load").style.display = "none";
			}
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}

function buy() {
	if(document.getElementById("button").style.display == "inline") {
		document.getElementById("buy").style.display = "inline";
		document.getElementById("button").style.display = "none";
		document.getElementById("price").className = "text-muted";
		document.getElementById("buy2").style.display = "inline";
		document.getElementById("funds").style.display= "none";
	}
}
	
function buy_share() {
	var num_reg = /^(?:[0-9]+)$/;
	var quantity = document.getElementById("quantity").value;
	var xhr = new XMLHttpRequest();

	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}
	if((num_reg.exec(quantity)) === null)
	{
		document.getElementById("warning_q").className = "form-group has-error";
		document.getElementById("length").style.display = "inline";
		return false;
	}
	else {
		document.getElementById("warning_q").className = "";
		document.getElementById("length").style.display = "none";
	}	
	document.getElementById("load1").style.display = "block";
	document.getElementById("funds").style.display= "none";
	var quantity = document.getElementById("quantity").value;
	// construct URL
	var url = "http://localhost/sfinance/model/buyajax.php?symbol=" + global.quote_symbol + "&quantity=" + quantity;
	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		if(xhr.responseText !== "funds")
		{
			document.getElementById("load1").style.display = "none";
			document.getElementById("buy2").style.display = "none";
			document.getElementById("buy").style.display = "none";
			document.getElementById("button").style.display = "inline";
			document.getElementById("price").className = "text-success";
			document.getElementById("funds").style.display= "none";
		}
		else {
			document.getElementById("load1").style.display = "none";
			document.getElementById("funds").style.display= "inline";
		}
			
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}
