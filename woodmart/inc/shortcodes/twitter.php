<?php
/**
* ------------------------------------------------------------------------------------------------
* Twitter element
* ------------------------------------------------------------------------------------------------
*/
if( ! function_exists( 'woodmart_twitter' ) ) {
	function woodmart_twitter( $atts ) {
		extract( shortcode_atts( array(
			'name' 	 => 'Twitter',
			'num_tweets' 	 => 5,
			'cache_time'   	 => 5,
			'consumer_key'    => '',
			'consumer_secret' => '',
			'access_token' => '',
			'accesstoken_secret' => '',
			'show_avatar' => 0,
			'avatar_size' => '',
			'exclude_replies' => false,
			'el_class' 	 => '',
		), $atts) );

		ob_start();
		
		?>
		<div class="woodmart-twitter-element woodmart-twitter-vc-element <?php if ( $el_class ) echo esc_attr( $el_class );?>">
			<?php woodmart_get_twitts( $atts ); ?>
		</div>
		<?php

		return  ob_get_clean();
	}	
	add_shortcode( 'woodmart_twitter', 'woodmart_twitter' );
}