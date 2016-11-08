<?php

namespace upload;

use utils\Random;
use handler\json\Json;

class FileModel extends Json {
    
    public $guid;
    public $filename;
    public $mime;
    public $mtime;
    public $url;
    public $size;
    
    public function __construct(\SplFileInfo $file) {
        $this->guid = Random::guid();
        $this->filename = $file->getFilename();
        $this->mime = $file->getMimeType();
        $this->mtime = $file->getMTime();
        $this->url = '/uploads/' . $file->getFilename();
        $this->size = $file->getSize();
    }
}