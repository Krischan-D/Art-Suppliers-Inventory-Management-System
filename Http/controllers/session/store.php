<?php

use Core\Validator;
use Core\App;
use Core\Database;
use Http\Forms\LoginForm;

$db = App::resolve(Database::class);



$username = $_POST['username'];
$password = $_POST['password'];
$errors = [];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


$form = new LoginForm;

if(! $form->validate($username, $password)){
    return view('index.view.php', [
        'errors' => $form->errors()
    ]);
    
}

echo 'passed';
$user = $db->query('SELECT * FROM users where username = :username', 
['username' => $username])->find();

echo 'passed1';
// dd($user);
if($user){
    // dd(password_verify($password, $user['password']));
    
    if(password_verify($password, $user['password'])){
        login([
            'username' => $username,
        ]);
    
        header('location: /dashboard');
        exit();
    }
}


return view('index.view.php', [
    'errors' => [
        'password' => 'No matching account found for that email and password'
    ]
]);

