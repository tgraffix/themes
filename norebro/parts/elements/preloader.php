<?php if ( NorebroSettings::get( 'page_preloader', 'global' ) || NorebroSettings::get( 'page_preloader', 'global' ) === NULL ) : ?>

<div class="page-preloader" id="page-preloader">
	<div class="loader">
		<?php 
			switch ( NorebroSettings::get( 'preloader_type', 'global' ) ) {
				case 'ball_scale_pulse':
					echo '<div class="la-ball-scale-pulse la-dark">
						<div></div>
						<div></div>
					</div>';
					break;
				case 'ball_scale_ripple':
					echo '<div class="la-ball-scale-ripple la-dark">
						<div></div>
					</div>';
					break;
				case 'ball_clip_rotate':
					echo '<div class="la-ball-clip-rotate la-dark">
						<div></div>
					</div>';
					break;
				case 'line_scale':
					echo '<div class="la-line-scale la-dark">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>';
					break;
				case 'line_spin_clockwise_fade':
					echo '<div class="la-line-spin-clockwise-fade la-dark">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>';
					break;
				case 'square_loader':
					echo '<div class="la-square-loader la-dark">
						<div></div>
					</div>';
					break;
				case 'ball_fall':
					echo '<div class="la-ball-fall la-dark">
						<div></div>
						<div></div>
						<div></div>
					</div>';
					break;
				default: 
					echo '<div class="la-ball-beat la-dark">
						<div></div>
						<div></div>
						<div></div>
					</div>';
		} ?>
	</div>
</div>

<?php endif; ?>