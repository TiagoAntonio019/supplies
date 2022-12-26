<?php
    require_once "../system-functions/check-verb.php";
    require_once "../sql-connection/sql-connection.php";
    require_once "../system-functions/check-session.php";

    if(!get_session_status()){
        die(json_encode("error"));
    }

    $checker = new Check_verb();
    
    $user_id = $checker->check_get("user_id");

    if($user_id == false){
        die(json_encode("user_is_null"));
    }

    $Conn = New SQl_connection();

    $Result = $Conn->Select("SELECT product, SUM(amount) as total FROM report WHERE user='$user_id' GROUP BY product");

    echo json_encode($Result);