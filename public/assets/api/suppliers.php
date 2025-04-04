<?php


require('function.php');

$db = new Core\Database($config['database']);
$method = $_SERVER['REQUEST_METHOD'] ;


switch($method){

    case 'GET':
        $suppliers = $db->query('SELECT * FROM supplier')->get();

        echo json_encode($suppliers);
        
        break;



    case 'POST':
        $name = $_POST['name'];
        $address = $_POST['address'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];

        
        $addSupplier = $db->query('INSERT INTO supplier (name, address, email, phone) VALUES
                                          (:name, :address, :email, :phone)
        
         ', [
            'name' => $name,
            'address' => $address,
            'email' => $email,
            'phone' => $phone
         ]);


        echo json_encode([
            "name" => $name,
            "address" => $address,
            "email" => $email,
            "phone" => $phone,
        ]);


        break;
    case 'PUT':

        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
    
        // Validate JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }

        $id = $data['id'] ?? null;
        $name = $data['name'] ?? null;
        $address = $data['address'] ?? null ;
        $email = $data['email'] ?? null ;
        $phone = $data['phone'] ?? null;

        
        $updateSupplier = $db->query('UPDATE supplier SET name = :name, address = :address, email = :email, phone = :phone WHERE id = :id', [
            'name' => $name,
            'address' => $address,
            'email' => $email,
            'phone' => $phone,
            'id' => $id
         ]);

         echo json_encode([
            "id" => $id,
            "name" => $name,
            "address" => $address,
            "email" => $email,
            "phone" => $phone,
        ]);


    case 'DELETE':
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        

        // Validate JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }
    
        $supplierId = $data['supplierId'] ?? ($data ?: null);

        
        $deleteSupplier = $db->query('DELETE FROM supplier WHERE id =:id', [
            'id' => $supplierId
            ]);

        echo json_encode([
            "success" => true,
            "message" => "Supplier deleted successfully!",
            "id" => $supplierId
            
        ]);



}


