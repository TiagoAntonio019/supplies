<?php
    require_once "../system-functions/check-verb.php";
    require_once "../sql-connection/sql-connection.php";
    require_once "../system-functions/check-session.php";

    if(!get_session_status()){
        die(json_encode("error"));
    }

    $checker = new Check_verb();
    
    $obj_json = $checker->check_post("obj");

    $technical = $checker->check_post("technical");

    if(($obj_json != false) and ($technical != false)){

        $products = json_decode($obj_json);
        
        $Con = new SQL_connection();

        for($i = 0; $i <= (count($products) -1 ); $i++){
            $product = $products[$i]->_Name;
            $amount = $products[$i]->_Amount;

            $sql_string = "INSERT INTO report (product, amount, user) VALUE ('$product', '$amount', '$technical')";

            $Con->Run($sql_string);
        }

    }