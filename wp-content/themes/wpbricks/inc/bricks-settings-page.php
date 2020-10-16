<?php
/**
 * WPBricks Customizer Menu Add.
 *
 * @package wpbricks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wpbricks_customizer_menu_fun() {
	add_theme_page( 'WPBricks Options', __( 'WPBricks Options', 'wpbricks' ), 'edit_theme_options', 'bricks-theme', 'wpbricks_customizer_menu_callable_fun' );
}

add_action( 'admin_menu', 'wpbricks_customizer_menu_fun' );
/**
 * WPBricks Customizer Setting form
 */
function wpbricks_customizer_menu_callable_fun() {
	?>
    <div class="bricks-header-settings bricks_header">
        <div class="bricks_setting_header">
            <div class="bricks_setting_header_left">
                <a href="<?php echo esc_url( 'http://wpbricks.com/' ); ?>">
                    <img class="header_logo"
                         src="<?php echo esc_url( get_template_directory_uri() . '/images/Bricks_Logo_icon.svg' ); ?>"/>
                </a>
            </div>
            <div class="bricks_setting_header_right">
                <div class="logo-detail">
                    <strong><?php echo esc_html__( 'WPBricks', 'wpbricks' ); ?></strong>
                    <span><?php echo esc_html__( 'Version', 'wpbricks' ); ?>&nbsp;<?php echo esc_html( WPBRICKS_THEME_VERSION ); ?></span>
                </div>
            </div>
        </div>
    </div>
    <div class="bricks_setting_container">
        <div class="bricks_setting_form bricks_row bricks_row_left">
            <div class="bricks-settings">
                <div class="bricks_title">
                    <h1><?php esc_html_e( 'Recommended actions', 'wpbricks' ); ?></h1>
                </div>
                <div class="container">
                    <div class="bricks_recommandation_content">
                        <div class="br_content br_images">
                            <img src="<?php echo esc_url( get_template_directory_uri() . '/images/WPBricks-Guterberg-Theme.png' ); ?>"/>
                        </div>
                        <div class="br_content br_sub_content">
                            <div>
                                <h3>
                                    <span class="dashicons dashicons-images-alt2"></span>
									<?php esc_html_e( 'Sites Library', 'wpbricks' ); ?>
                                </h3>
                                <p>
									<?php echo esc_html__( 'WPBricks now comes with dozens of ready-to-use Multipurpose Gutenberg Block, 
								Template and Theme site\'s library with various designs to pick from.', 'wpbricks' ); ?>
                                </p>
                                <p>
									<?php echo esc_html__( 'Visit our collection of Gutenberg block demos 
								that are constantly being added.', 'wpbricks' ); ?>
                                </p>
                            </div>
                            <div>
								<?php
								$initial_theme = get_option( 'initial_theme' );
								if ( '1' === $initial_theme ||
								     ! in_array( 'wpbricks/wpbricks.php',
									     apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
									?>
                                    <a href="javascript:void(0);"
                                       class="wpbricks-install-recommended-plugin button button-primary button-hero wpbricks-install-btn"
                                       data-slug="wpbricks" data-init="/wpbricks/wpbricks.php">
										<?php esc_html_e( 'Try one of our ready to use Gutenberg Website Template', 'wpbricks' ); ?>
                                    </a>
									<?php
								} else {
									$url = add_query_arg(
										array(
											'page' => 'bricks-manager',
											'tab'  => 'theme_lib',
										),
										admin_url( 'index.php' )
									);
									?>
                                    <a href="<?php echo esc_url( $url ); ?>"
                                       class="button button-primary button-hero"><?php esc_html_e( 'Try one of our ready to use Gutenberg Website Template', 'wpbricks' ); ?>
                                    </a>
									<?php
								}
								?>
                            </div>
                        </div>
                        <div class="br_content br_sub_content">
                            <div>
                                <h3>
                                    <span class="dashicons dashicons-sos"></span>
									<?php esc_html_e( 'Contact Support', 'wpbricks' ); ?>
                                </h3>
                                <p>
									<?php echo esc_html__( 'We want to make sure you have the best experience using WPBricks theme. 
								So if you need any help then you can submit your query on support forums.', 'wpbricks' ); ?>
                                </p>
                            </div>
                            <div>
                                <a href="<?php echo esc_url( 'https://wordpress.org/support/theme/wpbricks/' ); ?>"
                                   class="ti-return-dashboard  button button-secondary button-hero">
									<?php esc_html_e( 'Submit your query', 'wpbricks' ); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bricks-settings customizer_section" id="site_setting">
                <div class="bricks_title">
                    <h1><?php esc_html_e( 'Links to Customizer Settings', 'wpbricks' ); ?></h1>
                </div>
                <div class="container">
                    <div class="bricks-setting">
                        <div class="bricks-setting-penal">
                            <div class="Site_Indentity_Setting">
                                <div class="customizer_title">
                                    <span class="dashicons dashicons-admin-site-alt3"></span>
                                    <a class="site-identity-title" href="javascript:void(0);">
										<?php esc_html_e( 'Site Indentity Setting', 'wpbricks' ); ?>
                                    </a>
                                </div>
                                <div class="bricks_button_wrap">
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=custom_logo' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Add logo', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=blogname' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Site Title', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=blogdescription' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Tagline', 'wpbricks' ); ?></a>
                                </div>
                            </div>
                        </div>
                        <div class="bricks-setting-penal">
                            <div class="logo-styles">
                                <div class="customizer_title">
                                    <span class="dashicons dashicons-format-image"></span>
                                    <a class="site-identity-title" href="javascript:void(0);">
										<?php esc_html_e( 'Header Settings', 'wpbricks' ); ?>
                                    </a>
                                </div>
                                <div class="bricks_button_wrap">
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=header_setings_section' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Header Basic Settings', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=header_layout_section' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Header Layout', 'wpbricks' ); ?></a>
                                </div>
                            </div>
                        </div>
                        <div class="bricks-setting-penal">
                            <div class="menu-general-setting">
                                <div class="customizer_title">
                                    <span class="dashicons dashicons-admin-tools"></span>
                                    <a class="site-identity-title" href="javascript:void(0);">
										<?php esc_html_e( 'General Setting', 'wpbricks' ); ?>
                                    </a>
                                </div>
                                <div class="bricks_button_wrap">
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=bricks_general_text_font_family' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Text font family', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=bricks_general_text_font_weight' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Text font weight', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=bricks_general_text_font_size' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Text font size', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=bricks_general_text_font_transform' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Text Transform', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=bricks_general_text_color' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Text color', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=background_color' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Background Color', 'wpbricks' ); ?></a>
                                </div>
                            </div>
                        </div>
                        <div class="bricks-setting-penal">
                            <div class="menu-general-setting">
                                <div class="customizer_title">
                                    <span class="dashicons dashicons-format-aside"></span>
                                    <a class="site-identity-title" href="javascript:void(0);">
										<?php esc_html_e( 'Container Setting', 'wpbricks' ); ?>
                                    </a>
                                </div>
                                <div class="bricks_button_wrap">
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=bricks_container_size' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Container width', 'wpbricks' ); ?></a>
                                </div>
                            </div>
                        </div>
                        <div class="bricks-setting-penal">
                            <div class="menu-general-setting">
                                <div class="customizer_title">
                                    <span class="dashicons dashicons-format-image"></span>
                                    <a class="site-identity-title" href="javascript:void(0);">
										<?php esc_html_e( 'Background Image Setting', 'wpbricks' ); ?>
                                    </a>
                                </div>
                                <div class="bricks_button_wrap">
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[control]=background_image' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Background Image', 'wpbricks' ); ?></a>
                                </div>
                            </div>
                        </div>
                        <div class="bricks-setting-penal">
                            <div class="footer-general-setting">
                                <div class="customizer_title">
                                    <span class="dashicons dashicons-admin-generic"></span>
                                    <a class="site-identity-title" href="javascript:void(0);">
										<?php esc_html_e( 'Footer Settings', 'wpbricks' ); ?>
                                    </a>
                                </div>
                                <div class="bricks_button_wrap">
                                    <p>
										<?php esc_html_e( 'Note: In order to display the menu in the Footer section, please enable "Layout Status" option from Footer Settings >> Layouts >> Layout Status.', 'wpbricks' ); ?>
                                    </p>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=footer_settings_section' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Basic Settings', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=footer_layout_section' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Layouts', 'wpbricks' ); ?></a>
                                    <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=bricks_social_section' ) ); ?>"
                                       class="button change-theme"><?php esc_html_e( 'Social Menu', 'wpbricks' ); ?></a>
                                </div>
                            </div>
                        </div>
						<?php /*<div class="bricks-setting-penal">
                        <div class="footer-layout">
                            <div class="customizer_title">
                                <span class="dashicons dashicons-format-gallery"></span>
                                <a class="site-identity-title" href="javascript:void(0);">
									<?php esc_html_e( 'Footer layout', 'wpbricks' ); ?>
                                </a>
                            </div>

                            <div class="bricks_button_wrap">
                                <div class="layout-images">
                                    <div class="image-select-wrap">
                                        <label><img src="<?php echo esc_url( get_template_directory_uri() . '/images/footer-layouts/one-column.png' ); ?>"></label>
                                    </div>
                                    <div class="image-select-wrap">
                                        <label><img src="<?php echo esc_url( get_template_directory_uri() . '/images/footer-layouts/two-column.png' ); ?>"></label>
                                    </div>
                                    <div class="image-select-wrap">
                                        <label><img src="<?php echo esc_url( get_template_directory_uri() . '/images/footer-layouts/three-column.png' ); ?>"></label>
                                    </div>
                                    <div class="image-select-wrap">
                                        <label><img src="<?php echo esc_url( get_template_directory_uri() . '/images/footer-layouts/four-column.png' ); ?>"></label>
                                    </div>
                                </div>
                                <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=footer_layout_section' ) ); ?>"
                                   class="button button-hero"><?php esc_html_e( 'Footer layout', 'wpbricks' ); ?></a>
                            </div>
                        </div>
                    </div>
                    <div class="bricks-setting-penal">
                        <div class="footer-social">
                            <div class="customizer_title">
                                <span class="dashicons dashicons-share"></span>
                                <a class="site-identity-title" href="javascript:void(0);">
									<?php esc_html_e( 'Social Media Icons', 'wpbricks' ); ?>
                                </a>
                            </div>
                            <div class="bricks_button_wrap">
                                <div class="layout-images">
                                    <div class="image-select-wrap">
                                        <label><img src="<?php echo esc_url( get_template_directory_uri() . '/images/footer-layouts/social-left.png' ); ?>"></label>
                                    </div>
                                    <div class="image-select-wrap">
                                        <label><img src="<?php echo esc_url( get_template_directory_uri() . '/images/footer-layouts/social-right.png' ); ?>"></label>
                                    </div>
                                </div>
                                <a href="<?php echo esc_url( admin_url( 'customize.php?autofocus[section]=bricks_social_section' ) ); ?>"
                                   class="button button-hero"><?php esc_html_e( 'Social Media Icons', 'wpbricks' ); ?></a>
                            </div>
                        </div>
                    </div>*/ ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="bricks_row bricks_row_right right_sidebar_section">
            <div class="bricks-settings">
                <div class="bricks_title">
                    <span class="dashicons dashicons-star-filled bricks-icon"></span>
                    <h1 class="bricks_heading">
						<?php esc_html_e( 'Leave us a review', 'wpbricks' ); ?>
                    </h1>
                </div>
                <div class="container">
                    <p>
						<?php echo esc_html__( 'Are you are enjoying WPBricks? We would love to hear your feedback.', 'wpbricks' ); ?>
                    </p>
                    <a class="active bricks-link"
                       href="<?php echo esc_url( 'https://wordpress.org/support/theme/wpbricks/reviews/' ); ?>">
						<?php echo esc_html__( 'Submit a review', 'wpbricks' ); ?>
                    </a>
                </div>
            </div>
            <div class="bricks-settings">
                <div class="bricks_title">
                    <span class="dashicons dashicons-sos bricks-icon"></span>
                    <h1 class="bricks_heading">
						<?php esc_html_e( 'Five Star Support', 'wpbricks' ); ?>
                    </h1>
                </div>
                <div class="container">
                    <p>
						<?php echo esc_html__( 'Got a question? Get in touch with the WPBricks support team. We\'re happy to help!', 'wpbricks' ); ?>
                    </p>
                    <a class="active bricks-link"
                       href="<?php echo esc_url( 'https://www.thedotstore.com/support/' ); ?>">
						<?php echo esc_html__( 'Submit a Ticket', 'wpbricks' ); ?>
                    </a>
                </div>
            </div>
            <div class="bricks-settings">
                <div class="bricks_title">
                    <span class="dashicons dashicons-book bricks-icon"></span>
                    <h1 class="bricks_heading"><?php esc_html_e( 'Help Documentation', 'wpbricks' ); ?></h1>
                </div>
                <div class="container">
                    <p>
						<?php echo esc_html__( 'Not sure how something works? Take a peek at the knowledge base and learn.', 'wpbricks' ); ?>
                    </p>
                    <p>
						<?php echo esc_html__( 'At the starting stage, when you are setting up or using a theme. 
		                you need a quick guideline to fix some of the most common issues. ', 'wpbricks' ); ?>
                    </p>
                    <a class="active bricks-link"
                       href="<?php echo esc_url( 'https://docs.thedotstore.com/category/344-installation-and-updates' ); ?>">
						<?php echo esc_html__( 'Visit Help Documentation Base', 'wpbricks' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>

	<?php
}
