<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 20, 2016 (10:53:53 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

class Home extends CI_Controller {

    public function index() {
        $data = array(
            'title' => 'Visualizer',
            'stylesheets' => array(
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.css' // normalize for all browsers
                ),
                array(
                    'source' => 'https://fonts.googleapis.com/icon?family=Material+Icons' // the MaterializeCSS icons
                ),
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css' // the MaterializeCSS base CSS
                ),
                array(
                    'source' => '//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css' // the base jQuery CSS
                ),
                array(
                    'local' => TRUE,
                    'source' => 'visualizer-base.css'
                ),
                array(
                    'local' => TRUE,
                    'source' => 'introjs.min.css'
                ),
            ),
            'scripts' => array(
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js' // for managing time related stuff Einsten.
                ),
                array(
                    'source' => '//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js' // for numbers related stuff Aryabatta.
                ),
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/linq.js/2.2.0.2/linq.min.js' // for collections related stuff...er..i don't know any name for this.
                ),
                array(
                    'source' => 'https://code.jquery.com/jquery-2.2.4.min.js' // for jQuery.
                ),
                array(
                    'source' => 'https://code.jquery.com/ui/1.11.1/jquery-ui.js' // for jQuery UI
                ),
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js' // for MaterializeCSS magic.
                ),
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js' // KnockoutJS. For MVVM. This is what everything works on. Learn it or suffer.                    
                ),
                array(
                    'source' => 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.2.0/intro.min.js'
                ),
                array(
                    'local' => TRUE,
                    'source' => 'resources.js'
                ),
                array(
                    'local' => TRUE,
                    'source' => 'visualizer-aux.js'
                ),
                array(
                    'local' => TRUE,
                    'source' => 'server-com.js' // for communicating with the server. In case anything changes, only this would need changes!
                ),                
                array(
                    'local' => TRUE,
                    'source' => 'visualizer-vms.js'
                ),
                array(
                    'local' => TRUE,
                    'source' => 'visualizer-intro.js'
                )
            ),
            'menus' => array(
                array(
                    'bind-click' => 'ToggleAboutDashboard',
                    'color' => 'purple',
                    'bind-color' => 'IsAboutDashboardVisible',
                    'tooltip' => 'Click to toggle information about Surge',
                    'icon' => 'help',
                    'id' => 'mnu-about'
                ),
                array(
                    'bind-click' => 'OpenPlayer',
                    'color' => 'orange',
                    'bind-color' => 'function() {return true;}',
                    'tooltip' => 'Open the Player',
                    'icon' => 'play_arrow',
                    'id' => 'mnu-player'                    
                ),
                array(
                    'bind-click' => 'ToggleFilterDashboard',
                    'color' => 'blue',
                    'bind-color' => 'IsFilterDashboardVisible',
                    'tooltip' => 'Toggle the filter dashboard',
                    'icon' => 'dashboard',
                    'id' => 'mnu-filters'
                ), 
                array(
                    'bind-click' => 'ToggleLayersToolbar',
                    'color' => 'green',
                    'bind-color' => 'IsLayersToolbarVisible',
                    'tooltip' => 'Toggle the layers toolbar',
                    'icon' => 'clear_all',
                    'id' => 'mnu-layers'
                ),
                array(
                    'bind-click' => 'ToggleInfoToolbar',
                    'color' => 'yellow',
                    'bind-color' => 'IsInfoToolbarVisible',
                    'tooltip' => 'Toggle the overview toolbar',
                    'icon' => 'info_outline',
                    'id' => 'mnu-overview'
                ),
                array(
                    'bind-click' => 'ToggleCensusToolbar',
                    'color' => 'orange',
                    'bind-color' => 'IsCensusToolbarVisible',
                    'tooltip' => 'Toggle the census-variable toolbar',
                    'icon' => 'info_outline',
                    'id' => 'census-grads'  
                ),
                array(
                    'bind-click' => 'ToggleInfrastructureToolbar',
                    'color' => 'purple',
                    'bind-color' => 'IsInfrastructureToolbarVisible',
                    'tooltip' => 'Toggle the Infrastructure toolbar',
                    'icon' => 'info_outline',
                    'id' => 'infrastructures'  
                )
            )
        );
        // notice how long the $data stuff became? Since currently there's only one page, it doesn't matter much. 
        // But if you have multiple pages, this is going to be a pain - read note C1 in partials/default.php for working around this.
        $this->template->load('default', 'visualizer', $data);
    }

}
