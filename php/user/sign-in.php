<?php
    require_once "../system-functions/check-verb.php";
    require_once "../system-functions/log.php";
    require_once "../sql-connection/sql-connection.php";
    
    $checker = new Check_verb();
    
    $user_name = $checker->check_post("user_name");
    $user_pass = $checker->check_post("user_pass");

    if(($user_name == false) or ($user_pass == false)){
        die(json_encode("access-danied"));
    }

    $user_pass_hash = md5($user_pass);

    $Con = new SQL_connection();

    $Result = $Con->Select("SELECT id, name FROM user WHERE user_name='$user_name' AND password='$user_pass_hash'");

    $LOG = new Log();

    if(count($Result) == 1){
        set_client_session($Result[0][0], $Result[0][1]);

        $LOG->create_log($Con, $Result[0][0], "Usuario acessou o sistema");


        die(json_encode('access_ok'));
    }

    echo json_encode('access-danied');

    $LOG->create_log($Con, 21, "Acesso negado");

    function set_client_session($id, $user){

        if(session_status() === PHP_SESSION_NONE){
            session_start();
            $_SESSION["user_id"] = $id;
            $_SESSION["user_name"] = $user;
        }

    }