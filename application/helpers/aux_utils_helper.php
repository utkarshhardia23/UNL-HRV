<?php

/* 
 * Author: Hariharan Arunachalam
 * Date: Jul 17, 2016 (5:37:18 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */


function RandomToken($length = 32){    
    if (function_exists('random_bytes')) {        
        return bin2hex(random_bytes($length));
    }
    if (function_exists('mcrypt_create_iv')) {        
        return bin2hex(mcrypt_create_iv($length, MCRYPT_DEV_URANDOM));
    } 
    if (function_exists('openssl_random_pseudo_bytes')) {        
        return bin2hex(openssl_random_pseudo_bytes($length));
    }
}