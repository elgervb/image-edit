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
use handler\json\Json;

include __DIR__ . '/../vendor/autoload.php';

define('ROOT_DIR', __DIR__);

error_reporting(E_ALL);
ini_set('display_errors', 'On');
date_default_timezone_set('UTC');

const IMAGE_BASE_PATH = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;

HttpContext::get()->getResponse()->setCORSHeaders();

$router = new Router();
$handlers = Handlers::get();
$handlers->add(new HttpStatusHandler());
$handlers->add(new JsonHandler());
$handlers->add(new ImageHandler());

$router->route('.*', function() {return [];}, HttpMethod::METHOD_OPTIONS);
$router->route('^/upload', function () {
	$action = new \upload\action\UploadAction();
	$result = $action->exec();
	if ($result && $result->getHttpCode() === handler\http\HttpStatus::STATUS_200_OK) {
	    $content = $result->getContent();
	    $file = new \SplFileInfo(IMAGE_BASE_PATH . $content->filename);
	    copy($file, $file->getPath() . DIRECTORY_SEPARATOR . $file->getBasename($file->getExtension()) . 'orig.' . $file->getExtension());
	}
	
	return $result;
}, 'POST');


$router->route('^/image/(.*)/(.*)', function ($filter, $image) {
    $method = str_replace(['-','_'], [''], $filter);
    $ib = ImageBuilder::create(IMAGE_BASE_PATH . urldecode($image));
    
    if (method_exists($ib, $method)) {
        \http\HttpContext::get()->getResponse()->disableCache();
        $ib->$method();
    }
    return $ib;
}, 'GET');

$router->route('^/image/(.*)', function ($image) {
    $imagePath = new \SplFileInfo(IMAGE_BASE_PATH . urldecode($image));
    $origImagePath = $imagePath->getPath() . DIRECTORY_SEPARATOR . $imagePath->getBasename($imagePath->getExtension()) . 'orig.' . $imagePath->getExtension();
    
    copy ($origImagePath, $imagePath);
    
    return ImageBuilder::create($imagePath);
}, 'GET');

$router->route('^/filters$', function () {
    return new Json(json_decode(file_get_contents(__DIR__ . '/data/filters.json')));
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

