<?php get_template_part('templates/header/nav' , 'mobile'); ?>
<header class="site-header shadow">
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <?php get_template_part('templates/header/logo'); ?>
      </div>
      <div class="col-sm-8">
        <?php get_template_part('templates/header/nav' , 'utility'); ?>
        <?php get_template_part('templates/header/nav' , 'primary'); ?>
        <?php get_template_part('templates/header/toggle' , 'button'); ?>
      </div>
    </div>
  </div>
</header>
