<?php
header("Content-Type: application/json");
require('function.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);

$db = new Core\Database($config['database']);




try{

    $method = $_SERVER['REQUEST_METHOD'] ;

    switch($method){

        case 'GET':
            
            $products = $db->query('SELECT p.*, c.name as category, s.name as supplier, st.quantity as stock
                                           FROM products p, category c, supplier s, stock st
                                           WHERE p.category_id = c.id
                                           AND p.supplier_id = s.id
                                           AND p.id = st.product_id
                                            ')->get();

            $suppliers = $db->query('SELECT id, name FROM supplier ')->get();
            $categories = $db->query('SELECT id, name FROM category ')->get();

            echo json_encode([
                'products'  => $products,
                'suppliers' => $suppliers,
                'categories' => $categories
            ]);

       
            break;
        
        
        case 'POST':
            file_put_contents("log.txt", "POST DATA:\n" . print_r($_POST, true), FILE_APPEND);
            file_put_contents("log.txt", "FILES DATA:\n" . print_r($_FILES, true), FILE_APPEND);

            $name = $_POST["name"] ?? '';
            $price = $_POST["price"] ?? '';
            $stock = $_POST["stock"] ?? '';
            $category = $_POST["category"] ?? '';
            $supplier = $_POST["supplier"] ?? '';
            $description = $_POST["description"] ?? '';

            // Handle file upload
            
            
            if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
                $uploadDir = __DIR__ . "/../../uploads/"; 
                $fileName = time() . "_" . basename($_FILES["image"]["name"]);
                $uploadFile = $uploadDir . $fileName;

                // Ensure directory exists
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                // Debugging logs
                file_put_contents("log.txt", "TMP FILE: " . $_FILES["image"]["tmp_name"] . "\n", FILE_APPEND);
                file_put_contents("log.txt", "DESTINATION: " . $uploadFile . "\n", FILE_APPEND);
                file_put_contents("log.txt", "DIR EXISTS: " . (is_dir($uploadDir) ? 'YES' : 'NO') . "\n", FILE_APPEND);
                file_put_contents("log.txt", "DIR PERMISSIONS: " . substr(sprintf('%o', fileperms($uploadDir)), -4) . "\n", FILE_APPEND);

       
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $uploadFile)) {
                    $imagePath = "uploads/" . $fileName;
           
                } else {
                    file_put_contents("log.txt", "UPLOAD ERROR: Could not move file\n", FILE_APPEND);
                  
                }
            } else {
                $imagePath = null; // No image uploaded
            }

            $categories = $db->query('SELECT * FROM category WHERE name = :name', ['name' => $_POST['category']])->get();
            $supplier = $db->query('SELECT * FROM supplier WHERE name = :name', ['name' => $_POST['supplier']])->get();
            
            
            $addProduct = $db->query("INSERT INTO products (name, category_id, supplier_id, description, price, created_at, image_url) 
            VALUES (:name, :category_id, :supplier_id, :description, :price, NOW(), :image_url)",
            [
                'name' => $_POST['name'],
                'category_id' => $categories[0]['id'],
                'supplier_id' => $supplier[0]['id'],
                'description' => $_POST['description'],
                'price' => $_POST['price'],  
                'image_url' => $imagePath
            ]);

            $productId = $db->lastInsertedId();

            $addStocks = $db->query('INSERT INTO stock (product_id, quantity, last_updated) VALUES
                                        (:product_id, :quantity, NOW())
            ', [
                'product_id' => $productId,
                'quantity' => $_POST['stock'],
                
            ]);


            echo json_encode([
                "success" => true,
                "message" => "Product added successfully!",
                "image_path" => $imagePath,
                "data" => $_POST,
                "categories" => $categories
            ]);
                
            break;
        
        case 'DELETE':

            $input = file_get_contents('php://input');
            $data = json_decode($input, true);
            

            // Validate JSON
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON data');
            }
        
            $productId = $data['productId'] ?? ($data ?: null);
            
            if (!$productId || !is_numeric($productId)) {
                throw new Exception('Valid product ID is required');
            }


            $deleteProduct = $db->query('DELETE FROM products where id =:id', [
                'id' => $productId
            ]);

            $deleteProduct = $db->query('DELETE FROM stock where id =:id', [
                'id' => $productId
            ]);



            echo json_encode([
                "success" => true,
                "message" => "Product deleted successfully!",
                "id" => $productId
               
            ]);
            
            break;
       
            case 'PUT':
                $input = file_get_contents('php://input');
                $data = json_decode($input, true);
            
                // Validate JSON
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception('Invalid JSON data');
                }
            
                $productId = $data['id'] ?? null;
                $productName = $data['name'] ?? null;
                $productPrice = $data['price'] ?? null;
                $productStock = $data['stock'] ?? null;
                $productCategory = $data['category'] ?? null;
                $productSupplier = $data['supplier'] ?? null;
                $productDescription = $data['description'] ?? null;
                $productImage = $data['image'] ?? null; // This comes from the upload endpoint
            
                if (!$productId || !is_numeric($productId)) {
                    throw new Exception('Valid product ID is required');
                }
            
                // Get supplier and category IDs
                $supplierId = $db->query('SELECT id FROM supplier WHERE name = :name', ["name" => $productSupplier])->get();
                $categoryId = $db->query('SELECT id FROM category WHERE name = :name', ["name" => $productCategory])->get();
            
                // Update the product
                $updateProduct = $db->query('UPDATE products
                    SET 
                        name = :name,
                        price = :price,
                        category_id = :category,
                        supplier_id = :supplier,
                        description = :description,
                        image_url = :image_url
                    WHERE 
                        id = :id', [
                    'id' => $productId,
                    'name' => $productName,
                    'price' => $productPrice,
                    'category' => $categoryId[0]['id'],
                    'supplier' => $supplierId[0]['id'],
                    'description' => $productDescription,
                    'image_url' => $productImage,
                ]);
            
                // Update stock if changed
                $currentStock = $db->query('SELECT quantity FROM stock WHERE product_id = :id', [
                    "id" => $productId
                ])->get();
            
                if (!empty($currentStock) && $currentStock[0]['quantity'] != $productStock) {
                    $updateStock = $db->query('UPDATE stock 
                        SET 
                            quantity = :stock,
                            last_updated = NOW()
                        WHERE product_id = :id', [
                        "stock" => $productStock,
                        "id" => $productId
                    ]);
                }
            
                echo json_encode([
                    "success" => true,
                    "message" => "Product updated successfully!",
                    "id" => $productId,
                    "name" => $productName,
                    "price" => $productPrice,
                    "stock" => $productStock,
                    "category_id" => $categoryId[0]['id'],
                    "image_url" => $productImage,
                ]);
                break;
            

             
}

    





}catch(Exception $e){
    http_response_code(500); // Set HTTP status code to 500 for errors
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}




