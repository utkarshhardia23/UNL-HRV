<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 26, 2016 (10:15:50 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>
<div class='card'>
    <div class='title'>Overview Tools</div>
    <hr/>
    <div class="row">
        <div class="col s12">
            <?php include 'filter-info-display.php'; ?>
        </div>
    </div>
    <hr/>
    <!--Unrest Categories-->
    <div class="row">
        <div class="col s3">
            Unrest categories 
<!--            <span class="float-right" data-bind="with: UnrestAutoToggler">(
                <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectAll">all</a>
                <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectNone">none</a>)
            </span>-->
        </div>
        <div class="col s9">
            <!-- ko foreach: DataInfoVM().UnrestCategories -->
            <div class="inline-item">
                <input name="cb_grp_unrest_cats" type="checkbox" data-bind="attr: {id: 'cb_unrest_' + $data }, value: $data, disable: $parent.UpdateState, checked: $parent.SelectedUnrestCategories"  />
                <label data-bind="text: $data, attr: {for: 'cb_unrest_' + $data }"></label>
            </div>
            <!-- /ko -->
        </div>
    </div>

    <!--Data Sources Copied from Categories-->
    <div class="row">
        <div class="col s3">
            Data Sources 
<!--            <span class="float-right" data-bind="with: DataSourceAutoToggler">(
                <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectAll">all</a>
                <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectNone">none</a>)
            </span>-->
        </div>
        <div class="col s9">
            <!-- ko foreach: DataInfoVM().DataSources -->
            <div class="inline-item">
                <input name="cb_data_source" type="checkbox" data-bind="attr: {id: 'cb_data_source_' + $data }, value: $data, disable: $parent.UpdateState, checked: $parent.SelectedDataSources"  />
                <label data-bind="text: $data, attr: {for: 'cb_data_source_' + $data }"></label>
            </div>
            <!-- /ko -->
        </div>
    </div>
    
    <!-- Actors -->
    <div class="row">
        <div class="col s3">
            Countries 
<!--            <span class="float-right" data-bind="with: ActorsAutoToggler">(
                <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectAll">all</a>
                <a class="waves-effect waves-light btn small" data-bind="css: {'disabled' : $parent.UpdateState()}, click: SelectNone">none</a>)
            </span>-->
        </div>
        <div class="col s9">
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
        <div class="col s3">
            Event count normalization                        
        </div>
        <div class="col s9">
            <!-- ko foreach: DataInfoVM().ECNormalizations -->
            <div class="inline-item">
                <input class="with-gap" name="info-cb_ec_norm" type="radio" data-bind="attr: {id: 'info-rb_ec_norm_' + $data.code }, value: $data.code, disable: $parent.UpdateState, checked: $parent.SelectedECNormalization"  />
                <label data-bind="text: $data.name, attr: {for: 'info-rb_ec_norm_' + $data.code }"></label>
            </div>
            <!-- /ko -->
        </div>
    </div>

    <!--Coloring options - creates separate layers -->
    <div class="row">
        <div class="col s3">
            Layer by
        </div>

        <div class="col s9">
            <div class="inline-item">
                <input class="with-gap" type="radio" id="info-cb-color-toggle-none" name="info-rb-layer-color" value='none'  data-bind="disable: UpdateState, checked: SelectedColorBy" />
                <label for="info-cb-color-toggle-none">None</label>
            </div>

            <div class="inline-item">
                <input class="with-gap" type="radio" id="info-cb-color-toggle-unrest" name="info-rb-layer-color" value='unrest' data-bind="disable: UpdateState, checked: SelectedColorBy" />
                <label for="info-cb-color-toggle-unrest">Unrest category</label>
            </div>

            <div class="inline-item">
<!--                <input class="with-gap" type="radio" id="info-cb-color-toggle-crime" name="info-rb-layer-color" value='crime' data-bind="disable: UpdateState, checked: SelectedColorBy" />
                <label for="info-cb-color-toggle-crime">Crime Rate</label>
            </div>
            
            <div class="inline-item">-->
                <input class="with-gap" type="radio" id="info-cb-color-toggle-actor" name="info-rb-layer-color" value='actor' data-bind="disable: UpdateState, checked: SelectedColorBy" />
                <label for="info-cb-color-toggle-actor">Country</label>
            </div>

        </div>
    </div>

    <div class="row">
        <div class="col s3">
            Use area filter
        </div>
        <div class="col s9">
            <div>
                <input id="cb_area_filter_toggle" class="with-gap" name="cb_toggle_area_filter" type="checkbox"  data-bind="checked: IsShowingAreaFilter" />
                <label for="cb_area_filter_toggle">Show & use Area Filter</label>
            </div>
        </div>
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


