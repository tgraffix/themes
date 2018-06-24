<?php
/**
* ------------------------------------------------------------------------------------------------
* Portfolio shortcode
* ------------------------------------------------------------------------------------------------
*/

if( ! function_exists( 'woodmart_shortcode_portfolio' ) ) {
	function woodmart_shortcode_portfolio( $atts ) {
		if ( woodmart_get_opt( 'disable_portfolio' ) ) return;
		
		$output = $title = $el_class = '';
		$parsed_atts = shortcode_atts( array(
			'posts_per_page' => woodmart_get_opt( 'portoflio_per_page' ),
			'filters' => false,
			'categories' => '',
			'style' => woodmart_get_opt( 'portoflio_style' ),
			'columns' => woodmart_get_opt( 'projects_columns' ),
			'spacing' => woodmart_get_opt( 'portfolio_spacing' ),
			'full_width' => woodmart_get_opt( 'portfolio_full_width' ),
			'pagination' => woodmart_get_opt( 'portfolio_pagination' ),
			'ajax_page' => '',
			'orderby' => woodmart_get_opt( 'portoflio_orderby' ),
			'order' => woodmart_get_opt( 'portoflio_order' ),
			'portfolio_location' => '',
			'layout' => 'grid',
			// 'speed' => '5000',
			// 'slides_per_view' => '1',
			// 'wrap' => '',
			// 'autoplay' => 'no',
			// 'hide_pagination_control' => '',
			// 'hide_prev_next_buttons' => '',
			// 'scroll_per_page' => 'yes',
			'el_class' => ''
		), $atts );

		extract( $parsed_atts );

		$encoded_atts = json_encode( $parsed_atts );

		$is_ajax = (defined( 'DOING_AJAX' ) && DOING_AJAX);
		$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
		if( $ajax_page > 1 ) $paged = $ajax_page;

		$s = false;

		if( isset( $_REQUEST['s'] ) ) {
			$s = sanitize_text_field( $_REQUEST['s'] );
		}

		$args = array(
			'post_type' => 'portfolio',
			'posts_per_page' => $posts_per_page,
			'orderby' => $orderby,
			'order' => $order,
			'paged' => $paged
		);

		if( $s ) {
			$args['s'] = $s;
		}
 
		if( get_query_var('project-cat') != '' ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'project-cat',
					'field'    => 'slug',
					'terms'    => get_query_var('project-cat')
				),
			);
		}

		if( $categories != '' ) {

			$args['tax_query'] = array(
				array(
					'taxonomy' => 'project-cat',
					'field'    => 'term_id',
					'operator' => 'IN',
					'terms'    => $categories
				),
			);
		}

		if ( $portfolio_location == 'page' ) {
			$filters = woodmart_get_opt( 'portoflio_filters' );
		}

		if ( empty( $style ) || $style == 'inherit' ) $style = woodmart_get_opt( 'portoflio_style' );

		woodmart_set_loop_prop( 'portfolio_style', $style );
		woodmart_set_loop_prop( 'portfolio_column', $columns );
		
		if ( $style == 'parallax' ) {
			woodmart_enqueue_script( 'woodmart-panr-parallax' );
		}

		$query = new WP_Query( $args );

		ob_start();

		?>

			<?php if ( ! $is_ajax ): ?>
			<div class="<?php echo ($portfolio_location == 'page') ? 'site-content page-portfolio ' : ''; ?>portfolio-layout-<?php echo ($full_width) ? 'full-width' : 'boxed'; ?> col-sm-12" role="main">
			<?php endif ?>

				<?php if ( $query->have_posts() ) : ?>
					<?php if ( ! $is_ajax ): ?>
						<div class="row portfolio-spacing-<?php echo esc_attr( $spacing ); ?> <?php if( $full_width ) echo 'vc_row vc_row-fluid vc_row-no-padding" data-vc-full-width="true" data-vc-full-width-init="true" data-vc-stretch-content="true'; ?>">

							<?php if ( ! is_tax() && $filters && ! $s && $layout != 'carousel' ): ?>
								<?php 
									$cats = get_terms( 'project-cat', array( 'parent' => $categories ) );
									if( ! is_wp_error( $cats ) && ! empty( $cats ) ) {
										?>
										<div class="col-sm-12 portfolio-filter">
											<ul class="masonry-filter list-inline text-center">
												<li><a href="#" data-filter="*" class="filter-active"><?php esc_html_e('All', 'woodmart'); ?></a></li>
											<?php
											foreach ($cats as $key => $cat) {
												?>
													<li><a href="#" data-filter=".proj-cat-<?php echo esc_attr( $cat->slug ); ?>"><?php echo esc_html( $cat->name ); ?></a></li>
												<?php
											}
											?>
											</ul>
										</div>
										<?php
									}
								 ?>

							<?php endif ?>

							<div class="clear"></div>

							<div class="<?php echo ($layout != 'carousel') ? 'masonry-container' : ''; ?> woodmart-portfolio-holder" data-atts="<?php echo esc_attr( $encoded_atts ); ?>" data-source="shortcode" data-paged="1">
					<?php endif ?>

							<?php 
								/* The loop */
								 if ( $layout == 'carousel' ) {
									echo woodmart_generate_posts_slider( $parsed_atts, $query );
								}else {
									while ( $query->have_posts() ) {
										$query->the_post();
										get_template_part( 'content', 'portfolio' );
									}
								}
							?>

					<?php if ( ! $is_ajax ): ?>
								</div>
							</div>

						<div class="vc_row-full-width"></div>

						<?php
							if ( $query->max_num_pages > 1 && !$is_ajax && $pagination != 'disable' && $layout != 'carousel' ) {
								?>
							    	<div class="portfolio-footer">
							    		<?php if ( $pagination == 'infinit' || $pagination == 'load_more'): ?>
							    			<a href="#" class="btn woodmart-load-more woodmart-portfolio-load-more load-on-<?php echo ($pagination == 'load_more') ? 'click' : 'scroll'; ?>"><span class="load-more-label"><?php esc_html_e('Load more projects', 'woodmart'); ?></span><span class="load-more-loading"><?php esc_html_e('Loading...', 'woodmart'); ?></span></a>
						    			<?php else: ?>
							    			<?php query_pagination( $query->max_num_pages ); ?>
							    		<?php endif ?>
							    	</div>
							    <?php
							}
						?>
					<?php endif ?>

				<?php elseif ( ! $is_ajax ) : ?>
					<?php get_template_part( 'content', 'none' ); ?>
				<?php endif; ?>

			<?php if ( ! $is_ajax ): ?>
			</div><!-- .site-content -->
			<?php endif ?>
		<?php

		$output .= ob_get_clean();

		wp_reset_postdata();
		
		woodmart_reset_loop();

	    if( $is_ajax ) {
	    	$output =  array(
	    		'items' => $output,
	    		'status' => ( $query->max_num_pages > $paged ) ? 'have-posts' : 'no-more-posts'
	    	);
	    }

		return $output;
	}
	add_shortcode( 'woodmart_portfolio', 'woodmart_shortcode_portfolio' );
}


if( ! function_exists( 'woodmart_get_portfolio_shortcode_ajax' ) ) {
	add_action( 'wp_ajax_woodmart_get_portfolio_shortcode', 'woodmart_get_portfolio_shortcode_ajax' );
	add_action( 'wp_ajax_nopriv_woodmart_get_portfolio_shortcode', 'woodmart_get_portfolio_shortcode_ajax' );
	function woodmart_get_portfolio_shortcode_ajax() {
		if( ! empty( $_POST['atts'] ) ) {
			$atts = $_POST['atts'];
			$paged = (empty($_POST['paged'])) ? 2 : (int) $_POST['paged'] + 1;
			$atts['ajax_page'] = $paged;

			$data = woodmart_shortcode_portfolio($atts);

			echo json_encode( $data );

			die();
		}
	}
}