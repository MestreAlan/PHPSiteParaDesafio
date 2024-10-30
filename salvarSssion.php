<?php
	session_start();

	$_SESSION['conhecimentoProgramacao'] = $_POST['conhecimentoProgramacao'];
	
	$_SESSION['jaJogouJogosCodedotOrg'] = $_POST['jaJogouJogosCodedotOrg'];
	
	$_SESSION['nivelEducacional'] = $_POST['nivelEducacional'];
	
	$_SESSION['login'] = $_POST['login'];
	
	$_SESSION['tarefasFeitas'] = json_encode($_POST['tarefasFeitas']);
	
	$_SESSION['tarefa'] = json_encode($_POST['tarefa']);
	
	$_SESSION['perfil'] = json_encode($_POST['perfil']);
	
	$_SESSION['contadorQuestao'] = $_POST['contadorQuestao'];
?>