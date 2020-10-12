<?php
/*
* This file is used to display pages
*/
get_header();
?>
    <div class="container">
        <div class="">
            <?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(), 'full');?>
            <img class="img-fluid" src="<?php echo $featured_img_url; ?>" alt="<?php get_the_title(); ?>">
        </div>
        <div class="row pt-3">
            <div class="col-lg-9">
            <?php get_template_part('template-parts/home', 'featured'); // get templates-parts ?>
            <?php
                if ( have_posts() ) :
                    while ( have_posts() ) :
                        //Display Post Content..
                        the_post();
                    ?>
                    <div class="home-post">
                        <div class="post-header">
                            <div class="post-thumbnails row mr-0 ml-0">
                                <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('home-featured'); ?></a>
                            </div>
                            <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                        </div>
                        <div class="post-description">
                            <?php $the_excerpt = get_post_meta($post->ID, 'the_excerpt_key', true); ?>
                            <p><?php echo $the_excerpt; ?></p>
                        </div>
                        <div class="post-footer mb-3">
                            <span><strong>Author: </strong><?php the_author(); ?></span>
                            <span><strong>Posted on: </strong><?php the_time(); ?></span>
                        </div>
                    </div>
                    <?php
                    endwhile;
                endif;
            ?>
                <img src="<?php echo get_template_directory_uri() // get templates images ?>/asset/images/team-3.jpg" alt="team">
                <div class="pagination">
                    <?php echo paginate_links(); ?>
                </div>
            </div>
        </div>
    </div>
<?php
get_footer();