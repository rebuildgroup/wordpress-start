<?php
    class BSButtonLinkModule extends FLBuilderModule {
        public function __construct() {
            parent::__construct(array(
                'name'            => __( 'Button', 'fl-builder' ),
                'description'     => __( 'A branded bootstrap button module.', 'fl-builder' ),
                'category'        => __( 'Special', 'fl-builder' ),
                'dir'             => BB_RG_MODULES_DIR . 'brand-button/',
                'url'             => BB_RG_MODULES_URL . 'brand-button/',
                'editor_export'   => true, // Defaults to true and can be omitted.
                'enabled'         => true, // Defaults to true and can be omitted.
                'partial_refresh' => false, // Defaults to false and can be omitted.
            ));

            // Register and enqueue your own
            //$this->add_css('example-lib', $this->url . 'css/example-lib.css');
            //$this->add_js('example-lib', $this->url . 'js/example-lib.js', array(), '', true);
        }
    }

    /**
     * Register the module and its form settings.
     */
    FLBuilder::register_module('BSButtonLinkModule', array(
        'general'       => array( // Tab
            'title'         => __('General', 'fl-builder'), // Tab title
            'sections'      => array( // Tab Sections
                'text'          => array(
                    'title'         => __( 'Text', 'fl-builder' ),
                    'fields'        => array(
                        'button_text' => array(
                            'type'          => 'text',
                            'label'         => __( 'Button Text', 'fl-builder' ),
                            'default'       => '',
                            'maxlength'     => '30',
                            'size'          => '30',
                            //'placeholder'   => __( 'Learn More', 'fl-builder' ),
                            'class'         => 'my-css-class'
                        ),
                    )
                ),
                'link'          => array(
                    'title'         => __( 'Link', 'fl-builder' ),
                    'fields'        => array(
                        'link_type' => array(
                            'type'          => 'select',
                            'label'         => __( 'Select Link Type', 'fl-builder' ),
                            'default'       => 'option-1',
                            'options'       => array(
                                'option-1'      => __( 'Page/URL', 'fl-builder' ),
                                'option-2'      => __( 'File Download', 'fl-builder' )
                            ),
                            'toggle'        => array(
                                'option-1'      => array(
                                    'fields'        => array( 'link_field', 'target_field' ),
                                ),
                                'option-2'      => array(
                                    'fields'        => array( 'attachment_field' ),
                                )
                            )
                        ),
                        'attachment_field' => array(
                            'type'          => 'attach-pdf',
                            'label'         => __('File', 'fl-builder'),
                            'show_remove'	=> false
                        ),
                        'link_field' => array(
                            'type'          => 'link',
                            'label'         => __('Button Link', 'fl-builder'),
                        ),
                        'link_target'   => array(
                            'type'          => 'select',
                            'label'         => __( 'Link Target', 'fl-builder' ),
                            'default'       => '_self',
                            'options'       => array(
                                '_self'         => __( 'Same Window', 'fl-builder' ),
                                '_blank'        => __( 'New Window', 'fl-builder' ),
                            ),
                            'preview'       => array(
                                'type'          => 'none',
                            ),
                        ),
                        'link_nofollow'          => array(
                            'type'          => 'select',
                            'label'         => __( 'Link No Follow', 'fl-builder' ),
                            'default'       => 'no',
                            'options' 		=> array(
                                'yes' 			=> __( 'Yes', 'fl-builder' ),
                                'no' 			=> __( 'No', 'fl-builder' ),
                            ),
                            'preview'       => array(
                                'type'          => 'none',
                            )
                        )
                    )
                )
            )
        ),
        'style'       => array( // Tab
            'title'         => __('Style', 'fl-builder'), // Tab title
            'sections'      => array( // Tab Sections
                'align'          => array(
                    'title'         => __( 'Alignment', 'fl-builder' ),
                    'fields'        => array(
                        'button_align' => array(
                            'type'          => 'select',
                            'label'         => __( 'Button Style', 'fl-builder' ),
                            'default'       => 'text-left',
                            'options'       => array(
                                'text-left'     => __( 'Left', 'fl-builder' ),
                                'text-center'   => __( 'Center', 'fl-builder' ),
                                'text-right'    => __( 'Right', 'fl-builder' )
                            )
                        ),
                    ),
                ),
                'color'          => array(
                    'title'         => __( 'Style', 'fl-builder' ),
                    'fields'        => array(
                        'background_color'    => array(
                            'type'          => 'color',
                            'label'         => __('Background Color', 'fl-builder'),
                            'default'       => '75bc7a',
                            'show_reset'    => true,
                            'preview'         => array(
                                'type'            => 'css',
                                'selector'        => '.fl-example-text',
                                'property'        => 'color'
                            )
                        ),
                        'text_color'    => array(
                            'type'          => 'color',
                            'label'         => __('Text Color', 'fl-builder'),
                            'default'       => 'ffffff',
                            'show_reset'    => true,
                            'preview'         => array(
                                'type'            => 'css',
                                'selector'        => '.fl-example-text',
                                'property'        => 'color'
                            )
                        ),
                        'button_style' => array(
                            'type'          => 'select',
                            'label'         => __( 'Button Style', 'fl-builder' ),
                            'default'       => 'default',
                            'options'       => array(
                                'btn-default'   => __( 'Default', 'fl-builder' ),
                                'btn-lg'        => __( 'Large', 'fl-builder' )
                                // Add custom styles here
                            )
                        ),
                    ),
                )
            )
        ),
        'event'       => array( // Tab
            'title'         => __('Tracking', 'fl-builder'), // Tab title
            'sections'      => array( // Tab Sections
                'event'          => array(
                    'title'         => __( 'GA Event', 'fl-builder' ),
                    'fields'        => array(
                        'event_flag' => array(
                            'type'          => 'select',
                            'label'         => __( 'Enable GA Event?', 'fl-builder' ),
                            'default'       => 'false',
                            'options'       => array(
                                'false'     => __( 'False', 'fl-builder' ),
                                'true'      => __( 'True', 'fl-builder' )
                                
                            ),
                            'toggle'        => array(
                                'true'      => array(
                                    'fields'        => array( 'event_category', 'event_action', 'event_label', 'event_value' ),
                                )
                            )
                        ),
                        'event_category' => array(
                            'type'          => 'text',
                            'label'         => __( 'Event Category', 'fl-builder' ),
                            'default'       => '',
                            'maxlength'     => '25',
                            'size'          => '25'
                        ),
                        'event_action' => array(
                            'type'          => 'text',
                            'label'         => __( 'Event Action', 'fl-builder' ),
                            'default'       => '',
                            'placeholder'   => 'click',
                            'maxlength'     => '25',
                            'size'          => '25'
                        ),
                        'event_label' => array(
                            'type'          => 'text',
                            'label'         => __( 'Event Label', 'fl-builder' ),
                            'default'       => '',
                            'maxlength'     => '25',
                            'size'          => '25'
                        ),
                        'event_value' => array(
                            'type'          => 'text',
                            'label'         => __( 'Event Value', 'fl-builder' ),
                            'default'       => '',
                            'maxlength'     => '25',
                            'size'          => '25'
                        ),
                        
                    ),
                ),
            )
        )
    ));