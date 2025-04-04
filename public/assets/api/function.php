<?php 

header('Content-Type: application/json');

const BASE_PATH = __DIR__ . '/../../../';
require BASE_PATH .'Core/functions.php';
require_once __DIR__ . '/../../../Core/Database.php';
$config = require_once __DIR__ . '/../../../config.php';
