var global = {};
function getquote() {
	document.getElementById("buy2").style.display = "none";
	document.getElementById("buy").style.display = "none";
	var xhr = new XMLHttpRequest();

	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}

	 global.quote_symbol = document.getElementById("symbol").value;
	 global.quote_symbol = global.quote_symbol.toUpperCase();

	// construct URL
	var url = "http://localhost/project1/model/quoteajax.php?symbol=" + global.quote_symbol;

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
			    document.getElementById("price").innerHTML = global.quote_symbol + ": " + quote.price + "$ " + "<button id=button class=\"btn btn-primary btn-xs\" onclick=\"buy();return false;\"></button>";
			    document.getElementById("button").style.display = "inline";
			    document.getElementById("button").innerHTML = "Buy Share";
			}
			else
				document.getElementById("price").innerHTML = "Error Internet";
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
		document.getElementById("buy2").style.display = "inline";
	}
}
	
function buy_share() {
	var xhr = new XMLHttpRequest();

	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}
	var quantity = document.getElementById("quantity").value;
	// construct URL
	var url = "http://localhost/project1/model/buyajax.php?symbol=" + global.quote_symbol + "&quantity=" + quantity;
	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		    alert(xhr.responseText);
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}
