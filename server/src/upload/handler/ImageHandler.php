<?php
namespace upload\handler;

use handler\IHander;
use imagemanipulation\ImageBuilder;

class ImageHandler implements IHander {
    public function accept($object) {
        return $object instanceof ImageBuilder;
    }
    
    /**
     * {@inheritDoc}
     * @param $object ImageBuilder
     * @see \handler\IHander::handle()
     */
    public function handle($object) {
        \http\HttpContext::get()->getResponse()->flush();
        $object->save(null, true)->render();
    }
}