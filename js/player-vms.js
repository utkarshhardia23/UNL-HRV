/* 
 * Author: Hariharan Arunachalam
 * Date: Aug 4, 2016 (6:15:09 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

/* global moment, SERVER, Enumerable, google, settings, temporalGroupEdgeAdjustments, temporalGroupFormat */

/**
 * The main view model for the Surge player view.
 * @class
 * @param {google.maps.Map} map Reference to the Google Map object.
 * @returns {PlayerVM}
 * @author Hariharan Arunachalam
 */
function PlayerVM(map) {
    
    /**
     * Variable to be used to reference properties and methods on the {@link PlayerVM} when inside
     * methods where closure would eclipse usage of {@link this}
     * @private @readonly
     * @type PlayerVM
     */
    var self = this;
    
    /**
     * A reference to the Google map object for manipulating the map display.
     * @private @readonly
     * @type {google.maps.Map}
     */
    this.Map = map;
    
    /**
     * The reference to the google.maps.visualization.HeatmapLayer object.
     */
    this.HeatMap = null; // the heatmap layer
    
    /**
     * latest update information
     */
    this.lastUpdate = ko.observable();
    this.importDate = ko.observable();
    
    /**
     * The selected Temportal Group for filtering the data for this animation.
     */
    this.SelectedTemporalGroup = ko.observable('day');

    /**
     * The available Unrest Categories for filtering the data for this animation.
     */
    this.UnrestCategories = ko.observableArray();
    this.DataSources = ko.observableArray();    
    /**
     * The available Countries for filtering the data.
     */
    this.Countries = ko.observableArray();
    
    /**
     * The selected Countries for filtering the data for this animation.
     */
    this.SelectedCountries = ko.observableArray();
    
    /**
     * The selected Unrest Categories for filtering the data for this animation.
     */
    this.SelectedUnrestCategories = ko.observableArray();
    this.SelectedDataSources = ko.observableArray();
    /**
     * The array of items that change based on the {@link SelectedTemporalGroup} fpr filtering the data for this animation.
     */
    this.RangeItems = ko.observableArray();

    /**
     * The selected start of the range index with reference to {@link RangeItems}.
     */
    this.SelectedRangeStartIndex = ko.observable(0);
    
    /**
     * The selected end of the range index with reference to {@link RangeItems}.
     */
    this.SelectedRangeEndIndex = ko.observable(0);

    /**
     * Computed function to convert the range start index to a JavaScript Number. This is used for binding.
     */
    this.SelectedRangeStartNumber = ko.computed(function () {
        return Number(self.SelectedRangeStartIndex());
    });

    /**
     * The Selected Temporal group based formatting option.
     */
    this.SelectedTemporalBasedFormat = ko.computed(function () {
        switch (self.SelectedTemporalGroup()) {
            case 'day':
                return 'D-MM-YYYY';
            case 'month':
                return 'MMMM, YYYY';
            case 'year':
                return 'YYYY';
        }
    });

    /**
     * The Selected Temporal group based output format for formatting the date sent to the back end.
     */
    this.SelectedTemporalBasedOutputFormat = ko.computed(function () {
        switch (self.SelectedTemporalGroup()) {
            case 'day':
                return 'MMMM Do, YYYY';
            case 'month':
                return 'MMMM, YYYY';
            case 'year':
                return 'YYYY';
        }
    });

    /**
     * Function to convert the item at {@link index} in the {@link RangeItems} to the corresponding display format based on the {@link SelectedTemporalGroup}.
     * @param {Number} index
     * @returns {String}
     */
    this.FormatTemporalItemBasedOnIndex = function (index) {
        var condition = (self.RangeItems() === undefined || self.RangeItems()[index] === undefined);
        var r = condition ?
                '-' :
                moment(self.RangeItems()[index].item, self.SelectedTemporalBasedFormat()).format(self.SelectedTemporalBasedOutputFormat());
        //console.log(index, condition, self.SelectedTemporalBasedFormat(), condition? 'x' : self.RangeItems()[index].item, r);
        return r;
    };

    /**
     * Computed function to convert the {@link SelectedRangeStartIndex} to the corresponding formatted display name using the {@link FormatTemporalItemBasedOnIndex}.
     */
    this.SelectedRangeStart = ko.computed(function () {
        return self.FormatTemporalItemBasedOnIndex(self.SelectedRangeStartIndex());
    });
    
    /**
     * Computed function to convert the {@link SelectedRangeStartIndex} to the corresponding formatted display name using the {@link FormatTemporalItemBasedOnIndex}.
     */
    this.SelectedRangeEnd = ko.computed(function () {
        return self.FormatTemporalItemBasedOnIndex(self.SelectedRangeEndIndex());
    });

    this.PlayMode = ko.observable(0); // 0: Input mode, 1: Preparing mode, 2: Playing mode

    this.FrameDuration = ko.observable("1000"); // time between frame changes
    this.FrameStepDuration = ko.observable(100); // 100 ms
    this.FrameSteps = ko.computed(function () {
        return Number(self.FrameDuration()) / self.FrameStepDuration();
    });

    this.Frames = ko.observableArray();
    this.PrepareMessage = ko.observable("Preparing...");

    this.LoadedFrames = ko.computed(function () {
        return Enumerable.From(self.Frames()).Where(function (s) {
            return s.IsReady();
        }).Count();
    });

    this.AllFramesLoaded = ko.computed(function () {
        return self.LoadedFrames() === self.Frames().length;
    });

    this.Init = function () {
        // get the categories, countries 
        SERVER.GetDataInfo(function (data) {
            self.UnrestCategories(data.UnrestCategories);
            self.DataSources(data.DataSources);
            self.Countries(data.Actors);

            // select all the unrest categories
            self.SelectedUnrestCategories(Enumerable.From(self.UnrestCategories()).ToArray());
            self.SelectedDataSources(Enumerable.From(self.DataSources()).ToArray());
            
            // Select all actors
            self.SelectedCountries(Enumerable.From(self.Countries()).Select(function (s) {
                return s.code;
            }).ToArray());

            // initialize stuff here
            applySubscriptions();
            self.SelectedTemporalGroup('month');

        });
        SERVER.GetlatestUpdateDate(function (data){
            self.lastUpdate(data.fileDate);
            self.importDate(data.importDate);
            
            console.log('Update Information: ', data);
        });
    };

    function applySubscriptions() {
        self.SelectedTemporalGroup.subscribe(function (s) {
            console.log(s);
            SERVER.GetDistinctsForTemporalGroup(self.SelectedTemporalGroup(), function (result) {
                console.log(result);
                self.RangeItems(result);
                self.SelectedRangeStartIndex(0);
                self.SelectedRangeEndIndex(self.RangeItems().length - 1);

            });
        });

        // subscribe to the change in frame
        self.CurrentFrame.subscribe(function (s) {
            // when the frame is changed, set the current frame to degrade and the next frame as fresh
            self.Frames()[self.CurrentFrame()].DisplayFrameData(self.HeatMap, false);
            if (self.CurrentFrame() + 1 < self.Frames().length)
                self.Frames()[self.CurrentFrame() + 1].DisplayFrameData(self.HeatMap, true);

        });
    }

    this.IsPlaying = ko.observable(false);

    this.Play = function () {
        self.IsPlaying(true);
        self.BeginPlay();
    };

    this.Pause = function () {
        if (self.IntervalHandle !== undefined && self.IntervalHandle !== null) {
            clearTimeout(self.IntervalHandle);
        }
        self.IsPlaying(false);
    };

    this.Stop = function () {
        self.Pause();
        self.CurrentFrame(0);
        self.PlayStep(0);
    };

    this.CurrentFrameRaw = ko.observable(0);
    
    this.CurrentFrame = ko.computed(function(){
        return Number(self.CurrentFrameRaw());
    });
    this.PlayStep = ko.observable(0);

    this.LoadPlayer = function () {
        self.PlayMode(2);
        if (self.HeatMap === undefined || self.HeatMap == null) { // initialize the heat map
            self.HeatMap = new google.maps.visualization.HeatmapLayer({
                map: self.Map,
                opacity: 1,
                radius: 15,
                maxIntensity: 100
            });
            console.log("Heatmap loaded");
        }
        self.CurrentFrameRaw(0);
        self.PlayStep(0);
        // load the first frame as staling
//        self.Frames()[self.CurrentFrame()].DisplayFrameData(self.HeatMap, false);
//        self.Frames()[self.CurrentFrame() + 1].DisplayFrameData(self.HeatMap, true);
//        // begin playing
//        self.BeginPlay();
    };

    this.LoadedFramesPercent = ko.computed(function () {
        return (self.LoadedFrames() / self.Frames().length * 100) + "%";
    });

    this.IntervalHandle = null;
    this.BeginPlay = function () {
        // create and start the time out
        if (self.IntervalHandle !== undefined && self.IntervalHandle !== null) {
            clearTimeout(self.IntervalHandle);
        }
        self.NextStepLoader();
    };
    
    this.SetTimeout = function () {
        self.IntervalHandle = setTimeout(self.NextStepLoader, self.FrameStepDuration());
    };

    this.NextStepLoader = function () {
        if (self.PlayStep() === self.FrameSteps()) { // requires next frame
            self.PlayStep(0); // reset the play step
            if (self.CurrentFrame() + 1 === self.Frames().length) {
                // terminate
                return;
            }
            self.CurrentFrameRaw(self.CurrentFrame() + 1); // increment the frame

        } else {
            self.FrameTransitionLoader();
        }
        self.PlayStep(self.PlayStep() + 1); // increment the play step
        self.SetTimeout();
    };

    this.FrameTransitionLoader = function () {
        var allPoints = Enumerable.From([]);
        var useMax = 1;
        // set the currently fresh frame to increase
        if (self.CurrentFrame() + 1 < self.Frames().length) {
            var fFrame = self.Frames()[self.CurrentFrame() + 1];
            fFrame.Data = Enumerable.From(fFrame.Data).Select(function (s) {
                s.weight += s.incdec;
                return s;
            }).ToArray();
            //useMax = useMax > fFrame.MaxOnFrame() ? useMax : fFrame.MaxOnFrame();
            allPoints = Enumerable.From(allPoints).Concat(fFrame.Data);
        }

        // set the currently stale frame to decrease
        var cFrame = self.Frames()[self.CurrentFrame()];
        cFrame.Data = Enumerable.From(cFrame.Data).Select(function (s) {
            if (s.weight <= s.incdec)
                s.weight = 0;
            else
                s.weight -= s.incdec;
            return s;
        });
        //useMax = useMax > cFrame.MaxOnFrame() ? useMax : cFrame.MaxOnFrame();
        allPoints = allPoints.Concat(cFrame.Data).ToArray();
        self.HeatMap.setData(allPoints);
        //self.HeatMap.set('maxIntensity', useMax);
    };

    this.CurrentFrameName = ko.computed(function () {
        if (self.Frames() === null || self.Frames().length === 0)
            return "No frames..";
        return self.Frames()[self.CurrentFrame()].Name();
    });

    this.Prepare = function () {
        self.PlayMode(1);
        // request the values from the server
        self.PrepareMessage("Retreiving frame information..");
        var params = {
            't-group': self.SelectedTemporalGroup(),
            'countries': self.SelectedCountries(),
            'unrests': self.SelectedUnrestCategories(),
            'data-source': self.SelectedDataSources()
        };

        params['t-start'] = moment(self.RangeItems()[self.SelectedRangeStartIndex()].item, self.SelectedTemporalBasedFormat()).format(settings.mysqlFormat);
        params['t-end'] = moment(self.RangeItems()[self.SelectedRangeEndIndex()].item, self.SelectedTemporalBasedFormat()).add(1, temporalGroupEdgeAdjustments[self.SelectedTemporalGroup()].add).subtract(1, 'seconds').format(settings.mysqlFormat);


        SERVER.GetPlayerDataInfo(params, function (d) {
            console.log(d);
            var format = temporalGroupFormat[self.SelectedTemporalGroup()];
            console.log(format);
            // load the frames
            self.LoadPlayer(); // load the player and wait for buffering
            for (var i = 0, max = d.data.length; i < max; i++) {
                var r = d.data[i];
                // create a new frame
                var f = new FrameVM(self);
                f.RequiredDataCount(Number(r.count));
                f.Number(i);
                f.TemporalGroup = self.SelectedTemporalGroup();
                f.Date = r.date;
                f.FrameTransitionLength = self.FrameSteps();
                var m = moment(r.date, settings.mysqlFormat);
                f.StartDate = m.clone().format(settings.emptyMysqlFormat);
                f.EndDate = moment(f.StartDate, settings.emptyMysqlFormat).clone().add(1, temporalGroupEdgeAdjustments[self.SelectedTemporalGroup()].add).subtract(1, 'seconds').format(settings.mysqlFormat);
                // set the name based on the date and selected grouping
                f.Name(m.clone().format(format));
                if (i === 0)
                    console.log(f);
                self.Frames.push(f);
                f.LoadFrameData(function () {
                    // check if all frames are loaded
                    if (self.AllFramesLoaded()) {
//                        self.LoadPlayer();
                    }
                });
            }


        });
    };
}

