<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use stdClass;

class Globalvar extends Model
{
    use HasFactory;

    public $globalVars;

    function __construct()
    {
        $this->globalVars = new stdClass();
        $this->globalVars->urlRoot = "http://192.168.1.36:8000/";
        $this->globalVars->myUrl = "http://192.168.1.36:8000/";
        $nombreApp="administra-tu-dinero";
        $this->globalVars->dirImagenes = "/var/www/html/".$nombreApp."/public/Images/Config/";
        $this->globalVars->urlImagenes =  $this->globalVars->myUrl."Images/Config/";
        
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
