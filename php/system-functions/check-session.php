<?php
    function get_session_status(){
        if(session_status() === PHP_SESSION_NONE){
            session_start();
        }
        return isset($_SESSION['user_id']);
    }