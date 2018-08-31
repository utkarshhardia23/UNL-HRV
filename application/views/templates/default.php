<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 20, 2016 (11:01:16 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 * NOTES:
 * 1. Use double quotes for HTML tags and single quotes for PHP, JavaScript stuff. Will prevent nesting from killing yourself.
 * 2. If you add new resources, make sure to set their permissions to 644. chmod 644 <filename>. Else use WinSCP to recursively set them to the same. We basically want only read permission on resource files.
 * 3. The development comments are inside PHP segments so that they DO NOT get rendered into the HTML. You really don't want to have that, believe me.
 */
?>
<!DOCTYPE html> <!-- HTML 5 stuff -->
<html>
    <!-- Author: Hariharan Arunachalam
    Designed and coded by the author for UNL's Surge project.
    -->
    <head>
        <title>Surge - <?php echo $title ?></title>
        
        <?php
        // Load the style sheets provided in the stylesheets parameter
        //  Both the scripts and the stylesheets must must and will have two properties: 
        // local: TRUE (load from local location using base url) or FALSE (load from url), 
        // source: goes into the href path added depending on local         
        // NOTE C1: This may slightly complicate the render function returns, but it beats having to load crap when not needed. If it becomes too much, rework this page's PHP to have a parameter like 'LoadDefaultResources'
        // from where sets of files can be manually added to the two parameters (stylesheets and scripts). This will prevent having to change the rest of the page. This will be similar to what is done with materialize and jQuery below. 
        ?>

        <?php
        // The need for the local parameter will come up if authentication and re-routing is implemented. Future requirement safe. You'll thank me later. 
        // The css file is added with the base url IF local is set, else nothing is added and the source is used for href as such 
        ?>
        <link href="<?php echo $this->config->item('base_url'); ?>css/loader.css"/>
        <?php foreach ($stylesheets as $css): ?>            
            <link href="<?php echo (!empty($css['local']) && $css['local'] ? $this->config->item('base_url') . 'css/' : '') . $css['source'] ?>"  rel="stylesheet" />
        <?php endforeach; ?>


        <?php
        // Load the javascript files provided in the scripts parameter 
        // The js file is added with the base url IF local is set, else nothing is added and the source is used as such 
        ?>
        <?php foreach ($scripts as $js): ?>            
            <script src="<?php echo (!empty($js['local']) && $js['local'] ? $this->config->item('base_url') . 'js/' : '') . $js['source'] ?>"  type="text/javascript"></script>
        <?php endforeach; ?>

        <style>
            #main-container {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>

    <body>
        <?php
        // Add Google's analytics script. This is required for every page! If you create a new template, then make sure this is code is added.
        ?>
        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-81091629-1', 'auto');
            ga('send', 'pageview');

        </script>
        <?php // End of Google Analytics code ?>
        <?php // Now comes the default template. You know, the header bar and stuff. ?>

        <!--Top title bar-->
        <div id="top-bar-menu">
            <nav>
                <div class="nav-wrapper grey darken-4">
                    <a href="#" class="brand-logo">SURGE <?php echo $title; ?> </a>
                    
                    <span class="lastupdated">Last Update: <span data-bind="text: lastUpdate"></span></span>
                    
                    <?php foreach ($menus as $menu): ?>
                        <ul id="nav-mobile" class="right">
                            <li id="<?php echo $menu['id']; ?>">
                                <a class="tooltipped" data-bind="click: <?php echo $menu['bind-click']; ?>, 
                                    css: { '<?php echo $menu['color']; ?>-text': <?php echo $menu['bind-color']; ?> }" 
                                    data-position="bottom" data-delay="50" 
                                    data-tooltip="<?php echo $menu['tooltip']; ?>">
                                    <i class="large material-icons"><?php echo $menu['icon']; ?></i></a>
                            </li>
                        </ul>
                    <?php endforeach; ?>

                </div>
            </nav>            
        </div>
        
        
        <?php
        // the main container holds the body taken from the partial view 
        echo $body;
        ?>

    </body>

</html>