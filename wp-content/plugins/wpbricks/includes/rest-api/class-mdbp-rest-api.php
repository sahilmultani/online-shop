<?php
/**
 * Admin Class
 *
 * Handles the REST API call
 *
 * @package WPBricks
 * @since   1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * A class definition that show all REST API
 */
class Mdbp_Rest_Api {
	/**
	 * Define core functionality of plugin
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_block_category' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_block_data' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_import_block_data' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_count_block_data' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_template_category' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_template_data' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_theme_data' ) );
		add_action( 'rest_api_init', array( $this, 'mdbp_fetch_addon_data' ) );
	}
	/**
	 * Fetch block category API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_count_block_data() {
		register_rest_route(
			'client',
			'/block-count',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_count_block',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch block category API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_import_block_data() {
		register_rest_route(
			'client',
			'/block-import',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_import_block',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch block category API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_block_category() {
		register_rest_route(
			'client',
			'/block-category',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_fetch_block_category_list',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch block data API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_block_data() {
		register_rest_route(
			'client',
			'/blocks-data',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_fetch_block_data_list',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch template category API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_template_category() {
		register_rest_route(
			'client',
			'/template-category',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_fetch_template_category_list',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch template data API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_template_data() {
		register_rest_route(
			'client',
			'/template-data',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_fetch_template_data_list',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch theme data API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_theme_data() {
		register_rest_route(
			'client',
			'/theme-data',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_fetch_theme_data_list',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	/**
	 * Fetch addon data API
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_addon_data() {
		register_rest_route(
			'client',
			'/addon-data',
			array(
				'methods'  => 'POST',
				'callback' => array(
					$this,
					'mdbp_fetch_addon_data_list',
				),
				'permission_callback' => '__return_true',
			)
		);
	}
	
	/**
	 * @param Count Block
	 */
	public function mdbp_count_block( WP_REST_Request $request ) {
		$parameters  = $request->get_params();
		$data_type = ( ! empty( $parameters['data-type'] ) ) ? $parameters['data-type'] : '';
		$category_name = ( ! empty( $parameters['cat'] ) ) ? $parameters['cat'] : 'all';
		$page_number   = ( ! empty( $parameters['paged'] ) ) ? $parameters['paged'] : 1;
		$search_block  = ( ! empty( $parameters['s'] ) ) ? $parameters['s'] : '';
		$result      = array();
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => true,
			);
		} else {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => false,
			);
		}
		$url      = 'https://wpbricks.com/wp-json/mdapi/v1/wpbricks-data/wpbricks-data-count/?data-type=' . $data_type .'&cat=' . $category_name . '&paged=' . $page_number . '&s=' . $search_block . '';
		$response = wp_remote_post( $url, $args );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/*
	 * Import Block
	 */
	public function mdbp_import_block( WP_REST_Request $request ) {
		$parameters  = $request->get_params();
		$theme_token = ( ! empty( $parameters['theme-token'] ) ) ? $parameters['theme-token'] : '';
		$result      = array();
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => true,
			);
		} else {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => false,
			);
		}
		$url      = 'https://wpbricks.com/wp-json/mdapi/v1/wpbricks-blocks-import/wpbricks-blocks-import-data/?theme-token=' . $theme_token;
		$response = wp_remote_post( $url, $args );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/**
	 * Select block fetch block category list
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_block_category_list() {
		$result   = array();
		$response = wp_remote_post(
			'http://wpbricks.com/wp-json/mdapi/v1/wpbricks-blocks/wpbricks-blocks-category',
			array(
				'headers' => array(
					'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
				),
			)
		);
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/**
	 * Select block fetch block data list
	 *
	 * @param WP_REST_Request $request request of all list parameters.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_block_data_list( WP_REST_Request $request ) {
		$result        = array();
		$parameters    = $request->get_params();
		$category_name = ( ! empty( $parameters['cat'] ) ) ? $parameters['cat'] : 'all';
		$page_number   = ( ! empty( $parameters['paged'] ) ) ? $parameters['paged'] : 1;
		$search_block  = ( ! empty( $parameters['s'] ) ) ? $parameters['s'] : '';
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => true,
			);
		} else {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => false,
			);
		}
		$url = 'https://wpbricks.com/wp-json/mdapi/v1/wpbricks-blocks/wpbricks-blocks-data?cat=' . $category_name . '&paged=' . $page_number . '&s=' . $search_block . '';
		$response = wp_remote_post( $url, $args );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/**
	 * Select block fetch template category list
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_template_category_list() {
		$result   = array();
		$response = wp_remote_post(
			'http://wpbricks.com/wp-json/mdapi/v1/wpbricks-templates/wpbricks-templates-category',
			array(
				'headers' => array(
					'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
				),
			)
		);
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/**
	 * Select block fetch template data list
	 *
	 * @param WP_REST_Request $request request of all list parameters.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_template_data_list( WP_REST_Request $request ) {
		$result        = array();
		$parameters    = $request->get_params();
		$category_name = ( ! empty( $parameters['cat'] ) ) ? $parameters['cat'] : 'all';
		$page_number   = ( ! empty( $parameters['paged'] ) ) ? $parameters['paged'] : 1;
		$search_block  = ( ! empty( $parameters['s'] ) ) ? $parameters['s'] : '';
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => true,
			);
		} else {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => false,
			);
		}
		$url      = 'https://wpbricks.com/wp-json/mdapi/v1/wpbricks-templates/wpbricks-templates-data?cat=' . $category_name . '&paged=' . $page_number . '&s=' . $search_block . '';
		$response = wp_remote_post( $url, $args );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/**
	 * Fetch theme data list
	 *
	 * @param WP_REST_Request $request request of all list parameters.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_theme_data_list( WP_REST_Request $request ) {
		$result        = array();
		$parameters    = $request->get_params();
		$category_name = ( ! empty( $parameters['cat'] ) ) ? $parameters['cat'] : 'all';
		$page_number   = ( ! empty( $parameters['paged'] ) ) ? $parameters['paged'] : 1;
		$search_block  = ( ! empty( $parameters['s'] ) ) ? $parameters['s'] : '';
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => true,
			);
		} else {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => false,
			);
		}
		$url      = 'https://wpbricks.com/wp-json/mdapi/v1/wpbricks-themes/wpbricks-themes-data?cat=' . $category_name . '&paged=' . $page_number . '&s=' . $search_block . '';
		$response = wp_remote_post( $url, $args );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result );
		}
		echo wp_json_encode( $result );
		exit;
	}
	/**
	 * Fetch addon data list
	 *
	 * @param WP_REST_Request $request request of all list parameters.
	 *
	 * @since    1.0.0
	 */
	public function mdbp_fetch_addon_data_list( WP_REST_Request $request ) {
		$result        = array();
		$parameters    = $request->get_params();
		$page_number   = ( ! empty( $parameters['paged'] ) ) ? $parameters['paged'] : 1;
		$search_block  = ( ! empty( $parameters['s'] ) ) ? $parameters['s'] : '';
		if ( ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) || $_SERVER['SERVER_PORT'] == 443 ) {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => true,
			);
		} else {
			$args = array(
				'method'    => 'POST',
				'headers'   => array(
					'Content-type: application/x-www-form-urlencoded',
				),
				'sslverify' => false,
			);
		}
		$url      = 'https://wpbricks.com/wp-json/mdapi/v1/wpbricks-addons/wpbricks-addons-data?paged=' . $page_number . '&s=' . $search_block . '';
		$response = wp_remote_post( $url, $args );
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$result = wp_remote_retrieve_body( $response );
			$result = json_decode( $result, true );
			if ($result['status'] !== false ) {
				foreach ( $result as $key => $res_addon ) {
					$plugin_main_file = $res_addon['plugin_main_file_path'];
					if ( is_plugin_active( $plugin_main_file ) ) {
						$result[ $key ]['activation_status'] = 'active';
					} else {
						$result[ $key ]['activation_status'] = 'deactive';
					}
				}
			}
		}
		echo wp_json_encode( $result );
		exit;
	}
}
$mdbp_rest_api = new Mdbp_Rest_Api();
