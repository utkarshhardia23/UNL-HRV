<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 24, 2016 (3:54:27 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

function transformFilters($filters) {
    $conditions = array();
    // transform the range or single end
    if ($filters['t-select'] == 'range') {
        $conditions['event_date'] = array(
            'gte' => "'" . $filters['t-filter-start'] . "'",
            'lte' => "'" . $filters['t-filter-end'] . "'"
        );
    } else if ($filters['t-select'] == 'single') {
        $conditions['event_date'] = array(
            'gte' => "'" . $filters['t-single-point-start'] . "'",
            'lte' => "'" . $filters['t-single-point-end'] . "'"
        );
    }
    // transform the unrest categories
    $conditions['event_category'] = array(
        'in' => $filters['unrests']
    );
    
    $conditions['data_source'] = array(
        'in' => $filters['data-source']
    );

    // transform the actors
    $conditions['country_code'] = array(
        'in' => $filters['actors']
    );
    
    // transform the area 
    if (!empty($filters['area'])) {
        $area = $filters['area'];
        $conditions['latitude'] = array(
            'gte' => "'" . $area['south'] . "'",
            'lte' => "'" . $area['north'] . "'",
        );
        $conditions['longitude'] = array(
            'gte' => "'" . $area['west'] . "'",
            'lte' => "'" . $area['east'] . "'",
        );
    }


    return $conditions;
}

function getCountQuery($filters) {
    $filterConditions = constructConditions(transformFilters($filters));
    return 'SELECT COUNT(*) as filterCount FROM ' . config_item('data-table') . ' WHERE ' . implode(' AND ', $filterConditions);
}

function getDataQuery($filters) {
    $filterConditions = constructConditions(transformFilters($filters));
    // set the select part
    $selectQuery = 'latitude as lat, longitude as lng';
    // transform the ECNormalization
    if ($filters['ec-norm'] == 'N') {
        $selectQuery = $selectQuery . ', event_count as data';
    } else if ($filters['ec-norm'] == 'PD') {
        $selectQuery = $selectQuery . ', event_count/population_density as data';
    } else if ($filters['ec-norm'] == 'PDL') {
        $selectQuery = $selectQuery . ', event_count/LOG(population_density) as data';
    }

    // add the color group if needed
    if (!empty($filters['color'])) {        
        if ($filters['color'] == 'unrest') {
            $selectQuery = $selectQuery . ', event_category as color';            
        } else if ($filters['color'] == 'actor') {
            $selectQuery = $selectQuery . ', country_code as color';
        } 
    }
    return 'SELECT ' . $selectQuery . ' FROM ' . config_item('data-table') . ' WHERE '
            . implode(' AND ', $filterConditions)
            . ' LIMIT ' . $filters['lim-start'] . ',' . $filters['lim-take'];
}

function constructConditions($conditions) {
    $conditionQueries = array();
    foreach ($conditions as $column_name => $subConditions) {
        // go through each sub condition on this column name
        foreach ($subConditions as $evaluator => $value) {
            $operator = '';
            $valueTransform = $value;
            switch ($evaluator) {
                case 'gte':
                    $operator = '>=';
                    break;
                case 'lte':
                    $operator = '<=';
                    break;
                case 'in':
                    $operator = 'IN';
                    $valueTransform = "('" . implode("','", $value) . "')";
                    break;

                default:
                    break;
            }
            // add to array
            $conditionQuery = $column_name . " " . $operator . " " . $valueTransform;
            array_push($conditionQueries, $conditionQuery);
        }
    }


    return $conditionQueries;
}
