<?php
if($_POST)
{
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        die();
    } 
	
	
	if(!isset($_POST["nama"]) {
		die();
	}
$name = $_POST["nama"];
alert("ajax sampe sini");
echo json_encode($name);
}

?>