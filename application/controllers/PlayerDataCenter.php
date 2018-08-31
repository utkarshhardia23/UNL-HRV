<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* 
 * Author: Hariharan Arunachalam
 * Date: Aug 8, 2016 (5:09:30 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */


class PlayerDataCenter extends CI_Controller {
    
    function GetPlayerData() {
        $groupType = $this->input->get('t-group');
        
        $selectedCountries = $this->input->get('countries');
        $selectedUnrests = $this->input->get('unrests');
        $selectedDataSources = $this->input->get('data-source');   
        
        $tstart = $this->input->get('t-start');
        $tend = $this->input->get('t-end');
        
        $countriesQuery = implode("','", $selectedCountries);
        $unrestQuery = implode("','", $selectedUnrests);
        $dataSourceQuery = implode("','", $selectedDataSources);
        
        $groupBy = $groupType == 'day' ? "event_date" : ( $groupType == "month" ? "MONTH(event_date), YEAR(event_date)" : "YEAR(event_date)");
        $query = "SELECT event_date as date, COUNT(*) as count FROM " . config_item('data-table') .
                " WHERE event_date >= '" . $tstart . "' AND event_date <= '" . $tend . "' AND " 
                . " country_code IN ('" . $countriesQuery . "') AND data_source IN ('" . $dataSourceQuery . "') AND "
                . "event_category IN ('" . $unrestQuery . "') ".
                " GROUP BY " .  $groupBy . " ORDER BY event_date";
        
        $latestUpdate = array();
        $latestUpdate['importDate'] = $this->db->query('SELECT max(DATE_FORMAT(import_date, \'%Y-%m-%d\'))  as data FROM ' . config_item('importlog-table'))->row()->data;
        $latestUpdate['fileDate'] = $this->db->query('SELECT max(DATE_FORMAT(STR_TO_DATE(file_date, \'%Y%m%d\'), \'%Y-%m-%d\')) as data FROM ' . config_item('importlog-table'))->row()->data;
              
        $data = array(
            'q' => $query,
            'data' => $this->db->query($query)->result(),
            'latest' => $latestUpdate
        );
        
        echo json_encode($data);
        
    }
}