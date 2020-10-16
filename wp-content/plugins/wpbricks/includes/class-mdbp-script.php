<?php
/**
 * Script Class
 *
 * Handles the script and style functionality of plugin
 *
 * @package WPBricks
 * @since   1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * A class definition that show all styles and scripts
 */
class Mdbp_Script {
	/**
	 * Define core functionality of plugin
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'mdbp_add_block_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'mdbp_add_front_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'mdbp_add_front_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'mdbp_add_admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'mdbp_add_admin_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'mdbp_style_change' ), 10000 );
	}
	/**
	 * Gutenberg block style footer
	 *
	 * @since    1.0.0
	 */
	public function mdbp_style_change() {
		wp_enqueue_style( 'wpbricks-gutenberg-block-frontend-css', MDBP_URL . 'assets/css/style.css', array(), '1.0.0' );
	}
	/**
	 * Gutenberg block scripts
	 *
	 * @since    1.0.0
	 */
	public function mdbp_add_block_scripts() {
		wp_enqueue_script( 'wpbricks-gutenberg-block', MDBP_URL . 'assets/js/pluginSettig.build.js',
			array(
				'wp-element',
				'wp-i18n',
				'wp-components',
				'wp-api-fetch',
				'wp-data',
				'wp-blocks',
				'wp-editor',
			),
			'1.0.0', false );
		wp_localize_script( 'wpbricks-gutenberg-block', 'wpbricks_plugin_path',
			array(
				'path' => MDBP_URL,
			)
		);
		wp_enqueue_style( 'wpbricks-gutenberg-block-backend-css', MDBP_URL . 'assets/css/block.css', array( 'wp-edit-blocks' ), '1.0.0' );
		register_block_type(
			'wpbricks-gutenberg-block/custom-block',
			array(
				'editor_script' => 'wpbricks-gutenberg-block',
				'editor_style'  => 'wpbricks-gutenberg-block-backend-css',
			)
		);
	}
	/**
	 * Enqueue styles on front side.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_add_front_styles() {
		wp_enqueue_style( 'wpbricks-gutenberg-slick-js-css', MDBP_URL . 'assets/css/slick.css', array(), '1.0.0' );
		wp_enqueue_style( 'wpbricks-gutenberg-magnific-popup-css', MDBP_URL . 'assets/css/magnific-popup.min.css', array(), '1.0.0' );
		wp_enqueue_style( 'font-awesome-css', 'https://use.fontawesome.com/releases/v5.7.2/css/all.css', false, '1.0.0' );
		wp_enqueue_style( 'popies-google-fonts', 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700', false, '1.0.0' );
		wp_enqueue_style( 'add-google-fonts', 'https://fonts.googleapis.com/css?family=Muli:300,400,400i,600,700,800', false, '1.0.0' );
		wp_enqueue_style( 'dashicons' );
	}
	/**
	 * Enqueue scripts on front side
	 *
	 * @since    1.0.0
	 */
	public function mdbp_add_front_scripts() {
		wp_enqueue_script( 'slick-js', MDBP_URL . 'assets/js/slick.min.js', array( 'jquery' ), '1.0.0' );
		wp_enqueue_script( array( 'jquery-ui-core', 'jquery-ui-tabs' ) );
		wp_enqueue_script( 'jquery-magnific', MDBP_URL . 'assets/js/jquery.magnific-popup.js', array( 'jquery' ), '1.0.0' );
		wp_enqueue_script( 'custom-js',
			MDBP_URL . 'assets/js/custom.js',
			array(
				'jquery'
			),
			'1.0.0'
		);
		wp_localize_script( 'custom-js', 'mdbp_javascript_obj',
			array(
				'ajaxurl'      => admin_url( 'admin-ajax.php' ),
				'business_url' => MDBP_BUSINESS_URL,
				'plugins_url'  => MDBP_URL,
			)
		);
	}
	/**
	 * Enqueue styles on admin side.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_add_admin_styles() {
		wp_enqueue_style( 'font-awesome-css', 'https://use.fontawesome.com/releases/v5.7.2/css/all.css', false, '1.0.0' );
		wp_enqueue_style( 'font-awesome', MDBP_URL . 'assets/css/font-awesome.min.css', array(), '1.0.0' );
		wp_enqueue_style( 'wpbricks-gutenberg-magnific-popup-css', MDBP_URL . 'assets/css/magnific-popup.min.css', array(), '1.0.0' );
		wp_enqueue_style( 'popies-google-fonts', 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700', false, '1.0.0' );
		wp_enqueue_style( 'add-google-fonts', 'https://fonts.googleapis.com/css?family=Muli:300,400,400i,600,700,800', false, '1.0.0' );
		wp_enqueue_style( 'wpbricks-gutenberg-slick-js-css', MDBP_URL . 'assets/css/slick.css', array( 'wp-edit-blocks' ), '1.0.0' );
		wp_enqueue_style( 'wpbricks-gutenberg-block-backend-css', MDBP_URL . 'assets/css/block.css', array( 'wp-edit-blocks' ), '1.0.0' );
		wp_enqueue_style( 'wpbricks-admin-css', MDBP_URL . 'assets/css/admin-style.css', '', '1.0.0' );
	}
	/**
	 * Enqueue scripts on admin side
	 *
	 * @since    1.0.0
	 */
	public function mdbp_add_admin_scripts() {
		global $wp;
		wp_enqueue_script( 'slick-js', MDBP_URL . 'assets/js/slick.min.js', array( 'jquery' ), '1.0.0' );
		wp_enqueue_script( array( 'jquery-ui-core', 'jquery-ui-tabs' ) );
		wp_enqueue_script( 'jquery-magnific', MDBP_URL . 'assets/js/jquery.magnific-popup.js', array( 'jquery' ), '1.0.0' );
		wp_enqueue_script( 'block-build-js', MDBP_URL . 'assets/js/block.build.js',
			array(
				'wp-element',
				'wp-i18n',
				'wp-components',
				'wp-api-fetch',
				'wp-data',
				'wp-blocks',
				'wp-editor',
			),
			'1.0.0', false );
		wp_localize_script( 'block-build-js', 'mdbp_bild_js_obj',
			array(
				'ajaxurl'      => admin_url( 'admin-ajax.php' ),
				'business_url' => MDBP_BUSINESS_URL,
				'plugins_url'  => MDBP_URL,
			)
		);
		$current_url = home_url( add_query_arg( $wp->query_vars, $wp->request ) );
		wp_enqueue_script( 'custom-js', MDBP_URL . 'assets/js/custom.js', array(
			'jquery',
			'wp-util',
			'updates',
		), '1.0.0', false );
		wp_localize_script( 'custom-js', 'mdbp_javascript_obj',
			array(
				'ajaxurl'      => admin_url( 'admin-ajax.php' ),
				'business_url' => MDBP_BUSINESS_URL,
				'plugins_url'  => MDBP_URL,
				'current_url'  => $current_url,
			)
		);
	}
}
$mdbp_script = new Mdbp_Script();
