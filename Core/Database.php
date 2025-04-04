<?php

    namespace Core;
    use PDO;
    
    class Database {

        public $connection;
        public $statement;
        // constructor takes 3 param for the dsn from the index.php
        public function __construct($config, $username = 'root', $password ='') {
            // data source name or dsn
            // http_build_query() function generates a URL-encoded query string from the associative (or indexed) array provided, in this case it its $config
            $dsn = 'mysql:'. http_build_query($config, '', ';');
            //pdo arguements are des, usrname, pass, and options 
            $this->connection =  new PDO($dsn, $username, $password, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        }


        public function query($query, $params = [])
        {
        
           $this->statement = $this->connection->prepare($query);
        
           $this->statement->execute($params);

            return $this;
        }


        public function find()  
        {   
            return $this->statement->fetch();
        }
    
        
        public function get()
        {
            return $this->statement->fetchAll();
        }
        public function findOrFail()
        {
            $result = $this->find();

            if(!$result){
                abort();
            }

            return $result;
        }
        

        public function lastInsertedId(){
            return $this->connection->lastInsertId();
        }


    }   




?> 