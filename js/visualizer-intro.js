/* 
 * Author: Hariharan Arunachalam
 * Date: Aug 20, 2016 (8:21:36 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

/**
 * Global function to start the introduction tour. Also contains all the messages in the intro tour.
 * @returns {null}
 */
function startIntroTour() {
    var intro = introJs();
    intro.setOptions({
        tooltipPosition: 'auto',
        positionPrecedence: ['left', 'right', 'bottom', 'top'],
        steps: [
            {
                intro: 'Welcome to the Surge Visualizer!'
            },
            {
                element: $('.gmnoprint:last')[0],
                intro: "Use the map styles to use different types of maps for overlaying the data"
            },
            {
                element: $('#mnu-overview')[0],
                intro: "This is the overview tools toggle button. Click this to show the overview tools. Click next to see this"
            },
            {
                element: $('#info-bar')[0],
                intro: "This is the overview tools. Here the unrest categories, the coutries, event count normalization and the layer options can be set. This is also where the area filter option is available."
            },
            {
                element: $('#mnu-layers')[0],
                intro: "This is the layers toggle button. Click next to see this"
            },
            {
                element: $('#layers')[0],
                intro: "This is the layers toolbar. The layers available on the data loaded are shown here, based on the Layer by option selected"
            },
            {
                element: $('#mnu-filters')[0],
                intro: "This will toggle the filters dashboard where the dates and the unrest categories, countries, event count normalization and layer by options can be set."
            },
            {
                element: $('#mnu-player')[0],
                intro: "This will open the data player in a new tab. The player displays an animated view of the data chronologically"
            },
            {
                element: $('#mnu-about')   [0],
                intro: "This will open the About page for the Surge project where information about the project is available."
            },             
            {
                element: $('#census-grads')[0],
                intro: "The socio-economic data can be selected through this dashboard, it will show choropleth layers on the map."
            },
            {
                element: $('#infrastructures')[0],
                intro: "The infrastructure data can be selected through this dashboard. Users will need to zoom in to view this data on the map."
            },
            {
                intro: "That's all! Feel free to play around with the filters and controls!"
            }
        ]
    });
    
    intro.start();
}

