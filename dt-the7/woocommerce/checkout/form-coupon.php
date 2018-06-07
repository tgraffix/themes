<?php
/**
 * Checkout coupon form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-coupon.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

if ( ! wc_coupons_enabled() || ! empty( WC()->cart->applied_coupons ) ) { // @codingStandardsIgnoreLine.
	return;
}

?>
<div class="wc-coupon-wrap">
<?php
$info_message = sprintf(
	' <span class="showcoupon-tag"><i class="fa fa-tag" aria-hidden="true"></i>%s</span> <a href="#" class="showcoupon">%s</a>',
	__( 'Have a coupon?', 'the7mk2' ),
	__( 'Click here to enter your code', 'the7mk2' )
);
$info_message = apply_filters( 'woocommerce_checkout_coupon_message', $info_message );
wc_print_notice( $info_message, 'notice' );
?>
<form class="checkout_coupon woocommerce-form-coupon" method="post" style="display:none">
    <div class="form-coupon-wrap">
		<p><?php esc_html_e( 'If you have a coupon code, please apply it below.', 'the7mk2' ); ?></p>

		<span class="coupon">
			<input type="text" name="coupon_code" class="input-text" placeholder="<?php esc_attr_e( 'Coupon code', 'the7mk2' ) ?>" id="coupon_code" value="" />
		</span>

		<button type="submit" class="button" name="apply_coupon" value="<?php esc_attr_e( 'Apply Coupon', 'the7mk2' ); ?>"><?php esc_html_e( 'Apply Coupon', 'the7mk2' ); ?></button>
    </div>
	<div class="clear"></div>
</form>
</div>