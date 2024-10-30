<?php 
	// session_start inicia a sessão
	session_start();
	// as variáveis login e senha recebem os dados digitados na página anterior

	$login = strtolower($_POST['login']);
	$senha = sha1(strtolower($_POST['senha']));
	$email = "";

	$jsonString = file_get_contents('cadastro.json');
	$data = json_decode($jsonString, true);

	$result = 0;
	// or if you want to change all entries with activity_code "1"
	foreach ($data as $key => $entry) {
		$email = $entry['email'];
		if (($entry['login'] == $login) && ($entry['senha'] == $senha)) {
			$result = 1;
			break;
		}
	}
	
	if($result == 1)
	{
		$_SESSION['login'] = $login;
		$_SESSION['senha'] = $senha;
		$_SESSION['email'] = $email;
		$_SESSION['logado'] = 1;
		header('location:index.php');
	}else{
		unset ($_SESSION['login']);
		unset ($_SESSION['senha']);
		$_SESSION['error'] = "Erro no cadastro";
		header('location:login.php');
	}

?>