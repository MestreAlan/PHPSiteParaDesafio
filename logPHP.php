<?php
    session_start();

    $gmtDate = gmdate("D, d M Y H:i:s"); 
    header("Expires: {$gmtDate} GMT"); 
    header("Last-Modified: {$gmtDate} GMT"); 
    header("Cache-Control: no-cache, must-revalidate"); 
    header("Pragma: no-cache"); 
    /* Os readers acima dizem para nao usar o cache do browser! */ 

    $msg = $_GET["msg"]; //pegar a variavei enviada  

    echo $msg; // agora vamos "retornar" o valor, para isso escrevemos ele em tela
    date_default_timezone_set('America/Sao_Paulo');
    logMsg($msg);
    function logMsg( $msg, $level = 'info', $file = 'main.log' )
    {
        // variável que vai armazenar o nível do log (INFO, WARNING ou ERROR)
        $levelStr = '';

        // verifica o nível do log
        switch ( $level )
        {
            case 'info':
                // nível de informação
                $levelStr = 'INFO';
                break;

            case 'warning':
                // nível de aviso
                $levelStr = 'WARNING';
                break;

            case 'error':
                // nível de erro
                $levelStr = 'ERROR';
                break;
        }

        // data atual
        $date = date( 'Y-m-d ; H:i:s' );

        // formata a mensagem do log
        // 1o: data atual
        // 2o: nível da mensagem (INFO, WARNING ou ERROR)
        // 3o: a mensagem propriamente dita
        // 4o: uma quebra de linha
        echo $_SESSION["id"];
        $msg = session_id()." ; ".$msg;
        $msg = sprintf( "%s ; %s%s", $date, $msg, PHP_EOL );
    
        // escreve o log no arquivo
        // é necessário usar FILE_APPEND para que a mensagem seja escrita no final do arquivo, preservando o conteúdo antigo do arquivo
        file_put_contents( $file, $msg, FILE_APPEND );
    }
?>

