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



}


