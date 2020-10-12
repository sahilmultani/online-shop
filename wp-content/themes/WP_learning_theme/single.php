<?php
/*
* This file is used to display posts
*/
get_header();
?>
<div class="container">
    <div class="row pt-3">
        <div class="col-lg-12">
            <div class="post-thumbnails row mr-0 ml-0">
                <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('home-featured'); ?></a>
            </div>
        <?php
        if ( have_posts() ) :
            while ( have_posts() ) {
                //Display Post Content..
                the_post();
                ?>
                <h1><?php the_title(); //display post title ?></h1>
                <div class="post-footer mb-3">
                    <span><strong>Author: </strong><?php the_author(); ?></span>
                    <span><strong>Posted on: </strong><?php the_time(); ?></span>
                </div>
                <p><?php the_content(); //display post title ?></p>
                <?php

            }
        endif;
        ?>
        </div>
    </div>
</div>
<?php
get_footer();