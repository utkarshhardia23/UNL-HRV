<?php defined('BASEPATH') OR exit('No direct script access allowed');
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//$censusVariables = array(
//    array('code' => 'lit', 'name' => 'Literacy'),
//    array('code' => 'emp', 'name' => 'Employment')
//);
?>

 
<!--<div class='card'>
    <div class='title'>Census Variables</div>
    <hr />
        <div class="row">
            <div class="col s9">
                <div class="inline-item">
                    <input id="cb-use-lit" name="literacy" type="checkbox" value="showliteracy"  data-bind="checked: ShowLiteracy"  />
                    <label for="cb-use-lit">Literacy Rate</label>
                    <input id="cb-use-emp" name="unemployment" type="checkbox" value="showemploy"  data-bind="checked: ShowEmployment"  />
                    <label for="cb-use-emp">Employment Rate</label>
                </div>
            </div>
        </div>
</div>-->

<div class='card'>
    <div class='title'>Socio-economic Variables</div>
    <hr />
        <div class="row">
            <div class="col s9">
                <div class="inline-item">
                    <input class="with-gap" id="cb-use-none" type="radio" name="censusVar" value="none" data-bind="checked: censusVariable" />
                    <label for="cb-use-none">None</label>
                    <input class="with-gap" id="cb-use-lit" type="radio" name="censusVar" value="literacy" data-bind="checked: censusVariable" />
                    <label for="cb-use-lit">Literacy Rate</label>
<!--                    <input class="with-gap" id="cb-use-emp" type="radio" name="censusVar" value="employment" data-bind="checked: censusVariable" />
                    <label for="cb-use-emp">Employment Rate</label>-->
                </div>
            </div>
        </div>
</div>