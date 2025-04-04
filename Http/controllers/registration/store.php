<?php

    use Core\Validator;
    use Core\App;
    use Core\Database;

$email = $_POST['email'];
$password = $_POST['password'];
$errors = [];
// validate inputs


if(! Validator::email($email)){
    $errors['email'] = 'Please provide a valid email address';
}


if(! Validator::string($password, 7, 255)){
    $errors['password'] = 'Please provide a passwrod of at least 7 characters ';
}

if(! empty($errors)){
    return view('registration/create.view.php', ['errors' => $errors]);

}

$db = App::resolve(Database::class);
$user = $db->query('SELECT * FROM users where email = :email', ['email' => $_POST['email']])->find();


//check if the account already exists
    // if yes,  redirect to the login page
if($user){
    header('location: /');
    exit();
}else{
    $db->query('INSERT INTO users (password, email) VALUE (:password, :email)', [
        'password' => password_hash($password, PASSWORD_BCRYPT),
        'email' => $email
    ]);


    login([
        'email' => $email
    ]);
    header('location: /');
    exit();
}
    
    
    // if no, create the account and redirect to the login page
