<?php
namespace utils;

class OptionsParser {
    public function __construct() {
        
    }
    
    /**
     * Parse the options string: rate:5;opacity:10
     *
     * @param string $optionsString
     *
     * @return array
     */
    public function parse($optionsString = null){
        if (!$optionsString){
            return [];
        }
        $options = explode(";", $optionsString);
        if (count($options) === 0){
            $options[] = $optionsString;
        }
        
        $result = array();
        foreach ($options as $value){
            $o = explode('=', $value);
            $result[$o[0] ] = $o[1];
        }
        
        return $result;
    }
}
