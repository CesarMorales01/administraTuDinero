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
        $this->globalVars->urlRoot = "http://administratudinero.tupaginaweb.site/";
        $this->globalVars->myUrl="http://administratudinero.tupaginaweb.site/";
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
