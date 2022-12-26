<?php
    class Check_verb{
        public function check_post($key){
            if(isset($_POST[$key])){
                return $_POST[$key];
            }
            return false;
        }
        public function check_get($key){
            if(isset($_GET[$key])){
                return $_GET[$key];
            }
            return false;
        }
    }