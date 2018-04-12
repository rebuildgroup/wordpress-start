<?php   
    // Link/URL
    if($settings->link_type == 'option-1') :
        if($settings->link_field) :
            $file   = $settings->link_field;
        endif;
    
    // File Attachment
    elseif($settings->link_type == 'option-2') :
        $fileID = $settings->attachment_field; 
        $file   = wp_get_attachment_url($fileID);
    endif;

    // Style Select
?>

<div class="module-button <?php echo $settings->button_align; ?>">
    <a  class="btn btn-xs-block <?php echo $settings->button_style; ?> btn-primary module-button__link" 
        href="<?php echo $file; ?>"
        style="background-color: #<?php echo $settings->background_color; ?>;"  
        target="<?php echo $settings->link_target; ?>">

        <span class="module-button__text" style="color: #<?php echo $settings->text_color; ?>"><?php echo $settings->button_text; ?></span>
    </a>
</div>