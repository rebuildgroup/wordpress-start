<?php
/**
 * Plugin Name: BB RG Custom Modules
 * Plugin URI: 
 * Description: Custom modules for Beaver Builder
 * Version: 1.05
 * Author: Rebuild Group
 * Author URI: http://rebuild.group
 */

// https://github.com/mayukojpn/bb-custom-module-examples/blob/master/example/example.php

define( 'BB_RG_MODULES_DIR', plugin_dir_path( __FILE__ ) );
define( 'BB_RG_MODULES_URL', plugins_url( '/', __FILE__ ) );

function bb_rg_modules() {
    if ( class_exists( 'FLBuilder' ) ) {
        // Include custom modules here.
        require_once 'brand-button/brand-button.php';
        require_once 'icons-grid/icons-grid.php';
        require_once 'card-offset/card-offset.php';
    }
}
add_action( 'init', 'bb_rg_modules' );


// Icon select
function fl_rg_icon_select($name, $value, $field, $settings) {
    $svgPath = './wp-content/themes/wp/assets/svg/*.svg';
    $svgList = glob($svgPath); ?>

    <!-- ** TODO: 
          * Move styles to css
          * Activate JS to switch icon preview on change
    -->

    <div class="fl-icon-preview" style="display: block; width: 60px; height: 60px; background-color: white; border: 1px solid #ccc; margin-bottom: 4px; padding: 7.5px;">
        <svg stlye="height: 30px;" viewBox="0 0 50 50"><use xlink:href="#<?php echo $value; ?>"></use></svg>
    </div>

    <select class="fl-icon-select" name="<?php echo $name; ?>" value="<?php echo $value; ?>">
    <?php
    foreach($svgList as $svgFile) {
        if(is_file($svgFile)) {
            $svgFile    = basename($svgFile);
            $svgId      = preg_replace('/\\.[^.\\s]{3,4}$/', '', $svgFile);?>

            <option 
                value="<?php echo $svgId; ?>" 
                <?php if($value == $svgId) { echo 'selected="selected"'; } ?> >
                <?php echo $svgFile; ?>
            </option>
    <?php
        }
    } ?>
    </select>
<?php 
}
add_action('fl_builder_control_rg-icon-select', 'fl_rg_icon_select', 1, 4);


// PDF Attachment
function attach_pdf_field( $name, $value, $field ) { ?>
    <?php $pdf = FLBuilderPhoto::get_attachment_data($value); ?>
    
    <div class="fl-pdf-field fl-builder-custom-field<?php if(empty($value) || !$pdf) echo ' fl-pdf-empty'; if(isset($field['class'])) echo ' ' . $field['class']; ?>">
        <a class="fl-pdf-select" href="javascript:void(0);" onclick="return false;"><?php _e('Select PDF', 'fl-builder'); ?></a>
        <div class="fl-pdf-preview">
            <?php if(!empty($value) && $pdf) : ?>
            <div class="fl-pdf-preview-img">
                <img src="<?php echo $pdf->icon; ?>" />
            </div>
            <span class="fl-pdf-preview-filename"><?php echo $pdf->filename; ?></span>
            <?php else : ?>
            <div class="fl-pdf-preview-img">
                <img src="<?php echo FL_BUILDER_URL; ?>img/spacer.png" />
            </div>
            <span class="fl-pdf-preview-filename"></span>
            <?php endif; ?>
            <br />
            
            <a class="fl-pdf-replace" href="javascript:void(0);" onclick="return false;"><?php _e('Replace PDF', 'fl-builder'); ?></a>
            <a class="fl-pdf-remove" href="javascript:void(0);" onclick="return false;"><?php _e('Remove PDF', 'fl-builder'); ?></a>
            <div class="fl-clear"></div>
        </div>
        <input name="<?php echo $name; ?>" type="hidden" value='<?php echo $value; ?>' />
    </div>
<?php
}
add_action( 'fl_builder_control_attach-pdf', 'attach_pdf_field', 1, 3 );


function attach_pdf_field_assets() {
    if ( class_exists( 'FLBuilderModel' ) && FLBuilderModel::is_builder_active() ) {
        wp_enqueue_style( 'attach-pdf', BB_RG_MODULES_URL . 'attach-pdf/css/attach-pdf.css', array(), '' );
        wp_enqueue_script( 'attach-pdf', BB_RG_MODULES_URL . 'attach-pdf/js/attach-pdf.js', array(), '', true );
    }
}
add_action( 'wp_enqueue_scripts', 'attach_pdf_field_assets' );