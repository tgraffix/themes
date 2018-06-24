<?php if ( ! defined('WOODMART_THEME_DIR')) exit('No direct script access allowed');

/**
 * ------------------------------------------------------------------------------------------------
 * Backend class that enques main scripts and CSS.
 * ------------------------------------------------------------------------------------------------
 */

if( ! class_exists( 'WOODMART_HB_Backend' ) ) {
	class WOODMART_HB_Backend {

		private static $_instance = null;

		private $_builder = null;

		public function __construct() {

			$this->_builder = WOODMART_Header_Builder::get_instance();

			if( isset( $_GET['tab'] ) && $_GET['tab'] === 'builder' ) $this->init();

		}

		protected function __clone() {}

		static public function get_instance() {

			if( is_null( self::$_instance ) ) {
				self::$_instance = new self();
			}

			return self::$_instance;
		}

		public function init() {
			$this->_add_actions();
		}

		private function _add_actions() {
			add_action( 'admin_enqueue_scripts', array( $this, 'scripts'), 50 );
		}

		public function scripts() {

			$dev = apply_filters( 'whb_debug_mode', false );

			$assets_path = ( $dev ) ? WOODMART_HEADER_BUILDER . '/public' :  WOODMART_ASSETS ;

			wp_register_script( 'woodmart-admin-builder', $assets_path . '/js/builder.js', array(), '', true );
			wp_enqueue_style( 'woodmart-admin-builder', $assets_path . '/css/builder.css');

			wp_localize_script( 'woodmart-admin-builder', 'headerBuilder', array(
				'sceleton' => $this->_builder->factory->get_header(false)->get_structure(),
				'settings' => $this->_builder->factory->get_header(false)->get_settings(),
				'name' => WOODMART_HB_DEFAULT_NAME,
				'id' => WOODMART_HB_DEFAULT_ID,
				'headersList' => $this->_builder->list->get_all(),
				'headersExamples' => $this->_builder->list->get_examples(),
				'defaultHeader' => $this->_builder->manager->get_default_header()
			) );

			wp_enqueue_script( 'woodmart-admin-builder' );

			wp_enqueue_editor();
			wp_enqueue_media();

		}


	}


	$_GLOBALS['woodmart_hb_backend'] = WOODMART_HB_Backend::get_instance();
}
