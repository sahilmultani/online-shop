<?php
/*
* This is my function file
*/

// include theme menus and supports using function
function online_shop_theme_support() {

    add_theme_support('custom-logo');

    add_theme_support('title-tag');

    add_theme_support('post-thumbnails');

    $args = array(
        'default-image'     => get_template_directory_uri() . '/asset/images/testimonial-bg.jpg',
        'default-text-color'=> '676767',
        'width'             => 1200,
        'height'            => 450,
        'flex-width'        => true,
        'flex-height'       => true,
    );

    add_theme_support( 'custom-header', $args );

    add_image_size('home-featured', 690, 300, array('center', 'center'));

    // register custom navigation menu
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'online_shop' ),
        'footer' => __( 'Footer Menu', 'online_shop' )
    ) );
}
add_action('after_setup_theme', 'online_shop_theme_support');

// include theme other files
function online_shop_theme_scripts() {
    wp_enqueue_script('jquery');

    wp_enqueue_style('style', get_stylesheet_uri() );

    wp_enqueue_style('bootstrap-css', get_template_directory_uri().'/asset/bootstrap/css/bootstrap.min.css' );

    wp_enqueue_style('main-css', get_template_directory_uri().'/include/css/main.css' );

    wp_enqueue_style('fontawesome-css', get_template_directory_uri().'/include/css/fontawesome-all.min.css' );

    wp_enqueue_script('bootstrap-js', get_template_directory_uri().'/asset/bootstrap/js/bootstrap.min.js' );

}
add_action('wp_enqueue_scripts', 'online_shop_theme_scripts');

// custom register sidebar
function online_shop_widgets_init() {
    register_sidebar(array(
        'name' => __('Primary Sidebar', 'online_shop'),
        'id' => 'main-sidebar',
        'description' => 'My first sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => __('Footer 1', 'online_shop'),
        'id' => 'footer-sidebar-1',
        'description' => 'Footer 1 sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => __('Footer 2', 'online_shop'),
        'id' => 'footer-sidebar-2',
        'description' => 'Footer 2 sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => __('Footer 3', 'online_shop'),
        'id' => 'footer-sidebar-3',
        'description' => 'Footer 3 sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
}
add_action('widgets_init', 'online_shop_widgets_init');

// include customizer.php file
include( ABSPATH . '/wp-content/themes/WP_learning_theme/inc/customizer.php' );

// include custom-post-type.php file
include( ABSPATH . '/wp-content/themes/WP_learning_theme/inc/custom-post-type.php' );

// include custom-meta-box.php file
require( ABSPATH . '/wp-content/themes/WP_learning_theme/inc/custom-meta-box.php' );