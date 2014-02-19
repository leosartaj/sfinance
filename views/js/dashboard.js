function quantity_display(i) {
	if(document.getElementById("quantity"+i).style.display !== "inline")
		document.getElementById("quantity"+i).style.display = "inline";
	else {
		var xhr = new XMLHttpRequest();
		if (xhr == null)
		{
		 alert("Ajax not supported by your browser!");
		 return;
		}
		var quantity = document.getElementById("quantity1"+i).value;
		var symbol = document.getElementById("symbol"+i).innerHTML;
		// construct URL
		var url = "http://localhost/project1/model/dashboardajax.php?quantity=" + quantity + "&symbol=" + symbol;
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

function get_price(i) {
	var xhr = new XMLHttpRequest();
	if (xhr == null)
	{
	 alert("Ajax not supported by your browser!");
	 return;
	}
	var symbol = document.getElementById("symbol" + i).innerHTML;
	// construct URL
	var url = "http://localhost/project1/model/quoteajax.php?symbol=" + symbol;
	xhr.onreadystatechange =
	function()
	{
	// only handle loaded requests
	if (xhr.readyState == 4)
	{
	    if (xhr.status == 200)
	    {
		   var data = eval('(' + xhr.responseText + ')');
		    document.getElementById("price" + i).innerHTML = data.price;
	if(data.price !== "Error")
		    document.getElementById("net" + i).innerHTML = (data.price - document.getElementById("spent"+i).innerHTML).toPrecision(2);
	    }
	    else
		alert("Error with Ajax call!");
	}
	}
	xhr.open("POST", url, true);
	xhr.send(null);
}
