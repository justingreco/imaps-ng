<?php
	$url = $_REQUEST['url'];

	$CurlConnect = curl_init();
	curl_setopt($CurlConnect, CURLOPT_URL, $url);
	curl_setopt($CurlConnect, CURLOPT_POST,   1);
	curl_setopt($CurlConnect, CURLOPT_RETURNTRANSFER, 1 );
	$Result = curl_exec($CurlConnect);

	header('Cache-Control: public'); 
	header('Content-type: application/pdf');
	header('Content-Disposition: attachment; filename="new.pdf"');
	header('Content-Length: '.strlen($Result));
	//echo $Result;
	readfile($Result);
	exit;
?>