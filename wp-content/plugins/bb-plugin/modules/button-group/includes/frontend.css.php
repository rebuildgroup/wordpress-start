<?php

// Width, Alignment, Space Between buttons

$width = 'full';
if ( 'full' === $settings->width ) {
	$width = '100%';
} elseif ( 'custom' === $settings->width ) {
	$width = $settings->custom_width . $settings->custom_width_unit;
}
?>

.fl-node-<?php echo $id; ?> .fl-button-group-layout-vertical .fl-button-group-buttons a.fl-button,
.fl-node-<?php echo $id; ?> .fl-button-group-layout-horizontal .fl-button-group-buttons a.fl-button {
	width: <?php echo $width; ?>;
}

.fl-node-<?php echo $id; ?> .fl-button-group-layout-vertical {
	text-align: <?php echo $settings->align; ?>
}

.fl-node-<?php echo $id; ?> .fl-button-group-layout-horizontal .fl-button-group-buttons {
	<?php
	$button_group_horiz_align = '';
	if ( 'left' == $settings->align ) {
		$button_group_horiz_align = 'flex-start';
	} elseif ( 'center' == $settings->align ) {
		$button_group_horiz_align = 'center';
	} elseif ( 'right' == $settings->align ) {
		$button_group_horiz_align = 'flex-end';
	}
	?>
	justify-content: <?php echo $button_group_horiz_align; ?>
}

<?php if ( ! empty( $settings->space_between ) ) : ?>
	.fl-node-<?php echo $id; ?> .fl-button-group-layout-horizontal .fl-button-group-buttons {
		column-gap: <?php echo $settings->space_between . $settings->space_between_unit; ?>;
	}
	.fl-node-<?php echo $id; ?> .fl-button-group-layout-horizontal .fl-button-group-buttons .fl-button-group-button + .fl-button-group-button {
		padding-bottom: <?php echo $settings->space_between . $settings->space_between_unit; ?>;
	}
	.fl-node-<?php echo $id; ?> .fl-button-group-layout-vertical .fl-button-group-buttons .fl-button-group-button {
		padding-bottom: <?php echo $settings->space_between . $settings->space_between_unit; ?>;
	}
	<?php
endif;

// Text (Color, Typography, etc)
if ( ! empty( $settings->text_color ) ) :
	?>
	.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group a.fl-button > span,
	.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group a.fl-button > i {
		color: <?php echo FLBuilderColor::hex_or_rgb( $settings->text_color ); ?>;
	}
<?php endif; ?>

<?php if ( ! empty( $settings->text_hover_color ) ) : ?>
	.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group a.fl-button:hover > span,
	.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group a.fl-button:focus > span,
	.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group a.fl-button:hover > i,
	.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group a.fl-button:focus > i {
		color: <?php echo FLBuilderColor::hex_or_rgb( $settings->text_hover_color ); ?>;
	}
<?php endif; ?>

<?php
// Typography
FLBuilderCSS::typography_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'typography',
	'selector'     => ".fl-builder-content .fl-node-$id .fl-button-group a.fl-button, .fl-builder-content .fl-node-$id .fl-button-group a.fl-button:visited",
) );

// Padding
FLBuilderCSS::dimension_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'padding',
	'selector'     => ".fl-builder-content .fl-node-$id .fl-button-group .fl-button-group-buttons",
	'unit'         => 'px',
	'props'        => array(
		'padding-top'    => 'padding_top',
		'padding-right'  => 'padding_right',
		'padding-bottom' => 'padding_bottom',
		'padding-left'   => 'padding_left',
	),
) );

// Default background hover color
if ( ! empty( $settings->bg_color ) && empty( $settings->bg_hover_color ) ) {
	$settings->bg_hover_color = $settings->bg_color;
}

// Default background color for gradient styles.
if ( empty( $settings->bg_color ) && 'gradient' === $settings->style ) {
	$settings->bg_color = 'a3a3a3';
}

