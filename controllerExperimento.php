<?php
	$perfil1 = strtolower($_POST['perfil1']);
	$perfil2 = strtolower($_POST['perfil2']);
	$acao = strtolower($_POST['acao']);
	
	if($acao==0){	
		$usuario = array(
			'perfil1' => $perfil1,
			'perfil2' => $perfil2
		);
		$data[]=$usuario;

		// Tranforma o array $dados em JSON
		$dados_json = json_encode($data);
		 
		// Cria o arquivo cadastro.json
		// O parâmetro "a" indica que o arquivo será aberto para escrita
		$fp = fopen("acompanhamento.json", "w");
		 
		// Escreve o conteúdo JSON no arquivo
		$escreve = fwrite($fp, $dados_json);
		 
		// Fecha o arquivo
		fclose($fp);
	}
	if($acao==1){	
		
		// Tranforma o array $dados em JSON
		$dados_json = json_encode([]);
		 
		// Cria o arquivo cadastro.json
		// O parâmetro "a" indica que o arquivo será aberto para escrita
		$fp = fopen("acompanhamento.json", "w");
		 
		// Escreve o conteúdo JSON no arquivo
		$escreve = fwrite($fp, $dados_json);
		 
		// Fecha o arquivo
		fclose($fp);
	}
	if($acao==2){	
		$jsonString = file_get_contents('acompanhamento.json');
		$data = json_decode($jsonString, true);

		$usuario = array(
			'perfil1' => $perfil1,
			'perfil2' => $perfil2
		);
		$data[]=$usuario;

		// Tranforma o array $dados em JSON
		$dados_json = json_encode($data);
		 
		// Cria o arquivo cadastro.json
		// O parâmetro "a" indica que o arquivo será aberto para escrita
		$fp = fopen("acompanhamento.json", "w");
		 
		// Escreve o conteúdo JSON no arquivo
		$escreve = fwrite($fp, $dados_json);
		 
		// Fecha o arquivo
		fclose($fp);
	}
	echo "ok";

?>