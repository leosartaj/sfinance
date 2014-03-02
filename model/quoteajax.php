<?php
	header("Content-type: application/json");
    	$auth = base64_encode('069.5035:ferrari501');
	$aContext = array(
	    'http' => array(
		'proxy' => 'tcp://10.1.1.16:80',
		'request_fulluri' => true,
		'header' => "Proxy-Authorization: Basic $auth",
	    ),
	);
	$cxContext = stream_context_create($aContext);
    // try to get quote
	for($i = 1; ;$i++)
	{
		$symbol = 'symbol'.$i;
		if(!isset($_GET[$symbol]))
		{
			break;
		}
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
	print(json_encode($price));
?>
