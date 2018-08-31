<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 22, 2016 (1:11:20 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

class VisualizerDataCenter extends CI_Controller {
    
    // Provides the information about the data available & configurations of the server
    function GetDataInfo() {
        $dataInfo = array();
        // Get the start and end date of the data
        $dataInfo['StartDate'] = $this->db->query('SELECT MIN(event_date) as data FROM ' . config_item('data-table'))->row()->data;
        $dataInfo['EndDate'] = $this->db->query('SELECT MAX(event_date) as data FROM ' . config_item('data-table'))->row()->data;
        $dataInfo['DataCount'] = $this->db->query('SELECT COUNT(*) as data FROM '. config_item('data-table'))->row()->data;
        $dataInfo['TotalEvents'] = $this->db->query('SELECT SUM(event_count) as data FROM '. config_item('data-table'))->row()->data;
             
//        $dataInfo['DataSources'] = $this->db->query('SELECT DISTINCT(data_source) as data FROM '. config_item('data-table'))->result();
        $dataSourceCategories = array();
        $dataSourceCategoriesResult = $this->db->query('SELECT DISTINCT(data_source) as data FROM '. config_item('data-table'))->result();
        foreach ($dataSourceCategoriesResult as $dataSourceCategory) {
            array_push($dataSourceCategories, $dataSourceCategory->data);
        }
        $dataInfo['DataSources'] = $dataSourceCategories;   
        
        // Get the unrest categories and push it into an array that can be returned        
        $unrestCategories = array();
        $unrestCategoriesResult = $this->db->query('SELECT DISTINCT(event_category) as data FROM '. config_item('data-table'))->result();
        foreach ($unrestCategoriesResult as $unrestCategory) {
            array_push($unrestCategories, $unrestCategory->data);
        }
        $dataInfo['UnrestCategories'] = $unrestCategories;

        // The actors are fixed...
        $actors = array(
            array('code' => 'IN', 'name' => 'India'),
            array('code' => 'BG', 'name' => 'Bangladesh'),
            array('code' => 'PK', 'name' => 'Pakistan'),
        );
        $dataInfo['Actors'] = $actors;

        // Event count normalization
        $dataInfo['ECNormalizations'] = array(
            array(
                'name' => 'None',
                'code' => 'N'
            ),
            array(
                'name' => 'Population density',
                'code' => 'PD'
            ),
            array(
                'name' => 'Logarithmic population density',
                'code' => 'PDL'
            ),
        );

        echo json_encode($dataInfo);
    }

    // Provides the list of the temporal group type
    function GetTemporalGroupDistincts() {
        $groupType = $this->input->get('t-group');
        $groupFormat = '%d-%m-%Y'; // default is day
        if ($groupType == 'month') {
            $groupFormat = '%M, %Y';
        } else if ($groupType == 'year') {
            $groupFormat = '%Y';
        }
        $groupQueryResult = $this->db->query('SELECT DISTINCT(DATE_FORMAT(event_date, "' . $groupFormat . '")) as item FROM '. config_item('data-table'). ' ORDER BY year, month, day')->result();
        echo json_encode($groupQueryResult);
    }

    function GetFilterData() {
        $filters = $this->input->get();
        $query = getDataQuery($filters);
        $query_result = $this->db->query($query)->result();
        $result = array(
            'status' => 'ok',
            'input' => $filters,
            'q' => $query,
            'result' => $query_result
        );

        echo json_encode($result);
    }

    function GetFilterCount() {
        $filters = $this->input->get();
        $query = getCountQuery($filters);
        $queryResult = $this->db->query($query)->row();
        $result = array(
            'status' => 'ok',
            'input' => $filters,
            'q' => $query,
            'data' => $queryResult
        );
        echo json_encode($result);
    }
    
    function GetlatestUpdateDate(){
        $latestUpdate = array();
        $latestUpdate['importDate'] = $this->db->query('SELECT max(DATE_FORMAT(import_date, \'%Y-%m-%d\'))  as data FROM ' . config_item('importlog-table'))->row()->data;
        $latestUpdate['fileDate'] = $this->db->query('SELECT max(DATE_FORMAT(STR_TO_DATE(file_date, \'%Y%m%d\'), \'%Y-%m-%d\')) as data FROM ' . config_item('importlog-table'))->row()->data;
        echo json_encode($latestUpdate);
    }
}
