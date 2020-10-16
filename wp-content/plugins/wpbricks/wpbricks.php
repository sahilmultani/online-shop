<?php
/**
 * Plugin Name: WPBricks - Library of Gutenberg Blocks & Templates
 * Version: 2.0.5
 * Author: theDotstore
 * Author URI: https://profiles.wordpress.org/dots
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wpbricks
 *
 * Description: A beautiful collection of Ready-to-use Gutenberg blocks containing multiple elements which makes it easy for you to create better and awesome content.
 *
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin admin area. This file also includes all of the dependencies used by the plugin, registers the activation and deactivation functions, and defines a function that starts the plugin.
 *
 * @link: https://www.thedotstore.com/
 * @since: 1.0.0
 * @package WPBricks
 * Domain Path:       /languages
 */
// If this file is called directly, abort.
if ( !defined( 'WPINC' ) ) {
	die;
}

if ( function_exists( 'wpb_fs' ) ) {
	wpb_fs()->set_basename( false, __FILE__ );
	return;
}


if ( !function_exists( 'wpb_fs' ) ) {
	// Create a helper function for easy SDK access.
	function wpb_fs()
	{
		global  $wpb_fs ;
		
		if ( !isset( $wpb_fs ) ) {
			// Include Freemius SDK.
			require_once dirname( __FILE__ ) . '/freemius/start.php';
			$wpb_fs = fs_dynamic_init( array(
				'id'             => '5005',
				'slug'           => 'wpbricks',
				'type'           => 'plugin',
				'public_key'     => 'pk_0937c02ea0a1efc0cb402c48f923d',
				'is_premium'     => false,
				'premium_suffix' => 'Pro',
				'has_addons'     => false,
				'has_paid_plans' => false,
				'menu'           => array(
					'slug'       => 'bricks-manager',
					'first-path' => 'admin.php?page=bricks-manager',
					'support'    => false,
				),
				'is_live'        => true,
			) );
		}
		
		return $wpb_fs;
	}
	
	// Init Freemius.
	wpb_fs();
	// Signal that SDK was initiated.
	do_action( 'wpb_fs_loaded' );
	wpb_fs()->add_action( 'after_uninstall', 'wpb_fs_uninstall_cleanup' );
}

