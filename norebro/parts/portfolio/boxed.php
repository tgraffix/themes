<?php
	global $post;

	# Project settings
	$project = NorebroObjectParser::parse_to_project_object( $post );

	if ( is_array( $project['images_full'] ) && count( $project['images_full'] ) > 0 ) {
		$project['images'] = $project['images_full'];
	}

	if ( $project['show_navigation'] == 'prev_n_next' && ( $project['prev'] || $project['next'] )
			&& $project['navigation_position'] == 'top' ) {
		get_template_part( 'parts/elements/next-n-prev-projects' );
	}


	# Page container settings
	$show_breadcrumbs = NorebroSettings::breadcrumbs_is_displayed();
	$page_wrapped = NorebroSettings::page_is_wrapped();
	$add_content_padding = NorebroSettings::page_add_top_padding();

	$page_container_class = '';
	if ( !$show_breadcrumbs && $add_content_padding ) {
		$page_container_class .= ' without-breadcrumbs';
	}
	if ( ! $page_wrapped ) {
		$page_container_class .= ' full';
	}
	if ( $add_content_padding ) {
		$page_container_class .= ' bottom-offset';
	}

	if ( $show_breadcrumbs ) {
		get_template_part( 'parts/elements/breadcrumbs' );
	}

?>

<div class="page-container <?php echo $page_container_class; ?>">

	<?php if ( $project['custom_content_position'] == 'top' ) : ?>
	<div class="portfolio-page-custom-content">
		<?php echo do_shortcode( get_post_field( 'post_content', $post->ID ) ); ?>
	</div>
	<?php endif; ?>

	<!-- Content -->
	<div class="portfolio-page boxed" id="scroll-portfolio">
		<div id="scroll-portfolio">
			<div class="vc_col-sm-6 images-wrap">
				<?php if ( is_array( $project['images'] ) ) : ?>
					<?php foreach ( $project['images'] as $art ) : ?>
						<img src="<?php echo esc_url( $art ); ?>" alt="">
					<?php endforeach; ?>
				<?php endif; ?>
				<div class="clear"></div>
			</div>
			<div class="vc_col-sm-6 portfolio-content" data-norebro-content-scroll="#scroll-portfolio">
				<div class="vc_row">
					<div class="vc_col-sm-12">

						<?php if ( $project['categories_plain'] ) : ?>
							<?php $categories = explode( ', ', $project['categories_plain'] ) ?>
							<?php foreach ( $categories as $category ) : ?>
								<span class="tag"><?php echo esc_html( $category ); ?></span>
							<?php endforeach; ?>
						<?php endif; ?>

						<?php the_title( '<h2 class="title text-left">', '</h2>'); ?>
					</div>
					<div class="clear"></div>
					<div class="vc_col-sm-12">
						<?php echo wp_kses_post( $project['description'] ); ?>
						<?php
							if ( $project['custom_content_position'] == 'after_description' ) {
								echo do_shortcode( get_post_field( 'post_content', $post->ID ) );
							}
						?>
						<?php if ( $project['task'] ) :?>
						<h5 class="title text-left task-title"><?php esc_html_e( 'Task', 'norebro' ); ?></h5>
						<p><?php echo wp_kses( $project['task'], 'default' ); ?></p>
						<?php endif; ?>
					</div>
					<div class="info vc_col-sm-12">
						<ul class="info-list">
							<?php if ( $project['date'] ) : ?>
							<li>
								<h5 class="title uppercase"><?php esc_html_e( 'Date', 'norebro' ); ?></h5>
								<p><?php echo esc_html( $project['date'] ); ?></p>
							</li>
							<?php endif; ?>

							<?php if ( $project['skills'] ) : ?>
							<li>
								<h5 class="title uppercase"><?php esc_html_e( 'Skills', 'norebro' ); ?></h5>
								<p><?php echo wp_kses( $project['skills'], 'default' ); ?></p>
							</li>
							<?php endif; ?>

							<?php if ( $project['client'] ) : ?>
							<li>
								<h5 class="title uppercase"><?php esc_html_e( 'Client', 'norebro' ); ?></h5>
								<p><?php echo wp_kses( $project['client'], 'default' ); ?></p>
							</li>
							<?php endif; ?>

							<?php
							$tags = wp_get_post_terms($post->ID, 'norebro_portfolio_tags');
							if (!empty($tags)) {
								?>
								<li>
									<div class="title"><?php esc_html_e( 'Tags', 'norebro' ); ?></div>
									<p>
										<?php $i = 0; foreach ($tags as $tag):
											if ($i == 0):
												echo $tag->name;
											else:
												echo ', ' . $tag->name;
											endif;
											$i++; endforeach; ?>
									</p>
								</li>
								<?php
							}
							?>

							<?php if ( $project['custom_fields'] ) : ?>
								<?php foreach ( $project['custom_fields'] as $custom_field ) : ?>
								<li>
									<h5 class="title uppercase"><?php echo esc_html( $custom_field['title'] ); ?></h5>
									<p><?php echo esc_html( $custom_field['value'] ); ?></p>
								</li>
								<?php endforeach; ?>
							<?php endif; ?>
						</ul>

						<?php if ( ! $project['hide_sharing'] && $project['sharing_links'] && count( $project['sharing_links'] ) > 0 ) : ?>
						<h5 class="title text-left task-title"><?php esc_html_e( 'Share project', 'norebro' ); ?></h5>
						<div class="socialbar inline">
							<?php echo $project['sharing_links_html']; ?>
						</div>
						<?php endif; ?>

						<?php if ( $project['link'] ) : ?>
						<a href="<?php echo esc_url( $project['link'] ); ?>" class="open-website btn btn-brand" target="_blank">
							<span class="text">
								<?php esc_html_e( 'Open Website', 'norebro' ); ?>
							</span>
							<span class="icon ion-android-arrow-forward"></span>
						</a>
						<?php endif; ?>

					</div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>

	<?php if ( $project['custom_content_position'] == 'bottom' ) : ?>
	<div class="portfolio-page-custom-content">
		<?php echo do_shortcode( get_post_field( 'post_content', $post->ID ) ); ?>
	</div>
	<?php endif; ?>

</div><!--.page-container-->

<?php
	if ( $project['show_navigation'] == 'prev_n_next' && ( $project['prev'] || $project['next'] )
			&& $project['navigation_position'] == 'bottom' ) {
		get_template_part( 'parts/elements/next-n-prev-projects' );
	}
?>

<?php if ( comments_open() || get_comments_number() ) : ?>
	<div class="portfolio-comments">
		<?php comments_template(); ?>
	</div>
<?php endif; ?>
