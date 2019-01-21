<?php
// ADD Google Site Verification
function google_site_verification() { ?>
  <meta name="google-site-verification" content="3Uy2bMrqF8Up4Wb8DfLfC73PDYQWIDtV1gHa1zDfAI8" />
<?php }
add_action( 'wp_head', 'google_site_verification', 5 );