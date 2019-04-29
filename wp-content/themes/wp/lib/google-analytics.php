<?php
	function google_analytics() { ?>
	  
		<script>
	    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	    ga('create', 'UA-31581339-1', 'auto');
	    ga('send', 'pageview');
	  </script>
		
		<!--
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-31581339-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'UA-31581339-1');
		</script>
		-->
	<?php }
	add_action( 'wp_footer', 'google_analytics', 5 );