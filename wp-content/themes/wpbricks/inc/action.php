<?php
/**
 * File include all the actions.
 */

/**
 * Action for the theme setup.
 */
add_action( 'after_setup_theme', 'wpbricks_setup' );

/**
 * Action for content width defining in the theme setup.
 */
add_action( 'after_setup_theme', 'wpbricks_content_width', 0 );

/**
 * Action for the frontend script enqueueing.
 */
add_action( 'wp_enqueue_scripts', 'wpbricks_scripts' );

/**
 * Action for register widget.
 */
add_action( 'widgets_init', 'wpbricks_widgets_init' );

/**
 * Action for add editor styles
 */
add_action( 'admin_init', 'wpbricks_theme_add_editor_styles' );

add_action( 'admin_notices', 'wpbricks_register_notices' );

if ( is_admin() ) {
	add_action( 'wp_ajax_wpbricks-notice-dismiss', 'wpbricks_dismiss_notice' );

	add_action( 'wp_ajax_wpbricks-recommedade-plugin', 'wpbricks_recommedade_plugin' );
}

