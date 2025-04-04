<?php

require('function.php');

$db = new Core\Database($config['database']);


$stocks = $db->query('SELECT p.id, p.name, s.quantity, ls.threshold, s.last_updated
                               FROM products p, stock s, low_stock_alerts ls
                               WHERE p.id = s.product_id
                               AND  s.id = ls.stock_id ')->get();



foreach ($stocks as &$stock) { 
    // Convert the associative array to an object
    $stock = (object) $stock; 
    
    if ($stock->quantity <= 0) {
        $stock->status = 'Out of Stock';
    } elseif ($stock->quantity <= $stock->threshold) {
        $stock->status = 'Low Stock';
    } else {
        $stock->status = 'In Stock';
    }
}
unset($stock); 



echo json_encode($stocks);