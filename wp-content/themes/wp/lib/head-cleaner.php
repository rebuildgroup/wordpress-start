<?php


/** Removed Various Head Items **/
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');

remove_action('wp_head', 'wp_shortlink_wp_head');   //removes shortlink.
remove_action( 'wp_head', 'feed_links', 2 );        //removes feed links.
remove_action('wp_head', 'feed_links_extra', 3 );   //removes comments feed. 

remove_action('wp_head', 'start_post_rel_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'adjacent_posts_rel_link');

function remove_recent_comments_style() {
global $wp_widget_factory;
remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action('widgets_init', 'remove_recent_comments_style');


/** Remove Smileys **/
function disable_wp_emojicons() {
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
// filter to remove TinyMCE emojis
//add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );


/** Adds Favicons **/
function favicons() { 
$icon_dir = get_template_directory_uri().'/dist/images/favicon'; ?>
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?=$icon_dir;?>/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?=$icon_dir;?>/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?=$icon_dir;?>/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?=$icon_dir;?>/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?=$icon_dir;?>/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?=$icon_dir;?>/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?=$icon_dir;?>/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?=$icon_dir;?>/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="<?=$icon_dir;?>/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="<?=$icon_dir;?>/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="<?=$icon_dir;?>/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="<?=$icon_dir;?>/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="<?=$icon_dir;?>/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="<?=$icon_dir;?>/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="<?=$icon_dir;?>/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="<?=$icon_dir;?>/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="<?=$icon_dir;?>/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="<?=$icon_dir;?>/mstile-310x310.png" />
<?php }
add_action( 'wp_head', 'favicons', 5 );