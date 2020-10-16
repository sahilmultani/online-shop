<?php
/*
* This file is used to display footer
*/
?>
<footer id="footer" class="site-footer" style="background-color: <?php echo get_theme_mod( 'online_shop_footer_bg_color', '#fff' ); ?>;">
	<div class="container">
		<div class="footer-inner">
			<div class="footer-widget">
				<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 footer-main">
					<?php dynamic_sidebar( 'footer-sidebar-1' ); ?>
				</div>
				<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 footer-main">
					<?php dynamic_sidebar( 'footer-sidebar-2' ); ?>
				</div>
				<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 footer-main">
					<?php dynamic_sidebar( 'footer-sidebar-3' ); ?>
				</div>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>