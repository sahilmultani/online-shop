<?php
// This is my first customizer file

function online_shop_customize_register( $wp_customize ) {

  // add panel for online shop theme genral setting
  $wp_customize->add_panel( 'online_shop_settings', array(
	    'title' 		=> 'Online Shop Settings',
		'description'	=> '', //incude html tag like, (p) tag
		'priority'		=> 10,
  ) );
 
  // add new section for header menu color
  $wp_customize->add_section( 'online_shop_colors', array(
	    'title' 		=> 'Colors',
	    'description'	=> 'Header navigation color',
	    'panel'			=> 'online_shop_settings',
	) );
 
  $wp_customize->add_setting( 'online_shop_nav_bg_color', array(
  		'type' 				=> 'theme_mod', // or 'option'
	  	'capability' 		=> 'edit_theme_options',
	  	'default' 			=> '#3fc936',
	  	'trasport' 			=> 'refresh', // or 'postMessage'
	  	'sanitize_callback' => 'sanitize_hex_color',
  ) );
 
  $wp_customize->add_control( 'online_shop_nav_bg_color', array(
  		'label' 	=> 'Menu background',
  		'type' 	=> 'color',
  		'section' 	=> 'online_shop_colors',
  ) );

  // add new settings and control for navigation text color
  $wp_customize->add_setting( 'online_shop_nav_text_color', array(
      'type'        => 'theme_mod', // or 'option'
      'capability'    => 'edit_theme_options',
      'default'       => '#3fc936',
      'trasport'      => 'refresh', // or 'postMessage'
      'sanitize_callback' => 'sanitize_hex_color',
  ) );
 
  $wp_customize->add_control( 'online_shop_nav_text_color', array(
      'label'   => 'Menu Text Color',
      'type'  => 'color',
      'section'   => 'online_shop_colors',
  ) );

  // add new section for post title
  $wp_customize->add_section( 'online_shop_post_title', array(
	    'title' 		=> 'Latest Post Category Title',
	    'description'	=> 'Home page latest post Category title',
	    'panel'			=> 'online_shop_settings',
	) );

  $wp_customize->add_setting( 'online_shop_latest_post_title', array(
  		'type' 				=> 'theme_mod', // or 'option'
	  	'capability' 		=> 'edit_theme_options',
	  	'default' 			=> 'Latest Technical Post',
	  	'trasport' 			=> 'refresh', // or 'postMessage'
	  	'sanitize_callback' => 'esc_attr',
  ) );
 
  $wp_customize->add_control( 'online_shop_latest_post_title', array(
  		'label' 	=> 'Latest Post Category Title',
  		'type' 	=> 'text',
  		'section' 	=> 'online_shop_post_title',
  ) );

  // add new sections for latest post display or not
  $wp_customize->add_section( 'online_shop_post_display', array(
      'title'     => 'Latest Post Radio Control',
      'description' => 'Home page latest post display or not',
      'panel'     => 'online_shop_settings',
  ) );

  $wp_customize->add_setting( 'online_shop_latest_post_display',
   array(
        'type'  => 'theme_mod', // or 'option'
        'default' => 'no',
        'transport' => 'refresh',
        'capability' => 'edit_theme_options',
     )
  );
 
$wp_customize->add_control( 'online_shop_latest_post_display',
   array(
        'label' => 'Latest Post Radio Control',
        'description' => 'Select yes or no',
        'section' => 'online_shop_post_display',
        'type' => 'radio',
        'choices' => array( // Optional.
           'yes' => __( 'Yes' ),
           'no' => __( 'No' )
        )
     )
  );

  // add panel for footer section setting
  $wp_customize->add_panel( 'online_shop_footer_settings', array(
    'title' 		=> 'Footer Settings',
  'description'	=> '', //incude html tag like, (p) tag
  'priority'		=> 10,
) );

// add new section for header menu color
$wp_customize->add_section( 'online_shop_footer_colors', array(
    'title' 		=> 'Background Colors',
    'description'	=> 'Footer Background Color',
    'panel'			=> 'online_shop_footer_settings',
) );

$wp_customize->add_setting( 'online_shop_footer_bg_color', array(
    'type' 				=> 'theme_mod', // or 'option'
    'capability' 		=> 'edit_theme_options',
    'default' 			=> '#fff',
    'trasport' 			=> 'refresh', // or 'postMessage'
    'sanitize_callback' => 'sanitize_hex_color',
) );

$wp_customize->add_control( 'online_shop_footer_bg_color', array(
    'label' 	=> 'Select Background Color',
    'type' 	=> 'color',
    'section' 	=> 'online_shop_footer_colors',
) );

}

add_action('customize_register','online_shop_customize_register');