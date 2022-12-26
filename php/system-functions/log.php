<?php
    class Log{
       private $ID;
       private $Date;
       private $User;
       private $Event;

        public function create_log($Con, $user, $event){
            
            $date = date("Y-m-d H:m:s");

            $Con->Run("INSERT INTO log (date, user, event) VALUES('$date','$user','$event')");
        }

        public function get_log($Con, $id){
            $Result = $Con->Select("SELECT date, user, event FROM log WHERE id='$ID'");

            if(sizeof($Result) > 0){

                $this->ID = $id;
                $this->Date = $Result[0][0];
                $this->User = $Result[0][1];
                $this->Event = $Result[0][2];

                return true;
            }

            return false;
        }

        public function __get($attr)
        { 
            return $this->$attr;
        }
    }