<?php
set_include_path(get_include_path().PATH_SEPARATOR.__DIR__.'/../');

if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $file = __DIR__.$_SERVER['REQUEST_URI'];
    if (is_file($file)) {
        return false;
    }
}

// This makes our life easier when dealing with paths. Everything is relative
// to the application root now.
chdir(dirname(__DIR__));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'development'));

// Define path to application directory
defined('APPLICATION_PATH')
	|| define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/..'));

defined('CACHE_PATH')
	|| define('CACHE_PATH', realpath(dirname(__FILE__) . '/../cache'));

require 'vendor/autoload.php';

if ('development' == APPLICATION_ENV) {
    error_reporting(E_ALL & ~E_NOTICE);
    ini_set('display_errors', true);
} else {
    error_reporting(0);
    ini_set('display_errors', false);
}

// get app config
$config = Zend\Config\Factory::fromFile('app/config/config.php', true);

// Instantiate the app
$settings = require 'app/src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require 'app/src/dependencies.php';

// Register middleware
require 'app/src/middleware.php';

// Register routes
require 'app/src/routes.php';
// Run app
$app->run();
