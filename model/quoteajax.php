<?php
	header("Content-type: application/json");
	$path = "../includes/proxy.php";
	$check = 0;
	if(file_exists($path)) {
		require_once($path);
		$check = 1;
	}
	//loop for query
	for($i = 1; ;$i++)
	{
		$symbol = 'symbol'.$i;
		if(!isset($_GET[$symbol]))
		{
			break;
		}
		//open csv
		if($check)
		{
			$handle = @fopen("http://download.finance.yahoo.com/d/quotes.csv?s={$_GET[$symbol]}&f=e1l1", "r", false, $cxContext);
		}
		else
		{
			$handle = @fopen("http://download.finance.yahoo.com/d/quotes.csv?s={$_GET[$symbol]}&f=e1l1", "r");
		}
		if ($handle !== FALSE)
		{
			$data = fgetcsv($handle);
			$data1 = 'price'.$i;
			$price[$data1] = $data[1];
			fclose($handle);
		}
		else
		{
			$data1 = 'price'.$i;
			$price[$data1] = "Error";
		}
	}
	//output json
	print(json_encode($price));
?>
