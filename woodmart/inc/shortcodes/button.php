<?php
/**
* ------------------------------------------------------------------------------------------------
* Buttons shortcode
* ------------------------------------------------------------------------------------------------
*/

if( ! function_exists( 'woodmart_shortcode_button' ) ) {
	function woodmart_shortcode_button( $atts, $popup = false ) {
		extract( shortcode_atts( array(
			'title' 	 => 'GO',
			'link' 	 	 => '',
			'color' 	 => 'default',
			'style'   	 => 'default',
			'shape'   	 => 'rectangle',
			'size' 		 => 'default',
			'align' 	 => 'center',
			'button_inline' => 'no',
			'full_width' => 'no',
			'bg_color' => '',
			'bg_color_hover' => '',
			'color_scheme' => 'light',
			'color_scheme_hover' => 'light',
			'css_animation' => 'none',
			'el_class' 	 => '',
		), $atts) );

		$attributes = woodmart_get_link_attributes( $link, $popup );

		$btn_class = 'btn';

		$id = 'button-' . uniqid();

		$wrap_class = 'woodmart-button-wrapper';
		$wrap_class .= woodmart_get_css_animation( $css_animation );

		$btn_class .= ' btn-color-' . $color;
		$btn_class .= ' btn-scheme-' . $color_scheme;
		$btn_class .= ' btn-scheme-hover-' . $color_scheme_hover;
		$btn_class .= ' btn-style-' . $style;
		$btn_class .= ' btn-shape-' . $shape;
		$btn_class .= ' btn-size-' . $size;
		if( $full_width == 'yes' ) $btn_class .= ' btn-full-width';

		$wrap_class .= ' text-' . $align;
		if( $button_inline == 'yes' ) $wrap_class .= ' btn-inline';

		if( $el_class != '' ) $btn_class .= ' ' . $el_class;

		$attributes .= ' class="' . $btn_class . '"';

		$output = '<div id="' . esc_attr( $id ) . '" class="' . esc_attr( $wrap_class ) . '"><a ' . $attributes . '>' . esc_html ( $title ) . '</a></div>';

		if ( $color == 'custom' && $bg_color ) {
			$output .= '<style>';
			    // Custom Color
				$output .= '#' . $id . ' a {';
				if( $style == 'bordered' || $style == 'link') {
					$output .= 'border-color:' . $bg_color . ';';
				} else {
					$output .= 'background-color:' . $bg_color . ';';
				}
				$output .= '}';

				$output .= '#' . $id . ' a:focus,';
				$output .= '#' . $id . ' a:hover {';
				if( $style == 'bordered') {
					$output .= 'border-color:' . $bg_color_hover . ';';
					$output .= 'background-color:' . $bg_color_hover . ';';
				} else if( $style == 'link' ) {
					$output .= 'border-color:' . $bg_color_hover . ';';
				} else {
					$output .= 'background-color:' . $bg_color_hover . ';';
				}
				$output .= '}';
			$output .= '</style>';
		}

		return $output;

	}
	add_shortcode( 'woodmart_button', 'woodmart_shortcode_button' );
}