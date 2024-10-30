<?php
	session_start();

	$_SESSION['conhecimentoProgramacao'] = $_GET['conhecimentoProgramacao'];
	
	$_SESSION['jaJogouJogosCodedotOrg'] = $_GET['jaJogouJogosCodedotOrg'];
	
	$_SESSION['nivelEducacional'] = $_GET['nivelEducacional'];
	
	$_SESSION['login'] = $_GET['login'];
	
	$_SESSION['tarefasFeitas'] = json_decode($_GET['tarefasFeitas']);
	echo $_SESSION['tarefasFeitas']."kakak";
	$_SESSION['tarefa'] = $_GET['tarefa'];
	//session_destroy();
    header("Location:index.php");

?>