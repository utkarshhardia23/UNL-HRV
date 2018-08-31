<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 22, 2016 (12:57:27 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>

<div class="wrapper black-text">
    <div class="col s12">
        <div class="card white lighten-1 col s12" data-bind="with: DataInfoVM">
            <div class="card-content">
                <div class="card-title">Data Information</div>
                <div class="row">
                    <div class="running-text">
                        <span>Server contains data from </span><span class="bold blue-text" data-bind="text: StartDateDisplay"></span>
                        <span> to </span><span class="bold blue-text" data-bind="text: EndDateDisplay"></span><span>; duration of </span>
                        <span class="bold blue-text" data-bind="text: DurationSummary"></span>
                        <span> containing </span>
                        <span class="blue-text bold" data-bind="text: DataCountDisplay"></span>
                        <span> locations, with a total of </span>
                        <span class="bold blue-text" data-bind="text: TotalEventsDisplay"></span>
                        <span> events.</span>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="col s12">
        <div class="card white lighten-1 col s12">
            <div class="card-content">
                <div class="card-title">Filters & Options</div>
                <!--Temporal Grouping Type-->                
                <div class="row">
                    <div class="col s2">
                        Temporal group type
                    </div>
                    <div class="col s2">
                        <input class="with-gap" type="radio" id="tt-daily" name="temporal-type" value="day" data-bind="checked: SelectedTemporalGroupType, disable: UpdateState" />
                        <label for="tt-daily">Day</label>
                    </div>
                    <div class="col s2">
                        <input class="with-gap" type="radio" id="tt-monthly" name="temporal-type" value="month" data-bind="checked: SelectedTemporalGroupType, disable: UpdateState" />
                        <label for="tt-monthly">Month</label>
                    </div>
                    <div class="col s2">
                        <input class="with-gap" type="radio" id="tt-yearly" name="temporal-type" value="year" data-bind="checked: SelectedTemporalGroupType, disable: UpdateState" />
                        <label for="tt-yearly">Year</label>
                    </div>
                </div>
                <!--Temporal Selection Type-->
                <div class="row">
                    <div class="col s2">
                        Temporal selection type
                    </div>
                    <div class="col s2">
                        <input class="with-gap" type="radio" id="ts-range" name="temporal-selection" value="range" data-bind="checked: SelectedTemporalSelectionType, disable: UpdateState"/>
                        <label for="ts-range">Range</label>
                    </div>
                    <div class="col s2">
                        <input class="with-gap" type="radio" id="ts-single" name="temporal-selection" value="single" data-bind="checked: SelectedTemporalSelectionType, disable: UpdateState"/>
                        <label for="ts-single">Single</label>
                    </div>                    
                </div>

                <!--Range selection-->
                <div class="row" data-bind="visible:  SelectedTemporalSelectionType() === 'range'">
                    <div class="col s6">
                        <?php // the max attribute is limited to 2 from the end index so that you can select the last value where no range would be available ?>
                        <input type="range" id="date-range-start" min="0" data-bind="disable: UpdateState, attr: {max: TemporalItems().length- 2}, value: SelectedTemporalStartIndex" />
                        <label for="date-range-start">
                            <span>Starting from</span>
                            <span class="bold indigo-text" data-bind="text: SelectedRangeStart">somewhere</span>
                            <span> [Available from </span>
                            <span data-bind="text: FormatTemporalItemBasedOnIndex(0)"></span>
                            <span> to </span>
                            <span data-bind="text: FormatTemporalItemBasedOnIndex(TemporalItems().length - 1)"></span>
                            <span>]</span>
                        </label>
                    </div>
                    <div class="col s6">
                        <input type="range" id="date-range-end" data-bind="disable: UpdateState, attr: {min: SelectedTemporalStartNumber()+1, max: TemporalItems().length-1}, value: SelectedTemporalEndIndex" />
                        <label for="date-range-end">
                            <span>to</span>
                            <span class="bold orange-text" data-bind="text: SelectedRangeEnd">somewhere</span>
                            <span> [Available from </span>
                            <span data-bind="text: FormatTemporalItemBasedOnIndex(SelectedTemporalStartNumber()+1)"></span>
                            <span> to </span>
                            <span data-bind="text: FormatTemporalItemBasedOnIndex(TemporalItems().length - 1)"></span>
                            <span>]</span>
                        </label>
                    </div>                    
                </div>

                <!--Single point selection-->
                <div class="row" data-bind="visible:  SelectedTemporalSelectionType() === 'single'">
                    <div class="col s12">
                        <input type="range" id="date-point" min="0" data-bind="disable: UpdateState, attr: {max: TemporalItems().length-1}, value: SelectedSinglePointIndex" />
                        <label for="date-point">
                            <span>Selected</span>
                            <span class="bold green-text" data-bind="text: SelectedSinglePoint">somewhere</span>
                        </label>
                    </div>
                </div>

                <!--Unrest Categories-->
                <div class="row">
                    <div class="col s2">
                        Unrest categories 
                        <span class="float-right" data-bind="with: UnrestAutoToggler">(
                            <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectAll">all</a>
                            <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectNone">none</a>)
                        </span>
                    </div>
                    <div class="col s10">
                        <!-- ko foreach: DataInfoVM().UnrestCategories -->
                        <div class="inline-item">
                            <input name="cb_grp_unrest_cats" type="checkbox" data-bind="attr: {id: 'cb_unrest_' + $data }, value: $data, disable: $parent.UpdateState, checked: $parent.SelectedUnrestCategories"  />
                            <label data-bind="text: $data, attr: {for: 'cb_unrest_' + $data }"></label>
                        </div>
                        <!-- /ko -->
                    </div>
                </div>

                <!-- Actors -->
                <div class="row">
                    <div class="col s2">
                        Countries 
                        <span class="float-right" data-bind="with: ActorsAutoToggler">(
                            <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectAll">all</a>
                            <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectNone">none</a>)
                        </span>
                    </div>
                    <div class="col s10">
                        <!-- ko foreach: DataInfoVM().Actors -->
                        <div class="inline-item">
                            <input name="cb_grp_actors" type="checkbox" data-bind="attr: {id: 'cb_actor_' + $data.code }, value: $data.code, disable: $parent.UpdateState, checked: $parent.SelectedActors"  />
                            <label data-bind="text: $data.name, attr: {for: 'cb_actor_' + $data.code }"></label>
                        </div>
                        <!-- /ko -->
                    </div>
                </div>

                <!--Event Count Normalizations-->
                <div class="row">
                    <div class="col s2">
                        Event count normalization                        
                    </div>
                    <div class="col s10">
                        <!-- ko foreach: DataInfoVM().ECNormalizations -->
                        <div class="inline-item">
                            <input class="with-gap" name="cb_ec_norm" type="radio" data-bind="attr: {id: 'rb_ec_norm_' + $data.code }, value: $data.code, disable: $parent.UpdateState, checked: $parent.SelectedECNormalization"  />
                            <label data-bind="text: $data.name, attr: {for: 'rb_ec_norm_' + $data.code }"></label>
                        </div>
                        <!-- /ko -->
                    </div>
                </div>
                
                <div class="row">
                    <div class="col s2">
                        Data Sources
                        <span class="float-right" data-bind="with: DataSourceAutoToggler">(
                            <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectAll">all</a>
                            <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectNone">none</a>)
                        </span>
                    </div>
                    <div class="col s10">
                    <!--ko foreach: DataInfoVM().DataSources -->
                        <div class="inline-item">
                            <input class="with-gap" name="cb_data_source" type="checkbox" data-bind="attr: {id: 'cb_data_source_' + $data }, value: $data, disable: $parent.UpdateState, checked: $parent.SelectedDataSources"  />
                            <label data-bind="text: $data, attr: {for: 'cb_data_source_' + $data }"></label>
                        </div>
                        <!-- /ko  -->                      
                    </div>                    
                </div>

                <!--Coloring options - creates separate layers -->
                <div class="row">
                    <div class="col s2">
                        Layer by
                    </div>

                    <div class="col s10">
                        <div class="inline-item">
                            <input class="with-gap" type="radio" id="cb-color-toggle-none" name="rb-layer-color" value='none'  data-bind="disable: UpdateState, checked: SelectedColorBy" />
                            <label for="cb-color-toggle-none">None</label>
                        </div>

                        <div class="inline-item">
                            <input class="with-gap" type="radio" id="cb-color-toggle-unrest" name="rb-layer-color" value='unrest' data-bind="disable: UpdateState, checked: SelectedColorBy" />
                            <label for="cb-color-toggle-unrest">Unrest category</label>
                        </div>
                        
                        <div class="inline-item">
                            <input class="with-gap" type="radio" id="cb-color-toggle-actor" name="rb-layer-color" value='actor' data-bind="disable: UpdateState, checked: SelectedColorBy" />
                            <label for="cb-color-toggle-actor">Country</label>
                        </div>

                    </div>
                </div>
            </div>
            <div class="card-action">
                <?php include 'filter-info-display.php'; ?>

            </div>
            <div class="card-action">
                <button class='waves-effect waves-light btn' data-bind="visible: !LoadState(), click: LoadData">Load</button>                
                <div class='row' data-bind="visible: LoadState">
                    <div class='col s12'>
                        <div class="progress">
                            <div class="determinate" data-bind="style: {width: CurrentlyLoadedDisplay}" ></div>
                        </div>
                    </div>
                    <div class="col s12">
                        <span>Loading data from server...completed</span>
                        <span data-bind="text: numeral(CurrentlyLoadedPercent()).format('0.00%')"></span>
                        <span>(</span><span data-bind="text: CurrentlyLoadedCount"></span>
                        <span>of</span>
                        <span data-bind="text: FilteredCount"></span><span>)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>