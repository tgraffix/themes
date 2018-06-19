<?php
/**
 * Variable product add to cart
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product, $post;

?>

<?php do_action( 'woocommerce_before_add_to_cart_form' ); ?>

<form class="variations_form cart" method="post" style="display:none" enctype='multipart/form-data' data-product_id="<?php echo esc_attr( $post->ID ); ?>" data-product_variations="<?php echo esc_attr( json_encode( $available_variations ) ) ?>">
	<?php //if ( ! empty( $available_variations ) ) : ?>
	
		<div class="variations">
				
				<?php $loop = 0; foreach ( $attributes as $name => $options ) : $loop++;
				
				$display = ( 'variation_'.sanitize_title( $name )  == 'variation_pa_frame' ) ? 'none' : 'block';

				?>
				
					<div id="variation_<?php echo sanitize_title( $name ); ?>" class="variation" style="display:<?php echo esc_attr( $display ); ?>">
						<div class="label">
							<label for="<?php echo sanitize_title( $name ); ?>">
								<?php echo wc_attribute_label( $name ); ?>:
							</label>
						</div>
						<div class="variation_name_value" style="display:none"><?php echo wc_attribute_label( $name ); ?></div>
						<div class="value">

						<select style="display:none;" id="<?php echo esc_attr( sanitize_title( $name ) ); ?>" name="attribute_<?php echo sanitize_title( $name ); ?>" data-attribute_name="attribute_<?php echo sanitize_title( $name ); ?>">
							<option value=""><?php echo esc_html__( 'Choose an option', 'norebro' ) ?>&hellip;</option>
							<?php
								if ( is_array( $options ) ) {

									if ( isset( $_REQUEST[ 'attribute_' . sanitize_title( $name ) ] ) ) {
										$selected_value = $_REQUEST[ 'attribute_' . sanitize_title( $name ) ];
									} elseif ( isset( $selected_attributes[ sanitize_title( $name ) ] ) ) {
										$selected_value = $selected_attributes[ sanitize_title( $name ) ];
									} else {
										$selected_value = '';
									}

									// Get terms if this is a taxonomy - ordered
									if ( taxonomy_exists( $name ) ) {

										$terms = wc_get_product_terms( $post->ID, $name, array( 'fields' => 'all' ) );

										foreach ( $terms as $term ) {
											$term_id =  $term->term_id;
											$thumbnail_id = get_woocommerce_term_meta( $term_id,'', 'phoen_color', true );
											
										
											if ( ! in_array( $term->slug, $options ) ) {
												continue;
											}
											echo '<option value="' . esc_attr( $term->slug ). '" ' . selected( sanitize_title( $selected_value ), sanitize_title( $term->slug ), false ) . '>' . apply_filters( 'woocommerce_variation_option_name', $term->name ).'</option>';
										}

									} else {

										foreach ( $options as $option ) {
											echo '<option value="' . esc_attr( sanitize_title( $option ) ) . '" ' . selected( sanitize_title( $selected_value ), sanitize_title( $option ), false ) . '>' . esc_html( apply_filters( 'woocommerce_variation_option_name', $option ) ) . '</option>';
										}

									 } 
								}
							?>
						</select>
						<?php
							
							
						$terms = get_the_terms( $post->ID , sanitize_title( $name ) );

						?>
						<div class="variation_descriptions_wrapper">
							<div class="variation_descriptions" id="<?php echo sanitize_title( $name ); ?>_descriptions" style="display:none;">
								<div rel="<?php echo sanitize_title( $name ); ?>_buttons" class="var-notice header-font" style="opacity: 1; right: 0px;">
									<div class="vertAlign" style="margin-top: 0px;">Please select</div>
								</div>
								<?php
									foreach($terms as $term)
									{
										?>
										<div class="variation_description" id="<?php echo esc_attr( sanitize_title( $name ) ); ?>_<?php echo esc_attr( $term->slug ); ?>_description" style="display: none;">
											<?php
												$term_id =  $term->term_id;
												
												$thumbnail_id = get_woocommerce_term_meta( $term_id,'', 'phoen_color', true );
												
												if($thumbnail_id[sanitize_title( $name ).'_swatches_id_phoen_color'][0] != ''){
														
													echo "<div class='".$term->slug."_image'><span class='phoen_swatches' style='height:32px; line-height:30px; width:32px; display:block; border:1px solid #ccc;  background-color:".$thumbnail_id[sanitize_title( $name ).'_swatches_id_phoen_color'][0]."'></span></div>";	
													
												}else{
													echo "<div class='".$term->slug."_image'><span class='phoen_swatches' style='height:32px; line-height:30px; min-width:22px; width:auto; display:inline-block; border:1px solid #ccc; text-align: center; padding:0 5px; margin-bottom:0;'>".$term->name."</span></div>";	
												}?>												
										</div>
										<?php
									
									}
								?>
							</div>
						</div>
						<?php
							if ( sizeof( $attributes ) === $loop ) {
								// echo '<a class="reset_variations" href="#reset">' . esc_html__( 'Clear selection', 'norebro' ) . '</a>';
							}
						?></div>
					</div>
				<?php endforeach;?>

		</div>

		<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

		<div class="single_variation_wrap" style="display:none;">
		
			<?php do_action( 'woocommerce_before_single_variation' ); ?>

			<div class="single_variation"></div>

			<div class="variations_button">
				
				<?php woocommerce_quantity_input( array(
					'input_value' => ( isset( $_POST['quantity'] ) ? wc_stock_amount( $_POST['quantity'] ) : 1 )
				) ); ?>
		
				<button type="submit" class="single_add_to_cart_button btn brand-bg-color brand-border-color brand-color-hover alt">
					<?php echo esc_html( $product->single_add_to_cart_text() ); ?>
				</button>
				
			</div>

			<input type="hidden" name="add-to-cart" value="<?php echo esc_attr( $product->get_id() ); ?>" />
			<input type="hidden" name="product_id" value="<?php echo esc_attr( $post->ID ); ?>" />
			<input type="hidden" name="variation_id" class="variation_id" value="" />

			<?php do_action( 'woocommerce_after_single_variation' ); ?>
			
		</div>

		<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>

	<?php /*else : ?>

		<p class="stock out-of-stock"><?php _e( 'This product is currently out of stock and unavailable.', 'norebro' ); ?></p>

	<?php endif; */ ?>

</form>



<?php do_action( 'woocommerce_after_add_to_cart_form' ); ?>