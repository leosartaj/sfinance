</head>
<body>
<div class="wrap">
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="navbar-header">
    <div class="navbar-brand"><a href="../homepage">$Finance</div></a>
  </div>
  <div class="navbar-collapse collapse">
	<ul class="nav navbar-nav">
<?php
	if(isset($_SESSION['username']))
		echo("<li><a href=\"../dashboard\">Dashboard</a></li>");
?>
	</ul>
	<ul class="nav navbar-nav navbar-right">
<?php
	if(isset($_SESSION['username']))
	{
	  echo("<li style=\"margin-right:10px;\"><a href=\"../sfinance\">Logout</a></li>");
	}
?>
	</ul>
  </div>
</div>
