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
    
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const sidebarBtn = document.getElementById("sidebarBtn");
    const sidebar = document.getElementById("logo-sidebar");
    const backDrop = document.getElementById('sidebarBackdrop')
    sidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("active");
      backDrop.classList.toggle("active");
   
    });

    document.addEventListener("click", function (e) {
      if (!sidebar.contains(e.target) && e.target !== sidebarBtn) {
        sidebar.classList.remove("active");
        backDrop.classList.remove("active");
    }
    });

    // Prevent clicks inside sidebar from closing it
    sidebar.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 1024) { // Adjust the breakpoint if necessary
            sidebar.classList.remove("active");
            backDrop.classList.remove("active");
        }
    });


  });

  

</script>

</body>
</html>