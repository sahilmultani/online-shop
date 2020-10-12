<?php
/*
This is my first theme.
*/
get_header();
?>
    <div class="container">
        <div class="">
            <img class="img-fluid" src="<?php header_image(); ?>" width="<?php echo absint(get_custom_header()->width); ?>" height="<?php echo absint(get_custom_header()->height); ?>">
        </div>
        <div class="row pt-5">
            <div class="col-lg-12">
            <?php get_template_part('template-parts/home', 'featured'); // get templates-parts ?>
            <?php
                if ( have_posts() ) :
                    while ( have_posts() ) :
                        //Display Post Content..
                        the_post();
                    ?>
                    <section class="box">
                        <a href="<?php the_permalink(); ?>" class="image featured">
                            <?php the_post_thumbnail(); ?>
                        </a>
                        <header>
                            <h3><a href="<?php the_permalink(); ?>"><?php echo get_the_title(get_the_ID()); ?></a></h3>
                            <p>Posted on <?php the_date(); ?> at <?php the_time(); ?></p>
                            <?php $the_price = get_post_meta($post->ID, 'the_price_key', true); ?>
                            <p><b>Price: </b><?php echo $the_price; ?></p>
                        </header>
                        <?php $the_excerpt = get_post_meta($post->ID, 'the_excerpt_key', true); ?>
                        <p><?php echo $the_excerpt; ?></p>
                        <footer>
                            <ul class="actions">
                                <li><a href="<?php the_permalink(); ?>" class="button icon solid fa-file-alt">Continue Reading</a></li>
                                <li><a href="<?php comments_link(); ?>" class="button alt icon solid fa-comment"><?php echo get_comments_number(); ?> comments</a></li>
                            </ul>
                        </footer>
                    </section>
                    <?php
                    endwhile;
                endif;
            ?>
                <div class="pagination">
                    <?php echo paginate_links(); ?>
                </div>
            </div>
        </div>
    </div>
<?php
get_footer();