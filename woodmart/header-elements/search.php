<?php
	$extra_class = '';
	$count = ( $params['display'] == 'dropdown' ) ? 20 : 40;
	$icon_type = $params['icon_type'];

	if( $params['display'] == 'form' ) {
		woodmart_search_form( array(
			'ajax' => $params['ajax'],
			'count' => $params['ajax_result_count'],
			'post_type' => $params['post_type'],
			'show_categories' => $params['categories_dropdown'],
			'icon_type' => $icon_type,
			'custom_icon' => $params['custom_icon'],
		) );
		return;
	}

	if ( $icon_type == 'custom' ) {
		$extra_class .= ' woodmart-search-custom-icon';
	}
?>
<div class="whb-search search-button<?php echo esc_attr( $extra_class ); ?>">
	<a href="#">
		<span class="search-button-icon">
			<?php 
				if ( $icon_type == 'custom' ) {
					echo whb_get_custom_icon( $params['custom_icon'] );
				}
			?>
		</span>
	</a>
	<?php if ( $params['display'] == 'dropdown' ): ?>
		<?php 
			woodmart_search_form( array(
				'ajax' => $params['ajax'],
				'count' => $params['ajax_result_count'],
				'post_type' => $params['post_type'],
				'type' => 'dropdown',
				'icon_type' => $icon_type,
				'custom_icon' => $params['custom_icon'],
			) );
		?>
	<?php endif ?>
</div>