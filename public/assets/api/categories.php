<?php


require('function.php');

$db = new Core\Database($config['database']);


$categories = $db->query('SELECT * FROM category')->get();







// dd($priceHistory);

echo json_encode($categories);