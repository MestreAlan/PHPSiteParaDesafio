<!DOCTYPE html>
<?php 
	session_start();
	//session_destroy();
	//session_start();
?>
<html lang="pt">
    <head>	
        <meta charset="UTF-8">
        <title>Intro</title>
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<script src="js/controladorLog.js"></script>
		<script src="js/jquery-1.11.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<style>
			body { 
			  background: lightblue ; 
			}

			html {
				font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
				font-size: 14px;
			}

			h5 {
				font-size: 1.28571429em;
				font-weight: 700;
				line-height: 1.2857em;
				margin: 0;
			}

			.card {
				font-size: 1em;
				overflow: hidden;
				padding: 0;
				border: none;
				border-radius: .28571429rem;
				box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
			}

			.card-block {
				font-size: 1em;
				position: relative;
				margin: 0;
				padding: 1em;
				border: none;
				border-top: 1px solid rgba(34, 36, 38, .1);
				box-shadow: none;
			}

			.card-img-top {
				display: block;
				width: 100%;
				height: auto;
			}

			.card-title {
				font-size: 1.28571429em;
				font-weight: 700;
				line-height: 1.2857em;
			}

			.card-text {
				clear: both;
				margin-top: .5em;
				color: rgba(0, 0, 0, .68);
			}

			.card-footer {
				font-size: 1em;
				position: static;
				top: 0;
				left: 0;
				max-width: 100%;
				padding: .75em 1em;
				color: rgba(0, 0, 0, .4);
				border-top: 1px solid rgba(0, 0, 0, .05) !important;
				background: #fff;
			}

			.card-inverse .btn {
				border: 1px solid rgba(0, 0, 0, .05);
			}

			.profile {
				position: absolute;
				top: -12px;
				display: inline-block;
				overflow: hidden;
				box-sizing: border-box;
				width: 25px;
				height: 25px;
				margin: 0;
				border: 1px solid #fff;
				border-radius: 50%;
			}

			.profile-avatar {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			.profile-inline {
				position: relative;
				top: 0;
				display: inline-block;
			}

			.profile-inline ~ .card-title {
				display: inline-block;
				margin-left: 4px;
				vertical-align: top;
			}

			.text-bold {
				font-weight: 700;
			}

			.meta {
				font-size: 1em;
				color: rgba(0, 0, 0, .4);
			}

			.meta a {
				text-decoration: none;
				color: rgba(0, 0, 0, .4);
			}

			.meta a:hover {
				color: rgba(0, 0, 0, .87);
			}
		</style>

	</head>
	<body>
		<script>
			var dados;
			function salvarEstado(){
				$.ajax({
					url: 'acompanhamento.json', 
					dataType: 'json',  
					async: false, 
					success: function(data){ 
						dados = data;
					}
				});
			}
						
			function trocarPlayer(){
				location.href='controllerMudarPlayer.php';
			}
			
			<?php 
				if(!isset($_SESSION['conhecimentoProgramacao']))
				{
					$_SESSION['conhecimentoProgramacao'] = "Nunca programei";
				}
			?>
			var conhecimentoProgramacao =  "<?php echo $_SESSION['conhecimentoProgramacao']; ?>";
			<?php 
				if(!isset($_SESSION['jaJogouJogosCodedotOrg']))
				{
					$_SESSION['jaJogouJogosCodedotOrg'] = ".org:Não";
				}
			?>
			var jaJogouJogosCodedotOrg =  "<?php echo $_SESSION['jaJogouJogosCodedotOrg']; ?>";
			<?php 
				if(!isset($_SESSION['nivelEducacional']))
				{
					$_SESSION['nivelEducacional'] = "Nehuma das opções";
				}
			?>
			var nivelEducacional =  "<?php echo $_SESSION['nivelEducacional']; ?>";
			<?php 
				if(!isset($_SESSION['login']))
				{
					$_SESSION['login'] = 'nãoIdentificado';
				}
			?>
			login =  "<?php echo $_SESSION['login']; ?>";
			
			<?php 
				if(!isset($_SESSION['tarefasFeitas']))
				{
					$_SESSION['tarefasFeitas'] = json_encode([[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]);
				}
			?>
			
			var tarefasFeitas = <?php echo $_SESSION['tarefasFeitas']; ?>;
			
			<?php 
				if(!isset($_SESSION['perfil']))
				{
					$_SESSION['perfil'] = json_encode([0,0]);
				}
			?>
			var perfil = <?php echo $_SESSION['perfil']; ?>;
			
			<?php 
				if(!isset($_SESSION['contadorQuestao']))
				{
					$_SESSION['contadorQuestao'] = 0;
				}
			?>
			var contadorQuestao = <?php echo $_SESSION['contadorQuestao']; ?>;
			
			var tarefa = [0,1,0];// Variável apenas para controle de log
						
			var trava = [0,0,0,0];
			function abrirTarefa(a,b,c){
				if(trava[c]==1){
					//location.href='jogo.php?tarefa='+[a,b,c];
					
					
					$.ajax({
						method: "POST",
						url: "salvarSssion.php",
						data: { tarefa: [a,b,c], conhecimentoProgramacao: conhecimentoProgramacao, tarefasFeitas: tarefasFeitas, jaJogouJogosCodedotOrg: jaJogouJogosCodedotOrg, nivelEducacional: nivelEducacional, login: login, perfil: perfil, contadorQuestao: contadorQuestao }
					})
						.done(function( msg ) {
						location.href='jogo.php';
					});
					
				}
			}
			
		</script>
		<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
			<div id="identificadorUser">
				<input type="button" value="Entrar com outro usuário" onclick="trocarPlayer(); funcaoLog('Clicou em trocar de usuário')"/>
			</div>
		</nav>
				  <!-- Main jumbotron for a primary marketing message or call to action -->
		<div class="jumbotron">
			<div class="container">
				<h1 class="display-3">Coding Assessing Game</h1>
				<p>Teste seus conhecimentos neste jogo de programação.</p>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
					<div class="card card-inverse card-info">
						<img class="card-img-top" src="img/backgroundInicio1.png">
						<div class="card-block">
							<figure class="profile">
								<img id="openLock1" src="img/open-lock.png" class="profile-avatar" alt="">
							</figure>
							<h4 class="card-title mt-3">Fase 1: Comandos de movimento</h4>
							<div class="meta card-text">
								<a>Sequenciamento de comandos</a>
							</div>
							<div class="card-text">
								Jogos Scape Room.
							</div>
						</div>
						<div class="card-footer">
							<small id="placar1">Seu placar: 0% </small>
							<button class="btn btn-info float-right btn-sm" onclick="tarefa[0]=0; funcaoLog('Selecionou fase 1');  abrirTarefa(0,1,0);">Jogar</button>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
					<div class="card card-inverse card-info">
						<img class="card-img-top" src="img/backgroundInicio2.png">
						<div class="card-block">
							<figure class="profile">
								<img id="openLock2" src="img/open-lock.png" class="profile-avatar" alt="">
							</figure>
							<h4 class="card-title mt-3">Fase 2: Variáveis</h4>
							<div class="meta card-text">
								<a>Variáveis para controle de movimento</a>
							</div>
							<div class="card-text">
								Jogos Scape Room.
							</div>
						</div>
						<div class="card-footer">
							<small id="placar2">Seu placar: 0% </small>
							<button class="btn btn-info float-right btn-sm" onclick="tarefa[0]=2; funcaoLog('Selecionou fase 2');  abrirTarefa(2,1,1);">Jogar</button>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
					<div class="card card-inverse card-info">
						<img class="card-img-top" src="img/backgroundInicio3.png">
						<div class="card-block">
							<figure class="profile">
								<img id="openLock3" src="img/open-lock.png" class="profile-avatar" alt="">
							</figure>
							<h4 class="card-title mt-3">Fase 3: Laços de repetição</h4>
							<div class="meta card-text">
								<a>Repetição de comandos estruturados</a>
							</div>
							<div class="card-text">
								Jogos Scape Room.
							</div>
						</div>
						<div class="card-footer">
							<small id="placar3">Seu placar: 0% </small>
							<button class="btn btn-info float-right btn-sm" method=POST onclick="tarefa[0]=4; funcaoLog('Selecionou fase 3');  abrirTarefa(4,1,2);">Jogar</button>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
					<div class="card card-inverse card-info">
						<img class="card-img-top" src="img/backgroundInicio3.png">
						<div class="card-block">
							<figure class="profile">
								<img id="openLock4" src="img/open-lock.png" class="profile-avatar" alt="">
							</figure>
							<h4 class="card-title mt-3">Fase 4: Condicionais</h4>
							<div class="meta card-text">
								<a>Utilização de condições para ações</a>
							</div>
							<div class="card-text">
								Jogos Scape Room.
							</div>
						</div>
						<div class="card-footer">
							<small id="placar4">Seu placar: 0% </small>
							<button class="btn btn-info float-right btn-sm" method=POST onclick="tarefa[0]=6; funcaoLog('Selecionou fase 4');  abrirTarefa(6,1,3)">Jogar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script>
			/*if(perfil[0]==0){
				for(var j=0;j<4;j++){				
					var temp = 0;
					for(var i=0;i<tarefasFeitas[j].length;i++){
						if(tarefasFeitas[j][i]==1){
							temp++;
						}
					}
					temp = temp * 100;
					temp = temp / 6;
					var somaTemp = parseInt(j)+1;
					document.getElementById("placar"+somaTemp).innerHTML = "Seu placar: "+Math.round(temp)+"% ";
					var tmSoma = parseInt(somaTemp)+1;
					if(j==0){
						document.getElementById("openLock"+somaTemp).src = "img/open-lock.png";
						trava[j]=1;
						if(temp>70){
							document.getElementById("openLock"+tmSoma).src = "img/open-lock.png";
							trava[j+1]=1;
						}else{
							document.getElementById("openLock"+tmSoma).src = "img/lock.png";
						}
					}
					if(temp>70 && j!=0 && j<3){
						document.getElementById("openLock"+tmSoma).src = "img/open-lock.png";
						trava[j+1]=1;
					}else if(j<3 && j!=0){
						document.getElementById("openLock"+tmSoma).src = "img/lock.png";
					}
				}			
			}else{*/
				for(var j=0;j<4;j++){
					var temp = 0;
					for(var i=0;i<tarefasFeitas[j].length;i++){
						if(tarefasFeitas[j][i]==1){
							temp++;
						}
					}
					temp = temp * 100;
					temp = temp / 6;
					var somaTemp = parseInt(j)+1;
					document.getElementById("placar"+somaTemp).innerHTML = "Seu placar: "+Math.round(temp)+"% ";
					document.getElementById("openLock"+somaTemp).src = "img/open-lock.png";
					trava[j]=1;
				}
			//}
		</script>
		
		<script>
			$(document).ready(function(){
				$(".show-modal").click(function(){
					$("#myModal").modal({
						backdrop: 'none',
						keyboard: false
					});
				});
			});
		</script>

		<!-- Modal HTML -->
		<div id="myModal" class="modal fade" data-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Dados para acesso:</h4>
					</div>
					<div class="modal-body" id="modalText">
						<h4 class="modal-title">Confirmation</h4>
					</div>
					<div class="modal-footer">
						<span align="justify">Ao clicar em continuar você concorda que os dados de navegação possam ser utilizados de maneira anônima em pesquisa acadêmica visando melhorar a efetividade da ferramenta!</span>
					</div>
					<div class="modal-footer">	
						<button id="btnSubmit" type="button" class="btn btn-default" data-dismiss="modal">Continuar</button>
					</div>
				</div>
			</div>
		</div>
		
		<script>
			if(login=="nãoIdentificado"){
				$('#myModal').modal('show');
				document.getElementById("modalText").innerHTML = 
				'<div class="container">'+
					'<div class="col-md-12">'+
						'<form>'+
							'<label>-Qual seu conhecimento de computação?</label>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Nunca programei" checked>'+
								'<label class="form-check-label" for="exampleRadios1">'+
									'Nunca programei'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Sei programar um pouco" >'+
								'<label class="form-check-label" for="exampleRadios2">'+
									'Sei programar um pouco'+
								'</label>'+
							'</div>'+	
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Sei programar" >'+
								'<label class="form-check-label" for="exampleRadios3">'+
									'Sei programar'+
								'</label>'+
							'</div>'+
							
							'<label></br>-Você é aluno ou professor?</label>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios10" value="Nehuma das opções" >'+
								'<label class="form-check-label" for="exampleRadios10">'+
									'Nehuma das opções'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios4" value="Fundamental" checked>'+
								'<label class="form-check-label" for="exampleRadios4">'+
									'Fundamental'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios5" value="Médio" >'+
								'<label class="form-check-label" for="exampleRadios5">'+
									'Médio'+
								'</label>'+
							'</div>'+	
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios6" value="Técnico" >'+
								'<label class="form-check-label" for="exampleRadios6">'+
									'Técnico'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios7" value="Superior" >'+
								'<label class="form-check-label" for="exampleRadios7">'+
									'Superior'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios8" value="Professor ed. básica" >'+
								'<label class="form-check-label" for="exampleRadios8">'+
									'Professor da educação básica'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios9" value="Professor ed. superior" >'+
								'<label class="form-check-label" for="exampleRadios9">'+
									'Professor da educação superior'+
								'</label>'+
							'</div>'+
							
							'<label></br>-Você já jogou algum jogo que era preciso programar?'+
							'</br>   exemplo: code.org</label>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios11" value=".org:Sim" checked>'+
								'<label class="form-check-label" for="exampleRadios11">'+
									'Sim'+
								'</label>'+
							'</div>'+
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios12" value=".org:Não" >'+
								'<label class="form-check-label" for="exampleRadios12">'+
									'Não'+
								'</label>'+
							'</div>'+	
							'<div class="form-check">'+
								'<input class="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios13" value=".org:Não sei" >'+
								'<label class="form-check-label" for="exampleRadios13">'+
									'Não sei'+
								'</label>'+
							'</div>'+
							
						'</form>'+
					'</div>'+
				'</div>';	
			}
			
			document.getElementById("btnSubmit").onclick = function() {
				
				salvarEstado();
				
				login = "Logado";
					
				var radios1 = document.getElementsByName("exampleRadios");
				for (var i = 0; i < radios1.length; i++) {
					if (radios1[i].checked) {
						conhecimentoProgramacao = radios1[i].value;
					}
				}
				radios1 = document.getElementsByName("exampleRadios2");
				for (var i = 0; i < radios1.length; i++) {
					if (radios1[i].checked) {
						nivelEducacional = radios1[i].value;
					}
				}
				radios1 = document.getElementsByName("exemploRadios3");
				for (var i = 0; i < radios1.length; i++) {
					if (radios1[i].checked) {
						jaJogouJogosCodedotOrg = radios1[i].value;
					}
				}
				
				var avaliadorTemp = 0;

				while(avaliadorTemp==0){
					var acao;
					perfil = [];
					perfil.push( Math.floor(Math.random() * 2) );//Worked example Verdade com 1
					perfil.push( Math.floor(Math.random() * 2) );//Manter questão Verdade com 1
					
					var procurarIgual = 0;
					
					for (var i = 0; i < dados.length; i++) {
						if(dados[i].perfil1==perfil[0]&&dados[i].perfil2==perfil[1]){
							i = dados.length;
							procurarIgual = 1;
						}
					}					
					if(dados.length>=4&&procurarIgual==0){
						acao=0;//Limpar e inserir
						avaliadorTemp=1;
					}else if(dados.length>=4&&procurarIgual==1){
						acao=1;//Limpar
					}else if(dados.length<4&&procurarIgual==0){
						acao=2;//Inserir
						avaliadorTemp=1;
					}
					if(!(dados.length<4&&procurarIgual==1)){
						
						$.ajax({
							method: "POST",
							url: "controllerExperimento.php",
							data: { perfil1: perfil[0], perfil2: perfil[1], acao: acao }	
						});
					}
					salvarEstado();
				}	
				funcaoLog("Login aceito");
				
				$.ajax({
					method: "POST",
					url: "salvarSssion.php",
					data: { tarefa: [0,0,0], conhecimentoProgramacao: conhecimentoProgramacao, tarefasFeitas: tarefasFeitas, jaJogouJogosCodedotOrg: jaJogouJogosCodedotOrg, nivelEducacional: nivelEducacional, login: login, perfil: perfil, contadorQuestao: contadorQuestao }
				});
				
				if(perfil[0]==1){
					location.href='index.php';	
				}
				
			};
			
		</script>
	</body>
</html>