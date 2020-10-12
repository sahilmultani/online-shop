<?php
/*
* This file is used to display header
*/
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>
		<?php echo get_the_title(); ?> | 
		<?php bloginfo('name'); ?>
	</title>
    <style type="text/css">
        .site-header .nav-menu ul li a {
            color: <?php echo get_theme_mod('online_shop_nav_text_color', '#fff');?>!important;
        }
    </style>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header id="header" class="site-header">
        <div class="container">

            <h1 class="site-logo">
                <a href="<?php bloginfo('url');?>">
                    <?php the_custom_logo();?>
                </a>
            </h1>
            <!-- Uncomment below if you prefer to use an image logo -->
            <!-- <a href="index.html" class="logo mr-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

            <nav id="nav" class="nav-menu" style="background-color: <?php echo get_theme_mod( 'online_shop_nav_bg_color', '#3fc936' ); ?>;">
                <?php wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'menu' => 'Primary Menu',
                        'container' => 'false'
                ) ); ?>
            </nav><!-- .nav-menu -->

        </div>
    </header><!-- End Header -->