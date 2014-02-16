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
		alert(quantity);
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
			    document.getElementById("avail-balance").innerHTML = data.balance;
			document.getElementById("quantity"+i).style.display = "none";
		    }
		    else
			alert("Error with Ajax call!");
		}
		}
		xhr.open("POST", url, true);
		xhr.send(null);
	}
}
function present_price(i) {
		var xhr = new XMLHttpRequest();
		if (xhr == null)
		{
		 alert("Ajax not supported by your browser!");
		 return;
		}
		var symbol = document.getElementById("symbol"+i).innerHTML;
		// construct URL
		var url = "http://localhost/project1/model/priceajax.php?symbol=" + symbol;
		xhr.onreadystatechange =
		function()
		{
		// only handle loaded requests
		if (xhr.readyState == 4)
		{
		    if (xhr.status == 200)
		    {
			    document.getElementById("price"+i).innerHTML = xhr.responseText;
		    }
		    else
			alert("Error with Ajax call!");
		}
		}
		xhr.open("POST", url, true);
		xhr.send(null);
}
