/* 
 * Author: Hariharan Arunachalam
 * Date: Jul 21, 2016 (12:12:46 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

/* global defaultAreaCoordinates, Enumerable, SERVER, google, moment, settings, temporalGroupEdgeAdjustments, numeral, rgbaGradients */

// This holds the view model definitions for the visualizer

/**
 * The main view model for the Surge visualizer view.
 * @class
 * @param {google.maps.Map} map The reference to the Google Map object.
 * @param {HtmlElement} _filterDashboard The id reference to the filter dashboard to be used for slide animation.
 * @param {HtmlElement} _aboutDashboard The id reference to the about dashboard to be used for slide animation.
 * @returns {VisualizerVM}
 * @author Hariharan Arunchalam
 */
function VisualizerVM(map, _filterDashboard, _aboutDashboard) {
    
    /**
     * Variable to be used to reference properties and methods on the {@link VisualizerVM} when inside
     * methods where closure would eclipse usage of {@link this}
     * @private @readonly
     * @type VisualizerVM
     */
    var self = this; // now the proper VM closure can be accessed using self.
    
    /**
     * A reference to the filter dashboard element to use for sliding
     * @private @readonly
     * @type {HtmlElement}
     */
    var filterDashboard = _filterDashboard;
    
    /**
     * A reference to the about dashboard element to use for sliding
     * @private @readonly
     * @type {HtmlElement}
     */
    var aboutDashboard = _aboutDashboard;
    
    /**
     * A reference to the Google map object for manipulating the map display
     * @private @readonly
     * @type {google.maps.Map}
     */
    this.Map = map; // access to the map

    
    /**
     * 
     */
    this.DataInfoVM = ko.observable(new _dataInfoVM());

    // The layer manager. I'm the parent.
    this.LayerManager = ko.observable(new LayerManagerVM(self, self.Map));

    // The player link
    this.OpenPlayer = function () {
        var win = window.open("index.php/Player", '_blank');
        win.focus();
    };

    // Filter Dashboard click and visiblity binders
    this.ToggleFilterDashboard = function (callback) {
        toggleDashboard(filterDashboard, function () {
            self.IsFilterDashboardVisible(!self.IsFilterDashboardVisible());
            if (callback !== undefined && callback !== null && typeof callback === 'function')
                callback();
        });
    };
    
    this.IsFilterDashboardVisible = ko.observable(false);

    // Layers toolbar binders
    this.ToggleLayersToolbar = function () {
        self.IsLayersToolbarVisible(!self.IsLayersToolbarVisible());
    };

    this.IsLayersToolbarVisible = ko.observable(false);

    this.IsInfoToolbarVisible = ko.observable(false);
    this.ToggleInfoToolbar = function () {
        self.IsInfoToolbarVisible(!self.IsInfoToolbarVisible());
    };

    // census variable toolbar
    this.IsCensusToolbarVisible = ko.observable(false);
    this.ToggleCensusToolbar = function () {
        self.IsCensusToolbarVisible(!self.IsCensusToolbarVisible());
    };
 
    // Infrastructure variable toolbar
    this.IsInfrastructureToolbarVisible = ko.observable(false);
    this.ToggleInfrastructureToolbar = function () {
        self.IsInfrastructureToolbarVisible(!self.IsInfrastructureToolbarVisible());
    };
    
    // About dashboard
    this.IsAboutDashboardVisible = ko.observable(false); // visible at first

    this.ToggleAboutDashboard = function () {
        toggleDashboard(aboutDashboard, function () {
            self.IsAboutDashboardVisible(!self.IsAboutDashboardVisible()); 
        });
    };
 
    // Area filter
    this.IsShowingAreaFilter = ko.observable(false);
    this.AreaCoordinates = defaultAreaCoordinates; // set to default coordinates initially
    this.AreaFilterLayer = null;

    // Socio-economic layers
    this.ShowLiteracy = ko.observable(false);
    this.censusVariable = ko.observable('none');

    var isLiteracyOn = this.ShowLiteracy();
    this.ShowEmployment = ko.observable(false);
    var isEmploymentOn = this.ShowEmployment();
    
    // Infrastructure layers
//    this.ShowInfrastructure = ko.observable(false);
    this.ShowRoads =  ko.observable(false);
    this.ShowRailway = ko.observable(false);
    this.ShowPolice = ko.observable(false);
    this.ShowPostal = ko.observable(false);
    this.ShowHospital = ko.observable(false);
    this.ShowSchool = ko.observable(false);

//    var isLiteracyOn = this.ShowLiteracy();
    
    // Filter and option selections
    this.SelectedTemporalGroupType = ko.observable();
    this.SelectedTemporalSelectionType = ko.observable();

    this.TemporalItems = ko.observableArray();
    
//    this.SelectedDataSources = ko.observableArray();
    
    this.SelectedTemporalStartIndex = ko.observable(0);
    this.SelectedTemporalEndIndex = ko.observable();
    this.SelectedTemporalStartNumber = ko.computed(function () {
        return Number(self.SelectedTemporalStartIndex());
    });
    this.SelectedTemporalBasedFormat = ko.computed(function () {
        switch (self.SelectedTemporalGroupType()) {
            case 'day':
                return 'D-MM-YYYY';
            case 'month':
                return 'MMMM, YYYY';
            case 'year':
                return 'YYYY';
        }
    });

    this.SelectedTemporalBasedOutputFormat = ko.computed(function () {
        switch (self.SelectedTemporalGroupType()) {
            case 'day':
                return 'MMMM Do, YYYY';
            case 'month':
                return 'MMMM, YYYY';
            case 'year':
                return 'YYYY';
        }
    });

    this.FormatTemporalItemBasedOnIndex = function (index) {
        return (self.TemporalItems() === undefined || self.TemporalItems()[index] === undefined) ?
                '-' :
                moment(self.TemporalItems()[index].item, self.SelectedTemporalBasedFormat()).format(self.SelectedTemporalBasedOutputFormat());
    };

    this.SelectedRangeStart = ko.computed(function () {
        return self.FormatTemporalItemBasedOnIndex(self.SelectedTemporalStartIndex());
    });

    this.SelectedRangeEnd = ko.computed(function () {
        return self.FormatTemporalItemBasedOnIndex(self.SelectedTemporalEndIndex());
    });

    this.SelectedSinglePointIndex = ko.observable(0);
    this.SelectedSinglePoint = ko.computed(function () {
        return self.FormatTemporalItemBasedOnIndex(self.SelectedSinglePointIndex());
    });

    this.SelectedUnrestCategories = ko.observableArray();
    this.UnrestAutoToggler = ko.observable(new SelectOptionAutoToggler(self.SelectedUnrestCategories,
            self.DataInfoVM().UnrestCategories));
            
    this.SelectedDataSources = ko.observableArray();
    this.DataSourceAutoToggler = ko.observable(new SelectOptionAutoToggler(self.SelectedDataSources,
            self.DataInfoVM().DataSources));

    this.SelectedActors = ko.observableArray();
    this.ActorsAutoToggler = ko.observable(new SelectOptionAutoToggler(self.SelectedActors,
            self.DataInfoVM().Actors, 'code'));

    this.ActorsInvolvedDisplay = ko.computed(function () {
        if (self.SelectedActors().length === 0)
            return "-";
        return Enumerable.From(self.SelectedActors()).Aggregate(function (a0, a1) {
            return a0 + ", " + a1;
        });
    });

    this.SelectedECNormalization = ko.observable();

    this.SelectedColorBy = ko.observable();

    // Update state defines how the controls are activated/deactivated when communication is happening
    // FALSE - controls are accessible
    // TRUE - server communication is happening    
    this.UpdateState = ko.observable(false);

    // Data loading state
    // FALSE = controls are accessible as data is NOT loading
    // TRUE = controls are inaccessible as data IS loading
    this.LoadState = ko.observable(false);

    this.FilteredCount = ko.observable(0);
    this.lastUpdate = ko.observable();
    this.importDate = ko.observable();

    this.UpdateDistinctsFromServer = function (_callback) {
        self.UpdateState(true);
        var callback = _callback;
        SERVER.GetDistinctsForTemporalGroup(self.SelectedTemporalGroupType(), function (result) {
//            console.log(result);
            // load the items into the temporal items
            self.TemporalItems(result);
            self.SelectedTemporalStartIndex(0); // select the first temporal index for start
            self.SelectedTemporalEndIndex(self.TemporalItems().length - 1); // select the last temporal index for end                
            self.UpdateState(false);
            // call the callback if provided
            if (callback)
                callback();
        });
    };

    this.GetFilterCount = function () {
        self.UpdateState(true);
        var params = self.GetParamters();
        if (params === null) {
            self.UpdateState(false);
            return;
        }
        SERVER.GetFilterCount(params, function (result) {
//            console.log(result);
            self.FilteredCount(Number(result.data.filterCount));
            self.UpdateState(false);
        });

    };

    this.SubscribeToChanges = function () {
        // Change in the temporal group type
        self.SelectedTemporalGroupType.subscribe(function (s) {
            // Get the list for this group type
            self.UpdateDistinctsFromServer(function () {
                self.GetFilterCount();
            });
        });

        // Change in the temporal selection type
        self.SelectedTemporalSelectionType.subscribe(function (s) {
            self.UpdateDistinctsFromServer(function () {
                self.GetFilterCount();
            });
        });

        // Change in the range start
        self.SelectedRangeStart.subscribe(function (s) {
            self.GetFilterCount();
        });

        // Change in the range end
        self.SelectedRangeEnd.subscribe(function (s) {
            self.GetFilterCount();
        });

        // Change in the single point change
        self.SelectedSinglePoint.subscribe(function (s) {
            self.GetFilterCount();
        });

        // Change in the unrest categories
        self.SelectedUnrestCategories.subscribe(function (s) {
            self.GetFilterCount();
        });
        
        // Change in the data sources
        self.SelectedDataSources.subscribe(function (s) {
            self.GetFilterCount();
        });
        
        // Change in the actors
        self.SelectedActors.subscribe(function (s) {
            self.GetFilterCount();
        });

        // Change in the event count normalization
        self.SelectedECNormalization.subscribe(function (s) {
            self.GetFilterCount();
        });
        
        self.censusVariable.subscribe(function(s){
                var censusVar = self.censusVariable();
//                console.log(censusVar);
                toggleSocioEconomicLayers(censusVar);
            });
        self.ShowRoads.subscribe(function(s){ 
                layerController[4].allowed = self.ShowRoads();
                layerController[5].allowed = self.ShowRoads();
                toggleCustomLayer(4);
                toggleCustomLayer(5);
              });
        self.ShowRailway.subscribe(function(s){
                layerController[6].allowed = self.ShowRailway();
                toggleCustomLayer(6);
              });
        self.ShowPostal.subscribe(function(s){
                layerController[7].allowed = self.ShowPostal();
                toggleCustomLayer(7);
              });
        self.ShowPolice.subscribe(function(s){
                layerController[8].allowed = self.ShowPolice();
                toggleCustomLayer(8);
              });
        self.ShowSchool.subscribe(function(s){
                layerController[9].allowed = self.ShowSchool();
                layerController[10].allowed = self.ShowSchool();
                toggleCustomLayer(9);
                toggleCustomLayer(10);
              });  
        self.ShowHospital.subscribe(function(s){
                layerController[11].allowed = self.ShowHospital();
                toggleCustomLayer(11);
              });
        self.ShowLiteracy.subscribe(function(s){
//            layerController[11].allowed = self.ShowLiteracy();
            
            if(self.ShowLiteracy()) {
                isLiteracyOn = true;
//                console.log('is now ' + isLiteracyOn);
            }
            else {
                isLiteracyOn = false;
//                console.log('now its ' + isLiteracyOn);
            }
            if(isLiteracyOn){
                self.mapCopy = map;
            } else {
                self.mapCopy = null;
            }
            var v = map.getZoom();
            map.setZoom(v-1);
            map.setZoom(v);        
        });
 
        // Area filter
        self.IsShowingAreaFilter.subscribe(function (s) {
            if (self.AreaFilterLayer === null) { // area filter layer not defined, create it
                self.AreaFilterLayer = new google.maps.Rectangle({
                    bounds: self.AreaCoordinates,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    draggable: true,
                    editable: true
                });
                self.AreaFilterLayer.addListener('bounds_changed', changeAreaCoordinates);

            }
            self.AreaFilterLayer.setMap(s ? self.Map : null);
            self.GetFilterCount();
        });
    };

    // throttle area change update
    var areaChangeThrottleHandle = null;
    var areaChangeThrottleTime = 250; // 0.25 seconds

    function changeAreaCoordinatesThrottled() {
        var bounds = self.AreaFilterLayer.getBounds();
        self.AreaCoordinates = {
            north: bounds.getNorthEast().lat(),
            south: bounds.getSouthWest().lat(),
            east: bounds.getNorthEast().lng(),
            west: bounds.getSouthWest().lng()
        };
        self.GetFilterCount(); // update the filter count
    }

    function changeAreaCoordinates() {
        if (areaChangeThrottleHandle !== undefined || areaChangeThrottleHandle !== null) {
            // reset the throttling
            clearTimeout(areaChangeThrottleHandle);
            areaChangeThrottleHandle = null;
        }
        // set the throttle
        areaChangeThrottleHandle = setTimeout(changeAreaCoordinatesThrottled, areaChangeThrottleTime);
    }

    this.GetParamters = function () {
        var params = {
            't-group': self.SelectedTemporalGroupType(),
            't-select': self.SelectedTemporalSelectionType(),
            'unrests': self.SelectedUnrestCategories(),
            'actors': self.SelectedActors(),
            'ec-norm': self.SelectedECNormalization(),
            'data-source': self.SelectedDataSources(),
            'color': self.SelectedColorBy()
        };
        // add the range or single point range based on selection type
        if (params['unrests'].length === 0)
            return null;
        if (params['actors'].length === 0)
            return null;
        // add the area parameters if given
        if (self.IsShowingAreaFilter()) {
            params['area'] = self.AreaCoordinates;
        }
        
        if (params['data-source'].length === 0) 
            return null;

        try {
            // reformat the select range and single points to proper dates
            if (params['t-select'] === 'range') {
                params['t-filter-start'] = moment(self.TemporalItems()[self.SelectedTemporalStartIndex()].item,
                        self.SelectedTemporalBasedFormat()).format(settings.mysqlFormat);
                params['t-filter-end'] = moment(self.TemporalItems()[self.SelectedTemporalEndIndex()].item,
                        self.SelectedTemporalBasedFormat()).
                        add(1, temporalGroupEdgeAdjustments[self.SelectedTemporalGroupType()].add).
                        subtract(1, 'seconds').format(settings.mysqlFormat);
            } else if (params['t-select'] === 'single') {
                var singlePoint = moment(self.TemporalItems()[self.SelectedSinglePointIndex()].item,
                        self.SelectedTemporalBasedFormat());
                params['t-single-point-start'] = singlePoint.format(settings.mysqlFormat);
                params['t-single-point-end'] = singlePoint.add(1, temporalGroupEdgeAdjustments[self.SelectedTemporalGroupType()].add).
                        subtract(1, 'seconds').format(settings.mysqlFormat);
            }
            return params;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    this.CurrentlyLoadedCount = ko.observable(0);
    this.CurrentlyLoadedPercent = ko.computed(function () {
        return (self.CurrentlyLoadedCount() / self.FilteredCount());
    });
    this.CurrentlyLoadedDisplay = ko.computed(function () {
        return (self.CurrentlyLoadedPercent() * 100) + '%';
    });

    this.LoadData = function () {
        var params = self.GetParamters();
        if (params === null)
            return;
        self.UpdateState(true);
        self.LoadState(true);
        // set loaded to 0
        self.CurrentlyLoadedCount(0);
        self.LayerManager().Clean();
        var allPoints = [];
        var splitLogic = SERVER.GetSplitLogic(self.FilteredCount());
        SERVER.LoadData(params, splitLogic,
                function (data, split) { // piecewise callback
                    //console.log(split, data);
                    self.CurrentlyLoadedCount(self.CurrentlyLoadedCount() + data.result.length);
                    // Hold the data until complete and then split it by layers and pass it to the layer manager
                    allPoints = Enumerable.From(data.result).
                            Select(function (s) {
                                return {
                                    location: new google.maps.LatLng(s.lat, s.lng),
                                    weight: Number(s.data),
                                    color: s.color === undefined ? 'default' : s.color
                                };
                            }).Concat(allPoints).ToArray();
                },
                function () { // final callback
                    // console.log("Final callback", allPoints);
                    // pass these onto the layer manager
                    self.LayerManager().Load(allPoints);

                    // if the dashboard is visible, hide it                    
                    if (self.IsFilterDashboardVisible())
                        self.ToggleFilterDashboard();

                    // unset the loading
                    self.UpdateState(false);
                    self.LoadState(false);

                    // if the area toggle was on, close it
                    if (self.IsShowingAreaFilter()) {
                        self.IsShowingAreaFilter(false);
                    }
                });
    };

    function toggleDashboard(dashboard, onCompleteCallback) {
        dashboard.animate({
            height: ["toggle", "swing"]
        }, {
            duration: 600,
            specialEasing: {
                width: "linear",
                height: "easeOutBounce"
            },
            complete: function () {
                if (onCompleteCallback)
                    onCompleteCallback();
            }
        });
    };

    // Initializer
    this.Init = function (callback) {
        // initialize the DataInfoVM
        self.DataInfoVM().Init(function () {
            // add the subscribers
            self.SubscribeToChanges();

            // set the default first selections
            self.SelectedTemporalGroupType('day');
            self.SelectedTemporalSelectionType('range');

            // Select all unrest categories
            self.SelectedUnrestCategories(Enumerable.From(self.DataInfoVM().UnrestCategories()).ToArray());
            
            // Select all Data Sources
            self.SelectedDataSources(Enumerable.From(self.DataInfoVM().DataSources()).ToArray());
            // Select all actors            
            self.SelectedActors(Enumerable.From(self.DataInfoVM().Actors()).Select(function (s) {
                return s.code;
            }).ToArray());
            // Select the first ECNormalization
            self.SelectedECNormalization(self.DataInfoVM().ECNormalizations()[0].code);
            
//            self.SelectedDataSources(Enumerable.From(self.DataInfoVM().DataSources).ToArray());
            
            // Select none for layer coloring
            self.SelectedColorBy('none');
            // collapse the about dashboard
            self.ToggleAboutDashboard();
            // collapse the filter dashboard
            self.ToggleFilterDashboard(callback);


        });
        SERVER.GetlatestUpdateDate(function (data){
            self.lastUpdate(data.fileDate);
            self.importDate(data.importDate);
            
            console.log('Update Information: ', data);
        });
    };
       // load the fusion table for taluk-level polygons in INDIA       
         var fusion_lvl3 = new google.maps.FusionTablesLayer({    
           query: {    
             select: 'geometry',   
             from: '1uujrpwlE_bF1IovcPZhRCCrdAp_Whg8kF_ajpMhD'   
           },    
           options: {    
             styleId: 2,   
             templateId: 2   
           }   
         }); 
         var fusion_lvl2 = new google.maps.FusionTablesLayer({    
           query: {    
             select: 'geometry',   
             from: '1iOl5nElW5T7SB99O2Vwk9PTlnWHiynRNhW4B-KZf'   
           },    
           options: {    
             styleId: 2,   
             templateId: 2   
           }   
         });          
         var fusion_district_literacy = new google.maps.FusionTablesLayer({    
           query: {    
             select: 'geometry',   
             from: '1mA1Uue6FzOmdrK0NwzHt10ePExSNDYlE3Np5jn0O'   
           },    
           options: {    
             styleId: 2,   
             templateId: 2   
           }   
         });               
         // load the fusion table for points of interest     
         var fusion_poi = new google.maps.FusionTablesLayer({   
           query: {    
             select: 'geometry',   
             from: '1Au8exiauqO5CC3EfNC8k6Kb98gCp2mm5d_4-fHLq'   
           }   
           ,   
         options: {    
         styleId: 2,   
         templateId: 2,   
         suppressInfoWindows:false    
         }   
         }); 
         
         var fusion_india_roads_major = new google.maps.FusionTablesLayer({   
           query: {    
             select: 'geometry',   
//             from: '1Dfi1sGcJmf60Gjrr8QDLWjAkhIlf5VOIbTfDieVD'   

            from : '1NOjtLLtvw_XGknDxnd3C-MkRGgo9LBxdvPVYm2SW'
           }   
           ,   
         options: {    
         styleId: 2,   
         templateId: 2,   
         suppressInfoWindows:true    
         }   
         });
         
         var fusion_india_roads_general = new google.maps.FusionTablesLayer({   
           query: {    
             select: 'geometry',   
//             from: '1Dfi1sGcJmf60Gjrr8QDLWjAkhIlf5VOIbTfDieVD'   

            from : '1kGq0Hy_FT-Py5LooOnOrUtAcTcd1_r0x_SZJbVAZ'
           }   
           ,   
         options: {    
         styleId: 2,   
         templateId: 2,   
         suppressInfoWindows:true    
         }   
         });
         
         
         var fusion_india_railway = new google.maps.FusionTablesLayer({   
           query: {    
             select: 'geometry',   
             from: '1IMhSSXwWe1KNcQQGrcba6A__j5rt2tv1YhS2p4Ou'   
           }   
           ,   
         options: {    
         styleId: 2,   
         templateId: 2,   
         suppressInfoWindows:true    
         }   
         }); 
         
         // load the fusion table for states for INDIA     
         var fusion_state_literacy = new google.maps.FusionTablesLayer({    
           query: {    
             select: 'geometry',   
             from: '1nBy2LCnCqjvGMpLzZlN3qZjHNa8mp4O8U0kVOYDy'   
           }   
           ,   
         options: {    
         styleId: 2,   
         templateId: 2   
         }   
         });                
        // load the fusion table for states for INDIA     
         var fusion_lvl1 = new google.maps.FusionTablesLayer({    
           query: {    
             select: 'geometry',   
             from: '1jJKkrxRJjS4m6t5cl9StrWZLHzSGiyJKtebxWdAp'   
           }   
           ,    
         options: {    
         styleId: 2,   
         templateId: 2   
         }   
         });          
//    load the basic state level map since the default zoom level is 5       
//    if (!isLiteracyOn){ fusion_lvl1.setMap(map); }
//    else {fusion_state_literacy.setMap(map);}
// 
    //adjust the layers based on zoom layer
    india_comm_towers = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/export_communication.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });
    
        delhi_kml = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/delhi_all_points.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });
