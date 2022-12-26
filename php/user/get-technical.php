<?php
    require_once "../sql-connection/sql-connection.php";
    require_once "../system-functions/check-session.php";

    if(!get_session_status()){
        die(json_encode("error"));
    }

    $Conn = New SQl_connection();

    $Result = $Conn->Select("SELECT id, name FROM user WHERE type='Technical' ORDER BY name ASC");

    echo json_encode($Result);