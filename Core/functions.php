<?php 

    use Core\Response;

    function dd($value){
        echo '<pre>';
        var_dump($value);
        echo '</pre>';
        die();
    }


    function abort($code = 404){
        http_response_code($code);

        require base_path("views/{$code}.php");
        die(); 
       }

    // dd($_SERVER);
    function urlIs($value){
        return $_SERVER['REQUEST_URI'] === $value;
    }

    function authorize($coondition, $status = Response::FORBIDDEN  ){
        if($coondition){
            abort($status );
        }

    }


    // concatenate the base path to the file path
    // e.g  C:\xampp\htdocs\PHP Practice\public/../views/about.view.php
    function base_path($path){
        return BASE_PATH . $path;
    }

    function view($path, $attributes = []){
        extract($attributes);
        require base_path('views/'. $path);
    }

    function login($user){
        $_SESSION['user'] = [
            'username' => $user['username'],
        ];

        session_regenerate_id(true);
    
    }

    function logout(){
        $_SESSION = [];
        session_destroy();

        $params = session_get_cookie_params();
        setcookie('PHPSESSID0', '', time() - 3600,$params['path'], $params['domain'], $params['secure'], $params['httponly']);

    }


?>