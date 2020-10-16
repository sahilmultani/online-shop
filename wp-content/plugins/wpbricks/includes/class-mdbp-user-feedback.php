<?php
/**
 * Plugin review class.
 * Prompts users to give a review of the plugin on WordPress.org after a period of usage.
 * https://github.com/coblocks/coblocks/blob/master/includes/admin/class-coblocks-feedback.php
 *
 * @package WPBricks
 * @since   1.0.0
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Main Feedback Notice Class
 */
class Mdbp_User_Feedback {
	/**
	 * Name.
	 *
	 * @var string $name
	 */
	private $name;
	/**
	 * Slug.
	 *
	 * @var string $slug
	 */
	private $slug;
	/**
	 * Date Option.
	 *
	 * @var string $slug
	 */
	private $date_option;
	/**
	 * Review Rating.
	 *
	 * @var string $slug
	 */
	private $rr_option;
	/**
	 * Suggest New Feature.
	 *
	 * @var string $slug
	 */
	private $snf_option;
	/**
	 * Checkout Our Premium Plugin.
	 *
	 * @var string $slug
	 */
	private $copp_option;
	/**
	 * Magic method constructor
	 *
	 * @var string $args
	 */
	public function __construct( $args ) {
		$this->slug        = $args['slug'];
		$this->name        = $args['name'];
		$this->date_option = $this->slug . '_activation_date';
		$this->rr_option   = $this->slug . '_rr';
		$this->snf_option  = $this->slug . '_snf';
		$this->copp_option = $this->slug . '_copp';
		add_action( 'admin_init', array( $this, 'check_installation_date' ) );
		add_action( 'admin_init', array( $this, 'set_no_bug' ), 5 );
	}
	/**
	 * Set the plugin to no longer bug users if user asks not to be.
	 */
	public function set_no_bug() {
		$this_day = date( 'Y-m-d' );
		$today    = date_create( $this_day );
		// phpcs:ignore
		$get_nonce = filter_input( INPUT_GET, '_wpnonce', FILTER_SANITIZE_STRING );
		if ( isset( $get_nonce ) ) {
			if ( is_admin() || current_user_can( 'manage_options' ) ) {
				if ( wp_verify_nonce( $get_nonce, 'editorswpbricks-rr-nounce' ) ) {
					set_transient( 'sticky_rr_note', '0' );
				} else if ( wp_verify_nonce( $get_nonce, 'editorswpbricks-snf-nounce' ) ) {
					delete_transient( 'sticky_snf_note' );
					set_transient( 'sticky_snf_note_cancel', $today );
				} else if ( wp_verify_nonce( $get_nonce, 'editorswpbricks-copp-nounce' ) ) {
					delete_transient( 'sticky_copp_note' );
					set_transient( 'sticky_copp_note_cancel', $today );
				}
			}
		} else {
			return;
		}
	}
	public function check_installation_date() {
		add_site_option( $this->date_option, time() );
		/*
		 * Today date
		 */
		$this_day        = date( 'Y-m-d' );
		$today           = date_create( $this_day ); //$this_day
		$today_date_form = date_format( $today, 'Y-m-d' );
		/*
		 * Installation date
		 */
		$install_date        = get_site_option( $this->date_option );
		$install_date_format = date( 'Y-m-d', $install_date );
		$start_date          = date_create( $install_date_format ); //$install_date_format
		/*
		 * Diff date
		 */
		$diff     = date_diff( $today, $start_date );
		$day_diff = $diff->format( "%a" );
		$current_diff = $day_diff + 1;
		/*
		 * Check interval based on 7 days for review rating
		 */
		$check_sticky_rr_note = get_transient( 'sticky_rr_note' );
		if ( '0' !== $check_sticky_rr_note ) {
			if ( $current_diff % 7 == 0 ) {
				set_transient( 'sticky_rr_note', '1' );
			}
		} else {
			set_transient( 'sticky_rr_note', '0' );
		}
		/*
		 * Check if all condition match for checkout our premium plugins
		 */
		if ( '1' === $check_sticky_rr_note ) {
			add_action( 'admin_notices', array( $this, 'display_notice_for_rr' ) );
		}
		/*
		 * Check date when user has clicked on 'no thanks' button for checkout our premium plugins
		 */
		$check_sticky_copp_note_cancel        = get_transient( 'sticky_copp_note_cancel' );
		$check_sticky_copp_note_cancel_format = '';
		if ( ! empty( $check_sticky_copp_note_cancel ) ) {
			$check_sticky_copp_note_cancel_format = date_format( $check_sticky_copp_note_cancel, 'Y-m-d' );
		}
		/*
		 * Check interval based on 5 days for checkout our premium plugins
		 */
		if ( $current_diff % 5 == 0 ) {
			//echo 'if';
			if ( $check_sticky_copp_note_cancel_format !== $today_date_form ) {
				set_transient( 'sticky_copp_note', '1' );
			} else {
				set_transient( 'sticky_copp_note', '0' );
			}
		}
		/*
		 * Check if all condition match for checkout our premium plugins
		 */
		$check_sticky_copp_note = get_transient( 'sticky_copp_note' );
		if ( '1' === $check_sticky_copp_note ) {
			add_action( 'admin_notices', array( $this, 'display_notice_for_copp' ) );
		}
		/*
		 * Check date when user has clicked on 'no thanks' button for checkout our premium plugins
		 */
		$check_sticky_snf_note_cancel        = get_transient( 'sticky_snf_note_cancel' );
		$check_sticky_snf_note_cancel_format = '';
		if ( ! empty( $check_sticky_snf_note_cancel ) ) {
			$check_sticky_snf_note_cancel_format = date_format( $check_sticky_snf_note_cancel, 'Y-m-d' );
		}
		/*
		 * Check interval based on 15 days for suggest new features
		 */
		if ( $current_diff % 15 == 0 ) {
			if ( $check_sticky_snf_note_cancel_format !== $today_date_form ) {
				set_transient( 'sticky_snf_note', '1' );
			} else {
				set_transient( 'sticky_snf_note', '0' );
			}
		}
		/*
		 * Check if all condition match for suggest new features
		 */
		$check_sticky_snf_note = get_transient( 'sticky_snf_note' );
		if ( '1' === $check_sticky_snf_note ) {
			add_action( 'admin_notices', array( $this, 'display_notice_for_snf' ) );
		}
	}
	/**
	 * Seconds to words.
	 *
	 * @param string $seconds Seconds in time.
	 *
	 * @return string
	 */
	public function seconds_to_words( $seconds ) {
		// Get the years.
		$years = intval( $seconds ) / YEAR_IN_SECONDS % 100;
		if ( $years > 1 ) {
			/* translators: Number of years */
			return sprintf( __( '%s years', 'wpbricks' ), $years );
		} elseif ( $years > 0 ) {
			return __( 'a year', 'wpbricks' );
		}
		// Get the weeks.
		$weeks = intval( $seconds ) / WEEK_IN_SECONDS % 52;
		if ( $weeks > 1 ) {
			/* translators: Number of weeks */
			return sprintf( __( '%s weeks', 'wpbricks' ), $weeks );
		} elseif ( $weeks > 0 ) {
			return __( 'a week', 'wpbricks' );
		}
		// Get the days.
		$days = intval( $seconds ) / DAY_IN_SECONDS % 7;
		if ( $days > 1 ) {
			/* translators: Number of days */
			return sprintf( __( '%s days', 'wpbricks' ), $days );
		} elseif ( $days > 0 ) {
			return __( 'a day', 'wpbricks' );
		}
		// Get the hours.
		$hours = intval( $seconds ) / HOUR_IN_SECONDS % 24;
		if ( $hours > 1 ) {
			/* translators: Number of hours */
			return sprintf( __( '%s hours', 'wpbricks' ), $hours );
		} elseif ( $hours > 0 ) {
			return __( 'an hour', 'wpbricks' );
		}
		// Get the minutes.
		$minutes = intval( $seconds ) / MINUTE_IN_SECONDS % 60;
		if ( $minutes > 1 ) {
			/* translators: Number of minutes */
			return sprintf( __( '%s minutes', 'wpbricks' ), $minutes );
		} elseif ( $minutes > 0 ) {
			return __( 'a minute', 'wpbricks' );
		}
		// Get the seconds.
		$seconds = intval( $seconds ) % 60;
		if ( $seconds > 1 ) {
			/* translators: Number of seconds */
			return sprintf( __( '%s seconds', 'wpbricks' ), $seconds );
		} elseif ( $seconds > 0 ) {
			return __( 'a second', 'wpbricks' );
		}
	}
	/**
	 * Display the admin notice for review rating.
	 */
	public function display_notice_for_rr() {
		$no_bug_url = wp_nonce_url( admin_url( 'plugins.php?' . $this->rr_option . '=true' ), 'editorswpbricks-rr-nounce' );
		$time       = $this->seconds_to_words( time() - get_site_option( $this->date_option ) );
		?>
		<div class="notice updated editorWpbricks-notice">
			<div class="editorWpbricks-notice-inner">
				<div class="editorWpbricks-notice-icon">
					<img src="<?php echo esc_url( plugins_url( 'assets/images/Bricks_Logo_icon.svg', dirname( __FILE__ ) ) ); ?>"
					     alt="<?php printf( esc_attr__( '%s WordPress Plugin', 'wpbricks' ), esc_attr( $this->name ) ); ?>"/>
				</div>
				<div class="editorWpbricks-notice-content">
					<h3>
						<?php
						printf( esc_html__( 'Are you enjoying %s Plugin?', 'wpbricks' ), esc_html( $this->name ) );
						?>
					</h3>
					<p>
						<?php
						printf( esc_html__( 'You have been using %1$s for %2$s now. Mind leaving a review to let us know know what you think? We\'d really appreciate it!', 'wpbricks' ), esc_html( $this->name ), esc_html( $time ) );
						?>
					</p>
				</div>
				<div class="editorWpbricks-install-now">
					<?php
					$review_url = esc_url( 'https://wordpress.org/plugins/wpbricks/#reviews' );
					printf( '<a href="%1$s" class="button button-primary editorWpbricks-install-button" target="_blank">%2$s</a>', esc_url( $review_url ), esc_html__( 'Leave a Review', 'wpbricks' ) );
					?>
					<a href="<?php echo esc_url( $no_bug_url ); ?>" class="no-thanks">
						<?php
						echo esc_html__( 'No thanks / I already have', 'wpbricks' );
						?>
					</a>
				</div>
			</div>
		</div>
		<?php
	}
	/**
	 * Display notice for checkout our premium plugins.
	 */
	public function display_notice_for_copp() {
		$no_bug_url = wp_nonce_url( admin_url( 'plugins.php?' . $this->copp_option . '=true' ), 'editorswpbricks-copp-nounce' );
		?>
		<div class="notice updated editorWpbricks-notice">
			<div class="editorWpbricks-notice-inner">
				<div class="editorWpbricks-notice-icon">
					<?php
					/* translators: 1. Name */
					?>
					<img src="<?php
					echo esc_url( plugins_url( 'assets/images/Bricks_Logo_icon.svg', dirname( __FILE__ ) ) );
					?>" alt="<?php
					printf( esc_attr__( '%s WordPress Plugin', 'wpbricks' ), esc_attr( $this->name ) );
					?>"/>
				</div>
				<div class="editorWpbricks-notice-content">
					<?php
					/* translators: 1. Name */
					?>
					<h3>
						<?php
						printf( esc_html__( 'Check out our other popular Premium WooCommerce plugin', 'wpbricks' ) );
						?>
					</h3>
					<p>
						<?php
						/* translators: 1. Name, 2. Time */
						?>
						<?php
						printf( esc_html__( ' Trusted By Over 40,000+ WooCommerce Store Owner', 'wpbricks' ) );
						?>
					</p>
				</div>
				<div class="editorWpbricks-install-now">
					<?php
					$review_url = esc_url( 'https://www.thedotstore.com/' );
					printf( '<a href="%1$s" class="button button-primary editorWpbricks-install-button" target="_blank">%2$s</a>', esc_url( $review_url ), esc_html__( 'Learn More', 'wpbricks' ) );
					?>
					<a href="<?php echo esc_url( $no_bug_url ); ?>" class="no-thanks">
						<?php
						echo esc_html__( 'No thanks', 'wpbricks' );
						?>
					</a>
				</div>
			</div>
		</div>
		<?php
	}
	/**
	 * Display notice for suggest new features.
	 */
	public function display_notice_for_snf() {
		$no_bug_url = wp_nonce_url( admin_url( 'plugins.php?' . $this->snf_option . '=true' ), 'editorswpbricks-snf-nounce' );
		?>
		<div class="notice updated editorWpbricks-notice">
			<div class="editorWpbricks-notice-inner">
				<div class="editorWpbricks-notice-icon">
					<?php
					/* translators: 1. Name */
					?>
					<img src="<?php echo esc_url( plugins_url( 'assets/images/Bricks_Logo_icon.svg', dirname( __FILE__ ) ) ); ?>"
					     alt="<?php printf( esc_attr__( '%s WordPress Plugin', 'wpbricks' ), esc_attr( $this->name ) ); ?>"/>
				</div>
				<div class="editorWpbricks-notice-content">
					<?php
					/* translators: 1. Name */
					?>
					<h3>
						<?php
						printf( esc_html__( 'We love to improve our plugin.', 'wpbricks' ) );
						?>
					</h3>
					<p>
						<?php
						/* translators: 1. Name, 2. Time */
						?>
						<?php
						printf( esc_html__( '  Suggest a feature for %1$s', 'wpbricks' ), esc_attr( $this->name ) );
						?>
					</p>
				</div>
				<div class="editorWpbricks-install-now">
					<?php
					$review_url = esc_url( 'https://www.thedotstore.com/suggest-a-feature/' );
					printf( '<a href="%1$s" class="button button-primary editorWpbricks-install-button" target="_blank">%2$s</a>', esc_url( $review_url ), esc_html__( 'Learn More', 'wpbricks' ) );
					?>
					<a href="<?php echo esc_url( $no_bug_url ); ?>" class="no-thanks">
						<?php
						echo esc_html__( 'No thanks', 'wpbricks' );
						?>
					</a>
				</div>
			</div>
		</div>
		<?php
	}
}
/*
* Instantiate the Mdbp_User_Feedback class.
*/
new Mdbp_User_Feedback( array(
		'slug' => 'editors_mdbp_plugin_user_feedback',
		'name' => __( 'WPBricks Manager – Readymade Blocks', 'wpbricks' ),
	)
);