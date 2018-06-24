<?php
/**
* ------------------------------------------------------------------------------------------------
* Team member shortcode
* ------------------------------------------------------------------------------------------------
*/
if( ! function_exists( 'woodmart_shortcode_team_member' ) ) {
	function woodmart_shortcode_team_member( $atts, $content = "" ) {
		$output = $title = $classes = '';
		extract( shortcode_atts( array(
	        'align' => 'left',
	        'name' => '',
	        'position' => '',
	        'twitter' => '',
	        'facebook' => '',
	        'google_plus' => '',
	        'skype' => '',
	        'linkedin' => '',
	        'instagram' => '',
	        'image' => '',
	        'img_size' => '270x170',
			'style' => 'default', // circle colored
			'size' => 'default', // circle colored
			'form' => 'circle',
			'woodmart_color_scheme' => 'dark',
			'layout' => 'default',
			'css_animation' => 'none',
			'el_class' => ''
		), $atts ) );

		$classes .= ' member-layout-' . $layout;
		$classes .= ' color-scheme-' . $woodmart_color_scheme;
		$classes .= woodmart_get_css_animation( $css_animation );
		$classes .= ( $el_class ) ? ' ' . $el_class : '';

		$img_id = preg_replace( '/[^\d]/', '', $image );
		
		$img = '';
		
		if ( function_exists( 'wpb_getImageBySize' ) ) {
			$img = wpb_getImageBySize( array( 'attach_id' => $img_id, 'thumb_size' => $img_size, 'class' => 'team-member-avatar-image' ) );
		}

	    $socials = '';

        if ($linkedin != '' || $twitter != '' || $facebook != '' || $skype != '' || $google_plus != '' || $instagram != '') {
            $socials .= '<div class="member-social"><div class="woodmart-social-icons icons-design-' . esc_attr( $style ) . ' icons-size-' . esc_attr( $size ) .' social-form-' . esc_attr( $form ) .'">';
                if ($facebook != '') {
                    $socials .= '<div class="woodmart-social-icon social-facebook"><a href="'.esc_url( $facebook ).'"><i class="fa fa-facebook"></i></a></div>';
                }
                if ($twitter != '') {
                    $socials .= '<div class="woodmart-social-icon social-twitter"><a href="'.esc_url( $twitter ).'"><i class="fa fa-twitter"></i></a></div>';
                }
                if ($google_plus != '') {
                    $socials .= '<div class="woodmart-social-icon social-google-plus"><a href="'.esc_url( $google_plus ).'"><i class="fa fa-google-plus"></i></a></div>';
                }
                if ($linkedin != '') {
                    $socials .= '<div class="woodmart-social-icon social-linkedin"><a href="'.esc_url( $linkedin ).'"><i class="fa fa-linkedin"></i></a></div>';
                }
                if ($skype != '') {
                    $socials .= '<div class="woodmart-social-icon social-skype"><a href="'.esc_url( $skype ).'"><i class="fa fa-skype"></i></a></div>';
                }
                if ($instagram != '') {
                    $socials .= '<div class="woodmart-social-icon social-instagram"><a href="'.esc_url( $instagram ).'"><i class="fa fa-instagram"></i></a></div>';
                }
            $socials .= '</div></div>';
        }

	    $output .= '<div class="team-member text-' . esc_attr( $align ) . ' '. esc_attr( $classes ) .'">';

		    if(@$img['thumbnail'] != ''){

	            $output .= '<div class="member-image-wrapper"><div class="member-image">';
	                $output .=  $img['thumbnail'];
	            $output .= '</div></div>';
		    }

	        $output .= '<div class="member-details">';
	            if($name != ''){
	                $output .= '<h4 class="member-name">' . ( $name ) . '</h4>';
	            }
			    if($position != ''){
				    $output .= '<span class="member-position">' . ( $position ) . '</span>';
			    }
			    $output .= '<div class="member-bio">';
			    $output .= do_shortcode($content);
			    $output .=  '</div>';

	    		$output .= $socials;

	    	$output .= '</div>';



	    $output .= '</div>';


	    return $output;
	}
	add_shortcode( 'team_member', 'woodmart_shortcode_team_member' );
}