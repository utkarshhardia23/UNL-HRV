/* 
 * Author: Hariharan Arunachalam
 * Date: Jul 22, 2016 (1:12:46 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

/* global Enumerable */

/**
 * The Server class for all communications with the back end server.
 * @class
 * @returns {Server}
 * @author Hariharan Arunachalam
 */
function Server() {
    var self = this;

    // These are the functions that perform calls to the server.
    // THERE SHOULD NOT BE ANY PROCESSING IN THESE FUNCTIONS!
    this.GetDataInfo = function (callback) {
        self.DoAsyncGet({c: 'VisualizerDataCenter', m: 'GetDataInfo'}, {}, callback); 
        //create a javascript function GetDataInfo that is calling the php-function GetDataInfo from page VisualizerDataCenter
    };
    
    this.GetlatestUpdateDate = function (callback) {
        self.DoAsyncGet({c: 'VisualizerDataCenter', m: 'GetlatestUpdateDate'}, {}, callback);
    };

    this.GetDistinctsForTemporalGroup = function (tGroupType, callback) {
        self.DoAsyncGet({c: 'VisualizerDataCenter', m: 'GetTemporalGroupDistincts'},
        {'t-group': tGroupType},
        callback);
    };

    this.GetFilterCount = function (filterParams, callback) {
        self.DoAsyncGet({c: 'VisualizerDataCenter', m: 'GetFilterCount'}, filterParams, callback);
    };

    this.GetPlayerDataInfo = function (params, callback) {
        self.DoAsyncGet({c: 'PlayerDataCenter', m: 'GetPlayerData'}, params, callback);
    };

    // performs as many calls as defined by the splitParts and calls callback for each of them
    this.LoadData = function (filterParams, splitParts, _callback, _finalCalbback) {
        var callback = _callback;
        var finalCallback = _finalCalbback;
        // for each of the split parts
        var callbacksCounter = 0;
        for (var i = 0, max = splitParts.length; i < max; i++) {
            var thisFilterParam = jQuery.extend({}, filterParams);
            var splitPart = splitParts[i];
            thisFilterParam['lim-start'] = splitPart.start;
            thisFilterParam['lim-take'] = splitPart.take;
            self.DoAsyncGet({c: 'VisualizerDataCenter', m: 'GetFilterData'}, thisFilterParam, function (data) {
                // console.log(data, thisFilterParam);
                // count for calling final callback
                callbacksCounter++;
                if (callback)
                    //console.log("Callback", callbacksCounter);
                    callback(data, thisFilterParam);
                if (callbacksCounter === splitParts.length && finalCallback) {
                    finalCallback();
                }
            });
        }
    };



    // Rerouter functions
    this.DoAsyncGet = function (addressObj, data, callback) {
        //console.log('GET: ', addressObj, data);
        $.get('https://cse.unl.edu/~surge/index.php/' + addressObj.c + "/" + addressObj.m, data,
                function (raw_result) {
                    //console.log('DONE GET: ', addressObj, data);
                    if (callback)
                        callback(JSON.parse(raw_result));
                });
    };

    var MAX_IN_PART = 1250;
    this.GetSplitLogic = function (filterCount) {
        // gets the split logic based on filter count
        // condition: at least 1 part of 100 rows        
        if (filterCount <= MAX_IN_PART) { // only one part necessary
            return [{start: 0, take: filterCount}];
        }

        var partsNeeded = parseInt(filterCount / MAX_IN_PART);
        var fitted = (MAX_IN_PART * partsNeeded);
        var overflow = filterCount - fitted;
        console.log(filterCount, partsNeeded, overflow);
        return Enumerable.Range(0, partsNeeded).Select(function (s) {
            return {
                start: s * MAX_IN_PART,
                take: MAX_IN_PART
            };
        }).Concat([{
                start: fitted,
                take: overflow
            }]).ToArray();
    };

    var MAX_IN_PART = 1250;
    this.GetSplitLogic = function (filterCount) {
        // gets the split logic based on filter count
        // condition: at least 1 part of 100 rows        
        if (filterCount <= MAX_IN_PART) { // only one part necessary
            return [{start: 0, take: filterCount}];
        }

        var partsNeeded = parseInt(filterCount / MAX_IN_PART);
        var fitted = (MAX_IN_PART * partsNeeded);
        var overflow = filterCount - fitted;
        //console.log(filterCount, partsNeeded, overflow);
        return Enumerable.Range(0, partsNeeded).Select(function (s) {
            return {
                start: s * MAX_IN_PART,
                take: MAX_IN_PART
            };
        }).Concat([{
                start: fitted,
                take: overflow
            }]).ToArray();
    };
}

var SERVER = new Server();