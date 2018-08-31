<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>

 
<div class='card'>
    <div class='title'>Infrastructure</div>
    <hr />
        <div class="row">
            <div class="col s3"> </div>
            <div class="col s9">
                <div class="inline-item">
<!--                    <input id="cb-use-infrastructure" name="infrastructure" type="checkbox" value="showInfrastructure"  data-bind="checked: ShowInfrastructure"  />
                    <label for="cb-use-infrastructure">Infrastructure</label> -->  
                    <input id="cb-use-roads" name="infrastructure" type="checkbox" value="road" data-bind="checked: ShowRoads"/>
                    <label for="cb-use-roads">Roadways</label>
                    <input id="cb-use-rail" name="infrastructure" type="checkbox" value="railway" data-bind="checked: ShowRailway"/>
                    <label for="cb-use-rail">Railways</label>
                    <input id="cb-use-police" name="infrastructure" type="checkbox" value="police" data-bind="checked: ShowPolice"/>
                    <label for="cb-use-police">Police Stations</label>
                    <input id="cb-use-postal" name="infrastructure" type="checkbox" value="postal" data-bind="checked: ShowPostal"/>
                    <label for="cb-use-postal">Post Office/ Post box</label>
                    <input id="cb-use-hosp" name="infrastructure" type="checkbox" value="hospital" data-bind="checked: ShowHospital"/>
                    <label for="cb-use-hosp">Hospitals</label>
                    <input id="cb-use-school" name="infrastructure" type="checkbox" value="school" data-bind="checked: ShowSchool"/>
                    <label for="cb-use-school">Educational Institutions</label>                        
                </div>
            </div>
        </div>
</div>