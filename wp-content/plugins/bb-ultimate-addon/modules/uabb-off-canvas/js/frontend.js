(function($) {
	UABBOffCanvasModule = function( settings ) {

		this.settings       = settings;
		this.node           = settings.id;
		this.overlay_click	= settings.overlay_click;
		this.esc_keypress	= settings.esc_keypress;
		this.preview_off_canvas = settings.preview_off_canvas;
		this.offcanvas_on = settings.offcanvas_on;
		this.offcanvas_custom = settings.offcanvas_custom;
		this.close_on = settings.close_on;
		this.is_builder_active = settings.is_builder_active;
		this.collapse_inactive = settings.collapse_inactive;
		this.submenu_toggle = settings.submenu_toggle;

		if ( 'yes' !== this.is_builder_active ) {

			this._initCanvas();
		}
	};
	UABBOffCanvasModule.prototype = {

		_initCanvas: function() {

			$this = this;

			$node_module = $( '.fl-node-' + this.node );

			if ( 'yes' === this.close_on ) {

				menu_selector = $node_module.find( '.uabb-offcanvas-menu' );

				get_li = menu_selector.find( 'li');

				get_li.each(function() {

					if ( !( $(this).hasClass( 'uabb-has-submenu' ) ) ) {
						$(this).addClass( 'uabb-offcanvas-close' );
					}

				});
			}

			close_canvas = $node_module.find( '.uabb-offcanvas-close' );

			if ( 'custom' === this.offcanvas_on ) {

				var custom_wrap = $( this.offcanvas_custom );

				if ( custom_wrap.length ) {

					custom_wrap.addClass( 'uabb-offcanvas-trigger' );

					canvas_trigger = custom_wrap;

					canvas_trigger.bind("click", function(){return false;});

					canvas_trigger.on( "click", $.proxy( $this._showOffCanvas, $this ) );

					close_canvas.off('click').on( "click", $.proxy( $this._closeOffCanvas, $this ) );
					
				}
			}
			$node_module.find( '.uabb-offcanvas-trigger' ).each(function( index ) {

				canvas_trigger = $( this );

				canvas_trigger.bind("click", function(){return false;});

				canvas_trigger.off('click').on( "click", $.proxy( $this._showOffCanvas, $this ) );

				close_canvas.off('click').on( "click", $.proxy( $this._closeOffCanvas, $this ) );

			});
		},
		_showOffCanvas: function(event) {

			event.preventDefault();

			nodeClass = $( '.fl-node-' + this.node );

			current_this = this;

			ovarlay = nodeClass.find( '.uabb-offcanvas-overlay' );

			var wrap_width 	= $( '#offcanvas-' + this.node ).width() + 'px';

		 	if ( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-position-at-left' ) ) {

		 		$( 'body' ).css( 'margin-left' , '0' );

		 		$( '#offcanvas-' + this.node ).css( 'left', '0' );

		 		/* If Push Transition is enabled */
				if( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-type-push' ) ) {

					$( 'body' ).addClass( 'uabb-offcanvas-animating' ).css({ 
						width: $( 'body' ).width(),
						position: 'absolute',
						'margin-left' : wrap_width,
						'margin-right' : 'auto'
					});

				}

				$( '#offcanvas-' + this.node ).addClass( 'uabb-off-canvas-show' );

		 	} else if( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-position-at-right' ) ) {

				$( 'body' ).css( 'margin-right', '0' );

				$( '#offcanvas-' + this.node ).css( 'right', '0' );
		 		
		 		/* If Push Transition is enabled */
				if( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-type-push' ) ) {

					$( 'body' ).addClass( 'uabb-offcanvas-animating' ).css({ 
						width: $( 'body' ).width(),
						position: 'absolute',
						'margin-left' : '-' + wrap_width,
						'margin-right' : 'auto',
					});
				}

				$( '#offcanvas-' + this.node ).addClass( 'uabb-off-canvas-show' );

		 	}

		 	if ( 'arrows' === this.submenu_toggle || 'plus' === this.submenu_toggle ) {
		 		this._menuOnClick();
		 	}
		 	
		 	if ( 'yes' === this.esc_keypress ) {
			 	$(document).on('keyup',function(e) {

					if ( e.keyCode == 27) { 
						current_this._closeOffCanvas();
					}
				});
		 	}

			if ( 'yes' === this.overlay_click ) {
				ovarlay.off('click').on( 'click', $.proxy( this._closeOffCanvas, this ));
			}
		},
		/**
		 * Logic for submenu toggling on accordions or mobile menus (vertical, horizontal)
		 *
		 * @since  1.6.0
		 * @return void
		 */
		_menuOnClick: function() {
			$( '.uabb-has-submenu-container' ).off().click( $.proxy( function( e ) {

				var $link			= $( e.target ).parents( '.uabb-has-submenu' ).first(),
					$subMenu 		= $link.children( '.sub-menu' ).first(),
					$href	 		= $link.children('.uabb-has-submenu-container').first().find('> a').attr('href'),
					$subMenuParents = $( e.target ).parents( '.sub-menu' ),
					$activeParent 	= $( e.target ).closest( '.uabb-has-submenu.uabb-active' ),
					wrapperClass    = this.nodeClass + ' .uabb-creative-menu';

				if( !$subMenu.is(':visible') || $(e.target).hasClass('uabb-menu-toggle')
					|| ($subMenu.is(':visible') && (typeof $href === 'undefined' || $href == '#')) ) {
					e.preventDefault();
				}
				else {
					window.location.href = $href;
					return;
				}

				if ( 'yes' === this.collapse_inactive ){

					if ( !$link.parents('.menu-item').hasClass('uabb-active') ) {
						$('.uabb-active', this.wrapperClass).not($link).removeClass('uabb-active');
					}
					else if ($link.parents('.menu-item').hasClass('uabb-active') && $link.parent('.sub-menu').length) {
						$('.uabb-active', this.wrapperClass).not($link).not($activeParent).removeClass('uabb-active');
					}

					$('.sub-menu', this.wrapperClass).not($subMenu).not($subMenuParents).slideUp('normal');
				}

				$subMenu.slideToggle();
				$link.toggleClass( 'uabb-active' );
			}, this ) );

		},
		_closeOffCanvas: function() {

			nodeClass		= jQuery( '.fl-node-' + this.node );

			var wrap_width = $( '#offcanvas-' + this.node ).width() + 'px';

			if ( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-position-at-left' ) ) {

				$( '#offcanvas-' + this.node ).css( 'left', '-' + wrap_width );

				/* If Push Transition  is enabled*/
				if( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-type-push' ) ) {

					$( 'body' ).css({ 
						position: '',
						'margin-left' : '',
						'margin-right' : '',
					});

					setTimeout( function() {
						$( 'body' ).removeClass( 'uabb-offcanvas-animating' ).css({ 
							width: '',
						});
					}, 300 );
				}

				$( '#offcanvas-' + this.node ).removeClass( 'uabb-off-canvas-show' );

			} else if ( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-position-at-right' ) ) {

				$( '#offcanvas-' + this.node ).css( 'right', '-' + wrap_width );

				/* If Push Transition is enabled */
				if( $( '#offcanvas-' + this.node ).hasClass( 'uabb-offcanvas-type-push' ) ) {

					$( 'body' ).css({
						position: '',
						'margin-right' : '',
						'margin-left' : '',
					});

					setTimeout( function() {
						$( 'body' ).removeClass( 'uabb-offcanvas-animating' ).css({ 
							width: '',
						});
					}, 300 );
				}

				$( '#offcanvas-' + this.node ).removeClass( 'uabb-off-canvas-show' );
			}			
		}
	};
})(jQuery);