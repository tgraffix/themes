<?php


function norebro_register_plugins() {
	$plugins = array(
		array(
			'name' => 'WPBakery Visual Composer',
			'slug' => 'js_composer',
			'source' => get_template_directory() . '/plugins/js_composer.zip',
			'required' => true,
			'version' => '5.4.7',
			'force_activation' => false,
			'force_deactivation' => false
		),
		array(
			'name' => 'Advanced Custom Fields PRO',
			'slug' => 'acf',
			'source' => get_template_directory() . '/plugins/acf_pro.zip',
			'required' => true,
			'version' => '5.6.10',
			'force_activation' => false,
			'force_deactivation' => false
		),
		array(
			'name' => 'WooCommerce',
			'slug' => 'woocommerce',
			'required' => true
		),
		array(
			'name' => 'YITH WooCommerce Wishlist',
			'slug' => 'yith-woocommerce-wishlist',
			'required' => false
		),
		array(
			'name' => 'Color and Image Swatches for Variable Product Attributes',
			'slug' => 'color-and-image-swatches-for-variable-product-attributes',
			'required' => false
		),
		array(
			'name' => 'Slider Revolution',
			'slug' => 'revslider',
			'source' => get_template_directory() . '/plugins/revslider.zip',
			'required' => true,
			'version' => '5.4.7.4',
			'force_activation' => false,
			'force_deactivation' => false
		),
		array(
			'name' => 'Norebro Portfolio',
			'slug' => 'norebro-portfolio',
			'source' => 'https://plugins.colabr.io/norebro-portfolio_v102.zip',
			'required' => true,
			'version' => '1.0.2',
			'force_activation' => false,
			'force_deactivation' => false
		),
		array(
			'name' => 'Norebro Shortcodes and Widgets',
			'slug' => 'norebro-extra',
			'source' => 'https://plugins.colabr.io/norebro-extra_v1013.zip',
			'required' => true,
			'version' => '1.0.13',
			'force_activation' => false,
			'force_deactivation' => false
		),
		array(
			'name' => 'One Click Import',
			'slug' => 'one-click-import',
			'source' => 'https://plugins.colabr.io/oneclick_demo.zip',
			'required' => false,
			'version' => '2.2.2',
			'force_activation' => false,
			'force_deactivation' => false
		),
		array(
			'name' => 'Contact Form 7 MailChimp Extension',
			'slug' => 'contact-form-7-mailchimp-extension',
			'required' => false
		),
		array(
			'name' => 'Contact Form 7',
			'slug' => 'contact-form-7',
			'required' => true
		),
		array(
			'name' => 'Envato Market',
			'slug' => 'envato-market',
			'source' => 'https://plugins.colabr.io/envato-market.zip',
			'required' => false,
			'version' => '2.0.0',
			'force_activation' => false,
			'force_deactivation' => false
		),
	);

	$config = array(
		'domain' => 'norebro',
		'default_path' => '',
		'menu' => 'install-required-plugins',
		'has_notices' => true,
		'is_automatic' => false,
		'message' => ''
	);
	
	tgmpa( $plugins, $config );
}

add_action( 'tgmpa_register', 'norebro_register_plugins' );