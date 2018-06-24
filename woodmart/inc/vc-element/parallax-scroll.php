<?php
/**
* ------------------------------------------------------------------------------------------------
* 
* ------------------------------------------------------------------------------------------------
*/

if( ! function_exists( 'woodmart_parallax_scroll_map' ) ) { 
    function woodmart_parallax_scroll_map(){
        return array(
        	array(
        		'type' => 'checkbox',
        		'heading' => esc_html__( 'Enable parallax on mouse scroll', 'woodmart' ),
        		'param_name' => 'parallax_scroll',
        		'group' => esc_html__( 'Woodmart Extras', 'woodmart' ),
        		'value' => array( esc_html__( 'Yes, please', 'woodmart' ) => 'yes' )
        	),
        	array(
        		'group'            => esc_html__( 'Woodmart Extras', 'woodmart' ),
        		'heading'          => esc_html__( 'X axis translation', 'woodmart' ),
                'description'      => esc_html__( 'Recommended -200 to 200', 'woodmart' ),
        		'type'             => 'textfield',
        		'param_name'       => 'scroll_x',
                'edit_field_class' => 'vc_col-sm-4 vc_column',
        		'value'            => 0,
        		'dependency'       => array(
        			'element' => 'parallax_scroll',
                    'value' => array( 'yes' ),
        		),
        	),
        	array(
        		'group'            => esc_html__( 'Woodmart Extras', 'woodmart' ),
        		'heading'          => esc_html__( 'Y axis translation', 'woodmart' ),
                'description'      => esc_html__( 'Recommended -200 to 200', 'woodmart' ),
        		'type'             => 'textfield',
        		'param_name'       => 'scroll_y',
                'edit_field_class' => 'vc_col-sm-4 vc_column',
        		'value'            => -80,
        		'dependency'       => array(
        			'element' => 'parallax_scroll',
        			'value' => array( 'yes' ),
        		),
        	),
        	array(
        		'group'            => esc_html__( 'Woodmart Extras', 'woodmart' ),
        		'heading'          => esc_html__( 'Z axis translation', 'woodmart' ),
                'description'      => esc_html__( 'Recommended -200 to 200', 'woodmart' ),
        		'type'             => 'textfield',
        		'param_name'       => 'scroll_z',
                'edit_field_class' => 'vc_col-sm-4 vc_column',
        		'value'            => 0,
        		'dependency'       => array(
        			'element' => 'parallax_scroll',
        			'value' => array( 'yes' ),
        		),
        	),
        	array(
        		'group'       => esc_html__( 'Woodmart Extras', 'woodmart' ),
        		'heading'     => esc_html__( 'Parallax speed', 'woodmart' ),
        		'description' => esc_html__( 'Define the parallax speed on mouse scroll. By default - 30', 'woodmart' ),
        		'type'        => 'dropdown',
        		'param_name'  => 'scroll_smooth',
        		'value'       => array( '', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ),
        		'dependency'  => array(
        			'element' => 'parallax_scroll',
        			'value' => array( 'yes' ),
        		),
        	),
        );
    }
}

if( ! function_exists( 'woodmart_add_parallax_scroll_field' ) ) { 
	function woodmart_add_parallax_scroll_field() {

	    $vc_image_new_params = woodmart_parallax_scroll_map();
	     
	    vc_add_params( 'vc_single_image', $vc_image_new_params ); 
        
        vc_add_params( 'vc_column', $vc_image_new_params ); 
        
	}      
	add_action( 'vc_after_init', 'woodmart_add_parallax_scroll_field', 200 ); 
}

if( ! function_exists( 'woodmart_parallax_scroll_data' ) ) { 
    function woodmart_parallax_scroll_data( $x, $y, $z, $smooth ) {
    	$data = array();
        
        woodmart_enqueue_script( 'woodmart-parallax-scroll' );

    	if ( $x ) $data[] = '"x":' . $x;
        if ( $y ) $data[] = '"y":' . $y;
        if ( $z ) $data[] = '"z":' . $z;
        if ( $smooth ) $data[] = '"smoothness":' . $smooth;

    	return 'data-parallax={' . implode( ',', $data ) . '} ';
    }
}

if( ! function_exists( 'woodmart_parallax_scroll' ) ) {
	function woodmart_parallax_scroll( $output, $obj, $attr ) {
		if ( ! empty( $attr['parallax_scroll'] ) ) {
            $x = $attr['scroll_x'] ? $attr['scroll_x'] : 0;
            $y = $attr['scroll_y'] ? $attr['scroll_y'] : -80;
            $z = $attr['scroll_z'] ? $attr['scroll_z'] : 0;
            $smooth = isset( $attr['scroll_smooth'] ) && $attr['scroll_smooth'] ? $attr['scroll_smooth'] : 30;
             
            $parallax = woodmart_parallax_scroll_data( $x, $y, $z, $smooth );
            
            if ( strpos( $output, 'wpb_single_image' ) !== false ) {
                $element = 'wpb_single_image';
            } else if ( strpos( $output, 'wpb_column' ) !== false ){
                $element = 'wpb_column';
            }
            
            $output = preg_replace( '/<div(.*?)class="' . $element . '/is', '<div$1' . $parallax . 'class="' . $element, $output, 1 );
		}
		return $output;
	}
}

add_filter( 'vc_shortcode_output', 'woodmart_parallax_scroll', 10, 3 );