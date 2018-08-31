<?php

/* 
 * Author: Hariharan Arunachalam
 * Date: Aug 20, 2016 (2:18:18 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>


<div id="loading-container" class="grey darken-4">
    <div id="loader" class="preloader-wrapper big active">
        <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>            
    <div class='soothe-info thin' id='loader-status-txt' >
        Please wait..the visualizer is loading...
    </div>
</div>

<script>
    function unhideLoader() {
        $('#loading-container').slideUp();
    }
    
</script>