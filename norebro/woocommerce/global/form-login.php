<?php
/**
 * Login form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/form-login.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( is_user_logged_in() ) {
	return;
}

?>
<form method="post" class="login" <?php if ( $hidden ) echo 'style="display:none;"'; ?>>

	<?php do_action( 'woocommerce_login_form_start' ); ?>

	<?php if ( $message ) echo wpautop( wptexturize( $message ) ); ?>

	<div class="vc_row fields">
		<div class="vc_col-md-6">
			<input type="text" class="input-text" name="username" id="username" placeholder="Username" />
		</div>
		<div class="vc_col-md-6">
			<input class="input-text" type="password" name="password" id="password" placeholder="Password"/>
		</div>
	</div>
	<div class="clear"></div>

	<?php do_action( 'woocommerce_login_form' ); ?>

	<p class="form-row">
		<?php wp_nonce_field( 'woocommerce-login' ); ?>
		<input type="submit" class="btn" name="login" value="<?php esc_attr_e( 'Login', 'norebro' ); ?>" />
		<input type="hidden" name="redirect" value="<?php echo esc_url( $redirect ) ?>" />
		<label for="rememberme" class="inline">
			<input name="rememberme" type="checkbox" id="rememberme" value="forever" /> <?php esc_html_e( 'Remember me', 'norebro' ); ?>
		</label>
	</p>
	<p class="lost_password">
		<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php esc_html_e( 'Lost your password?', 'norebro' ); ?></a>
	</p>

	<div class="clear"></div>

	<?php do_action( 'woocommerce_login_form_end' ); ?>

</form>
