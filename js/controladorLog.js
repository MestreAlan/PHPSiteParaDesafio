function funcaoLog(mensagem){
    var d = new Date();
    var data = d.toISOString().substring(0, 10);
	var hora = d.toTimeString().substring(0, 9);
	var tarefaAtual = tarefa[0]==0 ? "Comandos" : tarefa[0]==2 ? "Variáveis" : tarefa[0]==4 ? "Laços" : tarefa[0]==6 ? "Condicionais" : "Sem atividade registrada";
	var perfilAtual = perfil=="0,0" ? "w0g0" : perfil=="0,1" ? "w0g1" : perfil=="1,0" ? "w1g0" : perfil=="1,1" ? "w1g1" : "Sem registro";
	mensagem = conhecimentoProgramacao + ' ; ' + jaJogouJogosCodedotOrg + ' ; ' +  nivelEducacional +' ; ' + perfilAtual +' ; '+ tarefaAtual +' ; Questão:'+ parseInt(contadorQuestao+1) +' ; '+mensagem;
    var logMsg = null;
    if(window.ActiveXObject){
        logMsg = new ActiveXObject("Msxml2.DOMDocument.3.0");
        logMsg.async = true;
        logMsg.open("POST", "logPHP.php?msg="+mensagem);
    }else if(window.XMLHttpRequest){
        logMsg = new XMLHttpRequest();
        logMsg.open("POST", "logPHP.php?msg="+mensagem ,true);
        logMsg.send(null);
    }
};