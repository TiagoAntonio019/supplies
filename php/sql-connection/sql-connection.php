<?php
    #Code created by Tiago Antonio
    class Sql_connection{
        private $Usuario = "";
        private $Senha = "";
        private $Host = "localhost";
        private $DB = "";
        private $Conn;

        public function __construct(){
            #Open connection
            $this->Conn = mysqli_connect($this->Host, $this->Usuario, $this->Senha, $this->DB);
            mysqli_set_charset($this->Conn, 'utf-8');
        }

        public function __destruct(){
            #Close connection
            mysqli_close($this->Conn);
        }

        public function Run($Command){
            #INSERT, UPDATE, DELETE
            mysqli_query($this->Conn, $Command);
        }

        public function Select($Command){
            #SELECT
            $Result = mysqli_query($this->Conn, $Command);
            $Rows = mysqli_fetch_all($Result);
            return $Rows;
        }
    }
