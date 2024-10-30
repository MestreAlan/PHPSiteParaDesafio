<?php
	session_start();
	// as variáveis login e senha recebem os dados digitados na página anterior

	$login = strtolower($_POST['cadastroNome']);
	$senha = strtolower($_POST['cadastroSenha']);
	$curso = strtolower($_POST['cadastroCurso']);
	$email = strtolower($_POST['cadastroEmail']);


	$jsonString = file_get_contents('cadastro.json');
	$data = json_decode($jsonString, true);
	
	$verificador = 0;
	// or if you want to change all entries with activity_code "1"
	foreach ($data as $key => $entry) {
		if ($entry['login'] == $login) {
			$verificador = 1;
			break;
		}
	}
	if($verificador==0&&(strlen($senha)>=4&&strlen($senha)<11)){
		$senha = sha1($senha);
		$usuario = array(
			'login' => $login,
			'senha' => $senha,
			'curso'	=> $curso,
			'email' => $email
		);
		$data[]=$usuario;

		// Tranforma o array $dados em JSON
		$dados_json = json_encode($data);
		 
		// Cria o arquivo cadastro.json
		// O parâmetro "a" indica que o arquivo será aberto para escrita
		$fp = fopen("cadastro.json", "w");
		 
		// Escreve o conteúdo JSON no arquivo
		$escreve = fwrite($fp, $dados_json);
		 
		// Fecha o arquivo
		fclose($fp);

		$_SESSION['login'] = $login;
		$_SESSION['senha'] = $senha;
		$_SESSION['email'] = $email;
		$_SESSION['logado'] = 1;
		header('location:index.php');
	}else{
		$_SESSION['error'] = "Erro no cadastro";
		sleep(1);
		header('location:login.php');
	}

?>