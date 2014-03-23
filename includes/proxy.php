<?php
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
?>
