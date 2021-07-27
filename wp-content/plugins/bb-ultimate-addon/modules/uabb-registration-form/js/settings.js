(function($){

	FLBuilder.registerModuleHelper('uabb-registration-form', {

		init: function()
		{
			var form	= $('.fl-builder-settings');
			enable_recaptcha = form.find('select[name=uabb_recaptcha_toggle]');
			enable_recaptcha.on('change',this.enable_recaptcha );
			form.find('select[name=uabb_recaptcha_version]').on('change',this.enable_recaptcha );
			lost_your_pass = form.find('select[name=lost_your_pass]');
			login_link = form.find('select[name=login_link]');
			this.login_pwd_toggle();
			lost_your_pass.on('change',this.login_pwd_toggle );
			login_link.on('change',this.login_pwd_toggle );
			this.enable_recaptcha();
			this._hideDocs();
		},
		enable_recaptcha: function() {

			var form	= $( '.fl-builder-settings' );

			if ( 'show' === form.find('select[name=uabb_recaptcha_toggle]').val() ) {

				form.find('#fl-field-uabb_recaptcha_version').show();

				if ( 'v2' === form.find( 'select[name=uabb_recaptcha_version]' ).val() ) {

					form.find( '#fl-field-uabb_recaptcha_site_key' ).show();
					form.find( '#fl-field-uabb_recaptcha_secret_key' ).show();
					form.find( '#fl-field-uabb_recaptcha_theme' ).show();
					form.find( '#fl-field-uabb_badge_position' ).hide();
					form.find( '#fl-field-uabb_v3_recaptcha_site_key' ).hide();
					form.find( '#fl-field-uabb_v3_recaptcha_secret_key' ).hide();
					form.find( '#fl-field-uabb_v3_recaptcha_score' ).hide();
				}
				else {

					form.find( '#fl-field-uabb_badge_position' ).show();
					form.find( '#fl-field-uabb_v3_recaptcha_site_key' ).show();
					form.find( '#fl-field-uabb_v3_recaptcha_secret_key' ).show();
					form.find( '#fl-field-uabb_v3_recaptcha_score' ).show();
					form.find( '#fl-field-uabb_recaptcha_theme' ).show();
					form.find( '#fl-field-uabb_recaptcha_site_key' ).hide();
					form.find( '#fl-field-uabb_recaptcha_secret_key' ).hide();
					form.find( '#fl-field-uabb_recaptcha_theme' ).show();

				}
			} else {
				form.find('#fl-field-uabb_recaptcha_version').hide();
				form.find( '#fl-field-uabb_badge_position' ).hide();
				form.find( '#fl-field-uabb_v3_recaptcha_site_key' ).hide();
				form.find( '#fl-field-uabb_v3_recaptcha_secret_key' ).hide();
				form.find( '#fl-field-uabb_v3_recaptcha_score' ).hide();
				form.find( '#fl-field-uabb_recaptcha_theme' ).hide();
				form.find( '#fl-field-uabb_recaptcha_site_key' ).hide();
				form.find( '#fl-field-uabb_recaptcha_secret_key' ).hide();
				form.find( '#fl-field-uabb_recaptcha_theme' ).hide();
			}
		},
		login_pwd_toggle: function() {
			var form       = $('.fl-builder-settings'),
			lost_your_pass = form.find('select[name=lost_your_pass]');
			login_link     = form.find('select[name=login_link]');

			if ( 'yes' === lost_your_pass.val() && 'yes' === login_link.val() ) {
				form.find('#fl-field-login_text_position').show();
			} else {
				form.find('#fl-field-login_text_position').hide();
			}
		},
		_hideDocs: function() {
			var form            = $('.fl-builder-settings'),
            branding_selector   = form.find('#fl-field-uabb_helpful_information .uabb-docs-list');
            settings_tab        = form.find('.fl-builder-settings-tabs');
            get_anchor          =  settings_tab.find('a');
            $( get_anchor ).each(function() {

                if ( '#fl-builder-settings-tab-uabb_docs' === $(this) .attr('href') ) {

                    if ( 'yes' === branding_selector.data('branding') ) {
                        $( this ).hide();
                    } else {
                        $( this ).show();
                    }
                }
            });
		},
	});
})(jQuery);