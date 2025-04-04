<?php 

    session_start();

    

    const BASE_PATH = __DIR__ . '/../';

    require BASE_PATH .'Core/functions.php';
    

    spl_autoload_register(function($class){
        //Core/Database
        $class  = str_replace('\\', '/', $class);
        require base_path("{$class}.php");
    });


    require base_path('bootstrap.php');
    

    $router = new Core\Router(); 
    $routes = require base_path('routes.php');
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    $method = $_POST['_method'] ?? $_SERVER['REQUEST_METHOD'];  

    $router->route($uri, $method);
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/output.css">

</head>

<body>
    
</body>
</html>