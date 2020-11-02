<?php 
    function client_custom_colors_presets( $colors ) {
         $colors = array();

         /**
          *  Add colors from assets/styles/common/_color.scss 
          *
          * This will add all the brand colors to Beaver Builder Color Picker
          *  
          * REMEMBER TO REMOVE "#" from the Hex
          */
    
            return $colors;
    }

add_filter( 'fl_builder_color_presets' , 'client_custom_colors_presets');

add_action( 'wp_enqueue_scripts', 'prefix_enqueue_awesome' );
/**
 * Register and load font awesome CSS files using a CDN.
 */
function prefix_enqueue_awesome() {
	wp_enqueue_style( 
		'font-awesome-5', 
		'https://use.fontawesome.com/releases/v5.3.0/css/all.css', 
		array(), 
		'5.3.0' 
	);
}