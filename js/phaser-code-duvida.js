const moveX = 24.1666;
const moveY = 24.1075;
const limitX = 15;
const limitY = 15;
const maxGrade = 650;

var titulo_questao = "Questão 0: Rqcarregue a tela";

var listaPath = [];

var listaCaminho = [];

var resposta = [];

var game = null;

var controleAcessButton = 0;

var phaserConfig = {
    type: Phaser.CANVAS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    width: 390,
    height: 390,
    scale: {
        mode: Phaser.Scale.NONE
    },
    scene: {
        preload: preload,
        create: create,
		update: update
    },
    canvas: document.querySelector('canvas')
};

function startPhaserEnvironment() {
    console.log('start phaser');
    game = new Phaser.Game(phaserConfig);
}

function stopPhaserEnvironment() {
    if (game != null) {
        // false to keep the canvas in the page
        game.destroy(false);
    }
}

function getObjectFromCatalog(id) {
  var obj = null;
  var object = objects_catalog.objects;
  for (var i = 0; i < object.length; i++) {
      if (object[i].id == id) {
          obj = object[i];
		  i=object.length;
      }
  }       
  return obj;
}

function getObjId(obj) {
    return obj.id;
}

var player;
var portal;
var posiX;
var posiY;
var rock = [];
var posiRockX;
var posiRockY;

