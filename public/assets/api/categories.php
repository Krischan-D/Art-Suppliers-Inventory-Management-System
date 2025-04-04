<?php


require('function.php');

$db = new Core\Database($config['database']);
$method = $_SERVER['REQUEST_METHOD'] ;


switch($method){

    case 'GET':
        $categories = $db->query('SELECT * FROM category')->get();

        echo json_encode($categories);
        
        break;
    case 'POST':
        $name = $_POST['name'];

        $addCategory = $db->query('INSERT INTO category (name) VALUES (:name)', ['name' => $name]);
        
        
        echo json_encode([
            "name" => $name,
        ]);
    case 'PUT':

       
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
    
        // Validate JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }

        
        $name = $data['name'];
        $id = $data['id'];
        

        $addCategory = $db->query('UPDATE category  SET name = :name  WHERE id = :id ', 
        
        [
            'name' => $name,
            'id' => $id,
        ]);
        
        
        echo json_encode([
            "name" => $name,
            "id" => $id,
        ]);


    case 'DELETE':
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        

        // Validate JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }
    
        $categoryId = $data['categoryId'] ?? ($data ?: null);

        
        $deleteCategory = $db->query('DELETE FROM category WHERE id =:id', [
            'id' => $categoryId
            ]);

        echo json_encode([
            "success" => true,
            "message" => "Supplier deleted successfully!",
            "id" => $categoryId
            
        ]);

}