/* Version of plugin.*/
if ( !defined( 'MDBP_VERSION' ) ) {
	define( 'MDBP_VERSION', '2.0.5' );
}
/*Plugin dir.*/
if ( !defined( 'MDBP_DIR' ) ) {
	define( 'MDBP_DIR', dirname( __FILE__ ) );
}
/* Plugin url.*/
if ( !defined( 'MDBP_URL' ) ) {
	define( 'MDBP_URL', plugin_dir_url( __FILE__ ) );
}
/* Plugin url.*/
if ( !defined( 'MDBP_BUSINESS_URL' ) ) {
	define( 'MDBP_BUSINESS_URL', 'https://wpbricks.com' );
}
/* plugin base name.*/
if ( !defined( 'MDBP_PLUGIN_BASENAME' ) ) {
	define( 'MDBP_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
}
if ( !defined( 'MDBP_PLUGIN_EVENTS' ) ) {
	define( 'MDBP_PLUGIN_EVENTS', array(
		'mdgf-schedule' => 'daily',
	) );
}

if ( !defined( 'MDBP_UPLOAD_DIR_PATH' ) ) {
	$mdbp_upload = wp_upload_dir();
	define( 'MDBP_UPLOAD_DIR_PATH', $mdbp_upload['path'] );
}

if ( !defined( 'MDBP_API_AUTH' ) ) {
	define( 'MDBP_API_AUTH', array(
		'timeout' => 20,
		'headers' => array(
			'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
		),
	) );
}
if ( !defined( 'MDBP_FILE_GET_CONTENT_SSL' ) ) {
	define( 'MDBP_FILE_GET_CONTENT_SSL', array(
		"ssl" => array(
			"verify_peer"      => false,
			"verify_peer_name" => false,
		),
	) );
}
/* Theme dir.*/
if ( !defined( 'MDBP_THEME_DIR' ) ) {
	define( 'MDBP_THEME_DIR', get_stylesheet_directory() );
}
/**
 * Function to setup the plugin text domain
 */
function mdbp_load_text_domain()
{
	global  $wp_version ;
	/*Set filter for plugin's languages directory.*/
	$mdbp_language_dir = dirname( plugin_basename( __FILE__ ) ) . '/languages/';
	$mdbp_language_dir = apply_filters( 'mdbp_languages_directory', $mdbp_language_dir );
	// Traditional WordPress plugin locale filter.
	$get_locale = get_locale();
	if ( $wp_version >= 4.7 ) {
		$get_locale = get_user_locale();
	}
	/*Traditional WordPress plugin locale filter.*/
	$locale = apply_filters( 'plugin_locale', $get_locale, 'wpbricks' );
	$mofile = sprintf( '%1$s-%2$s.mo', 'wpbricks', $locale );
	/*Setup paths to current locale file.*/
	$mofile_global = WP_LANG_DIR . '/plugins/' . basename( MDBP_DIR ) . '/' . $mofile;
	
	if ( file_exists( $mofile_global ) ) {
		/*Look in global /wp-content/languages/plugin-name folder.*/
		load_textdomain( 'wpbricks', $mofile_global );
	} else {
		/*Load the default language files.*/
		load_plugin_textdomain( 'wpbricks', false, $mdbp_language_dir );
	}
	
}

add_action( 'plugins_loaded', 'mdbp_load_text_domain' );
register_activation_hook( __FILE__, 'mdbp_install' );
/**
 * Function runs on plugin installation.
 */
function mdbp_install()
{
	$url = wp_nonce_url( home_url(), 'multidots-filesystem-nonce' );
	$method = '';
	$fields = array( 'submit' );
	$creds = request_filesystem_credentials(
		$url,
		$method,
		false,
		false,
		$fields
	);
	/** Let's try to setup WP_Filesystem */
	if ( false === $creds ) {
		return true;
	}
	/** If the user enters the credentials but the credentials can't be verified to setup WP_Filesystem, output the form again */
	
	if ( !WP_Filesystem( $creds ) ) {
		/** This time produce the error that tells the user there was an error connecting */
		request_filesystem_credentials(
			$url,
			$method,
			true,
			false,
			$fields
		);
		return true;
	}
	
	global  $wp_filesystem ;
	$content_dir = $wp_filesystem->wp_content_dir();
	$folder_path = 'uploads/wpbricks/';
	$wp_filesystem->mkdir( trailingslashit( $content_dir ) . $folder_path, FS_CHMOD_DIR );
	if ( !wp_next_scheduled( 'mdbp_mdgf_schedule_event' ) ) {
		wp_schedule_event( time(), MDBP_PLUGIN_EVENTS['mdgf-schedule'], 'mdbp_mdgf_schedule_event' );
	}
}

/**
 * Plugin activation redirection.
 *
 * @param string $plugin check plugin name.
 */
function mdbp_activation_redirect( $plugin )
{
	
	if ( plugin_basename( __FILE__ ) === $plugin ) {
		wp_safe_redirect( add_query_arg( array(
			'page' => 'bricks-manager',
		), esc_url( admin_url( 'admin.php' ) ) ) );
		exit;
	}
	
}

add_action( 'activated_plugin', 'mdbp_activation_redirect' );
add_filter(
	'plugin_row_meta',
	'wk_plugin_row_meta',
	10,
	2
);
//Visit Site | Support | Documentation
function wk_plugin_row_meta( $links, $file )
{
	if ( $file !== plugin_basename( __FILE__ ) ) {
		return $links;
	}
	$visit_link = '<a target="_blank" href="' . esc_url( 'https://www.thedotstore.com/' ) . '" title="' . esc_html__( 'Visit Site', 'wpbricks' ) . '">' . esc_html__( 'Visit Site', 'wpbricks' ) . '</a>';
	$support_link = '<a target="_blank" href="' . esc_url( 'https://wordpress.org/support/plugin/wpbricks/' ) . '" title="' . esc_html__( 'Support', 'wpbricks' ) . '">' . esc_html__( 'Support', 'wpbricks' ) . '</a>';
	$documentation_link = '<a target="_blank" href="' . esc_url( 'https://docs.thedotstore.com/collection/341-wpbricks-theme' ) . '" title="' . esc_html__( 'Documentation', 'wpbricks' ) . '">' . esc_html__( 'Documentation', 'wpbricks' ) . '</a>';
	$rate_plugin_link = '<a target="_blank" href="' . esc_url( 'https://wordpress.org/plugins/wpbricks/#reviews' ) . '" title="' . esc_html__( 'Rate the plugin', 'wpbricks' ) . '">' . esc_html__( 'Rate the plugin ★★★★★', 'wpbricks' ) . '</a>';
	$links[] = $visit_link;
	$links[] = $support_link;
	$links[] = $documentation_link;
	$links[] = $rate_plugin_link;
	return $links;
}

add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'plugin_action_links' );
function plugin_action_links( $links_array )
{
	$setting_action_link = '<a href="' . esc_url( admin_url( 'admin.php?page=bricks-manager' ) ) . '" title="' . esc_html__( 'Settings', 'wpbricks' ) . '">' . esc_html__( 'Settings', 'wpbricks' ) . '</a>';
	array_unshift( $links_array, $setting_action_link );
	return $links_array;
}

/**
 * Functions runs when uninstall the plugin.
 */
function mdbp_uninstall()
{
	wp_clear_scheduled_hook( 'mdbp_mdgf_schedule_event' );
}

register_deactivation_hook( __FILE__, 'mdbp_uninstall' );
/*Script Class File.*/

require_once plugin_dir_path( __FILE__ ) . '/includes/class-mdbp-script.php';
/*Bricks block category file.*/
require_once plugin_dir_path( __FILE__ ) . '/includes/class-mdbp-block-category.php';
///*REST API Class File.*/
require_once plugin_dir_path( __FILE__ ) . '/includes/rest-api/class-mdbp-rest-api.php';
///*Admin data.*/
require_once plugin_dir_path( __FILE__ ) . '/includes/admin/class-mdbp-admin.php';
/**
 * The class responsible for defining all actions that occur in the public-facing side of the site.
 *
 */
require_once plugin_dir_path( __FILE__ ) . 'includes/class-mdbp-user-feedback.php';