function preload ()
{
    console.log('preload');
    var actors = actors_map.actors;
	var object = objects_catalog.objects;
	for (var i = 0; i < object.length; i++) {
		 console.log('4');
		if(object[i].type=="spriteSheet"){
			this.load.spritesheet(object[i].name, 'img/' + object[i].url, 
							{ frameWidth: object[i].scaleY, frameHeight: object[i].scaleX });
		}else{
			this.load.image(object[i].name, 'img/' + object[i].url);
		}
    }     
	this.add.image(1, 1, object[1].name).setDisplaySize(47,47);
}
//para_esquerda para_baixo//para_direita para_cima//para_direita para_cima para_direita
function createPath(){
	var tamanhoPath = dificuldade;
	var retorno = 0;
	while(retorno<5 && tamanhoPath>0){
		var posiTemp = Math.floor(Math.random() * (5 - 1)) + 1;
		if(posiTemp==1){//para_direita
			if(!($.isEmptyObject(listaPath))){
				if(listaPath.length>1){
					if(listaPath[listaPath.length-1][0]!='para_esquerda' && listaPath[listaPath.length-2][0]!='para_esquerda' && parseFloat(posiX)<moveX*15){
						listaPath.push(['para_direita',parseFloat(posiX)+(moveX*2),parseFloat(posiY),'x']);
						tamanhoPath-=1;
						retorno = 0;
						posiX+=(moveX*2);
					}else{
						retorno++;
					}
				}else if(listaPath.length==1){
					if(listaPath[listaPath.length-1][0]!='para_esquerda' && parseFloat(posiX)<moveX*15){
						listaPath.push(['para_direita',parseFloat(posiX)+(moveX*2),parseFloat(posiY),'x']);
						tamanhoPath-=1;
						retorno = 0;
						posiX+=(moveX*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiX)<moveX*15){
				listaPath.push(['para_direita',parseFloat(posiX)+(moveX*2),parseFloat(posiY),'x']);
				tamanhoPath-=1;
				retorno = 0;
				posiX+=(moveX*2);
			}else{
				retorno++;
			}
		}else if(posiTemp==2){//para_baixo
			if(!($.isEmptyObject(listaPath))){
				if(listaPath.length>1){
					if(listaPath[listaPath.length-1][0]!='para_cima' && listaPath[listaPath.length-2][0]!='para_cima' && parseFloat(posiY)<moveY*15){
						listaPath.push(['para_baixo',parseFloat(posiX),parseFloat(posiY)+(moveY*2),'y']);
						tamanhoPath-=1;
						retorno = 0;
						posiY+=(moveY*2);
					}else{
						retorno++;
					}
				}else if(listaPath.length==1){
					if(listaPath[listaPath.length-1][0]!='para_cima' && parseFloat(posiY)<moveY*15){
						listaPath.push(['para_baixo',parseFloat(posiX),parseFloat(posiY)+(moveY*2),'y']);
						tamanhoPath-=1;
						retorno = 0;
						posiY+=(moveY*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiY)<moveY*15){
				listaPath.push(['para_baixo',parseFloat(posiX),parseFloat(posiY)+(moveY*2),'y']);
				tamanhoPath-=1;
				retorno = 0;
				posiY+=(moveY*2);
			}else{
				retorno++;
			}
		}else if(posiTemp==3){//para_esquerda
			if(!($.isEmptyObject(listaPath))){
				if(listaPath.length>1){
					if(listaPath[listaPath.length-1][0]!='para_direita' && listaPath[listaPath.length-2][0]!='para_direita' && parseFloat(posiX)>moveX){
						listaPath.push(['para_esquerda',parseFloat(posiX)-(moveX*2),parseFloat(posiY),'x']);
						tamanhoPath-=1;
						retorno = 0;
						posiX-=(moveX*2);
					}else{
						retorno++;
					}
				}else if(listaPath.length==1){
					if(listaPath[listaPath.length-1][0]!='para_direita' && parseFloat(posiX)>moveX){
						listaPath.push(['para_esquerda',parseFloat(posiX)-(moveX*2),parseFloat(posiY),'x']);
						tamanhoPath-=1;
						retorno = 0;
						posiX-=(moveX*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiX)>moveX){
				listaPath.push(['para_esquerda',parseFloat(posiX)-(moveX*2),parseFloat(posiY),'x']);
				tamanhoPath-=1;
				retorno = 0;
				posiX-=(moveX*2);
			}else{
				retorno++;
			}
		}else if(posiTemp==4){//para_cima
			if(!($.isEmptyObject(listaPath))){
				if(listaPath.length>1){
					if(listaPath[listaPath.length-1][0]!='para_baixo' && listaPath[listaPath.length-2][0]!='para_baixo' && parseFloat(posiY)>moveY){
						listaPath.push(['para_cima',parseFloat(posiX),parseFloat(posiY)-(moveY*2),'y']);
						tamanhoPath-=1;
						retorno = 0;
						posiY-=(moveY*2);
					}else{
						retorno++;
					}
				}else if(listaPath.length==1){
					if(listaPath[listaPath.length-1][0]!='para_baixo' && parseFloat(posiY)>moveY){
						listaPath.push(['para_cima',parseFloat(posiX),parseFloat(posiY)-(moveY*2),'y']);
						tamanhoPath-=1;
						retorno = 0;
						posiY-=(moveY*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiY)>moveY){
				listaPath.push(['para_cima',parseFloat(posiX),parseFloat(posiY)-(moveY*2),'y']);
				tamanhoPath-=1;
				retorno = 0;
				posiY-=(moveY*2);
			}else{
				retorno++;
			}
		}
	}
	if(retorno==5){
		return 0;
	}else if(tamanhoPath <= 0){
		return 1;
	}
}

function adicionarObstaculo(){
	var randomValue = (Math.floor(Math.random() * (15 - 1)) + 1);
	var findValueX = randomValue % 2 == 0 ? (randomValue+1)*moveX : randomValue*moveX;
	randomValue = (Math.floor(Math.random() * (15 - 1)) + 1);
	var findValueY = randomValue % 2 == 0 ? (randomValue+1)*moveY : randomValue*moveY;
	var bool = false;
	for(var i=0;i<listaPath.length;i++){
		if(parseInt(listaPath[i][1])==parseInt(findValueX) && parseInt(listaPath[i][2])==parseInt(findValueY)){
			i=listaPath.length;
			bool = true;
		}
	}
	if(bool==false){
		for(var i=0;i<rock.length;i++){
			if(parseFloat(rock[i].x)==parseFloat(findValueX) && parseFloat(rock[i].y)==parseFloat(findValueY)){
				i=rock.length;
				bool = true;
			}
		}
	}
	if(bool == false && parseFloat(player.x) == parseFloat(findValueX) && parseFloat(player.y) == parseFloat(findValueY)){ bool = true; }
	if(bool == false && parseFloat(portal.x) == parseFloat(findValueX) && parseFloat(portal.y) == parseFloat(findValueY)){ bool = true; }
	if(bool==false){
		posiRockX = parseFloat(findValueX);
		posiRockY = parseFloat(findValueY);
		return 0;
	}else{
		return 1;
	}
}

function createPathSecond(){
	var tamanhoPath = dificuldade;
	var retorno = 0;
	var tamanho = tamanhoPath;
	listaCaminho = [];
	posiX = player.x; 
	posiY = player.y;
	while(retorno<5 && tamanho>0){
		var posiTemp = Math.floor(Math.random() * (5 - 1)) + 1;
		if(posiTemp==1){//para_direita
			if(!($.isEmptyObject(listaCaminho))){
				if(listaCaminho.length>1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_esquerda' && listaCaminho[listaCaminho.length-2][0]!='para_esquerda' && parseFloat(posiX)<moveX*15){
						listaCaminho.push(['para_direita',parseFloat(posiX)+(moveX*2),parseFloat(posiY),'x']);
						tamanho-=1;
						retorno = 0;
						posiX+=(moveX*2);
					}else{
						retorno++;
					}
				}else if(listaCaminho.length==1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_esquerda' && parseFloat(posiX)<moveX*15){
						listaCaminho.push(['para_direita',parseFloat(posiX)+(moveX*2),parseFloat(posiY),'x']);
						tamanho-=1;
						retorno = 0;
						posiX+=(moveX*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiX)<moveX*15){
				listaCaminho.push(['para_direita',parseFloat(posiX)+(moveX*2),parseFloat(posiY),'x']);
				tamanho-=1;
				retorno = 0;
				posiX+=(moveX*2);
			}else{
				retorno++;
			}
		}else if(posiTemp==2){//para_baixo
			if(!($.isEmptyObject(listaCaminho))){
				if(listaCaminho.length>1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_cima' && listaCaminho[listaCaminho.length-2][0]!='para_cima' && parseFloat(posiY)<moveY*15){
						listaCaminho.push(['para_baixo',parseFloat(posiX),parseFloat(posiY)+(moveY*2),'y']);
						tamanho-=1;
						retorno = 0;
						posiY+=(moveY*2);
					}else{
						retorno++;
					}
				}else if(listaCaminho.length==1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_cima' && parseFloat(posiY)<moveY*15){
						listaCaminho.push(['para_baixo',parseFloat(posiX),parseFloat(posiY)+(moveY*2),'y']);
						tamanho-=1;
						retorno = 0;
						posiY+=(moveY*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiY)<moveY*15){
				listaCaminho.push(['para_baixo',parseFloat(posiX),parseFloat(posiY)+(moveY*2),'y']);
				tamanho-=1;
				retorno = 0;
				posiY+=(moveY*2);
			}else{
				retorno++;
			}
		}else if(posiTemp==3){//para_esquerda
			if(!($.isEmptyObject(listaCaminho))){
				if(listaCaminho.length>1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_direita' && listaCaminho[listaCaminho.length-2][0]!='para_direita' && parseFloat(posiX)>moveX){
						listaCaminho.push(['para_esquerda',parseFloat(posiX)-(moveX*2),parseFloat(posiY),'x']);
						tamanho-=1;
						retorno = 0;
						posiX-=(moveX*2);
					}else{
						retorno++;
					}
				}else if(listaCaminho.length==1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_direita' && parseFloat(posiX)>moveX){
						listaCaminho.push(['para_esquerda',parseFloat(posiX)-(moveX*2),parseFloat(posiY),'x']);
						tamanho-=1;
						retorno = 0;
						posiX-=(moveX*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiX)>moveX){
				listaCaminho.push(['para_esquerda',parseFloat(posiX)-(moveX*2),parseFloat(posiY),'x']);
				tamanho-=1;
				retorno = 0;
				posiX-=(moveX*2);
			}else{
				retorno++;
			}
		}else if(posiTemp==4){//para_cima
			if(!($.isEmptyObject(listaCaminho))){
				if(listaCaminho.length>1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_baixo' && listaCaminho[listaCaminho.length-2][0]!='para_baixo' && parseFloat(posiY)>moveY){
						listaCaminho.push(['para_cima',parseFloat(posiX),parseFloat(posiY)-(moveY*2),'y']);
						tamanho-=1;
						retorno = 0;
						posiY-=(moveY*2);
					}else{
						retorno++;
					}
				}else if(listaCaminho.length==1){
					if(listaCaminho[listaCaminho.length-1][0]!='para_baixo' && parseFloat(posiY)>moveY){
						listaCaminho.push(['para_cima',parseFloat(posiX),parseFloat(posiY)-(moveY*2),'y']);
						tamanho-=1;
						retorno = 0;
						posiY-=(moveY*2);
					}else{
						retorno++;
					}
				}
			}else if(parseFloat(posiY)>moveY){
				listaCaminho.push(['para_cima',parseFloat(posiX),parseFloat(posiY)-(moveY*2),'y']);
				tamanho-=1;
				retorno = 0;
				posiY-=(moveY*2);
			}else{
				retorno++;
			}
		}
	}
	if(retorno==5){
		return 0;
	}else if(tamanho <= 0){
		return 1;
	}
}

function createGame(){	
	var analisador = 0;
	
	while(analisador==0){
		listaPath = [];
		var randomValue = (Math.floor(Math.random() * (15 - 1)) + 1);
		var findValueX = randomValue % 2 == 0 ? (randomValue+1)*moveX : randomValue*moveX;
		player.x = parseFloat(findValueX);
		randomValue = (Math.floor(Math.random() * (15 - 1)) + 1);
		var findValueY = randomValue % 2 == 0 ? (randomValue+1)*moveY : randomValue*moveY;
		player.y = parseFloat(findValueY);
		
		posiX = parseFloat(findValueX);
		posiY = parseFloat(findValueY);
		
		analisador = createPath();
	}
	portal.x = listaPath[listaPath.length-1][1];
	portal.y = listaPath[listaPath.length-1][2];
	var listaPathTemp = [];
	for(var i=0;i<listaPath.length;i++){
		listaPathTemp.push(listaPath[i][0]);
	}
	
	resposta.push([listaPathTemp,1]);
	
	createQuestion();
	
}

function verificadorQuestions(listaPathTemp){
	var bool=true;
	for(var i =0;i<resposta.length;i++){
		if(resposta[i][0]==listaPathTemp){
			bool=false;
			i=resposta.length;
			j=resposta[i].length;
		}
	}
	if(bool){
		return 1;
	}else{
		return 0;
	}
}

function createQuestion(){
	var variacaoQuestao = [];
	var controladorQuestaoDistribuicao = [];
	var contexto = "";
	if(questoes[controleQuestaoDif].tipo==1){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo1(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==2){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo2(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==3){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo3(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==4){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo4(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==5){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo5(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==6){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo6(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==7){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo7(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}else if(questoes[controleQuestaoDif].tipo==8){
		for(var i=0;i<1;i++){
			variacaoQuestao = createQuestionTipo8(i);
			controladorQuestaoDistribuicao.push([variacaoQuestao,i]);
		}
	}
	var contadorCriacaoBotao = 0;
	contadorCriacaoBotao++;
	var contadorTemp = Math.floor(Math.random() * (controladorQuestaoDistribuicao.length));		
	if(contadorCriacaoBotao==1){
		posiRef = contadorTemp;
		respostaTexto = contadorTemp;
	}
	var temp1 = controladorQuestaoDistribuicao[contadorTemp][0];
	var temp2 = controladorQuestaoDistribuicao[contadorTemp][1];
	var temp3 = contadorQuestao+1;
	$("#heading"+contadorCriacaoBotao).append(	
		"<h5 class='mb-0'>"+
			"<button class='btn btn-link' data-toggle='collapse' data-target='#collapse"+contadorCriacaoBotao+"' aria-expanded='true' aria-controls='collapseOne' onclick='posiRef="+temp2+";respostaTexto="+temp3+"; desvio=0; funcaoLog(\"DUVIDA << Apertou o botão de seleção "+contadorCriacaoBotao+"\");'>"+
				"Alternativa #correta"+
			"</button>"+
		"</h5>"
	);
	var textoCompleto = "";
	for(var i=0;i<temp1.length;i++){
		textoCompleto+=temp1[i];
	}
	$("#collapse"+contadorCriacaoBotao).append(
		"<div class='card-body'>"+
			""+textoCompleto+""+
		"</div>"
	);
	controladorQuestaoDistribuicao.splice(contadorTemp,1);
	document.getElementById("quadro2").innerHTML = "<div class='container'>"+
		"<div class='row'>"+
			"<div class='col-md-6 box-blocky'>"+
				"<h1>DICA:</h1>"+
				"<P></P>"+
				"<P></P>"+
				"<P></P>"+
				"<P></P>"+
				""+questoes[controleQuestaoDif].titulo+""+
			"</div>"+
		"</div>"+
	"</div>";
}

function createQuestionTipo1(questao){
	var variacaoQuestao = [];
	for(var i=0;i<resposta[questao][0].length;i++){
		variacaoQuestao.push("<p>moverPlayer("+resposta[questao][0][i]+"); </p>");
	}
	return variacaoQuestao;
}

function createQuestionTipo2(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> moverPlayer("+resposta[questao][0][i]+","+contadorLocal+"); </p>");
			}else if(resposta[questao][0].length-1==i){
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					variacaoQuestao.push("<p> moverPlayer("+resposta[questao][0][i]+","+contadorLocal+"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> moverPlayer("+anterior+","+contadorLocal+"); </p>");
					variacaoQuestao.push("<p> moverPlayer("+resposta[questao][0][i]+",1); </p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> moverPlayer("+anterior+","+contadorLocal+"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> moverPlayer("+anterior+","+contadorLocal+"); </p>");
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> moverPlayer("+anterior+","+contadorLocal+"); </p>");
					variacaoQuestao.push("<p> moverPlayer("+resposta[questao][0][i]+",1); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> moverPlayer("+anterior+","+contadorLocal+"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function createQuestionTipo3(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
				variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
			}else if(resposta[questao][0].length-1==i){
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
					variacaoQuestao.push("<p> movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,1); </p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
					variacaoQuestao.push("<p> movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,1); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function createQuestionTipo4(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
				variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\"\"); </p>");
			}else if(resposta[questao][0].length-1==i){		
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\"\"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\""+resposta[questao][0][i]+"\"); </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,1,\"\"); </p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\""+resposta[questao][0][i]+"\"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\"\"); </p>");
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\""+resposta[questao][0][i]+"\"); </p>");
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,1,\"\"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> moverPlayer (movimentoVar,"+contadorLocal+",\""+resposta[questao][0][i]+"\"); </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function createQuestionTipo5(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
				variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar);</p><p> }</p>");
			}else if(resposta[questao][0].length-1==i){
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar);</p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> }</p>");
					variacaoQuestao.push("<p> movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < 1 ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> }</p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar);</p><p> }</p>");
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\"; </p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar);</p><p> }</p>");
					variacaoQuestao.push("<p> movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < 1 ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar);</p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> para (INTEIRO i <= 0 ; i < "+contadorLocal+" ; i <= i + 1){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar);</p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function createQuestionTipo6(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\"; </p>");
				variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
				variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
			}else if(resposta[questao][0].length-1==i){
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					variacaoQuestao.push("<p> movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
					variacaoQuestao.push("<p> contador <- 1;</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					variacaoQuestao.push("<p> movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
					variacaoQuestao.push("<p> contador <- 1;</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					
					
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function createQuestionTipo7(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
				variacaoQuestao.push("</p> INTEIRO contador <- "+contadorLocal+";</p>");
				variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
			}else if(resposta[questao][0].length-1==i){
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					variacaoQuestao.push("<p> contador <- 1;</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					variacaoQuestao.push("<p> contador <- 1;</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					
					
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p>&nbsp;&nbsp;}</p><p> }</p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function createQuestionTipo8(questao){
	var variacaoQuestao = [];
	var contadorLocal = 1;
	var anterior = "";
	for(var i=0;i<resposta[questao][0].length;i++){
		if($.isEmptyObject(variacaoQuestao)){
			if(resposta[questao][0].length==1){
				variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
				variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
				variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
			}else if(resposta[questao][0].length-1==i){
				if(resposta[questao][0][i]==anterior){
					contadorLocal++;
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+resposta[questao][0][i]+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					variacaoQuestao.push("<p> contador <- 1;</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
				}
			}else if(resposta[questao][0][i]!=anterior){
				if(""==anterior){
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> INTEIRO movimentoVar <- \""+anterior+"\";</p>");
					variacaoQuestao.push("<p> INTEIRO contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}else{
				contadorLocal++;
			}
		}else{
			if(anterior==resposta[questao][0][i]){
				if(resposta[questao][0].length-1==i){
					contadorLocal++;
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					
				}else{
					contadorLocal++;
				}
			}else{
				if(resposta[questao][0].length-1==i){
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					variacaoQuestao.push("<p> contador <- 1;</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					
					
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}else{
					variacaoQuestao.push("<p> contador <- "+contadorLocal+";</p>");
					variacaoQuestao.push("<p> enquanto (contador>0){ </p><p> &nbsp;&nbsp; moverPlayer (movimentoVar); </p><p> &nbsp;&nbsp; se (contador==0) então { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; movimentoVar <- \""+resposta[questao][0][i]+"\"; </p><p> &nbsp;&nbsp; } senão { </p><p> &nbsp;&nbsp;&nbsp;&nbsp; contador--; </p><p> &nbsp;&nbsp; } </p><p> } </p>");
					contadorLocal=1;
					anterior = resposta[questao][0][i];
				}
			}
		}
	}
	return variacaoQuestao;
}

function buttonStart(){
	if(controleAcessButton == 0){
		controleAcessoMover(resposta[posiRef][0],resposta[posiRef][1]);
		var tempSoma = posiRef+1;
		funcaoLog("DUVIDA << Acerto");
	}
}

function atualizarMissao(valor){
	if(controleAcessButton == 0){
		$(".level_number").removeClass("level_actual"); 
		$("#leve"+valor).addClass("level_actual");
		contadorQuestao=valor-1;
		refactory();
	}
}

function controleAcessoMover(lista,verificador){
	if(controleAcessButton == 0){
		controleAcessButton = 1;
		moverPlayer (lista,verificador);
	}
}

function moverPlayer (lista,verificador){
	if(!($.isEmptyObject(lista))){
		var objetoLista = lista.splice(0,1);
		var direction = objetoLista;
		if(direction=='para_direita'&&parseFloat(player.x)<moveX*15){
			player.x+=48.3332;
			player.angle = 0;
		}else if(direction=='para_esquerda'&&parseFloat(player.x)>moveX){
			player.x-=48.215;
			player.angle = 180;
		}else if(direction=='para_cima'&&parseFloat(player.y)>moveY){
			player.y-=48.3332;
			player.angle = 270;
		}else if(direction=='para_baixo'&&parseFloat(player.y)<moveY*15){
			player.y+=48.215;
			player.angle = 90;
		}
		if(lista.length>0){
			setTimeout(function(){ moverPlayer (lista,verificador);},1000);
		}
	}
	if(lista.length==0){
		setTimeout(function(){
			if(verificador==1){
				if(limitadorContadorQuestoes>contadorQuestao){
					tarefasFeitas[tarefa[2]][contadorQuestao]=1;
					//contadorQuestao++;
					if(limitadorContadorQuestoes==contadorQuestao){
						$("#leve"+contadorQuestao).removeClass("level_actual");
						$("#leve"+contadorQuestao).removeClass("level_incorrect");
						$("#leve"+contadorQuestao).addClass("level_correct");
						//contadorQuestao=0;
						$('#myModal').modal('show');
						//desvio = 0;
						document.getElementById("modalText").innerHTML = "<h4 class='modal-title'>Você acertou, parabéns!</h4>";
						return 1;
					}else{
						$("#leve"+contadorQuestao).removeClass("level_actual");
						$("#leve"+contadorQuestao).removeClass("level_incorrect");
						$("#leve"+contadorQuestao).addClass("level_correct");
						$('#myModal').modal('show'); 
						//desvio = 0;
						document.getElementById("modalText").innerHTML = "<h4 class='modal-title'>Você acertou, parabéns!</h4>";
						return 1;
					}
				}
			}else{
				if(tarefasFeitas[tarefa[2]][contadorQuestao]!=1){
					tarefasFeitas[tarefa[2]][contadorQuestao]=2;
				}
				$("#leve"+parseInt(contadorQuestao+1)).removeClass("level_actual");
				$("#leve"+parseInt(contadorQuestao+1)).removeClass("level_correct");
				$("#leve"+parseInt(contadorQuestao+1)).addClass("level_incorrect");
				$('#myModal').modal('show');
				//desvio = 1;
				document.getElementById("modalText").innerHTML = "<h4 class='modal-title'>A alternaiva escolhida está errada, vamos tentar novamente.</h4>";
				return 0;
			}
		},1000);
	}
}

$(document).on('click', '.fa', function () {
	$(".fa").html("&#128079;");
	$(".fa").removeClass("fa"); 
});

function create ()
{
	var id_player;
	var id_obstacle;
	var id_background;
	var id_grade;

	var selecaoFase = Math.floor(Math.random() * 3);
	if(selecaoFase==1){
		id_player=[0,1,2];
		id_obstacle=[9,10];
		id_background=[5,6];
		id_grade=[14];
	}else if(selecaoFase==2){
		id_player=[3];
		id_obstacle=[11];
		id_background=[7];
		id_grade=[14];
	}else{
		id_player=[4];
		id_obstacle=[12];
		id_background=[8];
		id_grade=[15];
	}
	
    console.log('create');
    // white background
    this.cameras.main.setBackgroundColor('#FFFFFF');

    // group to enable operations in group of objects at the same time
    noColliderStaticGroup = this.physics.add.staticGroup();
    colliderStaticGroup = this.physics.add.staticGroup();

    var actors = actors_map.actors;
	
	var object = objects_catalog.objects;

	var posiBackground = Math.floor(Math.random() * (id_background.length - 1));

	background = this.add.image(195, 195, object[id_background[posiBackground]].name);
	
	background.setDisplaySize(390,390);
	
	var posiGrade = Math.floor(Math.random() * (id_grade.length - 1));
	
	var grade = this.add.image(195, 195, object[id_grade[posiGrade]].name);
	grade.setDisplaySize(390,390);
	
	portal = this.add.image(moveX*5, moveY*5, object[13].name);
	
	portal.setDisplaySize(47,47);
	
	var posiPlayer = Math.floor(Math.random() * (id_player.length - 1));
	
	player = this.add.image(moveX*1, moveY*1, object[id_player[posiPlayer]].name);
	
	player.setDisplaySize(47,47);
	
	createGame();
	
	var registrarInfoTemp = [];
	
	for(var i=0;i<dificuldade*2;i++){
		var validar = adicionarObstaculo();
		if(validar==0){
			var posiObstacle = Math.floor(Math.random() * (id_obstacle.length - 1));
			rock.push(this.add.image(posiRockX, posiRockY, object[id_obstacle[posiObstacle]].name).setDisplaySize(47,47));
			registrarInfoTemp.push([posiRockX, posiRockY]);
		}else{
			i--;
		}
	}
			
	
	var listaComandoMovimento = [];
	for(var i=0;i<listaPath.length;i++){
		listaComandoMovimento.push(listaPath[i][0]);
	}

}


function update() {
    
}

function refactory(){
	$("#collapse1").collapse('show');
	posiRef = 1;
	respostaTexto = 1;
	titulo_questao = "Questão 0: Recarregue a tela";
	listaPath = [];
	listaCaminho = [];
	resposta = [];
	rock = [];
	controleAcessButton = 0;
	for(var i=1;i<=1;i++){
		document.getElementById("heading"+i).innerHTML = "";
		document.getElementById("collapse"+i).innerHTML = "";
	}
	document.getElementById("feedback").innerHTML = "";
	var textoTemp = parseInt(contadorQuestao)+1;
	$("#leve"+textoTemp).addClass("level_actual");
	stopPhaserEnvironment();
	
	startPhaserEnvironment();
}