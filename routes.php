<?php



// get requets
$router->get('/', 'index.php')->only('guest');
$router->get('/dashboard', 'dashboard.php');
$router->get('/products', 'products.php');
$router->get('/stocks-management', 'stocks.php');
$router->get('/price-history', 'price-history.php');
$router->get('/suppliers', 'suppliers.php');
$router->get('/categories', 'categories.php');
$router->get('/sales-history', 'sales-history.php');


// post requests
$router->post('/products', 'products.php');


// delete requests
$router->delete('/note', 'notes/destroy.php'  );


$router->get('/login','index.php')->only('guest');

$router->post('/session','session/store.php')->only('guest');

$router->delete('/session','session/destroy.php')->only('auth');


