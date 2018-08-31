/* 
 * Author: Hariharan Arunachalam
 * Date: Jul 22, 2016 (12:07:22 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

/**
 * The map styles resource to be used for the Google Maps map styling option.
 * @type Array
 */
var mapStyles = [
    {
        name: 'Grayscale (Clean)',
        style: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#788085"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels",
      "stylers": [
        {
          "lightness": 5
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#9f9f9f"
        }
      ]
    }]
}, {
    name: 'Subtle Grayscale',
    style: [{
        "featureType": "landscape",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 65
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 51
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "saturation": -100
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.arterial",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 30
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "road.local",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 40
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "transit",
        "stylers": [{
            "saturation": -100
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "administrative.province",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
            "visibility": "on"
        }, {
            "lightness": -25
        }, {
            "saturation": -100
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "hue": "#ffff00"
        }, {
            "lightness": -25
        }, {
            "saturation": -97
        }]
    }]
}, {
    name: 'Ultra light',
    style: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e9e9e9"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 18
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
        }, {
            "lightness": 21
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dedede"
        }, {
            "lightness": 21
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#333333"
        }, {
            "lightness": 40
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f2f2f2"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }]
}, {
    name: 'Clean (no labels)',
    style: [{
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "weight": 2.1
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.arterial",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
            "weight": 1.2
        }]
    }, {
        "featureType": "landscape",
        "stylers": [{
            "visibility": "on"
        }, {
            "lightness": 100
        }, {
            "saturation": "- 100"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.locality",
        "stylers": [{
            "visibility": "off"
        }]
    }]
}, {
    name: 'Clean (roads)',
    style: [{
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "weight": 2.1
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.arterial",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
            "weight": 1.2
        }]
    }, {
        "featureType": "landscape",
        "stylers": [{
            "visibility": "on"
        }, {
            "lightness": 100
        }, {
            "saturation": "- 100"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "administrative.locality",
        "stylers": [{
            "visibility": "on"
        }]
    }]
}];
var settings = {
    mysqlFormat: 'YYYY-MM-DD HH:mm:ss',
    emptyMysqlFormat: 'YYYY-MM-DD 00:00:00'
};
var temporalGroupNames = {
    'day': 'daily',
    'month': 'monthly',
    'year': 'yearly'
};
var temporalGroupFormat = {
    'day': 'Do MMMM, YYYY',
    'month': 'MMMM, YYYY',
    'year': 'YYYY'
};
var temporalGroupEdgeAdjustments = {
    'day': {
        'add': 'day'
    },
    'daily': {
        'add': 'day'
    },
    'month': {
        'add': 'month'
    },
    'monthly': {
        'add': 'month'
    },
    'year': {
        'add': 'year'
    },
    'yearly': {
        'add': 'year'
    }
};
var unrestCategories = ["Coerce", "Fight", "Assault", "Appeal", "Demand", "Threaten", "Protest", "Engage in UMV"];
var countries = ["IN", "PK", "BG"];
var gradients = [
    ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
    ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
    ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
    ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
    ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
    ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
    ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
    ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
    ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
    ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
    ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
    ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]
];
var rgbaGradients = [
    ['rgba(0, 255, 255, 0)', 'rgba(247,252,253,1)', 'rgba(229,245,249,1)', 'rgba(204,236,230,1)', 'rgba(153,216,201,1)', 'rgba(102,194,164,1)', 'rgba(65,174,118,1)', 'rgba(35,139,69,1)', 'rgba(0,109,44,1)', 'rgba(0,68,27,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(247,252,253,1)', 'rgba(224,236,244,1)', 'rgba(191,211,230,1)', 'rgba(158,188,218,1)', 'rgba(140,150,198,1)', 'rgba(140,107,177,1)', 'rgba(136,65,157,1)', 'rgba(129,15,124,1)', 'rgba(77,0,75,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(255,247,236,1)', 'rgba(254,232,200,1)', 'rgba(253,212,158,1)', 'rgba(253,187,132,1)', 'rgba(252,141,89,1)', 'rgba(239,101,72,1)', 'rgba(215,48,31,1)', 'rgba(179,0,0,1)', 'rgba(127,0,0,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(255,247,251,1)', 'rgba(236,231,242,1)', 'rgba(208,209,230,1)', 'rgba(166,189,219,1)', 'rgba(116,169,207,1)', 'rgba(54,144,192,1)', 'rgba(5,112,176,1)', 'rgba(4,90,141,1)', 'rgba(2,56,88,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(247,244,249,1)', 'rgba(231,225,239,1)', 'rgba(212,185,218,1)', 'rgba(201,148,199,1)', 'rgba(223,101,176,1)', 'rgba(231,41,138,1)', 'rgba(206,18,86,1)', 'rgba(152,0,67,1)', 'rgba(103,0,31,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(255,255,229,1)', 'rgba(247,252,185,1)', 'rgba(217,240,163,1)', 'rgba(173,221,142,1)', 'rgba(120,198,121,1)', 'rgba(65,171,93,1)', 'rgba(35,132,67,1)', 'rgba(0,104,55,1)', 'rgba(0,69,41,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(255,255,217,1)', 'rgba(237,248,177,1)', 'rgba(199,233,180,1)', 'rgba(127,205,187,1)', 'rgba(65,182,196,1)', 'rgba(29,145,192,1)', 'rgba(34,94,168,1)', 'rgba(37,52,148,1)', 'rgba(8,29,88,1)'],
    ['rgba(0, 255, 255, 0)', 'rgba(255,255,204,1)', 'rgba(255,237,160,1)', 'rgba(254,217,118,1)', 'rgba(254,178,76,1)', 'rgba(253,141,60,1)', 'rgba(252,78,42,1)', 'rgba(227,26,28,1)', 'rgba(189,0,38,1)', 'rgba(128,0,38,1)']
];
// this one, Dr. Joshi
var newGradients = [
    ['rgba(29, 229, 0, 0)', 'rgba(44, 203, 21, 1)', 'rgba(59, 178, 42, 1)', 'rgba(75, 152, 63, 1)', 'rgba(90, 127, 84, 1)', 'rgba(105, 101, 106, 1)', 'rgba(121, 76, 127, 1)', 'rgba(136, 50, 148, 1)', 'rgba(151, 25, 169, 1)', 'rgba(167, 0, 191, 1)'],
    ['rgba(229, 209, 0, 0)', 'rgba(224, 185, 1, 1)', 'rgba(220, 162, 2, 1)', 'rgba(216, 139, 4, 1)', 'rgba(212, 116, 5, 1)', 'rgba(207, 92, 7, 1)', 'rgba(203, 69, 8, 1)', 'rgba(199,46, 10, 1)', 'rgba(195, 23, 11, 1)', 'rgba(191, 0, 13, 1)'],
    ['rgba(251, 112, 242, 0)', 'rgba(223, 100, 236, 1)', 'rgba(195, 88, 230, 1)', 'rgba(167, 77, 225, 1)', 'rgba(139, 65, 219, 1)', 'rgba(111, 54, 213, 1)', 'rgba(83, 42, 208, 1)', 'rgba(55, 31, 202, 1)', 'rgba(27, 19, 196, 1)', 'rgba(0, 8, 191, 1)'],
    ['rgba(229, 155, 42, 0)', 'rgba(209, 148, 38, 1)', 'rgba(190, 142, 34, 1)', 'rgba(171, 136, 30, 1)', 'rgba(151, 130, 26, 1)', 'rgba(132, 123, 23, 1)', 'rgba(113, 117, 19, 1)', 'rgba(93, 111, 15, 1)', 'rgba(74, 105, 11, 1)', 'rgba(55, 99, 8, 1)'],
    ['rgba(0, 150, 229, 0)', 'rgba(11, 133, 224, 1)', 'rgba(22, 116, 220, 1)', 'rgba(33, 100, 216, 1)', 'rgba(44, 83, 212, 1)', 'rgba(55, 66, 207, 1)', 'rgba(66, 50, 203, 1)', 'rgba(77, 33, 199, 1)', 'rgba(88, 16, 195, 1)', 'rgba(100, 0, 191, 1)'],
    ['rgba(169, 229, 0, 0)', 'rgba(178, 222, 5, 1)', 'rgba(188, 215, 11, 1)', 'rgba(197, 209, 17, 1)', 'rgba(207, 202, 22, 1)', 'rgba(216, 196, 28, 1)', 'rgba(226, 189, 34, 1)', 'rgba(235, 183, 39, 1)', 'rgba(245, 176, 45, 1)', 'rgba(255, 170, 51, 1)'],
    ['rgba(238, 152, 246, 0)', 'rgba(239, 140, 236, 1)', 'rgba(241, 129, 226, 1)', 'rgba(243, 118, 217, 1)', 'rgba(245, 107, 207, 1)', 'rgba(247, 95, 198, 1)', 'rgba(249, 84, 188, 1)', 'rgba(251, 73, 179, 1)', 'rgba(253, 62, 169, 1)', 'rgba(255, 51, 190, 1)'],
    ['rgba(152, 246, 239, 0)', 'rgba(139, 245, 225, 1)', 'rgba(120, 244, 211, 1)', 'rgba(104, 244, 198, 1)', 'rgba(88, 243, 184, 1)', 'rgba(73, 242, 170, 1)', 'rgba(57, 242, 157, 1)', 'rgba(41, 241, 143, 1)', 'rgba(25, 240, 129, 1)', 'rgba(10, 240, 116, 1)'],
    ['rgba(255, 0, 0, 0)', 'rgba(255, 255, 0, 0.9)', 'rgba(0, 255, 0, 0.7)', 'rgba(173, 255, 47, 0.5)', 'rgba(152, 251, 152, 0)', 'rgba(152, 251, 152, 0)', 'rgba(0, 0, 238, 0.5)', 'rgba(186, 85, 211, 0.7)', 'rgba(255, 0, 255, 0.9)', 'rgba(255, 0, 0, 1)'] 
];
// to make new gradients as the the rgba gradients
rgbaGradients = newGradients;

// default coordinates for the area filter
var defaultAreaCoordinates = {
    north: 27.7196,
    south: 22.7196,
    east: 80.8577,
    west: 75.8577
};
