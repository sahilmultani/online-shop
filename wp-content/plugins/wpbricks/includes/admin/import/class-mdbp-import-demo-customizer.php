<?php
/**
 * Import Class
 *
 * Handles the Admin side functionality of plugin
 *
 * @package Bricks Plugin
 * @since 1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
require_once( ABSPATH . '/wp-includes/class-wp-customize-manager.php' );
require_once( ABSPATH . '/wp-includes/class-wp-customize-setting.php' );

final class WPBricks_Options extends WP_Customize_Setting {
	/**
	 * Import an option value for this setting.
	 *
	 * @param mixed $value The option value.
	 *
	 * @return void
	 * @since 0.3
	 */
	public function mdbp_import( $value ) {
		$this->update( $value );
	}
}

/**
 * A class definition that show basic Theme import Process.
 */
class WP_Bricks_customizer_import {
	/**
	 * Imports uploaded mods and calls WordPress core customize_save actions so
	 * themes that hook into them can act before mods are saved to the database.
	 *
	 * @param object $wp_customize An instance of WP_Customize_Manager.
	 *
	 * @return void
	 * @since 0.1
	 * @since 0.3 Added $wp_customize param and importing of options.
	 * @access private
	 */
	public function mdbp_import_customizer( $file ) {
		$wp_customize = new WP_Customize_Manager();
		if ( ! function_exists( 'wp_handle_upload' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
		}
		global $wpbricks_error; // phpcs:ignore
		$wpbricks_error = false; // phpcs:ignore
		$template = get_template();
		$raw  = file_get_contents( $file );
//		echo '<pre>';
//		print_r($raw);
//		echo '</pre>';
		$data = unserialize( $raw ); // phpcs:ignore
//		echo '<pre>';
//		print_r($data);
//		echo '</pre>';
//		echo 'CALL456 ' . $data['template'];
		if ( 'array' !== gettype( $data ) ) {
			$wpbricks_error = 'Error importing settings! Please check that you uploaded a customizer export file.';

			return;
		}
		if ( ! isset( $data['template'] ) || ! isset( $data['mods'] ) ) {
			$wpbricks_error = 'Error importing settings! Please check that you uploaded a customizer export file.';

			return;
		}
		if ( $data['template'] !== $template ) {
			$wpbricks_error = 'Error importing settings! The settings you uploaded are not for the current theme.';

			return;
		}
		$data['mods'] = $this->mdbp_import_images( $data['mods'] );
		if ( isset( $data['options'] ) ) {
			foreach ( $data['options'] as $option_key => $option_value ) {
				$option = new WPBricks_Options( $wp_customize, $option_key, array(
					'default'    => '',
					'type'       => 'option',
					'capability' => 'edit_theme_options'
				) );
				$option->mdbp_import( $option_value );
			}
		}
		if ( function_exists( 'wp_update_custom_css_post' ) && isset( $data['wp_css'] ) && '' !== $data['wp_css'] ) {
			wp_update_custom_css_post( $data['wp_css'] );
		}
		do_action( 'customize_save', $wp_customize );
		foreach ( $data['mods'] as $key => $val ) {
			do_action( 'customize_save_' . $key, $wp_customize );
			set_theme_mod( $key, $val );
		}
	}

	public function mdbp_import_images( $mods ) {
		foreach ( $mods as $key => $val ) {
			if ( $this->mdbp_is_image_url( $val ) ) {
				$data = $this->mdbp_sideload_image( $val );
				if ( ! is_wp_error( $data ) ) {
					$mods[ $key ] = $data->url;
					if ( isset( $mods[ $key . '_data' ] ) ) {
						$mods[ $key . '_data' ] = $data;
						update_post_meta( $data->attachment_id, '_wp_attachment_is_custom_header', get_stylesheet() );
					}
				}
			}
		}

		return $mods;
	}


	/**
	 * Taken from the core media_sideload_image function and
	 * modified to return an array of data instead of html.
	 *
	 * @param string $file The image file path.
	 *
	 * @return array An array of image data.
	 * @since 0.1
	 * @access private
	 */
	public function mdbp_sideload_image( $file ) {
		$data = new stdClass();
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/media.php' );
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );
		}
		if ( ! empty( $file ) ) {
			preg_match( '/[^\?]+\.(jpe?g|jpe|gif|png)\b/i', $file, $matches );
			$file_array             = array();
			$file_array['name']     = basename( $matches[0] );
			$file_array['tmp_name'] = download_url( $file );
			if ( is_wp_error( $file_array['tmp_name'] ) ) {
				return $file_array['tmp_name'];
			}
			$id = media_handle_sideload( $file_array, 0 );
			if ( is_wp_error( $id ) ) {
				wp_delete_file( $file_array['tmp_name'] );

				return $id;
			}
			$meta                = wp_get_attachment_metadata( $id );
			$data->attachment_id = $id;
			$data->url           = wp_get_attachment_url( $id );
			$data->thumbnail_url = wp_get_attachment_thumb_url( $id );
			$data->height        = $meta['height'];
			$data->width         = $meta['width'];
		}

		return $data;
	}

	/**
	 * Checks to see whether a string is an image url or not.
	 *
	 * @param string $string The string to check.
	 *
	 * @return bool Whether the string is an image url or not.
	 * @since 0.1
	 * @access private
	 */
	public function mdbp_is_image_url( $string = '' ) {
		if ( is_string( $string ) ) {
			if ( preg_match( '/\.(jpg|jpeg|png|gif)/i', $string ) ) {
				return true;
			}
		}

		return false;
	}
}
