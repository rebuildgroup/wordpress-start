<nav class="navbar navbar-expand-lg navbar-main" role="navigation">
  <div class="collapse navbar-collapse" id="navbarPrimary">
    <?php // To keep mx-auto , ml-auto, mr-auto functioning properly, you must add 'container' => false to wp_nav_menu function // ?>
    <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu( array(
          'theme_location'  => 'primary_navigation',
          'depth'	          => 2, // 1 = no dropdowns, 2 = with dropdowns.
          'container'       => false,
          'menu_class'      => 'nav navbar-nav ml-auto',
          'fallback_cb'     => 'WP_Bootstrap_Navwalker::fallback',
          'walker'          => new WP_Bootstrap_Navwalker(),
        ) );
      endif;
    ?>
  </div>
  <button class="ml-sm-auto ml-md-3 navbar-toggler hamburger" type="button" id="openNav">☰</button>
  <button class="ml-sm-auto ml-md-3 navbar-toggler close-sidebar" type="button" id="closeNav">⇥</button>
  <!-- <button class="navbar-toggler hamburger" type="button" id="openNav" data-toggler="collapse" data-target="#navbarMobile" aria-controls="navbarMobile" aria-expanded="false" aria-label="Toggle navigation">
    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bars fa-w-14 fa-3x" style="height: 40px;"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" class=""></path></svg>
  </button> -->
</nav>
