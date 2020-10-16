<?php
/**
 * Import Class
 *
 * Handles the Admin side functionality of plugin for import demo content like pages,posts,menu,media,widget,customizer options and custom-post.
 *
 * @package Bricks Plugin
 * @since   1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
require_once plugin_dir_path( __FILE__ ) . '/import/class-mdbp-import-plugins.php'; /* class for import plugins*/
require_once plugin_dir_path( __FILE__ ) . '/import/class-mdbp-import-demo-content.php'; /* class for import demo content*/
require_once plugin_dir_path( __FILE__ ) . '/import/class-mdbp-import-demo-widget.php'; /* class for import demo widget*/
require_once plugin_dir_path( __FILE__ ) . '/import/class-mdbp-import-demo-customizer.php'; /* class for demo customizer*/
require_once( ABSPATH . 'wp-admin/includes/file.php' );
/**
 * Class Mdbp_Import
 *
 */
class Mdbp_Import {
	private $delete_count = 0;
	public function mdbp_theme_details_pops() {
		$theme_id          = filter_input( INPUT_POST, 'themetoken', FILTER_SANITIZE_STRING );
		$installation_type = filter_input( INPUT_POST, 'installation_type', FILTER_SANITIZE_STRING );
		if ( 'themes' === $installation_type ) {
			$api_endpoint = 'themes/themes-import';
		} else if ( 'template' === $installation_type ) {
			$api_endpoint = 'templates/templates-import';
		} else if ( 'addons' === $installation_type ) {
			$api_endpoint = 'addons/addons-import';
		} else {
			$api_endpoint = 'templates/templates-import';
		}
		$url       = MDBP_BUSINESS_URL . '/wp-json/mdapi/v1/' . $api_endpoint . '?theme-token=' . $theme_id;  // phpcs:ignore
		$cookies   = wp_unslash( $_COOKIE );
		$headers   = array(
			'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
		);
		$sslverify = apply_filters( 'https_local_ssl_verify', false );
		set_time_limit( 300 );
		$timeout    = 100;
		$response   = wp_remote_get( $url, compact( 'cookies', 'headers', 'timeout', 'sslverify' ) );
		$body       = wp_remote_retrieve_body( $response );
		$res_themes = json_decode( $body );
		if ( 'themes' === $installation_type ) {
			$independent = $res_themes->theme_is_independent;
			$parent      = 'true';
			if ( $independent === 'no' ) {
				$installed_themes_list = wp_get_themes();
				$parent                = array_key_exists( "WPBricks", $installed_themes_list ) ? true : false;
				if ( ! $parent ) {
					$wpbricks_required = '<div class="mdbp-error-msg">
								<span>WPBricks Theme needs to be active for you to use currently installed "WPBricks" plugin. </span><a href="#" class="wpbricks_parent_active" data-theme-slug="wpbricks">Install &amp; Activate Now</a>
					</div>';
				}
			}
		}
		if ( 'themes' === $installation_type ) {
			$popup_title            = $res_themes->theme_title;
			$required_setting_title = esc_html__( 'Theme Required Settings' );
		} else if ( 'template' === $installation_type ) {
			$popup_title            = $res_themes->template_title;
			$required_setting_title = esc_html__( 'Template Required Settings' );
		} else if ( 'addons' === $installation_type ) {
			$popup_title            = $res_themes->addons_title;
			$required_setting_title = esc_html__( 'Please Install Addons' );
		} else {
			$popup_title            = $res_themes->template_title;
			$required_setting_title = esc_html__( 'Block Required Settings' );
		}
		?>
		<div class="wpbricks-theme theme-popup-main theme-info">
			<div class="theme_title_header">
				<div class="wpbricks_close_span"><i class="fa fa-times-circle"></i></div>
				<div class="theme_title">
					<h2 class="theme_title_h"><?php echo esc_html( $popup_title ); ?></h2>
				</div>
			</div>

			<div class="wpbricks-theme theme-popup-wrap">
				<?php
				if ( 'themes' === $installation_type ) {
					echo wp_kses_post( $wpbricks_required );
				}
				?>
				<div class="import_ajax_status_content"></div>
				<?php
				if ( 'themes' === $installation_type ) {
					do_action( 'mdbp_theme_popup_content', $required_setting_title, $parent, $theme_id, $popup_title );
				}
				if ( 'template' === $installation_type || 'blocks' === $installation_type ) {
					do_action( 'mdbp_template_popup_content', $required_setting_title, $parent = "false", $theme_id, $popup_title, $installation_type );
				}
				if ( 'addons' === $installation_type ) {
					do_action( 'mdbp_addons_popup_content', $required_setting_title, $parent = "false", $theme_id, $popup_title, $installation_type );
				}
				?>
			</div>
		</div>
		<?php
		die;
	}
	public function mdbp_theme_popup_content_html( $required_setting_title, $parent, $theme_id, $popup_title ) {
		?>
		<div class="wpbricks-theme theme-popup-content" id="unique-<?php echo esc_attr( $theme_id ); ?>">
			<div class="popup-content-last popup-sections">
				<div class="import_options">
					<h2><?php esc_html_e( $required_setting_title ); ?></h2>
					<div class="import_lable_section import_data_section">
						<div class="chk_section">
							<div class="import_data_section_title">
								<span>Plugins Install/Active</span>
							</div>
							<label class="switch">
								<input type="checkbox" name="mdbp_plugin_install_active_process"
								       id="mdbp_plugin_install_active_process" checked="checked" disabled>
								<div class="slider round"></div>
							</label>
						</div>
						<div class="chk_section">
							<div class="import_data_section_title">
								<span>Demo Content import</span>
							</div>
							<label class="switch">
								<input type="checkbox" name="mdbp_demo_content_import_process"
								       id="mdbp_demo_content_import_process">
								<div class="slider round"></div>
							</label>
						</div>
						<div class="chk_section">
							<div class="import_data_section_title">
								<span>Widget import</span>
							</div>
							<label class="switch">
								<input type="checkbox" name="mdbp_widget_import_process"
								       id="mdbp_widget_import_process">
								<div class="slider round"></div>
							</label>
						</div>
						<div class="chk_section">
							<div class="import_data_section_title">
								<span>Customizer import</span>
							</div>
							<label class="switch">
								<input type="checkbox" name="mdbp_customizer_import_process"
								       id="mdbp_customizer_import_process">
								<div class="slider round"></div>
							</label>
						</div>
						<div class="chk_section">
							<div class="import_data_section_title">
								<span>Delete Old content</span>
							</div>
							<label class="switch">
								<input type="checkbox" name="mdbp_delete_demo_content_process"
								       id="mdbp_delete_demo_content_process">
								<div class="slider round"></div>
							</label>
							<p class="demo_content_delete_warning">WARNING: Selecting this option will delete
							                                       data
							                                       from your current website(ex. Pages, Posts, Widget,
							                                       Menu etc..). Choose this
							                                       option
							                                       only if this is intended.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="popup-content-right popup-sections">
				<div class="content-data">
					<h2><?php esc_html_e( 'Importing Data' ); ?></h2>
					<div class="import_lable_section content_data_section">
						<ul>
							<li class="mdbp_import_process_sec mdbp_plugin_imported">
								<div class="round_icon">
									<i class="dashicons dashicons-clock"></i>
								</div>
								<span><?php esc_html_e( 'Required Plugins' ); ?></span>
								<span></span>
							</li>
							<li class="mdbp_import_process_sec mdbp_content_imported">
								<div class="round_icon">
									<i class="dashicons dashicons-clock"></i>
								</div>
								<span><?php esc_html_e( 'Theme Content (ie. Pages, Posts, CPT, Media etc.)' ); ?></span>
							</li>
							<li class="mdbp_import_process_sec mdbp_widget_imported">
								<div class="round_icon">
									<i class="dashicons dashicons-clock"></i>
								</div>
								<span><?php esc_html_e( 'Customize Widget' ); ?></span>
							</li>
							<li class="mdbp_import_process_sec mdbp_setting_imported">
								<div class="round_icon">
									<i class="dashicons dashicons-clock"></i>
								</div>
								<span><?php esc_html_e( 'Customize Settings' ); ?></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="imp-process-btn">
				<button class="wpbricks-theme-import-process"
				        data-parent-theme="<?php echo esc_attr( $parent ); ?>"
				        data-theme-token="<?php echo esc_attr( $theme_id ); ?>">
					Install <?php esc_html_e( $popup_title ); ?></button>
			</div>
		</div>
		<?php
	}
	public function mdbp_addons_popup_content_html( $required_setting_title, $parent, $theme_id, $popup_title, $installation_type ) {
		?>
		<div class="wpbricks-theme theme-popup-content" id="unique-<?php echo esc_attr( $theme_id ); ?>">
			<div class="popup-content-last popup-sections">
				<div class="import_options">
					<h2><?php esc_html_e( $required_setting_title ); ?></h2>
				</div>
			</div>
			<div class="imp-process-btn">
				<button class="wpbricks-addons-import"
				        data-parent-theme="<?php echo esc_attr( $parent ); ?>"
				        data-theme-token="<?php echo esc_attr( $theme_id ); ?>"
				        data-install-type="<?php echo esc_attr( $installation_type ); ?>">
					Install <?php esc_html_e( $popup_title ); ?> Addons
				</button>
			</div>
		</div>
		<?php
	}
	public function mdbp_template_popup_content_html( $required_setting_title, $parent, $theme_id, $popup_title, $installation_type ) {
		?>
		<div class="wpbricks-theme theme-popup-content" id="unique-<?php echo esc_attr( $theme_id ); ?>">
			<div class="popup-content-last popup-sections">
				<div class="import_options">
					<h2><?php esc_html_e( $required_setting_title ); ?></h2>
					<div class="import_lable_section import_data_section">
						<div class="template-imp-setting">
							<div class="template-setting-radio">
								<label>
									<input type="radio" name="template_imp_page_otion" value="new_page"
									       checked="checked"
									       class="tmp_radio">
									<span><?php esc_html_e( 'New Page' ); ?></span>
								</label>
								<label>
									<input type="radio" name="template_imp_page_otion" value="existing_page"
									       class="tmp_radio">
									<span><?php esc_html_e( 'Existing Page' ); ?></span>
								</label>
							</div>
						</div>
						<div class="template_radio_result template_radio_result_new_page"
						     id="template_radio_result_new_page">
							<input type="text" name="insert_new_page" value=""/>
						</div>
						<div class="chk_section" id="chk_section_for_existing">
							<div class="import_data_section_title">
								<span><?php esc_html_e( 'Delete Old content' ); ?></span>
							</div>
							<label class="switch">
								<input type="checkbox" name="mdbp_delete_page_content"
								       id="mdbp_delete_page_content">
								<div class="slider round"></div>
							</label>
							<p class="demo_content_delete_warning">
								<?php
								sprintf( '<strong>%s</strong><span>%s</span>', 'WARNING:', 'Selecting this option will delete
                                data from your selected page). Choose this option only if this is intended.' )
								?>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="imp-process-btn">
				<button class="wpbricks-template-import"
				        data-parent-theme="<?php echo esc_attr( $parent ); ?>"
				        data-theme-token="<?php echo esc_attr( $theme_id ); ?>"
				        data-install-type="<?php echo esc_attr( $installation_type ); ?>">
					Install <?php esc_html_e( $popup_title ); ?></button>
			</div>
		</div>
		<?php
	}
	/**
	 * Get all file which is required to import.
	 * Like Require plugin and theme.
	 */
	public function mdbp_import_options() {
		$token = filter_input( INPUT_POST, 'themetoken', FILTER_SANITIZE_NUMBER_INT );
		//$response      = wp_remote_get( MDBP_BUSINESS_URL . '/wp-json/mdapi/v1/themes/themes-import?theme-token=' . $token, MDBP_API_AUTH ); // phpcs:ignore
		$url       = MDBP_BUSINESS_URL . '/wp-json/mdapi/v1/themes/themes-import?theme-token=' . $token;
		$cookies   = wp_unslash( $_COOKIE );
		$headers   = array(
			'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
		);
		$sslverify = apply_filters( 'https_local_ssl_verify', false );
		set_time_limit( 300 );
		$timeout       = 100;
		$response      = wp_remote_get( $url, compact( 'cookies', 'headers', 'timeout', 'sslverify' ) );
		$body          = wp_remote_retrieve_body( $response );
		$res_themes    = json_decode( $body );
		$theme_impo_op = array(
			'theme_file'   => array(
				'theme_name'                      => $res_themes->theme_title,
				'theme_slug'                      => $res_themes->theme_slug,
				'theme_zip_file'                  => $res_themes->theme_zip_file,
				'theme_is_independent'            => $res_themes->theme_is_independent,
				'theme_demo_url'                  => $res_themes->theme_demo_url,
				'theme_required_content_file'     => $res_themes->theme_required_content_file,
				'theme_required_widget_file'      => $res_themes->theme_required_widget_file,
				'theme_required_customizer_field' => $res_themes->theme_required_customizer_field,
				'theme_required_general_option'   => $res_themes->theme_required_general_option,
			),
			'plugin_files' => $res_themes->theme_require_plugins,
		);
		echo wp_json_encode( array( 'status' => 1, 'res_arr' => $theme_impo_op ) );
		die;
	}
	public function mdbp_install_plugins() {
		$pluign          = new Mdbp_Import_Plugins();
		$plugin_arr      = filter_input( INPUT_POST, 'plugin', FILTER_SANITIZE_STRING, FILTER_REQUIRE_ARRAY );
		$sucess_msg      = array();
		$not_success_msg = array();
		$i               = 0;
		foreach ( $plugin_arr as $key => $val ) {
			$i ++;
			$plugin_main_file = trim( $val['plugin_main_file_path'] );
			$plugin_zip       = trim( $val['plugin_zip'] );
			$plugin_type      = trim( $val['plugin_type'] );
			if ( 'zip' === $plugin_type ) {
				global $wp_filesystem;
				WP_Filesystem();
				$temp_plugin_zip  = MDBP_UPLOAD_DIR_PATH . "/inner2.zip";
				$file_get_content = file_get_contents( $plugin_zip, false, stream_context_create( MDBP_FILE_GET_CONTENT_SSL ) );
				if ( ! $wp_filesystem->put_contents( $temp_plugin_zip, $file_get_content, FS_CHMOD_DIR ) ) {
					return new WP_Error( 'copy_failed_ziparchive', __( 'Could not copy file.' ), $temp_plugin_zip );
				}
				$installed = unzip_file( $temp_plugin_zip, ABSPATH . 'wp-content/plugins/' );
				if ( is_wp_error( $installed ) ) {
					$not_success_msg[ $val['plugin_slug'] ] = $i;
				} else {
					$sucess_msg[] = $i;
				}
				wp_delete_file( $temp_plugin_zip );
			} else {
				$checkinstall = $pluign->is_plugin_installed( $plugin_main_file );
				if ( true === $checkinstall ) {
					$pluign->upgrade_plugin( $plugin_main_file );
					$installed = true;
				} else {
					$installed = $pluign->install_plugin( $plugin_zip );
				}
				if ( '1' == $installed || true === $installed ) {
					$sucess_msg[] = $i;
				} else {
					$not_success_msg[ $val['plugin_slug'] ] = $i;
				}
			}
		}
		$count_intsall_plugin = count( $sucess_msg );
		echo '===' . $count_intsall_plugin . '===' . wp_json_encode( $not_success_msg );
		wp_die();
	}
	public function mdbp_pugin_check_installation() {
		$pluign     = new Mdbp_Import_Plugins();
		$plugin_arr = filter_input( INPUT_POST, 'plugin', FILTER_SANITIZE_STRING, FILTER_REQUIRE_ARRAY );
		$i          = 0;
		foreach ( $plugin_arr as $key => $val ) {
			$i ++;
			$plugin_main_file = trim( $val['plugin_main_file_path'] );
			if ( $pluign->is_plugin_installed( $plugin_main_file ) ) {
				$installed = true;
			}
			if ( '1' == $installed ) {
				$sucess_msg[ $val['plugin_slug'] ] = $i;
			}
		}
		return $sucess_msg;
	}
	public function mdbp_activate_plugins() {
		$plugin_arr    = filter_input( INPUT_POST, 'plugin', FILTER_SANITIZE_STRING, FILTER_REQUIRE_ARRAY );
		$i             = 0;
		$not_activated = array();
		$activated     = array();
		foreach ( $plugin_arr as $key => $val ) {
			$i ++;
			$plugin_main_file = trim( $val['plugin_main_file_path'] );
			$plugin_slug      = trim( $val['plugin_slug'] );
			if ( is_plugin_active( $plugin_main_file ) ) {
				$activate = true;
			} else {
				$activate = activate_plugin( $plugin_main_file );
			}
			if ( is_wp_error( $activate ) ) {
				$not_activated[ $plugin_slug ] = $i;
			} else {
				$activated[] = $i;
			}
		}
		$count_activated = count( $activated );
		echo $count_activated . '===' . wp_json_encode( $not_activated );
		die();
	}
	public function mdbp_delete_pre_demo_content() {
		global $sidebars_widgets;
		$ddc = filter_input( INPUT_POST, 'ddc', FILTER_SANITIZE_STRING );
		$ddc = ( isset( $ddc ) && ! empty( $ddc ) ) ? $ddc : '';
		if ( $ddc === 'true' ) {
			global $wpdb;
			$upload_dir = wp_get_upload_dir();
			$this->mdbp_delete_folder( $upload_dir['basedir'], $upload_dir['basedir'] );
			wp_cache_delete( 'delete_' . $wpdb->prefix . "posts", $wpdb->query( "TRUNCATE TABLE " . $wpdb->prefix . "posts" ) );
			wp_cache_delete( 'delete_' . $wpdb->prefix . "postmeta", $wpdb->query( "TRUNCATE TABLE " . $wpdb->prefix . "postmeta" ) );
			wp_cache_delete( 'delete_' . $wpdb->prefix . "terms", $wpdb->query( "TRUNCATE TABLE " . $wpdb->prefix . "terms" ) );
			wp_cache_delete( 'delete_' . $wpdb->prefix . "termmeta", $wpdb->query( "TRUNCATE TABLE " . $wpdb->prefix . "termmeta" ) );
			wp_cache_delete( 'delete_' . $wpdb->prefix . "term_relationships", $wpdb->query( "TRUNCATE TABLE " . $wpdb->prefix . "term_relationships" ) );
			wp_cache_delete( 'delete_' . $wpdb->prefix . "term_taxonomy", $wpdb->query( "TRUNCATE TABLE " . $wpdb->prefix . "term_taxonomy" ) );
			
			$wpdb->query("DELETE FROM ". $wpdb->prefix . "options WHERE option_name LIKE 'theme_mods\_%' OR option_name LIKE 'mods\_%'");
			
			foreach ( $sidebars_widgets as $k => $k ) {
				$sidebars_widgets[ $k ] = array();
			}
			update_option( 'sidebars_widgets', $sidebars_widgets );
			echo 'true';
		}
		die();
	}
	/**
	 * Delete upload folder
	 */
	public function mdbp_delete_folder( $folder, $base_folder ) {
		$files = array_diff( scandir( $folder ), array( '.', '..' ) );
		foreach ( $files as $file ) {
			if ( is_dir( $folder . DIRECTORY_SEPARATOR . $file ) ) {
				$this->mdbp_delete_folder( $folder . DIRECTORY_SEPARATOR . $file, $base_folder );
			} else {
				$tmp                = @unlink( $folder . DIRECTORY_SEPARATOR . $file );
			}
		}
		if ( $folder != $base_folder ) {
			$tmp                = @rmdir( $folder );
			return $tmp;
		} else {
			return true;
		}
	}
	/**
	 * Import main parent theme
	 */
	public function mdbp_import_main_theme() {
		$getThemDownloadLink = $this->getTheme();
		global $wp_filesystem;
		WP_Filesystem();
		$upload_dir = MDBP_UPLOAD_DIR_PATH;
		$upload_dir = $upload_dir . '/wpbricks_temp';
		if ( ! is_dir( $upload_dir ) ) {
			if ( ! mkdir( $upload_dir, FS_CHMOD_DIR ) && ! is_dir( $upload_dir ) ) {
				throw new \RuntimeException( sprintf( 'Directory "%s" was not created', $upload_dir ) );
			}
		}
		$zipcreated = MDBP_UPLOAD_DIR_PATH . "/wpbricks_temp.zip";
		if ( class_exists( 'ZipArchive' ) ) {
			$zip = new ZipArchive;
			if ( $zip->open( $zipcreated, ZipArchive::CREATE ) === true ) {
				$zip->addFile( 'newfile.txt' );
				$zip->addFromString( 'new.txt', 'text to be added to the new.txt file' );
				$zip->close();
			}
		}
		$get_zip          = wp_get_upload_dir();
		$temp_theme_zip   = $get_zip['basedir'] . "/wpbricks_temp.zip";
		$file_get_content = file_get_contents( $getThemDownloadLink, false, stream_context_create( MDBP_FILE_GET_CONTENT_SSL ) );
		if ( ! $wp_filesystem->put_contents( $temp_theme_zip, $file_get_content, FS_CHMOD_DIR ) ) {
			return new WP_Error( 'copy_failed_ziparchive', __( 'Could not copy file.' ), $temp_theme_zip );
		}
		$etrac = $this->mdbp_unzip_file( $temp_theme_zip, ABSPATH . 'wp-content/themes/' );
		if ( $etrac ) {
			switch_theme( 'wpbricks' );
			$ajax_res = array( 'status' => 1, 'message' => 'WPBricks Theme Activated..!' );
			wp_delete_file( $temp_theme_zip );
		} else {
			$ajax_res = array( 'status' => 0, 'message' => 'WPBricks Theme Activation Faild..!' );
		}
		echo wp_json_encode( $ajax_res );
		die;
	}
	public function getTheme() {
		require_once ABSPATH . '/wp-admin/includes/theme.php';
		$get_theme_data = themes_api( 'theme_information', array( 'slug' => 'wpbricks' ) );
		if ( $get_theme_data ) {
			$downloadThemeLink = $get_theme_data->download_link;
		} else {
			$downloadThemeLink = 'https://wpbricks.com/wp-content/uploads/2020/03/wpbricks.zip';
		}
		return $downloadThemeLink;
	}
	/**
	 * @param $plugin_zip  string
	 * @param $destination string
	 *                     unzip zip file
	 *
	 * @return bool
	 */
	public function mdbp_unzip_file( $plugin_zip, $destination ) {
		WP_Filesystem();
		$unzipfile = unzip_file( $plugin_zip, $destination );
		if ( $unzipfile ) {
			return true;
		} else {
			return false;
		}
	}
	public function mdbp_import_independent_theme() {
		global $wp_filesystem;
		WP_Filesystem();
		$theme            = filter_input( INPUT_POST, 'theme', FILTER_SANITIZE_STRING );
		$theme_name       = filter_input( INPUT_POST, 'theme_name', FILTER_SANITIZE_STRING );
		$temp_theme_zip   = MDBP_UPLOAD_DIR_PATH . "/independent.zip";
		$file_get_content = file_get_contents( $theme, false, stream_context_create( MDBP_FILE_GET_CONTENT_SSL ) );
		if ( ! $wp_filesystem->put_contents( $temp_theme_zip, $file_get_content, FS_CHMOD_DIR ) ) {
			return new WP_Error( 'copy_failed_ziparchive', __( 'Could not copy file.' ), $temp_theme_zip );
		}
		$etrac = $this->mdbp_unzip_file( $temp_theme_zip, ABSPATH . 'wp-content/themes/' );
		if ( $etrac ) {
			switch_theme( $theme_name );
			$ajax_res = $theme_name . ' Theme installed..!';
			wp_delete_file( $temp_theme_zip );
		} else {
			$ajax_res = $theme_name . ' Theme installation Faild..!';
		}
		echo esc_html( $ajax_res );
		die;
	}
	/**
	 * Import Main Theme
	 */
	public function mdbp_import_inner_theme() {
		global $wp_filesystem;
		WP_Filesystem();
		$current_theme = get_template();
		if ( $current_theme !== 'wpbricks' ) { //WPBricks
			switch_theme( 'wpbricks' );
		}
		$theme            = filter_input( INPUT_POST, 'theme', FILTER_SANITIZE_STRING );
		$theme_name       = filter_input( INPUT_POST, 'theme_name', FILTER_SANITIZE_STRING );
		$temp_theme_zip   = MDBP_UPLOAD_DIR_PATH . "/inner_theme2.zip";
		$file_get_content = file_get_contents( $theme, false, stream_context_create( MDBP_FILE_GET_CONTENT_SSL ) );
		$result           = $wp_filesystem->put_contents( $temp_theme_zip, $file_get_content, FS_CHMOD_DIR );
		if ( ! $result ) {
			return new WP_Error( 'copy_failed_ziparchive', __( 'Could not copy file.' ), $temp_theme_zip );
		}
		$this->mbbp_delete_directory( ABSPATH . 'wp-content/themes/wpbricks/' );
		$etrac = $this->mdbp_unzip_file( $temp_theme_zip, ABSPATH . 'wp-content/themes/wpbricks/' );
		//		$etrac = unzip_file( $temp_theme_zip, get_stylesheet_directory()  );
		if ( $etrac ) {
			$ajax_res = $theme_name . ' Theme activated..!';
			wp_delete_file( $temp_theme_zip );
		} else {
			$ajax_res = $theme_name . ' Theme activation Faild..!';
		}
		echo esc_html( $ajax_res );
		die;
	}
	/**
	 * @param $dirname string
	 *                 delete theme previous data
	 *
	 * @return bool
	 */
	public function mbbp_delete_directory( $dirname ) {
		global $wp_filesystem;
		WP_Filesystem();
		if ( is_dir( $dirname ) ) {
			$dir_handle = opendir( $dirname );
		}
		if ( ! $dir_handle ) {
			return false;
		}
		while ( $file = readdir( $dir_handle ) ) {
			if ( $file !== "." && $file !== ".." && $file !== "style.css" && $file !== "screenshot.png" ) {
				if ( ! is_dir( $dirname . "/" . $file ) ) {
					if ( $file !== 'style.css' || $file !== "screenshot.png" ) {
						wp_delete_file( $dirname . "/" . $file );
					}
				} else {
					$this->mbbp_delete_directory( $dirname . '/' . $file );
				}
			}
		}
		closedir( $dir_handle );
		$wp_filesystem->rmdir( $dirname );
		return true;
	}
	/**
	 * Import demo content zip
	 */
	public function mdbp_import_content_zip_ajax() {
		global $wp_filesystem;
		WP_Filesystem();
		$themes_content_zip_data = filter_input( INPUT_POST, 'theme_required_content_file', FILTER_SANITIZE_STRING );
		$temp_theme_zip          = get_stylesheet_directory() . "/demo_content.zip";
		$file_get_content        = file_get_contents( $themes_content_zip_data, false, stream_context_create( MDBP_FILE_GET_CONTENT_SSL ) );
		$wp_filesystem->put_contents( $temp_theme_zip, $file_get_content, FS_CHMOD_DIR );
		$check_zip_file = $this->mdbp_unzip_file( $temp_theme_zip, ABSPATH . 'wp-content/themes/wpbricks/' );
		if ( $check_zip_file ) {
			wp_delete_file( $temp_theme_zip );
			echo 'true';
		} else {
			echo 'false';
		}
		die;
	}
	/**
	 * Import Demo Content
	 */
	public function mdbp_demo_content_import() {
		set_time_limit( 0 );
		$folderPath       = MDBP_THEME_DIR . "/demo-content";
		$files            = scandir( $folderPath );
		$getting_file_new = array();
		foreach ( $files as $file_val ) {
			if ( false !== strpos( $file_val, 'demo_content_' ) ) {
				$getting_file_new[] = $file_val;
			} else if ( false !== strpos( $file_val, 'demo_content.xml' ) ) {
				$getting_file_new[] = $file_val;
			}
		}
		$num_files    = count( $getting_file_new );
		$return_array = array( 'num_files' => $num_files, 'files_detail' => $getting_file_new );
		if ( $num_files > 1 ) {
			echo wp_json_encode( $return_array );
		} else {
			$demo_content_file = MDBP_THEME_DIR . "/demo-content/demo_content.xml"; //demo_content_first
			if ( file_exists( $demo_content_file ) ) {
				$bricks_import       = new WP_Bricks_import();
				$widget_imported_chk = $bricks_import->import( $demo_content_file );//mdbp_import_demo_content
				if ( $widget_imported_chk ) {
					echo ' Demo Content Imported..!';
				}
			} else {
				echo ' Demo Content File Not exixt..!';
			}
		}
		die();
	}
	public function mdbp_demo_content_import_stepping() {
		$file_name         = filter_input( INPUT_POST, 'file_name', FILTER_SANITIZE_STRING );
		$index             = filter_input( INPUT_POST, 'index', FILTER_SANITIZE_NUMBER_INT );
		$demo_content_file = MDBP_THEME_DIR . "/demo-content/" . $file_name;
		if ( file_exists( $demo_content_file ) ) {
			$bricks_import       = new WP_Bricks_import();
			$widget_imported_chk = $bricks_import->import( $demo_content_file );
			if ( $widget_imported_chk ) {
				echo $file_name . ' Demo Content Imported..!';
			}
		} else {
			echo $file_name . ' Demo Content File Not exixt..!';
		}
		die();
	}
	/**
	 * Import Demo Widget
	 */
	public function mdbp_demo_widget_import() {
		global $wpdb;
		echo "external_theme_url ". $external_theme_url = filter_input( INPUT_POST, 'theme_demo_url', FILTER_SANITIZE_STRING );
		echo "home_url ". $home_url           = home_url();
		$wpdb->query( $wpdb->prepare( "UPDATE $wpdb->posts SET post_content = replace(post_content,'%s','%s')", $external_theme_url, $home_url ) );
		$wpdb->query( $wpdb->prepare( "UPDATE $wpdb->postmeta SET meta_value = replace(meta_value,'%s','%s') WHERE meta_key='_menu_item_url'", $external_theme_url, $home_url ) );
		$widget_file = MDBP_THEME_DIR . "/demo-content/demo_widgets.wie";
		if ( file_exists( $widget_file ) ) {
			$widget_import   = new WP_Bricks_widget_import();
			$widget_imported = $widget_import->wpbricks_wie_process_import_file( $widget_file );
			if ( $widget_imported ) {
				echo 'Demo Widget Imported..!';
			} else {
				echo 'Demo Widget Import Fail..!';
			}
		} else {
			echo 'Demo Widget File Not exist..!';
		}
		die;
	}
	/**
	 * Import Demo customizer options
	 */
	public function mdbp_demo_customizer_import() {
		$front_pages = array( 'Front Page', 'Home' );
		foreach ( $front_pages as $front_page ) {
			$homepage = get_page_by_title( $front_page );
			if ( $homepage ) {
				update_option( 'page_on_front', $homepage->ID );
				update_option( 'show_on_front', 'page' );
			}
		}
		$post_pages = array( 'Post Page', 'Blog' );
		foreach ( $post_pages as $post_page ) {
			$blog_page = get_page_by_title( $post_page );
			if ( $blog_page ) {
				update_option( 'page_for_posts', $blog_page->ID );
			}
		}
		$customizer_file = MDBP_THEME_DIR . "/demo-content/demo_customizer.dat";
		if ( file_exists( $customizer_file ) ) {
			$customizer_import = new WP_Bricks_customizer_import();
			$customizer_import->mdbp_import_customizer( $customizer_file );
			/*Set custom Menu*/
			$locations = get_theme_mod('nav_menu_locations');
			$primary_menu = get_term_by( 'slug', 'primary-menu', 'nav_menu' );
			if ( $primary_menu ) {
				$locations['primary'] = $primary_menu->term_id;
				$locations['primary-menu'] = $primary_menu->term_id;
			}
			$footer_menu = get_term_by( 'slug', 'footer-menu', 'nav_menu' );
			if ( $footer_menu ) {
				$locations['footer-menu'] = $footer_menu->term_id;
			}
			set_theme_mod( 'nav_menu_locations', $locations );
			/*Set custom Menu*/
			echo 'Demo Customizer File Imported..!';
		} else {
			echo 'Demo Customizer File Not exist..!';
		}
		die;
	}
	/**
	 * Import Option
	 */
	public function mdbp_import_general_options_ajax() {
		$demo_general_options_file = MDBP_THEME_DIR . "/demo-content/demo_general_options.json";
		if ( file_exists( $demo_general_options_file ) ) {
			if ( ! empty( $demo_general_options_file ) ) {
				$raw        = file_get_contents( $demo_general_options_file );
				$raw_decode = json_decode( $raw, true );
				foreach ( $raw_decode as $key => $value ) {
					update_option( $value['option_name'], $value['option_value'], $value['autoload'] );
				}
			} else {
				echo 'Demo Contnet File Not exixt..!';
			}
		}
		die();
	}
	/**
	 * Import Template Option.
	 */
	public function mdbp_import_template_action() {
		$radiovalue = filter_input( INPUT_POST, 'radiovalue', FILTER_SANITIZE_STRING );
		if ( 'existing_page' === $radiovalue ) {
			$pages          = get_pages();
			$all_page_array = array();
			foreach ( $pages as $page ) {
				$all_page_array[ $page->ID ] = $page->post_title;
			}
			echo wp_json_encode( $all_page_array, true );
		}
		die();
	}
	/**
	 * Template Detail.
	 */
	public function mdbp_template_details() {
		$template_id  = filter_input( INPUT_POST, 'themetoken', FILTER_SANITIZE_STRING );
		$install_type = filter_input( INPUT_POST, 'install_type', FILTER_SANITIZE_STRING );
		$page_title   = filter_input( INPUT_POST, 'page_title', FILTER_SANITIZE_STRING );
		$page_id      = filter_input( INPUT_POST, 'page_id', FILTER_SANITIZE_STRING );
		$page_content = filter_input( INPUT_POST, 'page_content', FILTER_SANITIZE_STRING );
		$url          = MDBP_BUSINESS_URL . '/wp-json/mdapi/v1/templates/templates-import?theme-token=' . $template_id;  // phpcs:ignore
		$cookies      = wp_unslash( $_COOKIE );
		$headers      = array(
			'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
		);
		$sslverify    = apply_filters( 'https_local_ssl_verify', false );
		set_time_limit( 300 );
		$timeout       = 100;
		$response      = wp_remote_get( $url, compact( 'cookies', 'headers', 'timeout', 'sslverify' ) );
		$body          = wp_remote_retrieve_body( $response );
		$res_template  = json_decode( $body );
		$template_html = $res_template->template_html;
		if ( empty( $page_id ) ) {
			if ( empty( $page_title ) ) {
				$template_title = $res_template->template_title;
			} else {
				$template_title = $page_title;
			}
			$blog_page    = array(
				'post_type'    => 'page',
				'post_title'   => $template_title,
				'post_content' => $template_html,
				'post_status'  => 'publish',
			);
			$blog_page_id = wp_insert_post( $blog_page );
		} else {
			if ( 'on' !== $page_content ) {
				$get_old_post_content = apply_filters( 'the_content', get_post_field( 'post_content', $page_id ) );
				$combine_content      = $get_old_post_content . $template_html;
			} else {
				$combine_content = $template_html;
			}
			$blog_page    = array(
				'ID'           => $page_id,
				'post_type'    => 'page',
				'post_content' => $combine_content,
			);
			$blog_page_id = wp_update_post( $blog_page );
		}
		if ( 'blocks' === $install_type ) {
			$msg_title = 'Block';
		} else {
			$msg_title = 'Template';
		}
		if ( ! is_wp_error( $blog_page_id ) ) {
			echo sprintf( '<span>%s</span>&nbsp;<a href="%s" target="_blank">%s</a>', $msg_title . ' created successfully', get_the_permalink( $blog_page_id ), 'Visit Page' );
		} else {
			echo sprintf( '<span>%s</span>', 'Some issue with template creation. Please try again' );
		}
		die();
	}
	/**
	 * Template Detail.
	 */
	public function mdbp_addons_details() {
		$token        = filter_input( INPUT_POST, 'themetoken', FILTER_SANITIZE_STRING );
		$install_type = filter_input( INPUT_POST, 'install_type', FILTER_SANITIZE_STRING );
		$url          = MDBP_BUSINESS_URL . '/wp-json/mdapi/v1/addons/addons-import?theme-token=' . $token;
		$cookies      = wp_unslash( $_COOKIE );
		$headers      = array(
			'Authorization' => 'Basic ' . base64_encode( 'wpbricksadmin:Gg5pb{K}' ),
		);
		$sslverify    = apply_filters( 'https_local_ssl_verify', false );
		set_time_limit( 300 );
		$timeout         = 100;
		$response        = wp_remote_get( $url, compact( 'cookies', 'headers', 'timeout', 'sslverify' ) );
		$body            = wp_remote_retrieve_body( $response );
		$res_addons      = json_decode( $body );
		$pluign          = new Mdbp_Import_Plugins();
		$not_success_msg = array();
		$i               = 0;
		$req_data        = $res_addons->addons_require_plugins;
		$success         = array();
		foreach ( $req_data as $req_field ) {
			$i ++;
			$plugin_main_file  = trim( $req_field->plugin_main_file_path );
			$plugin_zip        = trim( $req_field->plugin_zip );
			$plugin_type       = trim( $req_field->plugin_type );
			$plugin_setting    = trim( $req_field->setting_url );
			$plugin_learn_more = trim( $req_field->learn_more_url );
			if ( 'zip' === $plugin_type ) {
				global $wp_filesystem;
				WP_Filesystem();
				$temp_plugin_zip  = MDBP_UPLOAD_DIR_PATH . "/inner2.zip";
				$file_get_content = file_get_contents( $plugin_zip, false, stream_context_create( MDBP_FILE_GET_CONTENT_SSL ) );
				if ( ! $wp_filesystem->put_contents( $temp_plugin_zip, $file_get_content, FS_CHMOD_DIR ) ) {
					return new WP_Error( 'copy_failed_ziparchive', __( 'Could not copy file.' ), $temp_plugin_zip );
				}
				$installed = unzip_file( $temp_plugin_zip, ABSPATH . 'wp-content/plugins/' );
				if ( is_wp_error( $installed ) ) {
					$not_success_msg[ $plugin_main_file ] = $i;
				}
				if ( is_plugin_active( $plugin_main_file ) ) {
					deactivate_plugins( $plugin_main_file );
					$success['status'] = 1;
				} else {
					activate_plugin( $plugin_main_file );
					$success['status']      = 0;
					$success['setting_url'] = $plugin_setting;
					$success['learn_more']  = $plugin_learn_more;
				}
				wp_delete_file( $temp_plugin_zip );
			} else {
				$checkinstall = $pluign->is_plugin_installed( $plugin_main_file );
				if ( true === $checkinstall ) {
					$pluign->upgrade_plugin( $plugin_main_file );
					$installed = true;
				} else {
					$installed = $pluign->install_plugin( $plugin_zip );
				}
				if ( is_plugin_active( $plugin_main_file ) ) {
					deactivate_plugins( $plugin_main_file );
					$success['status'] = 1;
				} else {
					activate_plugin( $plugin_main_file );
					$success['status']      = 0;
					$success['setting_url'] = $plugin_setting;
					$success['learn_more']  = $plugin_learn_more;
				}
			}
		}
		echo json_encode( $success );
		wp_die();
	}
}