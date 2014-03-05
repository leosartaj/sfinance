<?php
	header("Content-type: application/json");
	//proxy settings
    	$auth = base64_encode('pcpradhan:pradhan');
	$aContext = array(
	    'http' => array(
		'proxy' => 'tcp://10.1.1.18:80',
		'request_fulluri' => true,
		'header' => "Proxy-Authorization: Basic $auth",
	    ),
	);
	$cxContext = stream_context_create($aContext);
	//loop for query
	for($i = 1; ;$i++)
	{
		$symbol = 'symbol'.$i;
		if(!isset($_GET[$symbol]))
		{
			break;
		}
		//open csv
		$handle = @fopen("http://download.finance.yahoo.com/d/quotes.csv?s={$_GET[$symbol]}&f=e1l1", "r", false, $cxContext);
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