// Background Gradient
if ( ! empty( $settings->bg_color ) ) {
	$bg_grad_start = FLBuilderColor::adjust_brightness( $settings->bg_color, 30, 'lighten' );
}
if ( ! empty( $settings->bg_hover_color ) ) {
	$bg_hover_grad_start = FLBuilderColor::adjust_brightness( $settings->bg_hover_color, 30, 'lighten' );
}

if ( ! empty( $settings->bg_color ) ) :
	?>
.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group-buttons a.fl-button {
	background: <?php echo FLBuilderColor::hex_or_rgb( $settings->bg_color ); ?>;
	<?php if ( 'gradient' == $settings->style ) : ?>
	background: linear-gradient(to bottom,  <?php echo FLBuilderColor::hex_or_rgb( $bg_grad_start ); ?> 0%, <?php echo FLBuilderColor::hex_or_rgb( $settings->bg_color ); ?> 100%);
	<?php endif; ?>
}
	<?php
endif;

if ( ! empty( $settings->bg_hover_color ) ) :
	?>
.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group-buttons a.fl-button:hover,
.fl-builder-content .fl-node-<?php echo $id; ?> .fl-button-group-buttons a.fl-button:focus {

	background: <?php echo FLBuilderColor::hex_or_rgb( $settings->bg_hover_color ); ?>;

	<?php if ( 'gradient' == $settings->style ) : // Gradient ?>
	background: linear-gradient(to bottom,  <?php echo FLBuilderColor::hex_or_rgb( $bg_hover_grad_start ); ?> 0%, <?php echo FLBuilderColor::hex_or_rgb( $settings->bg_hover_color ); ?> 100%);
	<?php endif; ?>
}
	<?php
endif;

// Border - Settings
FLBuilderCSS::border_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'border',
	'selector'     => ".fl-builder-content .fl-node-$id .fl-button-group-buttons a.fl-button",
) );

// Border - Hover Settings
if ( ! empty( $settings->border_hover_color ) && is_array( $settings->border ) ) {
	$settings->border['color'] = $settings->border_hover_color;
}

FLBuilderCSS::border_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'border',
	'selector'     => ".fl-builder-content .fl-node-$id .fl-button-group-buttons a.fl-button:hover",
) );

