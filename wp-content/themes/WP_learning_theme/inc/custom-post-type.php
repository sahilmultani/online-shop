<?php
/* this is my custom post type file */

// Create a Custom Post Type For Products
function online_shop_post_type_products() {
    register_post_type( 'products', array(
        'labels'              => array(
            'name'               => __( 'Products', 'online_shop' ),
            'singular_name'      => __( 'Products', 'online_shop' ),
            'add_new'            => __( 'Add New', 'online_shop' ),
            'add_new_item'       => __( 'Create New Products', 'online_shop' ),
            'edit'               => __( 'Edit', 'online_shop' ),
            'edit_item'          => __( 'Edit Products', 'online_shop' ),
            'new_item'           => __( 'New Products', 'online_shop' ),
            'view'               => __( 'View Products', 'online_shop' ),
            'view_item'          => __( 'View Products', 'online_shop' ),
            'search_items'       => __( 'Search Products', 'online_shop' ),
            'not_found'          => __( 'No Products found', 'online_shop' ),
            'not_found_in_trash' => __( 'No Products found in trash', 'online_shop' ),
            'parent'             => __( 'Parent Products', 'online_shop' ),
        ),
        'description'         => __( 'This is where you can create new classified online_shop Products on your site.', 'online_shop' ),
        'public'              => true,
        'show_ui'             => true,
        'has_archive'         => true,
        'capability_type'     => 'page',
        'publicly_queryable'  => true,
        'exclude_from_search' => false,
        'menu_position'       => 5,
        'hierarchical'        => true,
        'query_var'           => true,
        'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky', 'page-attributes', 'menu_order' ),
    ) );

}

add_action('init', 'online_shop_post_type_products'); 