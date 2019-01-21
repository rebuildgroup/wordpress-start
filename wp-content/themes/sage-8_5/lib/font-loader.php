<?php

/** LOAD Fonts **/
function load_my_fonts() { ?>  
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
	<script>
		WebFont.load({
			google: {
				families: ['Arvo', 'Montserrat']
			}
		});
	</script>
<?php }
add_action( 'wp_head', 'load_my_fonts' );