// Style for the individual button in the group.
for ( $i = 0; $i < count( $settings->items ); $i++ ) :
	$button_group_button_id = "#fl-button-group-button-$id-$i";

	if ( ! is_object( $settings->items[ $i ] ) ) {
		continue;
	}

	// Padding
	FLBuilderCSS::dimension_field_rule( array(
		'settings'     => $settings->items[ $i ],
		'setting_name' => 'padding',
		'selector'     => "$button_group_button_id a.fl-button",
		'unit'         => 'px',
		'props'        => array(
			'padding-top'    => 'padding_top',
			'padding-right'  => 'padding_right',
			'padding-bottom' => 'padding_bottom',
			'padding-left'   => 'padding_left',
		),
	) );

	// Text Color
	if ( ! empty( $settings->items[ $i ]->text_color ) ) :
		?>
		<?php echo $button_group_button_id; ?> a.fl-button > span,
		<?php echo $button_group_button_id; ?> a.fl-button > i {
			color: <?php echo FLBuilderColor::hex_or_rgb( $settings->items[ $i ]->text_color ); ?>;
		}
		<?php
	endif;

	// Typography
	FLBuilderCSS::typography_field_rule( array(
		'settings'     => $settings->items[ $i ],
		'setting_name' => 'typography',
		'selector'     => "$button_group_button_id a.fl-button, $button_group_button_id a.fl-button:visited",
	) );


	if ( ! empty( $settings->items[ $i ]->text_hover_color ) ) :
		?>
		<?php echo $button_group_button_id; ?> a.fl-button:hover > span,
		<?php echo $button_group_button_id; ?> a.fl-button:focus > span,
		<?php echo $button_group_button_id; ?> a.fl-button:hover > i,
		<?php echo $button_group_button_id; ?> a.fl-button:focus > i {
			color: <?php echo FLBuilderColor::hex_or_rgb( $settings->items[ $i ]->text_hover_color ); ?>;
		}
		<?php
	endif;

	if ( ! empty( $settings->items[ $i ]->bg_color ) ) :
		?>
		<?php echo $button_group_button_id; ?> a.fl-button {
			background: <?php echo FLBuilderColor::hex_or_rgb( $settings->items[ $i ]->bg_color ); ?>;
			<?php if ( 'gradient' == $settings->items[ $i ]->style ) : ?>
			background: linear-gradient(to bottom,  <?php echo FLBuilderColor::hex_or_rgb( $bg_grad_start ); ?> 0%, <?php echo FLBuilderColor::hex_or_rgb( $settings->items[ $i ]->bg_color ); ?> 100%);
			<?php endif; ?>
		}
		<?php
	endif;

	if ( ! empty( $settings->items[ $i ]->bg_hover_color ) ) :
		?>
		<?php echo $button_group_button_id; ?> a.fl-button:hover,
		<?php echo $button_group_button_id; ?> a.fl-button:focus {
			background: <?php echo FLBuilderColor::hex_or_rgb( $settings->items[ $i ]->bg_hover_color ); ?>;
			<?php if ( 'gradient' == $settings->items[ $i ]->style ) : ?>
			background: linear-gradient(to bottom,  <?php echo FLBuilderColor::hex_or_rgb( $bg_hover_grad_start ); ?> 0%, <?php echo FLBuilderColor::hex_or_rgb( $settings->items[ $i ]->bg_hover_color ); ?> 100%);
			<?php endif; ?>
		}
		<?php
	endif;

	if ( ( 'html' == $settings->items[ $i ]->lightbox_content_type ) && ! empty( $settings->items[ $i ]->lightbox_content_html ) ) :
		$button_node_id = "fl-node-$id-$i";
		?>

		.<?php echo "$button_node_id.fl-button-lightbox-content"; ?> {
			background: #fff none repeat scroll 0 0;
			margin: 20px auto;
			max-width: 600px;
			padding: 20px;
			position: relative;
			width: auto;
		}

		.<?php echo "$button_node_id.fl-button-lightbox-content"; ?> .mfp-close,
		.<?php echo "$button_node_id.fl-button-lightbox-content"; ?> .mfp-close:hover {
			top: -10px!important;
			right: -10px;
		}

		.mfp-wrap .<?php echo "$button_node_id.fl-button-lightbox-content"; ?> .mfp-close,
		.mfp-wrap .<?php echo "$button_node_id.fl-button-lightbox-content"; ?> .mfp-close:hover {
			color:#333!important;
			right: -4px;
			top: -10px!important;
		}
		<?php
	endif;

	// Click action - lightbox
	if ( isset( $settings->items[ $i ]->click_action ) && 'lightbox' == $settings->items[ $i ]->click_action ) :
		if ( 'video' == $settings->items[ $i ]->lightbox_content_type ) :
			?>
			.fl-button-lightbox-wrap .mfp-content {
				background: #fff;
			}
			.fl-button-lightbox-wrap .mfp-iframe-scaler iframe {
				left: 2%;
				height: 94%;
				top: 3%;
				width: 96%;
			}
			.mfp-wrap.fl-button-lightbox-wrap .mfp-close,
			.mfp-wrap.fl-button-lightbox-wrap .mfp-close:hover {
				color: #333!important;
				right: -4px;
				top: -10px!important;
			}
			<?php
		endif;
	endif;

	// Border
	if ( ! empty( $settings->items[ $i ]->border ) && ( 'none' !== $settings->items[ $i ]->border->style ) ) {
		FLBuilderCSS::border_field_rule( array(
			'settings'     => $settings->items[ $i ],
			'setting_name' => 'border',
			'selector'     => "$button_group_button_id a.fl-button",
		) );
	}

	// Border Hover
	if ( ! empty( $settings->items[ $i ]->border_hover_color ) ) {
		?>
		<?php echo $button_group_button_id; ?> a.fl-button:hover {
			border-color: #<?php echo $settings->items[ $i ]->border_hover_color; ?>;
		}
		<?php
	}

endfor;
