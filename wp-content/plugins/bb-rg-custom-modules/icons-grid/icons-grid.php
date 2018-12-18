<?php
    class TTIconsGridModule extends FLBuilderModule {
        public function __construct() {
            parent::__construct(array(
                'name'            => __( 'Icon Grid', 'fl-builder' ),
                'description'     => __( 'A grid-list of icons.', 'fl-builder' ),
                'category'        => __( 'Icons', 'fl-builder' ),
                'dir'             => BB_RG_MODULES_DIR . 'icons-grid/',
                'url'             => BB_RG_MODULES_URL . 'icons-grid/',
                'editor_export'   => true, // Defaults to true and can be omitted.
                'enabled'         => true, // Defaults to true and can be omitted.
                'partial_refresh' => false, // Defaults to false and can be omitted.
            ));
        }
    }

    /**
     * Register the module and its form settings.
     */
    FLBuilder::register_module('TTIconsGridModule', array(
        'general'         => array(
            'title'         => __( 'Layout', 'fl-builder' ),
            'sections'      => array(
                'general'       => array(
                    'title'         => '',
                    'fields'        => array(
                        'columns'        => array(
                            'type'          => 'select',
                            'label'         => __( 'Number of Columns', 'fl-builder' ),
                            'default'       => '3',
                            'options'       => array(
                                '6'             => __( '6', 'fl-builder' ),
                                '3'             => __( '3', 'fl-builder' ),
                                '2'             => __( '2', 'fl-builder' )
                            ),
                        ),
                    ),
                ),
            ),
        ),
        'items'         => array(
            'title'         => __( 'Items', 'fl-builder' ),
            'sections'      => array(
                'general'       => array(
                    'title'         => 'Style',
                    'fields'        => array(
                        // 'icon_color'    => array(
                        //     'type'          => 'color',
                        //     'label'         => __('Icon Color', 'fl-builder'),
                        //     'default'       => '000000',
                        //     'show_reset'    => true,
                        //     'preview'         => array(
                        //         'type'            => 'css',
                        //         'selector'        => '.fl-example-text',
                        //         'property'        => 'color'
                        //     )
                        // ),
                        // 'text_color'    => array(
                        //     'type'          => 'color',
                        //     'label'         => __('Text Color', 'fl-builder'),
                        //     'default'       => '666666',
                        //     'show_reset'    => true,
                        //     'preview'         => array(
                        //         'type'            => 'css',
                        //         'selector'        => '.fl-example-text',
                        //         'property'        => 'color'
                        //     )
                        // ),
                        'color_style'        => array(
                            'type'          => 'select',
                            'label'         => __( 'Color Style', 'fl-builder' ),
                            'default'       => 'default',
                            'options'       => array(
                                'default'       => __( 'Default', 'fl-builder' ),
                                'golf'          => __( 'Golf Green', 'fl-builder' ),
                                'winter'        => __( 'Winter Blue', 'fl-builder' ),
                                'lodging'       => __( 'Lodging Brown', 'fl-builder' ),
                                'spa'           => __( 'Relax Red', 'fl-builder' ),
                                'kids'          => __( 'Party Purple', 'fl-builder' ),
                            ),
                        ),
                    )
                ),
                'items'       => array(
                    'title'         => 'Items',
                    'fields'        => array(
                        'items'         => array(
                            'type'          => 'form',
                            'label'         => __( 'Item', 'fl-builder' ),
                            'form'          => 'icon_group_items_form', // ID from registered form below
                            'preview_text'  => '', // Name of a field to use for the preview text
                            'multiple'      => true,
                        ),
                    ),
                ),
            ),
        ),
    ));

    /**
     * Register a settings form to use in the "form" field type above.
     */
    FLBuilder::register_settings_form('icon_group_items_form', array(
        'title' => __( 'Add Item', 'fl-builder' ),
        'tabs'  => array(
            'general'      => array(
                'title'         => __( 'Item', 'fl-builder' ),
                'sections'      => array(
                    'icon'       => array(
                        'title'         => 'Icon',
                        'fields'        => array(
                            'icon_select' => array(
                                'type'          => 'rg-icon-select',
                                'label'         => __( 'Select an Icon', 'fl-builder' ),
                                'default'       => '',
                            ),
                            'item_title' => array(
                                'type'          => 'text',
                                'label'         => __( 'Item Text', 'fl-builder' ),
                                'default'       => '',
                                'maxlength'     => '30',
                                'size'          => '30',
                                'placeholder'   => __( 'Lorem ipsum', 'fl-builder' )
                            ),
                            // TODO: Maybe add a nice hover popover or tooltip?

                            // 'tooltip_field' => array(
                            //     'type'          => 'textarea',
                            //     'label'         => __('Tooltip Text', 'fl-builder'),
                            //     'default'       => '',
                            //     'placeholder'   => __('Lorem ipsum dolar.', 'fl-builder'),
                            //     'rows'          => '2',
                            //     'preview'         => array(
                            //         'type'        => 'text',
                            //         'selector'    => '.fl-example-text'  
                            //     )
                            // )
                        )
                    )
                ),
            ),
        ),
    ));