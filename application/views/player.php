<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Aug 4, 2016 (6:10:13 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>
<div id="map-container">
    <div id="map">
    </div>
</div>

<!--Player control-->
<div id="player-control-container" class="tool-bar">
    <div class="card">
        <div class="card-content">
            <div class="row" data-bind="visible: PlayMode() === 0">
                <div class="col s2 m2 l2">
                    <div class="field-title">
                        Play data
                    </div>
                </div>
                <div class="col s4 m2 l1">
                    <input class="with-gap" type="radio" id="pf-daily" value="day" name="pf-group" data-bind="checked: SelectedTemporalGroup"/>
                    <label for="pf-daily">Daily</label>
                </div>
                <div class="col s4 m2 l1">
                    <input class="with-gap" type="radio" id="pf-monthly" value="month" name="pf-group" data-bind="checked: SelectedTemporalGroup"/>
                    <label for="pf-monthly">Monthly</label>
                </div>
                <div class="col s4 m2 l1">
                    <input class="with-gap" type="radio" id="pf-yearly" value="year" name="pf-group" data-bind="checked: SelectedTemporalGroup"/>
                    <label for="pf-yearly">Yearly</label>
                </div>
                <div class="col s4 m2 l1">
                    <button class="btn btn-small waves-effect waves-light" data-bind="click: Prepare">Prepare</button>
                </div>
            </div>
            <div class="row" data-bind="visible: PlayMode() === 0">
                <div class="col s2 m2 l2">
                    <div class="field-title">
                        Filter Range
                    </div>                    
                </div>
                <div class="col s5 m5 l5">
                    <input type="range" id="date-range-start" min="0" data-bind="value: SelectedRangeStartIndex, attr: {max: RangeItems().length - 2}"  />
                    <label for="date-range-start">
                        <span>Starting from</span>
                        <span class="bold indigo-text" data-bind="text: SelectedRangeStart">somewhere</span>
                        <span> [Available from </span>
                        <span data-bind="text: FormatTemporalItemBasedOnIndex(0)"></span>
                        <span> to </span>
                        <span data-bind="text: FormatTemporalItemBasedOnIndex(RangeItems().length - 1)"></span>
                        <span>]</span>
                    </label>
                </div>
                <div class="col s5 m5 l5">
                    <input type="range" id="date-range-end" data-bind="value: SelectedRangeEndIndex, attr: {max: RangeItems().length - 1, min: SelectedRangeStartNumber() + 1}"  />
                    <label for="date-range-end">
                            <span>to</span>
                            <span class="bold orange-text" data-bind="text: SelectedRangeEnd">somewhere</span>
                            <span> [Available from </span>
                            <span data-bind="text: FormatTemporalItemBasedOnIndex(SelectedRangeStartNumber()+1)"></span>
                            <span> to </span>
                            <span data-bind="text: FormatTemporalItemBasedOnIndex(RangeItems().length - 1)"></span>
                            <span>]</span>
                        </label>
                </div>
            </div>
            <div class="row" data-bind="visible: PlayMode() === 0">
                <div class="col s2 m2 l2">
                    <div class="field-title">Unrest Categories</div>
                </div>
                <div class="col s10 m10 l10">
                    <!-- ko foreach: UnrestCategories -->
                    <div class="inline-item">
                        <input name="cb_grp_unrest_cats" type="checkbox" data-bind="attr: {id: 'cb_unrest_' + $data }, value: $data, checked: $parent.SelectedUnrestCategories"  />
                        <label data-bind="text: $data, attr: {for: 'cb_unrest_' + $data }"></label>
                    </div>
                    <!-- /ko -->
                </div>
            </div>

            <div class="row" data-bind="visible: PlayMode() === 0">
                <div class="col s2 m2 l2">
                    <div class="field-title">Data Sources</div>
                </div>
                <div class="col s10 m10 l10">
                    <!-- ko foreach: DataSources -->
                    <div class="inline-item">
                        <input name="cb_data_source" type="checkbox" data-bind="attr: {id: 'cb_data_source' + $data }, value: $data, checked: $parent.SelectedDataSources"  />
                        <label data-bind="text: $data, attr: {for: 'cb_data_source' + $data }"></label>
                    </div>
                    <!-- /ko -->
                </div>
            </div>
            <div class="row" data-bind="visible: PlayMode() === 0">
                <div class="col s2 m2 l2">
                    <div class="field-title">Countries</div>
                </div>
                <div class="col s10 m10 l10">
                    <!-- ko foreach: Countries -->
                    <div class="inline-item">
                        <input name="cb_grp_actors" type="checkbox" data-bind="attr: {id: 'cb_actor_' + $data.code }, value: $data.code, checked: $parent.SelectedCountries"  />
                        <label data-bind="text: $data.name, attr: {for: 'cb_actor_' + $data.code }"></label>
                    </div>
                    <!-- /ko -->
                </div>
            </div>

            <div class="row" data-bind="visible: PlayMode() === 0">
                <div class="col s2 m2 l2">
                    <div class="field-title">Speed</div>
                </div>
                <div class="col s4 m2 l1">
                    <input class="with-gap" type="radio" id="rb-ps-fast" name="rb-play-speed" value="500" data-bind="checked: FrameDuration" />
                    <label for="rb-ps-fast">Fast</label>
                </div>
                <div class="col s4 m2 l1">
                    <input class="with-gap" type="radio" id="rb-ps-normal" name="rb-play-speed" value="1000"  data-bind="checked: FrameDuration"/>
                    <label for="rb-ps-normal">Normal</label>
                </div>
                <div class="col s4 m2 l1">
                    <input class="with-gap" type="radio" id="rb-ps-slow" name="rb-play-speed" value="2000" data-bind="checked: FrameDuration" />
                    <label for="rb-ps-slow">Slow</label>
                </div>
            </div>    

            <div class="row" data-bind="visible: PlayMode() === 1">
                <div class="col s12">
                    <span>Preparing...</span><span data-bind="text: PrepareMessage"></span>
                </div>
            </div>

            <div class="row" data-bind="visible: PlayMode() === 2">
                <div class="col s12">
                    <div class="progress">
                        <div class="determinate" data-bind="style: {width: LoadedFramesPercent}" ></div>
                    </div>
                </div>
                <div class="col s12">
                    <input type="range" min="0" data-bind="attr: {max: Frames().length - 1}, value: CurrentFrameRaw" />
                </div>                
            </div>
            <div class="row" data-bind="visible: PlayMode() === 2">
                <div class="col s5">
                    <button class="btn waves-effect waves-light" data-bind="visible: !IsPlaying(), click: Play  ">
                        <i class="small material-icons">play_arrow</i>
                    </button>
                    <button class="btn waves-effect waves-light" data-bind="visible: IsPlaying, click: Pause  ">
                        <i class="small material-icons">pause</i>
                    </button>
                    <!--                    <button class="btn waves-effect waves-light" data-bind="visible: IsPlaying, click: Stop  ">
                                            <i class="small material-icons">stop</i>
                                        </button>-->

                </div>
                <div class="col s2">
                    <span>Current frame: </span><span class="blue-text bold" data-bind="text: CurrentFrameName"></span>
                </div>
            </div>
        </div>


    </div>
</div>

<script>
    var playerVM = null;
    var map = null;
    function loadMap() {
        var map = null;
        // Load the map styles from the resources file
        var gMapStyles = new Array();
        var mapTypeIds = [google.maps.MapTypeId.ROADMAP];
        for (var i = 0, max = mapStyles.length; i < max; i++) {
            var style = mapStyles[i];
            gMapStyles.push(new google.maps.StyledMapType(style.style,
                    {name: style.name}));
            mapTypeIds.push('map_style' + i);
        }


        // Load the map on to the map div
        var defaultCenter = {lat: 22.7196, lng: 75.8577}; // Indore
        map = new google.maps.Map(document.getElementById('map'), {
            center: defaultCenter, // focus on the default center
            zoom: 5,
            mapTypeControlOptions: {
                mapTypeIds: mapTypeIds
            }
        });

        // associate the style maps with the maptypeid
        for (var i = 0, max = gMapStyles.length; i < max; i++) {
            map.mapTypes.set('map_style' + i, gMapStyles[i]);
        }
        map.setMapTypeId('map_style0'); // select the first style by default
        return map;
    }

    // this init method will be called once the Google Maps script is loaded
    function init() {
        console.log('Map script loaded');
        // Use this to initialize stuff rather than document load so that we have Google Map's script loaded before doing anything
        map = loadMap();

        // make all tool-bars draggable
        $('.tool-bar').draggable();

        // Apply the KnockoutJS bindings
        playerVM = new PlayerVM(map);
        ko.applyBindings(playerVM, document.body);  // binding to the whole visualizer page.

        // Initialize the visualizer
        playerVM.Init();
    }
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOtB32LK7WnQZBXNP03V8j7tQA4EJAGO4&libraries=visualization&callback=init"
async defer></script>
