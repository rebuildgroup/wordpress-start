<?php if (has_nav_menu('utility_navigation')) { ?>
  <div class="d-none d-lg-block px-2">
    <nav class="navbar navbar-expand-lg navbar-light navbar-utility" role="navigation">
      <?php wp_nav_menu(['theme_location' => 'utility_navigation', 'container'=> false ,'menu_class' => 'nav navbar-nav ml-auto']); ?>
    </nav>
  </div>
<?php } ?>
