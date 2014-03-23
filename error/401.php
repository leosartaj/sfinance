<?php	
require_once('../includes/helper.php');
render('title', array('title' => '401 - Unauthorized'));
?>
<link rel="stylesheet" type="text/css" href="../views/css/signin.css">
<?php
render('header');
?>
<div class=container>
    <h1>Authorized Personnel Only :P</h1>
</div>
<?php
render('footer');
?>

