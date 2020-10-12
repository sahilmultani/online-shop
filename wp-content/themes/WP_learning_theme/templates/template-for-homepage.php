<?php
/*
* Template Name: Home Template
*/
get_header();

$home_banner_heading = get_post_meta( $post->ID, 'banner-heading', true );
$home_banner_content = get_post_meta( $post->ID, 'banner-content', true );
$home_services = get_post_meta( $post->ID, 'home_services_section', true );
?>
    <div class="container">
		<!-- Banner -->
		<section id="banner">
			<header>
				<h2><?php echo isset( $home_banner_heading ) ? $home_banner_heading : "" ?></h2>
				<p><?php echo isset( $home_banner_content ) ? $home_banner_content : "" ?></p>
			</header>
		</section>

		<!-- Intro -->
		<div class="row">
			<?php if( isset($home_services) ) :
					foreach( $home_services as $home_services_val ) :
						$home_service_heading = $home_services_val['services-heading'];
						$home_service_content = $home_services_val['services-description'];
			?>
				<div class="col-4 col-6-medium col-12-small">
					<section class="box">
						<header>
							<h3><?php echo $home_service_heading; ?></h3>
						</header>
						<p><?php echo $home_service_content; ?></p>
					</section>
				</div>
			<?php 
					endforeach;
				endif;
			?>
		</div>
		<!-- Main -->
		<section id="main">
			<div class="container">
				<div class="row">
					<div class="col-12">

						<!-- Portfolio -->
							<section>
								<header class="major">
									<h2>My Portfolio</h2>
								</header>
								<div class="row">
									<div class="col-4 col-6-medium col-12-small">
										<section class="box">
											<a href="#" class="image featured"><img src="images/pic02.jpg" alt="" /></a>
											<header>
												<h3>Ipsum feugiat et dolor</h3>
											</header>
											<p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
											<footer>
												<ul class="actions">
													<li><a href="#" class="button alt">Find out more</a></li>
												</ul>
											</footer>
										</section>
									</div>
									<div class="col-4 col-6-medium col-12-small">
										<section class="box">
											<a href="#" class="image featured"><img src="images/pic03.jpg" alt="" /></a>
											<header>
												<h3>Sed etiam lorem nulla</h3>
											</header>
											<p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
											<footer>
												<ul class="actions">
													<li><a href="#" class="button alt">Find out more</a></li>
												</ul>
											</footer>
										</section>
									</div>
									<div class="col-4 col-6-medium col-12-small">
										<section class="box">
											<a href="#" class="image featured"><img src="images/pic04.jpg" alt="" /></a>
											<header>
												<h3>Consequat et tempus</h3>
											</header>
											<p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
											<footer>
												<ul class="actions">
													<li><a href="#" class="button alt">Find out more</a></li>
												</ul>
											</footer>
										</section>
									</div>
									<div class="col-4 col-6-medium col-12-small">
										<section class="box">
											<a href="#" class="image featured"><img src="images/pic05.jpg" alt="" /></a>
											<header>
												<h3>Blandit sed adipiscing</h3>
											</header>
											<p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
											<footer>
												<ul class="actions">
													<li><a href="#" class="button alt">Find out more</a></li>
												</ul>
											</footer>
										</section>
									</div>
									<div class="col-4 col-6-medium col-12-small">
										<section class="box">
											<a href="#" class="image featured"><img src="images/pic06.jpg" alt="" /></a>
											<header>
												<h3>Etiam nisl consequat</h3>
											</header>
											<p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
											<footer>
												<ul class="actions">
													<li><a href="#" class="button alt">Find out more</a></li>
												</ul>
											</footer>
										</section>
									</div>
									<div class="col-4 col-6-medium col-12-small">
										<section class="box">
											<a href="#" class="image featured"><img src="images/pic07.jpg" alt="" /></a>
											<header>
												<h3>Dolore nisl feugiat</h3>
											</header>
											<p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
											<footer>
												<ul class="actions">
													<li><a href="#" class="button alt">Find out more</a></li>
												</ul>
											</footer>
										</section>
									</div>
								</div>
							</section>

							</div>
							<div class="col-12">

								<!-- Blog -->
									<section>
										<header class="major">
											<h2>The Blog</h2>
										</header>
										<div class="row">
											<div class="col-6 col-12-small">
												<section class="box">
													<a href="#" class="image featured"><img src="images/pic08.jpg" alt="" /></a>
													<header>
														<h3>Magna tempus consequat</h3>
														<p>Posted 45 minutes ago</p>
													</header>
													<p>Lorem ipsum dolor sit amet sit veroeros sed et blandit consequat sed veroeros lorem et blandit adipiscing feugiat phasellus tempus hendrerit, tortor vitae mattis tempor, sapien sem feugiat sapien, id suscipit magna felis nec elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos lorem ipsum dolor sit amet.</p>
													<footer>
														<ul class="actions">
															<li><a href="#" class="button icon solid fa-file-alt">Continue Reading</a></li>
															<li><a href="#" class="button alt icon solid fa-comment">33 comments</a></li>
														</ul>
													</footer>
												</section>
											</div>
											<div class="col-6 col-12-small">
												<section class="box">
													<a href="#" class="image featured"><img src="images/pic09.jpg" alt="" /></a>
													<header>
														<h3>Aptent veroeros aliquam</h3>
														<p>Posted 45 minutes ago</p>
													</header>
													<p>Lorem ipsum dolor sit amet sit veroeros sed et blandit consequat sed veroeros lorem et blandit adipiscing feugiat phasellus tempus hendrerit, tortor vitae mattis tempor, sapien sem feugiat sapien, id suscipit magna felis nec elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos lorem ipsum dolor sit amet.</p>
													<footer>
														<ul class="actions">
															<li><a href="#" class="button icon solid fa-file-alt">Continue Reading</a></li>
															<li><a href="#" class="button alt icon solid fa-comment">33 comments</a></li>
														</ul>
													</footer>
												</section>
											</div>
										</div>
									</section>

							</div>
						</div>
					</div>
				</section>
        <div class="row pt-3">
            <?php if (get_theme_mod('online_shop_latest_post_display') === 'yes') { ?>
            <div class="col-lg-12">
            	<div class="row">
	            	<div class="col-6 col-6-medium col-12-small cat-post-section">
		            	<div class="post-section mb-5">
		                	<h3><?php echo get_theme_mod('online_shop_latest_post_title'); ?></h3>
		                </div>
			            <?php
			            	// get post category id
			            	$args = array(
			            		'cat'			=> 4,
			            		'posts_per_page' => 3
			            	);
			            	$get_technical_data = new WP_Query( $args );
			                if ( $get_technical_data->have_posts() ) :
			                    while ( $get_technical_data->have_posts() ) :
			                        //Display Post Content..
			                        $get_technical_data->the_post();
			                    ?>
			                    <section class="box">
									<a href="<?php the_permalink(); ?>" class="image featured">
										<?php the_post_thumbnail(); ?>
									</a>
									<header>
										<h3><a href="<?php the_permalink(); ?>"><?php echo get_the_title(get_the_ID()); ?></a></h3>
										<p>Posted: <?php the_time(); ?></p>
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
			                wp_reset_postdata();
			            ?>
	            	</div>
	            	<div class="col-6 col-6-medium col-12-small cat-post-section">
		            	<div class="post-section mb-5">
		                	<h3>Latest Travel Post</h3>
		                </div>
			            <?php
			            	// get post category id
			            	$args = array(
			            		'category_name'	=> 'travel',
			            		'posts_per_page' => 3
			            	);
			            	$get_travel_data = new WP_Query( $args );
			                if ( $get_travel_data->have_posts() ) :
			                    while ( $get_travel_data->have_posts() ) :
			                        //Display Post Content..
			                        $get_travel_data->the_post();
			                    ?>
			                    <section class="box">
									<a href="<?php the_permalink(); ?>" class="image featured">
										<?php the_post_thumbnail(); ?>
									</a>
									<header>
										<h3><a href="<?php the_permalink(); ?>"><?php echo get_the_title(get_the_ID()); ?></a></h3>
										<p>Posted: <?php the_time(); ?></p>
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
			                wp_reset_postdata();
			            ?>
	            	</div>
            	</div>
            </div>
			<?php }

			if ( have_posts() ) :
				while ( have_posts() ) :
					//Display Post Content..
					the_post();
					
					the_content();
				endwhile;
			endif;
			?>
        </div>
    </div>
<?php
get_footer();