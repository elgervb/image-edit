<?php
use router\Router;
use handler\Handlers;
use handler\http\HttpStatusHandler;
use handler\IHander;
use handler\json\JsonHandler;
use http\HttpContext;
use imagemanipulation\ImageBuilder;
use upload\handler\ImageHandler;
use http\HttpRequest;
use http\HttpMethod;

include __DIR__ . '/../vendor/autoload.php';

define('ROOT_DIR', __DIR__);

error_reporting(E_ALL);
ini_set('display_errors', 'On');
date_default_timezone_set('UTC');

HttpContext::get()->getResponse()->setCORSHeaders();

$router = new Router();
$handlers = Handlers::get();
$handlers->add(new HttpStatusHandler());
$handlers->add(new JsonHandler());
$handlers->add(new ImageHandler());

$router->route('.*', function() {return [];}, HttpMethod::METHOD_OPTIONS);
$router->route('^/upload', function () {
	$action = new \upload\action\UploadAction();
	return $action->exec();
}, 'POST');

$router->route('^/image/(.*)', function ($image) {
    return ImageBuilder::create(__DIR__ . DIRECTORY_SEPARATOR . urldecode($image))
        ->grayscale();
}, 'GET');

$router->route('^/test', function () {
    echo 'TEST';
}, 'GET');

$result = $router->match($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
$handler = $handlers->getHandler($result);
if ($handler) {
	$handler->handle($result);
} else {
	$error = new \handler\http\HttpStatus(404, ' ');
	$handler = $handlers->getHandler($error);
	$handler->handle($error);
}

interface IRouteAction {
	public function exec(...$params);
}

class RouterActionHandler implements IHander {
	public function accept($object) {
		return $object instanceof IRouteAction;
	}
	
	public function handle($object) {
		/* @var $object IRouteAction */
		return $object->exec($params);
	}
}