//    india_comm_towers.setMap(map);

        delhi_railway = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/delhiRailway.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });
//    india_comm_towers.setMap(map);
        kolkata_kml = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/kolkata_points.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    }); 
    
        chennai_kml = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/chennai_points.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });

        banglore_kml = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/banglore_point.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });

        hyd_kml = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/hyderabad_points.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });

        mumbai_kml = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/mumbai_point.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });
    
        hospitalLayer = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/hospitals_Fusion.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    }); 
    
        universityLayer = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/university_Fusion.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });

        schoolsLayer = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/schools_Fusion.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });

        policeLayer = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/police_fusion.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });

        postalLayer = new google.maps.KmlLayer({
        url: 'http://cse.unl.edu/~surge/docs/kml/postalOffice_Fusion.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });
    
  var layerController = [
    { layer : fusion_lvl1, zoom_min : 5, zoom_max : 8, allowed : true, layer_type : 'infra'}, //0
    { layer : fusion_lvl2, zoom_min : 9, zoom_max : 25, allowed : true, layer_type : 'infra' }, //1
    { layer : fusion_state_literacy, zoom_min : 5, zoom_max : 8, allowed : false, layer_type : 'literacy' }, //2
    { layer : fusion_district_literacy, zoom_min : 9, zoom_max : 25, allowed : false, layer_type : 'literacy' }, //3
    { layer : fusion_india_roads_major, zoom_min : 9, zoom_max : 25, allowed : false, layer_type : 'infra' }, //4
    { layer : fusion_india_roads_general, zoom_min :11, zoom_max : 25, allowed : false, layer_type : 'infra' }, //5
    { layer : fusion_india_railway, zoom_min : 11, zoom_max : 25, allowed : false, layer_type : 'infra' }, //6
    // { layer : delhi_kml, zoom_min : 13, zoom_max : 25, allowed : false },
    { layer : postalLayer, zoom_min : 13, zoom_max : 25, allowed : false, layer_type : 'infra' }, //7
    { layer : policeLayer, zoom_min : 13, zoom_max : 25, allowed : false, layer_type : 'infra' }, //8
    { layer : schoolsLayer, zoom_min : 13, zoom_max : 25, allowed : false, layer_type : 'infra' }, //9
    { layer : universityLayer, zoom_min : 13, zoom_max : 25, allowed : false, layer_type : 'infra' }, //10
    { layer : hospitalLayer, zoom_min : 13, zoom_max : 25, allowed : false, layer_type : 'infra' } //11
    ];
    
    displayLayers();
    
    google.maps.event.addListener(map,"zoom_changed", function() { 
      for (var i = 0, max = layerController.length; i < max; i++) {
        toggleCustomLayer(i);
      }
    });
    
    function displayLayers(){
        for (var i = 0, max = layerController.length; i < max; i++) {
        toggleCustomLayer(i);
      }
    }    
    //for toggling gradient layers like Literacy rates, Crime Rates and stuff
    function toggleCustomLayer(layerNumber){
      //  layerNumber is the index number of the layerController array
      var z = map.getZoom();
      var l = layerController[layerNumber].layer;
      if (layerController[layerNumber].allowed && z <= layerController[layerNumber].zoom_max && z >= layerController[layerNumber].zoom_min){
                if (!l.getMap()) l.setMap(map);
              } else {
                l.setMap(null);
              }
    }
    
    function toggleSocioEconomicLayers(layertype){
        if (layertype === 'none') {    
            layerController[0].allowed=true;
            layerController[1].allowed=true;
        };
        for (var i = 0, max = layerController.length; i < max; i++) {
            var l = layerController[i].layer;
            if (layerController[i].layer_type !== 'infra' ) {
                if (layerController[i].layer_type === layertype) {
                    layerController[i].allowed = true;
                    layerController[0].allowed=false;
                    layerController[1].allowed=false;
                    toggleCustomLayer(i);
                } else {
                    layerController[i].allowed = false;
                    l.setMap(null);
                }
            }
        }
        displayLayers();
        console.log(layerController);
        
    }
//    google.maps.event.addListener(map,"zoom_changed", function() {    
//        var zoom =  map.getZoom(); 
//       console.log(zoom);    
//       if (zoom >= 1 && zoom < 5) {    
////            fusion_poi.setMap(null);
//            fusion_lvl1.setMap(null); 
//            fusion_lvl2.setMap(null); 
//            fusion_state_literacy.setMap(null); 
//            fusion_district_literacy.setMap(null);
////            india_comm_towers.setMap(null);
//            fusion_india_roads_major.setMap(null);
//            fusion_india_roads_general.setMap(null);
//            fusion_india_railway.setMap(null);
//            delhi_kml.setMap(null);
//            mumbai_kml.setMap(null); 
//            hyd_kml.setMap(null); 
//            banglore_kml.setMap(null); 
//            chennai_kml.setMap(null); 
//            kolkata_kml.setMap(null);
//       }     
//       else if (zoom >4 && zoom < 9) {     
////            fusion_poi.setMap(null);    
//            fusion_lvl2.setMap(null);
//            fusion_district_literacy.setMap(null);
//            if(isLiteracyOn) {
//                fusion_lvl1.setMap(null);
//                fusion_state_literacy.setMap(map);                
//            } else {
//                fusion_state_literacy.setMap(null); 
//                fusion_lvl1.setMap(map);
//            }
////            india_comm_towers.setMap(null);
//            fusion_india_roads_major.setMap(null);
//            fusion_india_roads_general.setMap(null);
//            fusion_india_railway.setMap(null);
//            delhi_kml.setMap(null);
//            mumbai_kml.setMap(null); 
//            hyd_kml.setMap(null); 
//            banglore_kml.setMap(null); 
//            chennai_kml.setMap(null); 
//            kolkata_kml.setMap(null);
//            }     
//       else if (zoom >=9 && zoom <=10) {   
//            fusion_lvl1.setMap(null);
//            fusion_state_literacy.setMap(null);
//            if(isLiteracyOn) {
//                fusion_lvl2.setMap(null); 
//                fusion_district_literacy.setMap(map);
//            } else {
//                fusion_district_literacy.setMap(null);
//                fusion_lvl2.setMap(map); 
//            }
//            fusion_poi.setMap(null);
//            fusion_india_roads_major.setMap(map);
//            fusion_india_roads_general.setMap(null);
//            fusion_india_railway.setMap(null);
////            india_comm_towers.setMap(map);
//            delhi_kml.setMap(null); 
//            mumbai_kml.setMap(null); 
//            hyd_kml.setMap(null); 
//            banglore_kml.setMap(null); 
//            chennai_kml.setMap(null); 
//            kolkata_kml.setMap(null);
//       }   
//       else if (zoom >=11 && zoom <=12) {   
//            fusion_lvl1.setMap(null);      
//            if(isLiteracyOn) {
//                fusion_lvl2.setMap(null); 
//                fusion_district_literacy.setMap(map);
//            } else {
//                fusion_district_literacy.setMap(null);
//                fusion_lvl2.setMap(map); 
//            }
//            fusion_state_literacy.setMap(null);
//            fusion_india_roads_major.setMap(map);
//            fusion_india_roads_general.setMap(map);
//            fusion_india_railway.setMap(map);
////            fusion_poi.setMap(map); 
////            india_comm_towers.setMap(map);
//            delhi_kml.setMap(null); 
//            mumbai_kml.setMap(null); 
//            hyd_kml.setMap(null); 
//            banglore_kml.setMap(null); 
//            chennai_kml.setMap(null); 
//            kolkata_kml.setMap(null);
//       }   
//             else if (zoom >= 13 ) {   
//            fusion_lvl1.setMap(null);      
//            if(isLiteracyOn) {
//                fusion_lvl2.setMap(null); 
//                fusion_district_literacy.setMap(map);
//            } else {
//                fusion_district_literacy.setMap(null);
//                fusion_lvl2.setMap(map); 
//            }
//            fusion_state_literacy.setMap(null);
//            fusion_india_roads_major.setMap(map);
//            fusion_india_roads_general.setMap(map);
//            fusion_india_railway.setMap(map);            
////            fusion_poi.setMap(map); 
////            india_comm_towers.setMap(map);
//            delhi_kml.setMap(map); 
//            mumbai_kml.setMap(map); 
//            hyd_kml.setMap(map); 
//            banglore_kml.setMap(map); 
//            chennai_kml.setMap(map); 
//            kolkata_kml.setMap(map);
//       }  
//     }); 
//           
}
// _obs = the observable to change
// _options = the observable array of options
// _propName (Optional) = the property name to be used for selections
function SelectOptionAutoToggler(_obs, _options, _propName) {
    var self = this;
    var obs = _obs;
    var options = _options;
    var propName = _propName;

    this.SelectAllDisable = ko.computed(function () {
        // if all the options in _obs are already selected, can't select all       
        return options().length === obs().length;
    });

    this.SelectNoneDisable = ko.computed(function () {
        return obs().length === 0;
    });

    this.SelectAll = function () {
        // clear and add all the items
        self.SelectNone();
        if (propName === undefined || propName === null) {
            obs(Enumerable.From(options()).ToArray()); // no property name
        } else {
            obs(Enumerable.From(options()).Select(function (s) {
                return s[propName];
            }).ToArray()); // select the property name
        }

    };

    this.SelectNone = function () {
        // clear all
        obs.removeAll();
    };

}

function _dataInfoVM() {
    var self = this;
    this.DataStartDate = ko.observable();
    this.StartDateDisplay = ko.computed(function () {
        return self.DataStartDate() === undefined ? '-' : moment(self.DataStartDate()).format('MMMM Do, YYYY');
    });
    this.DataEndDate = ko.observable();
    this.EndDateDisplay = ko.computed(function () {
        return self.DataEndDate() === undefined ? '-' : moment(self.DataEndDate()).format('MMMM Do, YYYY');
    });
    
//    this.DataSources = ko.observableArray();
    
    this.DurationSummary = ko.computed(function () {
        var diff = moment.duration(moment(self.DataEndDate()).diff(self.DataStartDate()));
        var rString =
                (diff.years() > 0 ? diff.years() + ' years ' : '') +
                (diff.months() > 0 ? diff.months() + ' months ' : '') +
                (diff.days() > 0 ? diff.days() + ' days' : '');

        return rString;
    });

    this.TotalDataCount = ko.observable();
    this.DataCountDisplay = ko.computed(function () {
        return self.TotalDataCount() === undefined ? '-' : numeral(self.TotalDataCount()).format('0,0');
    });

    this.TotalEventCount = ko.observable();
    this.TotalEventsDisplay = ko.computed(function () {
        return self.TotalEventCount() === undefined ? '-' : numeral(self.TotalEventCount()).format('0,0');

    });

    this.UnrestCategories = ko.observableArray();

    this.DataSources = ko.observableArray();

    this.Actors = ko.observableArray();

    this.ECNormalizations = ko.observableArray();

    // Initializer
    this.Init = function (callback) {
        // Load the data information from the server
        SERVER.GetDataInfo(function (data) {
            console.log('Data info: ', data);
            // load the data info 
            self.DataEndDate(data.EndDate);
            self.DataStartDate(data.StartDate);
            self.TotalDataCount(data.DataCount);
            self.TotalEventCount(data.TotalEvents);

            self.UnrestCategories(data.UnrestCategories);
            self.Actors(data.Actors);
            self.ECNormalizations(data.ECNormalizations);
            
            self.DataSources(data.DataSources);
            // call the callback
            if (callback)
                callback();
        });
    };
}



/**
 * The view model for managing the layers view model inside the visualizer vm
 * @param {VisualizerVM} _parent The VisualizerVM parent for back referencing
 * @param {google.maps.Map} map The reference to the Google Map object.
 * @returns {LayerManagerVM}
 */
function LayerManagerVM(_parent, map) {
    var self = this;
    var parent = _parent;
    this.Map = map;
    this.Layers = ko.observableArray();

    this.IsUsingGlobalControls = ko.observable(false);
    this.Opacity = ko.observable(10);
    this.ComputedOpacity = ko.computed(function () {
        return self.Opacity() / 10;
    });

    this.Radius = ko.observable(4);

    this.MaxMaxIntensity = ko.observable();
    this.MaxIntensityIndex = ko.observable(0);
    this.MaxIntensityScale = ko.observableArray();
    this.MaxIntensity = ko.computed(function () {
        return self.MaxIntensityScale()[self.MaxIntensityIndex()];
    });
    
    this.Clean = function () {
        // remove all the layers
        for (var i = 0, max = self.Layers().length; i < max; i++) {
            var layer = self.Layers()[i];
            layer.Destroy();
        }
        // remove the layers
        self.Layers.removeAll();
        // TODO: Preserve layers if requested

    };

    this.Load = function (data) {
        // split based on the color
        var splitData = Enumerable.From(data).GroupBy(function (s) {
            return s.color;
        }).OrderBy(function(s) {
            return s.Key();
        }).ToArray();
        var lMaxIntensity = 0;
        for (var i = 0, max = splitData.length; i < max; i++) {
            var sd = splitData[i];
            var layer = new LayerVM(self, self.Map, sd.Key(), sd.ToArray(), i);
            self.Layers.push(layer);

            if (layer.MaxIntensityValue() > lMaxIntensity)
                lMaxIntensity = layer.MaxIntensityValue();
        }
        // calculate the global max intensity scale
        self.MaxIntensityScale(Enumerable.Range(1, Math.ceil(lMaxIntensity)).ToArray());
        self.MaxMaxIntensity(self.MaxIntensityScale().length - 1);
        self.MaxIntensityIndex(0);
    };
    
    // subscribe to the globals
    this.ComputedOpacity.subscribe(function (s) {
        // change the opacity of all the layers
        changeLayersProperty('opacity', s);
    });

    this.Radius.subscribe(function (s) {
        changeLayersProperty('radius', s);
    });

    this.MaxIntensity.subscribe(function (s) {
        changeLayersProperty('maxIntensity', s);
    });

    function changeLayersProperty(propName, value) {
        for (var i = 0, max = self.Layers().length; i < max; i++) {
            var l = self.Layers()[i];
            l.ChangeHeatMapProperty(propName, value);
        }
    };
}

/**
 * The view model that manages each of the layers in the {@link LayerManagerVM}
 * @param {LayerManagerVM} _parent The parent LayerManagerVM for back referencing.
 * @param {google.maps.Map} map The reference to the Google Map object.
 * @param {String} name The name of this layer to be displayed in the Layer Manager UI.
 * @param {Custom} points The data points as sent by the back end to be rendered on this layer.
 * @param {Number} index The positional index of this layer.
 * @returns {LayerVM}
 */
function LayerVM(_parent, map, name, points, index) {
    var self = this;
    var parent = _parent;
    this.Map = map;
    this.HeatMap = null;
    this.DataCount = ko.observable(points.length);
    this.Name = ko.observable(name);
    this.IsActive = ko.observable(true);
    this.Gradient = ko.observableArray(rgbaGradients[index]);
    this.IsShowingOptions = ko.observable(false);
    this.Opacity = ko.observable(10);
    this.Radius = ko.observable(4);
    this.ComputedOpacity = ko.computed(function () {
        return self.Opacity() / 10;
    });
    this.MaxIntensityScale = ko.observableArray();
    this.IsUsingGlobalControls = ko.computed(function () {
        return parent.IsUsingGlobalControls();
    });
    this.ToggleOptions = function () {
        // close all other options
        for (var i = 0, max = parent.Layers().length; i < max; i++) {
            var l = parent.Layers()[i];
            if (l.Name() !== self.Name())
                l.IsShowingOptions(false);
        }
        self.IsShowingOptions(!self.IsShowingOptions());
    };

// compute the max, min values
    var dataEn = Enumerable.From(points);
    var maxValue = dataEn.Max(function (s) {
        return s.weight;
    });

    this.MaxMaxIntensity = ko.observable();
    this.MaxIntesityIndex = ko.observable(0);
    // create a scale with integer values up to max value
    var x = Enumerable.Range(1, Math.ceil(maxValue)).ToArray();
    //console.log(maxValue, Math.ceil(maxValue), x);
    this.MaxIntensityScale(x);
    this.MaxMaxIntensity(self.MaxIntensityScale().length - 1);
    this.MaxIntensity = ko.computed(function () {
        return self.MaxIntensityScale()[self.MaxIntesityIndex()];
    });

    this.MaxIntensityValue = ko.computed(function () {
        return self.MaxIntensityScale()[self.MaxMaxIntensity()];
    });

    this.IsActive.subscribe(function (s) {
        self.HeatMap.setMap(s ? self.Map : null);
    });
    this.Destroy = function () {
        if (self.HeatMap !== undefined && self.HeatMap !== null) {
            self.HeatMap.setMap(null);
            self.HeatMap = null;
        }
    };

    // subscribe to changes in the settings
    this.MaxIntensity.subscribe(function (s) {
        self.ChangeHeatMapProperty('maxIntensity', s);
    });
    this.ComputedOpacity.subscribe(function (s) {
        self.ChangeHeatMapProperty('opacity', s);
    });
    this.Radius.subscribe(function (s) {
        self.ChangeHeatMapProperty('radius', s);
    });

    this.IsUsingGlobalControls.subscribe(function (s) {
        self.ChangeHeatMapProperty('maxIntensity', s ? parent.MaxIntensity() : self.MaxIntensity());
        self.ChangeHeatMapProperty('opacity', s ? parent.Opacity() : self.Opacity());
        self.ChangeHeatMapProperty('radius', s ? parent.Radius() : self.Radius());
    });

    this.ChangeHeatMapProperty = function (propName, value) {
        if (self.HeatMap !== null && self.HeatMap !== undefined) {
            self.HeatMap.set(propName, value, function (s) {
                console.log(self.Name(), 'prop', propName, value);
            });
        }
    };

// create the heap map
    self.HeatMap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: self.Map,
        scaleRadius: false,
        maxIntensity: self.MaxIntensity(),
        opacity: self.ComputedOpacity(),
        radius: self.Radius(),
        gradient: self.Gradient()
    });
}