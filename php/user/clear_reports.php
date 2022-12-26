<?php
    require_once "../sql-connection/sql-connection.php";
    require_once "../system-functions/check-session.php";

    if(!get_session_status()){
        die(json_encode("error"));
    }

    $Conn = New SQl_connection();

    $Conn->Run("DELETE FROM report");