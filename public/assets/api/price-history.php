<?php


require('function.php');

$db = new Core\Database($config['database']);


$priceHistory = $db->query('SELECT p.id, p.name, p.price as newPrice, ph.price as oldPrice, ph.change_at
                                   FROM products p, price_history ph
                                   WHERE p.id = ph.product_id
                                   
')->get();







// dd($priceHistory);

echo json_encode($priceHistory);