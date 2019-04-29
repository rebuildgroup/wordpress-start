<?php
	function my_login_logo() { ?>
	  <style type="text/css">
	    #login h1 a, .login h1 a {
	      background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/dist/images/logo-treetops-transparent.png);
	      margin-bottom: 0;
		  	background-size: 260px;
		  	height: 120px;
				width: 100%;
				margin-bottom: 2rem;
			}
			.login #login_error, .login .message {
				border-left: 4px solid #11693C !important;
				/* padding: 12px;
				margin-left: 0;
				margin-bottom: 20px;
				background-color: #fff;
				box-shadow: 0 1px 1px 0 rgba(0,0,0,.1); */
			}
			.wp-core-ui .button-primary {
				background: #407D46 !important;
				border-color: #407D46 #11693C #11693C;
				box-shadow: 0 1px 0 #11693C;
				color: #fff;
				text-decoration: none;
				text-shadow: 0 -1px 1px #11693C, 1px 0 1px #11693C, 0 1px 1px #11693C, -1px 0 1px #11693C;
			}
	  </style>
	<?php }
	add_action( 'login_enqueue_scripts', 'my_login_logo' );