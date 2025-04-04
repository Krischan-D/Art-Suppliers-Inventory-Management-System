<?php

namespace Http\Forms;
use Core\Validator;

class LoginForm{
    
    protected $errors = [];


    public function validate($username, $password){
        $errors = [];


        if(! Validator::string($username)){
            $errors['username'] = 'Please provide a valid username';
        }


        if(! Validator::string($password)){
            $errors['password'] = 'Please provide a valid password';
        }
        
        return empty($this->errors);
    }


    public function errors(){
        return $this->errors;
    }

}