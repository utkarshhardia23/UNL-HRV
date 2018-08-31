<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 24, 2016 (5:46:06 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>
<div class='card'>
    <div class='title'>Layers</div>
    <hr />
    <!-- ko if: Layers().length === 0 -->
    <div class='row'>
        <div class='col s12'>
            <i class="small material-icons">info_outline</i> 
            <span class="text-mid-align red-text">No data has been loaded for the layers to be effective.</span>
        </div>        
    </div>
    <!-- /ko -->

    <!-- ko if: Layers().length > 1 -->
    <div class="row">
        <div class="col s12">
            <input type="checkbox" id="cb-use-global" data-bind="checked: IsUsingGlobalControls" />
            <label for="cb-use-global">Use global controls for all layers</label>
        </div>
    </div>
    <div data-bind="visible: IsUsingGlobalControls">
        <div class="row">
            <div class="col s12 center header">
                Global Controls
            </div>        
        </div>
        <div class="row no-margin">
            <div class="col s2">
                <span>Max Intensity</span>
            </div>
            <div class="col s9">
                <input type="range" min="0" data-bind="attr: {max: MaxMaxIntensity}, value:  MaxIntensityIndex" />
            </div>
            <div class="col s1">
                <span data-bind="text: MaxIntensity">0</span>
            </div>
        </div>
        <div class="row no-margin">
            <div class="col s2">
                <span>Opacity</span>
            </div>
            <div class="col s9">
                <input type="range" min="1" max="10" data-bind="value: Opacity "/>
            </div>
            <div class="col s1">
                <span data-bind="text: ComputedOpacity ">0</span>
            </div>        
        </div>
        <div class="row no-margin">
            <div class="col s2">
                <span>Radius</span>
            </div>
            <div class="col s9">
                <input type="range" min="1" max="15" data-bind="value: Radius"/>
            </div>
            <div class="col s1">
                <span data-bind="text: Radius ">0</span>
            </div>        
        </div>
    </div>
    <hr/>
    <!-- /ko -->
    <!-- ko if: Layers().length > 0 -->
    <div class="row header">
        <div class="col s5">Layer name and visibility </div>
        <div class="col s3">Color & Count</div>
        <div class="col s2">Options</div>
    </div>
    <hr/>
    <!-- /ko -->    
    <div class="scrollable">
        <!-- ko foreach: Layers -->
        <div class="layer" data-bind="css: {header: IsShowingOptions}">
            <div class="row" >
                <div class="col s5">
                    <input type="checkbox" data-bind="attr: {id: 'cb_layer_' + $data.Name() }, checked: $data.IsActive"  />
                    <label class="black-text" data-bind="text: $data.Name(), attr: {for: 'cb_layer_' + $data.Name() }"></label>
                </div>
                <div class="col s1 hidden" data-bind="text: Name"></div>
                <div class="col s1">
                    <div class="small-color-square" data-bind="style: {'background-color': Gradient()[Gradient().length-1]} ">

                    </div>
                </div>
                <div  class="col s2" data-bind="text: numeral(DataCount()).format('0,0')"></div>
                <div class="col s2">
                    <a class="clickable" data-bind="text: IsShowingOptions()? 'less': 'more', click: ToggleOptions"></a>
                </div>
            </div>
            <div class="row layer-options" data-bind="visible: IsShowingOptions">
                <div class="row">
                    <div class="col s3">
                        Color
                    </div>
                    <div class="col s9 color-box">
                        <!-- ko foreach: Gradient -->
                        <div class="small-color-square" data-bind="style: {'background-color': $data}">                    
                        </div>
                        <!-- /ko -->
                    </div>
                </div>
                <div data-bind="visible: !IsUsingGlobalControls() ">
                    <div class="row no-margin">
                        <div class="col s2">
                            <span>Max Intensity</span>
                        </div>
                        <div class="col s9">
                            <input type="range" min="0" data-bind="attr: {max: MaxMaxIntensity}, value:  MaxIntesityIndex"/>
                        </div>
                        <div class="col s1">
                            <span data-bind="text: MaxIntensity"></span>
                        </div>        
                    </div>
                    <div class="row no-margin">
                        <div class="col s2">
                            <span>Opacity</span>
                        </div>
                        <div class="col s9">
                            <input type="range" min="1" max="10" data-bind="value: Opacity"/>
                        </div>
                        <div class="col s1">
                            <span data-bind="text: ComputedOpacity">0</span>
                        </div>        
                    </div>
                    <div class="row no-margin">
                        <div class="col s2">
                            <span>Radius</span>
                        </div>
                        <div class="col s9">
                            <input type="range" min="1" max="15" data-bind="value: Radius"/>
                        </div>
                        <div class="col s1">
                            <span data-bind="text: Radius">0</span>
                        </div>        
                    </div>
                </div>
                <!-- The intensity filter -->
                <!--                <div class="row">
                                    <div class="col s5">
                                        Intensity filter:
                                    </div>
                                    <div class="col s7 bold">
                                        <span class="bold" data-bind="text: numeral(SelectedThresholdComputed()).format('0.0[00]')"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <input type="range" min="0" max="100" data-bind="value: SelectedThresholdValue"  />
                                </div>-->
            </div>
        </div>
        <!-- /ko -->
    </div>
</div>