/**
 * 
 * @param {PlayerVM} _parent The PlayerVM parent for this frame. Used for back referencing.
 * @returns {FrameVM}
 */
function FrameVM(_parent) {
    var self = this;
    var parent = _parent;

    this.FrameTransitionLength = 5;

    this.Data = new Array();

    this.RequiredDataCount = ko.observable(0);
    this.LoadedDataCount = ko.observable(0);

    this.Number = ko.observable(-1);
    this.Name = ko.observable("");
    this.Date = null;
    this.StartDate = null;
    this.EndDate = null;
    this.TemporalGroup = "";

    this.IsReady = ko.computed(function () {
        return self.Number() !== -1 && self.RequiredDataCount() === self.LoadedDataCount();
    });

    this.MaxOnFrame = ko.observable(1);

    this.LoadFrameData = function (callback) {
        // create the params object
        var params = {
            't-group': self.TemporalGroup,
            't-select': 'range',
            't-filter-start': self.StartDate,
            't-filter-end': self.EndDate,
            'unrests': parent.SelectedUnrestCategories(),
            'data-source': parent.SelectedDataSources(),
            'actors': parent.SelectedCountries(),
            'ec-norm': 'N'
        };
        var splitLogic = SERVER.GetSplitLogic(self.RequiredDataCount());
        var allPoints = [];
        SERVER.LoadData(params, splitLogic,
                function (data, split) {
                    allPoints = Enumerable.From(data.result).Select(function (s) {
                        var w = Number(s.data);
                        if (w > self.MaxOnFrame())
                            self.MaxOnFrame(w);
                        return {
                            location: new google.maps.LatLng(s.lat, s.lng),
                            fresh: true,
                            target: w,
                            incdec: w / self.FrameTransitionLength,
                            weight: 0
                        };
                    }).Concat(allPoints).ToArray();
                    self.LoadedDataCount(self.LoadedDataCount() + data.result.length);
                }, function () {
            self.Data = allPoints;
            if (callback)
                callback();
        });
    };

    this.DisplayFrameData = function (heatmap, isFresh) {
        console.log("Frame loading: ", self.Number());
        // directly put the data into the heatmap and set all to not fresh
        self.Data = Enumerable.From(self.Data).Select(function (s) {
            s.weight = isFresh ? 0 : s.target;
            return s;
        }).ToArray();
        heatmap.setData(self.Data);
        console.log("Frame loaded: ", self.Number());
    };


}