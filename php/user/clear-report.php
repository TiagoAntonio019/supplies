<?php
    require_once "../system-functions/check-verb.php";
    require_once "../sql-connection/sql-connection.php";
    require_once "../system-functions/check-session.php";

    if(!get_session_status()){
        die(json_encode("error"));
    }

    $checker = new Check_verb();
    
    $id = $checker->check_post("user_id");

    if(!$id){
        die(json_encode("error"));
    }

    $Con = new SQL_connection();

    $Con->Run("DELETE FROM report WHERE user='$id'");

    echo json_encode(true);