<?php
/**
* ------------------------------------------------------------------------------------------------
* HTML block shortcode
* ------------------------------------------------------------------------------------------------
*/

if( ! function_exists( 'woodmart_html_block_shortcode' ) ) {
	function woodmart_html_block_shortcode($atts) {
		extract(shortcode_atts(array(
			'id' => 0
		), $atts));

		return woodmart_get_html_block($id);
	}
	add_shortcode( 'html_block', 'woodmart_html_block_shortcode' );
}