<?php


require('function.php');

$db = new Core\Database($config['database']);


$totalProducts = $db->query('SELECT COUNT(*) AS totalProducts
                                    FROM products')->get();
$totalSupplier = $db->query('SELECT COUNT(*) AS totalSupplier
                                    FROM supplier')->get();
$totalCategories= $db->query('SELECT COUNT(*) AS totalCategories
                                FROM category')->get();

$priceChanges = $db->query('SELECT 
                                        (SELECT name FROM products WHERE products.id = ph.product_id) AS name,
                                        (SELECT price FROM products WHERE products.id = ph.product_id) AS price,
                                        ph.change_at
                                    FROM price_history ph;')->get();


$recentSales = $db->query('SELECT p.name, sh.quantity_sold, sh.sale_date
                                    FROM products p, sales_history sh
                                    WHERE p.id = sh.product_id')->get();


// dd($priceChanges);

$response = [
    'totalProducts' => $totalProducts[0]['totalProducts'] ?? 0,  // Ensure proper key access
    'totalSupplier' => $totalSupplier[0]['totalSupplier'] ?? 0,
    'totalCategories' => $totalCategories[0]['totalCategories'] ?? 0,
    'priceChanges' => $priceChanges,
    'recentSales' => $recentSales


];

echo json_encode($response);