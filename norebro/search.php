<?php
	get_header();

	// Settings
	$show_breadcrumbs = NorebroSettings::breadcrumbs_is_displayed();
	$sidebar_position = NorebroSettings::get_archive_sidebar_position();

	$sidebar_page_class = '';
	if ( $sidebar_position == 'left' ) {
		$sidebar_page_class = ' with-left-sidebar';
	} elseif ( $sidebar_position == 'right' ) {
		$sidebar_page_class = ' with-right-sidebar';
	}

	$sidebar_layout = NorebroSettings::page_sidebar_layout();
	$sidebar_class = '';
	if ( $sidebar_layout ) {
		$sidebar_class .= ' sidebar-' . $sidebar_layout;
	}

	$posts_grid = NorebroSettings::get( 'blog_page_layout', 'global' );
	$grid_style_class = ( $posts_grid == 'masonry' ) ? 'blog-posts-masonry' : 'blog-posts-classic';

	$posts_layout_item = NorebroSettings::get( 'blog_item_layout_type', 'global' );

	$columns_num = NorebroSettings::get( 'blog_columns_in_row', 'global' );
	if ( $posts_grid == 'classic' ) { 
		$columns_num = '1-1-1-1'; 
	}
	if ( $posts_layout_item == 'striped' ) { 
		$columns_num = '1-1-1-1'; 
	}
	if ( ! isset( $columns_num ) ) {
		$columns_num = '1-1-1-1';
	}
	$columns_class = NorebroHelper::parse_columns_to_css( $columns_num, false );
	$columns_double_class = NorebroHelper::parse_columns_to_css( $columns_num, true );

	$grid_item_style_class = '';
	$posts_without_paddings = (bool) NorebroSettings::get( 'blog_items_without_padding', 'global' );
	if ( $posts_without_paddings ) {
		$grid_item_style_class .= ' post-offset';
	}

	$page_wrapped = NorebroSettings::page_is_wrapped();

	if ( have_posts() ) : 
?>

<?php get_template_part( 'parts/elements/header-title' ); ?>

<?php get_template_part( 'parts/elements/breadcrumbs' ); ?>

<div class="page-container bottom-offset<?php if ( !$show_breadcrumbs ) { echo ' without-breadcrumbs'; } if ( !$page_wrapped ) { echo ' full'; } ?>">
	<div id="primary" class="content-area">
		
		<?php if ( $sidebar_position == 'left' ) : ?>
		<div class="page-sidebar sidebar-left<?php echo $sidebar_class; ?>">
			<aside id="secondary" class="widget-area">
				<?php dynamic_sidebar( 'norebro-sidebar-blog' ); ?>
			</aside>
		</div>
		<?php endif; ?>

		<div class="page-content<?php echo esc_attr( $sidebar_page_class ); ?>">
			<main id="main" class="site-main">
				<div class="vc_row search-page <?php echo esc_attr( $grid_style_class ); ?>">
				<?php
					$_post_i = 0;
					/* Start the Loop */
					while ( have_posts() ) : the_post();
						switch ( $post->post_type ) {
							case 'norebro_portfolio': // projects
								$parsed_post = NorebroObjectParser::parse_to_project_object( $post, NULL, $_post_i + 1 );
								NorebroHelper::set_storage_item_data( $parsed_post );

								$col_class = $columns_class;
								$grid_class = ' grid-item';

								if ( $parsed_post['grid_style'] == '2col' ) {
									$col_class = $columns_double_class;
									$grid_class = '';
								}

								// Animation calculating
								$_anim_attrs = '';
								if ( in_array( $parsed_post['animation_type'], array( 'sync', 'async' ) ) ) {
									$_anim_attrs .= ' data-aos-once="true"';
									$_anim_attrs .= ' data-aos="' . $parsed_post['animation_effect'] . '"';
									if ( $parsed_post['animation_type'] == 'async' ) {
										$columns_num = (int) substr( $columns_num, 0, 1);
										$_delay = ( 400 / $columns_num ) * ( $_post_i % $columns_num );
										$_delay = (int) $_delay - ( $_delay % 50 );
										$_anim_attrs .= ' data-aos-delay="' . $_delay . '"';
									}
								}

								echo '<div class="' . esc_attr( $col_class . $grid_class . $grid_item_style_class ) . ' masonry-block blog-post-masonry" ' . esc_attr( $_anim_attrs ) . '>';
								get_template_part( 'parts/portfolio-cards/default' );
								echo '</div>';
								break;
							
							default: // default post or undefined custom
								$parsed_post = NorebroObjectParser::parse_to_post_object( $post, NULL, $_post_i + 1 );
								NorebroHelper::set_storage_item_data( $parsed_post );

								$col_class = $columns_class;
								$grid_class = ' grid-item';

								if ( $parsed_post['grid_style'] == '2col' ) {
									$col_class = $columns_double_class;
									$grid_class = '';
								}

								// Animation calculating
								$_anim_attrs = '';
								if ( in_array( $parsed_post['animation_type'], array( 'sync', 'async' ) ) ) {
									$_anim_attrs .= ' data-aos-once="true"';
									$_anim_attrs .= ' data-aos="' . $parsed_post['animation_effect'] . '"';
									if ( $parsed_post['animation_type'] == 'async' ) {
										$columns_num = (int) substr( $columns_num, 0, 1);
										$_delay = ( 400 / $columns_num ) * ( $_post_i % $columns_num );
										$_delay = (int) $_delay - ( $_delay % 50 );
										$_anim_attrs .= ' data-aos-delay="' . $_delay . '"';
									}
								}
								echo '<div class="' . esc_attr( $col_class . $grid_class . $grid_item_style_class . ( ( $posts_grid == 'masonry' ) ? ' masonry-block blog-post-masonry' : '' ) ) . '" ' . esc_attr( $_anim_attrs ) . '>';

								switch ( $posts_layout_item ) {
									case 'side_image':
										get_template_part( 'parts/blog-cards/side_image' );
										break;
									case 'overlay':
										get_template_part( 'parts/blog-cards/overlay' );
										break;
									case 'simple':
										get_template_part( 'parts/blog-cards/simple' );
										break;
									case 'striped':
										get_template_part( 'parts/blog-cards/striped' );
										break;
									case 'classic':
									default:
										get_template_part( 'parts/blog-cards/classic' );
										break;
								}
								echo '</div>';
								break;
						}
						$_post_i++;

					endwhile;
				?>
				</div>
			</main><!-- #main -->
		</div>

		<?php if ( $sidebar_position == 'right' ) : ?>
		<div class="page-sidebar sidebar-right<?php echo $sidebar_class; ?>">
			<aside id="secondary" class="widget-area">
				<?php dynamic_sidebar( 'norebro-sidebar-blog' ); ?>
			</aside>
		</div>
		<?php endif; ?>

	</div><!-- #primary -->
</div>

<?php else : ?>
	<?php get_template_part( 'parts/content', 'none' ); ?>
<?php endif; ?>

<?php get_footer();