<?php
/**
 * Admin Class
 *
 * Handles the Admin side functionality of plugin
 *
 * @package Bricks Plugin
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*Theme Import Plugin.*/
require_once plugin_dir_path( __FILE__ ) . '/class-mdbp-import.php';


/**
 * A class definition that show basic admin structure.
 */
class Mdbp_Admin {

	/**
	 * Define core functionality of plugin
	 *
	 * @since    1.0.0
	 * @var $wpbricks_fonts
	 */

	private $wpbricks_fonts;

	/**
	 * Common style tag.
	 *
	 * @var $wpbricks_style
	 */
	private $wpbricks_style;

	/**
	 * Define core functionality of plugin
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		$import = new Mdbp_Import();
		add_action( 'admin_menu', array( $this, 'mdbp_menu_list' ), 99 );
		add_action( 'mdbp_mdgf_schedule_event', array( $this, 'mdbp_do_this_mbgf_schedule' ) );
		add_action( 'save_post', array( $this, 'mdbp_post_save_content' ) );
		add_action( 'wp_footer', array( $this, 'mdbp_upload_block_css' ) );
		add_action( 'delete_post', array( $this, 'mdbp_delete_custom_css' ) );
		add_action( 'after_setup_theme', array($this,'mdbp_remove_inactive_widgets' ));
		add_action('wp_ajax_mdbp_theme_import_options_ajax', array($import, 'mdbp_import_options'));
		add_action('wp_ajax_nopriv_mdbp_theme_import_options_ajax', array($import, 'mdbp_import_options'));
		add_action('wp_ajax_mdbp_import_parent_theme', array($import, 'mdbp_import_main_theme'));
		add_action('wp_ajax_nopriv_mdbp_import_parent_theme', array($import, 'mdbp_import_main_theme'));
		add_action('wp_ajax_mdbp_import_child_theme', array($import, 'mdbp_import_inner_theme'));
		add_action('wp_ajax_nopriv_mdbp_import_child_theme', array($import, 'mdbp_import_inner_theme'));
		add_action('wp_ajax_mdbp_pugin_install_ajax', array($import, 'mdbp_install_plugins'));
		add_action('wp_ajax_nopriv_mdbp_pugin_install_ajax', array($import, 'mdbp_install_plugins'));
		add_action('wp_ajax_mdbp_activate_plugins_ajax', array($import, 'mdbp_activate_plugins'));
		add_action('wp_ajax_mdbp_demo_content_import_ajax', array($import, 'mdbp_demo_content_import'));
		add_action('wp_ajax_nopriv_mdbp_demo_content_import_ajax', array($import, 'mdbp_demo_content_import'));
		add_action('wp_ajax_mdbp_demo_widget_import_ajax', array($import, 'mdbp_demo_widget_import'));
		add_action('wp_ajax_nopriv_mdbp_demo_widget_import_ajax', array($import, 'mdbp_demo_widget_import'));
		add_action('wp_ajax_mdbp_demo_customizer_import_ajax', array($import, 'mdbp_demo_customizer_import'));
		add_action('wp_ajax_nopriv_mdbp_demo_customizer_import_ajax', array($import, 'mdbp_demo_customizer_import'));
		add_action('wp_ajax_mdbp_import_general_options_ajax', array( $import, 'mdbp_import_general_options_ajax' ) );
		add_action('wp_ajax_mdbp_delete_pre_demo_content_ajax', array($import, 'mdbp_delete_pre_demo_content'));
		add_action('wp_ajax_nopriv_mdbp_delete_pre_demo_content_ajax', array($import, 'mdbp_delete_pre_demo_content'));
		add_action('wp_ajax_mdbp_theme_details', array($import, 'mdbp_theme_details_pops'));
		add_action('wp_ajax_nopriv_mdbp_theme_details', array($import, 'mdbp_theme_details_pops'));
		add_action('wp_ajax_mdbp_import_new_theme', array($import, 'mdbp_import_independent_theme'));
		add_action('wp_ajax_nopriv_mdbp_import_new_theme', array($import, 'mdbp_import_independent_theme'));
		add_action('wp_ajax_mdbp_pugin_check_installation', array($import, 'mdbp_pugin_check_installation'));
		add_action('wp_ajax_mdbp_import_content_zip_ajax', array($import, 'mdbp_import_content_zip_ajax'));

        add_action('wp_ajax_mdbp_demo_content_import_stepping', array($import, 'mdbp_demo_content_import_stepping'));
		add_action('wp_ajax_nopriv_mdbp_demo_content_import_stepping', array($import, 'mdbp_demo_content_import_stepping'));

		/*Template action*/
		add_action('wp_ajax_mdbp_template_details', array($import, 'mdbp_template_details'));
		add_action('mdbp_theme_popup_content', array($import, 'mdbp_theme_popup_content_html'), 10, 4);
		add_action('mdbp_template_popup_content', array($import, 'mdbp_template_popup_content_html'), 10, 5);
		add_action('mdbp_addons_popup_content', array($import, 'mdbp_addons_popup_content_html'), 10, 5);
		add_action('wp_ajax_mdbp_import_template_action', array($import, 'mdbp_import_template_action'));

