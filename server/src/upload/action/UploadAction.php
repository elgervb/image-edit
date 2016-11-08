<?php
namespace upload\action;

use upload\UploadManager;
use upload\UploadOptions;
use handler\http\HttpStatus;
use upload\FileModel;

class UploadAction {
	
	private $manager;
	
	public function __construct() {
		$options = new UploadOptions();
		$options->setMimetypes(['image/jpg', 'image/jpeg', 'image/pjpeg', 
								'image/png', 'image/gif'])
				->setAllowOverwrite(true)
				->setMaxFiles(1)
				->setMaxSize(1000000)
				->setUploadDir( new \SplFileInfo(ROOT_DIR . '/uploads'), true);
				
		$this->manager = new UploadManager($options);
	}
	
	/**
	 * @return \handler\http\HttpStatus
	 */
	public function exec() {
		try {
			$files = $this->manager->upload();
			
			if ($files->count() === 0) {
				return new HttpStatus(HttpStatus::STATUS_204_NO_CONTENT, 
						['error' => 'Nothing to upload']);
			}
			/* @var $file \upload\UploadedFile */
			$file = $files->offsetGet(0);
			
			return new HttpStatus(HttpStatus::STATUS_200_OK, new FileModel($file));
			
		} catch (\upload\UploadException $ex) {
			return new HttpStatus(HttpStatus::STATUS_422_UNPROCESSABLE_ENTITY, 
					['error' => $ex->getMessage()]);
		}
		
	}
}