<div class="module-card">
    <div class="card">
        <img class="card-img-top" src="<?php echo $settings->photo_field_src; ?>" alt="Card image cap" />
        <div class="card-body">
            <h3 class="card-title"><?php echo $settings->headline_text; ?></h3>
            <p class="card-text"><?php echo $settings->body_text; ?></p>
            <a  class="btn btn-xs-block stretched-link <?php echo $settings->button_style; ?> btn-primary module-card__link" 
            href="<?php echo $file; ?>"
            style="background-color: #<?php echo $settings->background_color; ?>;"  
            target="<?php echo $settings->link_target; ?>">
                <?php echo $settings->link_text; ?>
            </a>
        </div>
    </div>
</div>