		add_action('wp_ajax_mdbp_addons_details', array($import, 'mdbp_addons_details'));

		add_filter( 'http_request_host_is_external', '__return_true' );

	}

	/**
	 * Remove inactive widgets
	 */
	public function mdbp_remove_inactive_widgets() {
		$sidebars_widgets = get_option( 'sidebars_widgets' );
		$sidebars_widgets['wp_inactive_widgets'] = array();
		update_option( 'sidebars_widgets', $sidebars_widgets );
	}
	/**
	 * Save global custom style
	 *
	 * @since    1.0.0
	 */
	public function mdbp_upload_block_css() {
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		global $wp_filesystem;
		WP_Filesystem();
		$post_id  = get_the_ID();
		$pagecss  = get_post_meta( $post_id, '_bricks_page_css', true );
		$css_call = filter_input( INPUT_GET, 'status', FILTER_SANITIZE_STRING );
		$css_call = ! empty( $css_call ) ? $css_call : 'head';
		if ( 'file' === $css_call ) {
			$upload_dir = wp_upload_dir();
			$file       = $upload_dir['basedir'] . '/wpbricks/bricks-css-' . $post_id . '.css';
			$wp_filesystem->put_contents( $file, $pagecss, 0644 );
			wp_enqueue_style( 'bricks-page-' . $post_id, $upload_dir['baseurl'] . '/wpbricks/bricks-css-' . $post_id . '.css', false, time() );

		} else {
			?>
			<style type="text/css">
				<?php echo wp_specialchars_decode( $pagecss ); // phpcs:ignore ?>
			</style>
			<?php
		}

	}

	/**
	 * Delete specific page css using post id.
	 *
	 * @param integer $post_id page post id.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_delete_custom_css( $post_id ) {
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		global $wp_filesystem;
		WP_Filesystem();
		$upload_dir = wp_upload_dir();
		$file       = $upload_dir['basedir'] . '/wpbricks/bricks-css-' . $post_id . '.css';
		if ( file_exists( $file ) ) {
			$wp_filesystem->delete( $file );
		}
	}

	/**
	 * Nested style generate.
	 *
	 * @param string $page_block_parse for parse value.
	 */
	public function mdbp_get_nested_style( $page_block_parse ) {
		foreach ( $page_block_parse as $attrs ) {
			if ( array_key_exists( 'bricks_style', $attrs['attrs'] ) ) {
				$this->wpbricks_style .= $attrs['attrs']['bricks_style'];
			}
			if ( array_key_exists( 'bricks_fonts', $attrs['attrs'] ) ) {
				$this->wpbricks_fonts .= $attrs['attrs']['bricks_fonts'];
			}
			if ( array_key_exists( 'innerBlocks', $attrs ) ) {
				$this->mdbp_get_nested_style( $attrs['innerBlocks'] );
			}
		}
	}

	/**
	 * Save content.
	 *
	 * @param id $post_id post id.
	 */
	public function mdbp_post_save_content( $post_id ) {
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}
		$post = get_post( $post_id );
		$page_block_parse = parse_blocks( $post->post_content );
		$this->mdbp_get_nested_style( $page_block_parse );
		update_post_meta( $post_id, '_bricks_page_css', $this->wpbricks_fonts . '' . $this->wpbricks_style );
	}

	/**
	 * WPBricks plugin menu list
	 *
	 * @since    1.0.0
	 */
	public function mdbp_menu_list() {
		add_menu_page(
			'Bricks Manager',
			'Bricks Manager',
			'manage_options',
			'bricks-manager',
			array(
				$this,
				'mdbp_bricks_details_page',
			),
			MDBP_URL . 'assets/images/Bricks_Logo_icon.svg'
		);
		add_submenu_page(
			'bricks-manager',
			esc_html__( 'About Bricks', 'wpbricks' ),
			esc_html__( 'About Bricks', 'wpbricks' ),
			'manage_options',
			'bricks-manager',
			array(
				$this,
				'mdbp_bricks_details_page',
			)
		);
	}

	/**
	 * WPBricks plugin about page added.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_bricks_details_page() {
		require_once plugin_dir_path( __FILE__ ) . 'settings/mdbp-about-bricks.php';
	}

	/**
	 * Font family schedule to fetch data
	 *
	 * @since    1.0.0
	 */
	public function mdbp_do_this_mbgf_schedule() {
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		global $wp_filesystem;
		WP_Filesystem();
		$file          = MDBP_DIR . '/assets/js/google-font.json';
		$response      = wp_remote_get( 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCDrCaH9Hw3fw-apOlAhG6XYpJ--klOXBY', '' );
		$font_family   = array();
		$font_family[] = array(
			'label' => 'Default',
			'value' => 'inherit',
		);
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$google_title = json_decode( $response['body'] );
			foreach ( $google_title->items as $item ) {
				$font_family[] = array(
					'label' => $item->family,
					'value' => $item->family,
				);
			}
			$wp_filesystem->put_contents( $file, wp_json_encode( $font_family ), 0644 );
		}
	}
}

$mdbp_admin = new Mdbp_Admin();
