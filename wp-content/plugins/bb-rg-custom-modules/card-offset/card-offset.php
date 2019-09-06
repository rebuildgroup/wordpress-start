<?php

class CardOffsetModule extends FLBuilderModule {
    public function __construct() {
        parent::__construct(array(
            'name'            => __( 'Card Offset', 'fl-builder' ),
            'description'     => __( 'Card module.', 'fl-builder' ),
            'category'        => __( 'Special', 'fl-builder' ),
            'dir'             => BB_RG_MODULES_DIR . 'card-offset/',
            'url'             => BB_RG_MODULES_URL . 'card-offset/',
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
FLBuilder::register_module('CardOffsetModule', array(
    'general'       => array( // Tab
        'title'         => __('General', 'fl-builder'), // Tab title
        'sections'      => array( // Tab Sections
            'card-layout'       => array( // Section
                'title'         => __('Layout', 'fl-builder'), // Section Title
                'fields'        => array( // Section Fields
                    'layout'   => array(
                        'type'          => 'select',
                        'label'         => __( 'Card Alignment', 'fl-builder' ),
                        'default'       => 'left',
                        'options'       => array(
                            'left'         => __( 'Left', 'fl-builder' ),
                            'right'        => __( 'Right', 'fl-builder' ),
                        )
                    ),
                    'border_color'    => array(
                        'type'          => 'color',
                        'label'         => __('Separator Color', 'fl-builder'),
                        'default'       => '75bc7a',
                        'show_reset'    => true,
                        'preview'         => array(
                            'type'            => 'css',
                            'selector'        => '.fl-example-text',
                            'property'        => 'color'
                        )
                    ),
                )
            ),
            'card-image'       => array( // Section
                'title'         => __('Image', 'fl-builder'), // Section Title
                'fields'        => array( // Section Fields
                    'card_image'    => array(
                        'type'          => 'photo',
                        'label'         => __('Image', 'fl-builder')
                    ),
                )
            ),
            'card-content'       => array( // Section
                'title'         => __('Content', 'fl-builder'), // Section Title
                'fields'        => array( // Section Fields
                    'card_header'         => array(
                        'type'          => 'text',
                        'label'         => __( 'Heading', 'fl-builder' ),
                        'connections'   => array( 'string' ),
                    ),
                    'card_subheader'         => array(
                        'type'          => 'text',
                        'label'         => __( 'Sub-Heading', 'fl-builder' ),
                        'connections'   => array( 'string' ),
                    ),

                    'card_content'         => array(
                        'type'          => 'textarea',
                        'label'         => __( 'Content', 'fl-builder' ),
                        'connections'   => array( 'string' ),
                    ),
                    'card_link_text'         => array(
                        'type'          => 'text',
                        'label'         => __( 'Link Text', 'fl-builder' ),
                        'connections'   => array( 'string' ),
                    ),
                    'card_id'         => array(
                        'type'          => 'text',
                        'label'         => __( 'Link ID', 'fl-builder' ),
                        'connections'   => array( 'string' ),
                    ),
                    'card_link'         => array(
                        'type'          => 'link',
                        'label'         => __( 'Link URL', 'fl-builder' )
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
                )
            )            
        )
    )
));

 
    
/**
 * Register a settings form to use in the "form" field type above.
 */
FLBuilder::register_settings_form('card_items_form', array(
	'title' => __( 'Add Link', 'fl-builder' ),
	'tabs'  => array(
		'general'      => array(
			'title'         => __( 'General', 'fl-builder' ),
			'sections'      => array(
				'general'       => array(
					'title'         => '',
					'fields'        => array(
						'card_list_link_text'         => array(
							'type'          => 'text',
							'label'         => __( 'Link Text', 'fl-builder' ),
							'connections'   => array( 'string' ),
						),
                        'card_list_link' => array(
                            'type'          => 'link',
                            'label'         => __('Link URL', 'fl-builder')
                        ),
						'card_list_content'         => array(
							'type'          => 'text',
							'label'         => __( 'List Content', 'fl-builder' ),
							'connections'   => array( 'string' ),
						),
					),
                ),
			),
		),
	),
));
