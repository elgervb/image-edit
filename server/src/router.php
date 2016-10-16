<?php
// router.php
$isUploadedImage = preg_match('#^/image/uploads.*\.(?:png|jpg|jpeg|gif)$#', $_SERVER["REQUEST_URI"]);
if (!$isUploadedImage && preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
	return false;    // serve the requested resource as-is.
} else {
	include('index.php');
}
