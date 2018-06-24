<?php
/**
* ------------------------------------------------------------------------------------------------
* Content in popup
* ------------------------------------------------------------------------------------------------
*/

if( ! function_exists( 'woodmart_shortcode_popup' ) ) {
	function woodmart_shortcode_popup( $atts, $content = '' ) {
		$output = '';
		$parsed_atts = shortcode_atts( array(
			'id' 	 	 => 'my_popup',
			'title' 	 => 'GO',
			'link' 	 	 => '',
			'color' 	 => 'default',
			'style'   	 => 'default',
			'size' 		 => 'default',
			'align' 	 => 'center',
			'button_inline' => 'no',
			'full_width' => 'no',
			'width' 	 => 800,
			'el_class' 	 => '',
		), $atts) ;

		extract( $parsed_atts );

		$parsed_atts['link'] = 'url:#' . esc_attr( $id ) . '|||';
		$parsed_atts['el_class'] = 'woodmart-open-popup';

		$output .= woodmart_shortcode_button( $parsed_atts , true );

		$output .= '<div id="' . esc_attr( $id ) . '" class="mfp-with-anim woodmart-content-popup mfp-hide" style="max-width:' . esc_attr( $width ) . 'px;"><div class="woodmart-popup-inner">' . do_shortcode( $content ) . '</div></div>';

		return $output;

	}
	add_shortcode( 'woodmart_popup', 'woodmart_shortcode_popup' );
}