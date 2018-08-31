/* 
 * Author: Hariharan Arunachalam
 * Date: Jul 22, 2016 (1:02:01 AM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */

/**
 * Auxiliary object to toggle the dashboards in the Visualizer.
 * @type custom
 * @author Hariharan Arunachalam
 */
var AUX = {
    toggleDashboard: function (onComplete, dashboard) {
        dashboard.animate({
            height: ["toggle", "swing"]
        }, {
            duration: 600,
            specialEasing: {
                width: "linear",
                height: "easeOutBounce"
            },
            complete: function () {
                if (onComplete)
                    onComplete(); // call the oncomplete if it is provided
            }
        });
    }
}
