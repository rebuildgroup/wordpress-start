<?php 
    // Make sure featured images are enabled
    add_theme_support( 'post-thumbnails' );

    // Remove default image sizes here. 
    add_filter( 'intermediate_image_sizes_advanced', 'prefix_remove_default_images' );
    function prefix_remove_default_images( $sizes ) {
        //unset( $sizes['small']); // 150px
        unset( $sizes['medium']); // 300px
        unset( $sizes['large']); // 1024px
        unset( $sizes['medium_large']); // 768px
        return $sizes;
    }

    // Add featured image sizes
    // Usage:
    // add_image_size( 'new-custom-size', width, height, crop mode );
    
    add_image_size( 'featured-xlarge', 1440, 600, true );
    add_image_size( 'featured-large', 800, 420, true );
    add_image_size( 'featured-large-square', 800, 800, true );
    add_image_size( 'featured-medium', 600, 315, true );
    add_image_size( 'featured-medium-square', 400, 400, true );
    add_image_size( 'featured-small', 320, 168, true );

    // Register the three useful image sizes for use in Add Media modal
    add_filter( 'image_size_names_choose', 'wprg_custom_sizes' );
    
    function wprg_custom_sizes( $sizes ) {
        return array_merge( $sizes, array(
            'featured-xlarge' => __( 'Featured Large' ),
            'featured-large' => __( 'Featured Large' ),
            'featured-large-square' => __( 'Featured Large Square ' ),
            'featured-medium' => __( 'Featured Medium' ),
            'featured-medium-square' => __( 'Featured Medium Square' ),
            'featured-small' => __( 'Featured Small' ),
        ) );
    }

    // PDF Previews
    add_filter('fallback_intermediate_image_sizes', 'wprg_custom_pdf_previews');

    function wprg_custom_pdf_previews() {
        $fallbacksizes = array('small');
        return $fallbacksizes;
    }
    


    // Tiny for special processing
    // add_image_size( 'tiny', 70 );

    // function ad_update_jpeg_quality($meta_id, $attach_id, $meta_key, $attach_meta) {
    //     if ($meta_key == '_wp_attachment_metadata') {
    
    //         $post = get_post($attach_id);
    
    //         if ($post->post_mime_type == 'image/jpeg' && is_array($attach_meta['sizes'])) {
    
    //             $pathinfo = pathinfo($attach_meta['file']);
    //             $uploads = wp_upload_dir();
    //             $dir = $uploads['basedir'] . '/' . $pathinfo['dirname'];
    
    //             foreach ($attach_meta['sizes'] as $size => $value) {
    
    //                 $image = $dir . '/' . $value['file'];
    //                 $resource = imagecreatefromjpeg($image);
    
    //                 if ($size == 'tiny') {
    //                     // set the jpeg quality for 'tiny' size
    //                     imagejpeg($resource, $image, 20);
    //                 } else {
    //                     // set the jpeg quality for the rest of sizes
    //                     imagejpeg($resource, $image, 82);
    //                 }
    
    //                 // or you can skip a paticular image size
    //                 // and set the quality for the rest:
    //                 // if ($size == 'splash') continue;
    
    //                 imagedestroy($resource);
    //             }
    //         }
    //     }
    // }