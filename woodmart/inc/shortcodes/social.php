<?php
/**
* ------------------------------------------------------------------------------------------------
* Share and follow buttons shortcode
* ------------------------------------------------------------------------------------------------
*/

if( ! function_exists( 'woodmart_shortcode_social' )) {
	function woodmart_shortcode_social($atts) {
		extract(shortcode_atts( array(
			'type' => 'share',
			'align' => 'center',
			'tooltip' => 'no',
			'style' => 'default', 
			'size' => 'default', 
			'form' => 'circle',
			'color' => 'dark',
			'css_animation' => 'none',
			'el_class' => '',
		), $atts ));

		$target = "_blank";

		$classes = 'woodmart-social-icons';
		$classes .= ' text-' . $align;
		$classes .= ' icons-design-' . $style;
		$classes .= ' icons-size-' . $size;
		$classes .= ' color-scheme-' . $color;
		$classes .= ' social-' . $type;
		$classes .= ' social-form-' . $form;
		$classes .= ( $el_class ) ? ' ' . $el_class : '';
		$classes .= woodmart_get_css_animation( $css_animation );

		$thumb_id = get_post_thumbnail_id();
		$thumb_url = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
		
		$page_link = get_the_permalink();
		if ( woodmart_woocommerce_installed() && is_shop() ) $page_link = get_permalink( get_option( 'woocommerce_shop_page_id' ) );
		if ( woodmart_woocommerce_installed() && ( is_product_category() || is_category() ) ) $page_link = get_category_link( get_queried_object()->term_id );
		if ( is_home() && ! is_front_page() ) $page_link = get_permalink( get_option( 'page_for_posts' ) );
		
		ob_start();
		?>

			<div class="<?php echo esc_attr( $classes ); ?>">
				<?php if ( ( $type == 'share' && woodmart_get_opt('share_fb') ) || ( $type == 'follow' && woodmart_get_opt( 'fb_link' ) != '')): ?>
					<div class="woodmart-social-icon social-facebook">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'fb_link' )) : 'https://www.facebook.com/sharer/sharer.php?u=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-facebook"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Facebook', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( ( $type == 'share' && woodmart_get_opt('share_twitter') ) || ( $type == 'follow' && woodmart_get_opt( 'twitter_link' ) != '')): ?>
					<div class="woodmart-social-icon social-twitter">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'twitter_link' )) : 'http://twitter.com/share?url=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-twitter"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Twitter', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( ( $type == 'share' && woodmart_get_opt('share_google') ) || ( $type == 'follow' && woodmart_get_opt( 'google_link' ) != '' ) ): ?>
					<div class="woodmart-social-icon social-google">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'google_link' )) : 'http://plus.google.com/share?url=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-google-plus"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Google', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( ( $type == 'share' && woodmart_get_opt('share_email') ) || ( $type == 'follow' && woodmart_get_opt( 'social_email' ) ) ): ?>
					<div class="woodmart-social-icon social-email">
						<a href="mailto:<?php echo '?subject=' . esc_html__('Check this ', 'woodmart') . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-envelope"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Email', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'isntagram_link' ) != ''): ?>
					<div class="woodmart-social-icon social-instagram">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'isntagram_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-instagram"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Instagram', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'youtube_link' ) != ''): ?>
					<div class="woodmart-social-icon social-youtube">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'youtube_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-youtube"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('YouTube', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( ( $type == 'share' && woodmart_get_opt('share_pinterest') ) || ( $type == 'follow' && woodmart_get_opt( 'pinterest_link' ) != '' ) ): ?>
					<div class="woodmart-social-icon social-pinterest">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'pinterest_link' )) : 'http://pinterest.com/pin/create/button/?url=' . $page_link . '&media=' . $thumb_url[0]; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-pinterest"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Pinterest', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'tumblr_link' ) != ''): ?>
					<div class="woodmart-social-icon social-tumblr">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'tumblr_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-tumblr"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Tumblr', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'linkedin_link' ) != ''): ?>
					<div class="woodmart-social-icon social-linkedin">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'linkedin_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-linkedin"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('linkedin', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'vimeo_link' ) != ''): ?>
					<div class="woodmart-social-icon social-vimeo">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'vimeo_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-vimeo"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Vimeo', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'flickr_link' ) != ''): ?>
					<div class="woodmart-social-icon social-flickr">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'flickr_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>"><i class="fa fa-flickr"></i><span class="woodmart-social-icon-name"><?php esc_html_e('Flickr', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'github_link' ) != ''): ?>
					<div class="woodmart-social-icon social-github">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'github_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>"><i class="fa fa-github"></i><span class="woodmart-social-icon-name"><?php esc_html_e('GitHub', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'dribbble_link' ) != ''): ?>
					<div class="woodmart-social-icon social-dribbble">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'dribbble_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>"><i class="fa fa-dribbble"></i><span class="woodmart-social-icon-name"><?php esc_html_e('Dribbble', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'behance_link' ) != ''): ?>
					<div class="woodmart-social-icon social-behance">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'behance_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-behance"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Behance', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'soundcloud_link' ) != ''): ?>
					<div class="woodmart-social-icon social-soundcloud">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'soundcloud_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-soundcloud"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Soundcloud', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'follow' && woodmart_get_opt( 'spotify_link' ) != ''): ?>
					<div class="woodmart-social-icon social-spotify">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'spotify_link' )) : '' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-spotify"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Spotify', 'woodmart') ?></span></a>
					</div>
				<?php endif ?>

				<?php if ( ( $type == 'share' && woodmart_get_opt('share_ok') ) || ( $type == 'follow' && woodmart_get_opt( 'ok_link' ) != '' ) ): ?>
					<div class="woodmart-social-icon social-ok">
						<a href="<?php echo ($type == 'follow') ? esc_url(woodmart_get_opt( 'ok_link' )) : 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-odnoklassniki"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Odnoklassniki', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'share' && woodmart_get_opt('share_whatsapp') || ( $type == 'follow' && woodmart_get_opt( 'whatsapp_link' ) != '' ) ): ?>
					<div class="woodmart-social-icon social-whatsapp">
						<a href="<?php echo ($type == 'follow') ? ( woodmart_get_opt( 'whatsapp_link' )) : 'whatsapp://send?text=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-whatsapp"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('WhatsApp', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>
				
				<?php if ( $type == 'share' && woodmart_get_opt('share_vk') || ( $type == 'follow' && woodmart_get_opt( 'vk_link' ) != '' ) ): ?>
					<div class="woodmart-social-icon social-vk">
						<a href="<?php echo ($type == 'follow') ? ( woodmart_get_opt( 'vk_link' )) : 'https://vk.com/share.php?url=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-vk"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('VK', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>
				
				<?php if ( $type == 'follow' && woodmart_get_opt( 'snapchat_link' ) != '' ): ?>
					<div class="woodmart-social-icon social-snapchat">
						<a href="<?php echo woodmart_get_opt( 'snapchat_link' ); ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-snapchat-ghost"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Snapchat', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

				<?php if ( $type == 'share' && woodmart_get_opt('share_tg') || ( $type == 'follow' && woodmart_get_opt( 'tg_link' ) != '' ) ): ?>
					<div class="woodmart-social-icon social-tg">
						<a href="<?php echo ($type == 'follow') ? ( woodmart_get_opt( 'tg_link' )) : 'https://telegram.me/share/url?url=' . $page_link; ?>" target="<?php echo esc_attr( $target ); ?>" class="<?php if( $tooltip == "yes" ) echo 'woodmart-tooltip'; ?>">
							<i class="fa fa-telegram"></i>
							<span class="woodmart-social-icon-name"><?php esc_html_e('Telegram', 'woodmart') ?></span>
						</a>
					</div>
				<?php endif ?>

			</div>

		<?php
		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}
	add_shortcode( 'social_buttons', 'woodmart_shortcode_social' );
}