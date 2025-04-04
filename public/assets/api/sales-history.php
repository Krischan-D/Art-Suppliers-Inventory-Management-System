<?php

require('function.php');

$db = new Core\Database($config['database']);


$sales = $db->query('SELECT p.id, p.name, c.name AS category, s.quantity_sold AS quantity, s.sale_date
                             FROM products p, category c, sales_history s
                             WHERE p.id = s.product_id AND c.id = p.category_id AND s.sale_date 

')->get();


// dd($sales);\


echo json_encode($sales);