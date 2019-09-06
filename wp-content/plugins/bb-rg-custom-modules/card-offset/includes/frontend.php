<div class="card card-offset-module">
  <img class="card-img-top img-fluid card-offset-module__image" data-aos="fade-right" data-aos-delay="50" src="<?php echo $settings->card_image_src; ?>" alt="Card image caps" />
  <div class="card-body card-offset-module__body <?php echo $settings->layout; ?> shadow" data-aos="fade-left" data-aos-delay="50" data-aos-easing="ease-in-out-cubic">
    <h2 class="hero-module__heading" data-aos="fade-right" data-aos-delay="50" data-aos-easing="ease-in-out-cubic"><?php echo $settings->card_subheader; ?></h2>
    <h4 class="card-title card-offset-module__heading" data-aos="fade-right" data-aos-delay="50"  data-aos-easing="ease-in-out-cubic"><?php echo $settings->card_header; ?></h4>
    <div class="separator" data-aos="fade-left" data-aos-delay="200" data-aos-easing="ease-in-out-cubic" style="background-color: #<?php echo $settings->border_color; ?>"></div>
    <p class="card-text card-offset-module__text" data-aos="fade-right" data-aos-delay="100"  data-aos-easing="ease-in-out-cubic"><?php echo $settings->card_content; ?></p>

    <?php if($settings->card_link) : ?>
    <a href="<?php echo $settings->card_link; ?>" 
      class="btn btn-primary card-offset-module__link" 
      id="<?php echo $settings->card_id; ?>"
      data-aos="fade-left" 
      data-aos-delay="200" 
      data-aos-easing="ease-in-out-cubic">
      <?php echo $settings->card_link_text; ?>
    </a>
    <?php endif; ?>

  </div>
</div>