<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 20, 2016 (10:58:39 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>
<!--the loading container -->
<?php
include 'partials/loader.php';
?>
 
<div id="map-container">
    <div id="map">
    </div>
</div>

<div id="census-controls" class="tool-bar" data-bind="visible: IsCensusToolbarVisible">
   <?php include 'partials/selectbox.php'; ?>
</div> 

<div id="infrastructure-controls" class="tool-bar" data-bind="visible: IsInfrastructureToolbarVisible">
   <?php include 'partials/infrastructure-box.php'; ?>
</div>

<div id="filter-dashboard-container" class="dashboard">
    <?php include 'partials/visualizer-dashboard.php'; ?>
</div>

<div id="layers" class='tool-bar' data-bind="visible: IsLayersToolbarVisible, with: LayerManager" >
    <?php include 'partials/layers-toolbar.php'; ?>    
</div>

<div id="info-bar" class="tool-bar" data-bind="visible: IsInfoToolbarVisible">
    <?php include 'partials/info-toolbar.php'; ?>
</div>

<div id="about-dashboard-container" class="dashboard">
    <?php include 'partials/about-surge.php' ?>
</div>

<script>
    var visualizerVM = null;
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

        // filter dashboard
        var filterDashboard = $('#filter-dashboard-container');
        var aboutDashboard = $('#about-dashboard-container');
        
        // Apply the KnockoutJS bindings
        visualizerVM = new VisualizerVM(map, filterDashboard, aboutDashboard);
        ko.applyBindings(visualizerVM, document.body);  // binding to the whole visualizer page.

        // Initialize the visualizer
        visualizerVM.Init(function() {
            // unhide the loader
            unhideLoader();
            // start the intro
            startIntroTour();    
        });
    } 
</script>

<!--Load Google Maps -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOtB32LK7WnQZBXNP03V8j7tQA4EJAGO4&libraries=visualization&callback=init"
async defer></script>
