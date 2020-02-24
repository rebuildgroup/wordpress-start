<?php

// Align
FLBuilderCSS::responsive_rule( array(
	'settings'     => $settings,
	'setting_name' => 'align',
	'selector'     => ".fl-node-$id .fl-photo",
	'prop'         => 'text-align',
) );

// Width
FLBuilderCSS::responsive_rule( array(
	'settings'     => $settings,
	'setting_name' => 'width',
	'selector'     => ".fl-node-$id .fl-photo-img, .fl-node-$id .fl-photo-content",
	'prop'         => 'width',
) );

// Border
FLBuilderCSS::border_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'border',
	'selector'     => ".fl-node-$id .fl-photo-img",
) );

FLBuilderCSS::typography_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'caption_typography',
	'selector'     => ".fl-node-$id.fl-module-photo .fl-photo-caption",
) );


// DuoTone Before Color
FLBuilderCSS::rule( array(
	'selector' => ".fl-node-$id div.fl-photo-content::before",
	'props'    => array(
		'background-color' => $settings->main_color,
	),
) );
// DuoTone After Color
FLBuilderCSS::rule( array(
	'selector' => ".fl-node-$id div.fl-photo-content::after",
	'props'    => array(
		'background-color' => $settings->secondary_color,
	),
) );
