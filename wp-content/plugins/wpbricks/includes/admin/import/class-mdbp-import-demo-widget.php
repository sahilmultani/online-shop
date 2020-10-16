<?php
if ( ! class_exists( 'WP_Bricks_widget_import' ) ) {
	class WP_Bricks_widget_import {
		public function __construct() {
			add_filter( 'upload_mimes', array( $this, 'wpbricks_wie_add_mime_types' ) );
		}

		/**
		 * Have import results to show?
		 *
		 * @return bool True if have import results to show
		 * @global string $wie_import_results
		 * @since 0.3
		 */
		public function wpbricks_wie_have_import_results() {
			global $wie_import_results;
			if ( ! empty( $wie_import_results ) ) {
				return true;
			}
			return false;

		}

		/**
		 * Show import results
		 *
		 * This is shown in place of import/export page's regular content.
		 *
		 * @since 0.3
		 * @global string $wie_import_results
		 */
		public function wpbricks_wie_show_import_results() {
			global $wie_import_results;
			?>
			<table id="wie-import-results">
				<?php
				/*Loop sidebars.*/
				$results = $wie_import_results;
				foreach ( $results as $sidebar ) :
					?>
					<tr class="wie-import-results-sidebar">
						<td colspan="2" class="wie-import-results-sidebar-name">
							<?php
							/*Sidebar name if theme supports it; otherwise ID.*/
							echo esc_html( $sidebar['name'] );
							?>
						</td>
						<td class="wie-import-results-sidebar-message wie-import-results-message wie-import-results-message-<?php echo esc_attr( $sidebar['message_type'] ); ?>">
							<?php
							/*Sidebar may not exist in theme.*/
							echo esc_html( $sidebar['message'] );
							?>
						</td>
					</tr>
					<?php
					/*Loop widgets.*/
					foreach ( $sidebar['widgets'] as $widget ) :
						?>
						<tr class="wie-import-results-widget">
							<td class="wie-import-results-widget-name">
								<?php
								/*Widget name or ID if name not available (not supported by site).*/
								echo esc_html( $widget['name'] );
								?>
							</td>
							<td class="wie-import-results-widget-title">
								<?php
								/*Shows "No Title" if widget instance is untitled.*/
								echo esc_html( $widget['title'] );
								?>
							</td>
							<td class="wie-import-results-widget-message wie-import-results-message wie-import-results-message-<?php echo esc_attr( $widget['message_type'] ); ?>">
								<?php
								/*Sidebar may not exist in theme.*/
								echo esc_html( $widget['message'] );
								?>
							</td>
						</tr>
					<?php endforeach; ?>
					<tr class="wie-import-results-space">
						<td colspan="100%"></td>
					</tr>
				<?php endforeach; ?>
			</table>
			<?php
		}

		public function wpbricks_wie_add_mime_types( $mime_types ) {
			$mime_types['wie'] = 'text/plain';
			return $mime_types;
		}

		public function wpbricks_wie_available_widgets() {
			global $wp_registered_widget_controls;
			$widget_controls = $wp_registered_widget_controls;
			$available_widgets = array();
			foreach ( $widget_controls as $widget ) {
				if ( ! empty( $widget['id_base'] ) && ! isset( $available_widgets[ $widget['id_base'] ] ) ) {
					$available_widgets[ $widget['id_base'] ]['id_base'] = $widget['id_base'];
					$available_widgets[ $widget['id_base'] ]['name']    = $widget['name'];
				}
			}
			return apply_filters( 'wie_available_widgets', $available_widgets );
		}

		public function wpbricks_wie_process_import_file( $file ) {
			global $wie_import_results;
			/*File exists?*/
			if ( ! file_exists( $file ) ) {
				wp_die(
					esc_html__( 'Import file could not be found. Please try again.', 'widget-importer-exporter' ),
					'',
					array(
						'back_link' => true,
					)
				);
			}
			/*Get file contents and decode.*/
			$data = implode( '', file( $file ) );
			$data = json_decode( $data );
			/*Delete import file.*/
			//unlink( $file );
			/*Import the widget data
			Make results available for display on import/export page.*/
			$wie_import_results = $this->wpbricks_wie_import_data( $data );

			return $wie_import_results;
		}

		/**
		 * Import widget JSON data
		 *
		 * @param object $data JSON widget data from .wie file.
		 *
		 * @return array Results array
		 * @since 0.4
		 * @global array $wp_registered_sidebars
		 */
		public function wpbricks_wie_import_data( $data ) {
			global $wp_registered_sidebars;
			/*Have valid data?
			If no data or could not decode.*/
			if ( empty( $data ) || ! is_object( $data ) ) {
				wp_die(
					esc_html__( 'Import data could not be read. Please try a different file.', 'widget-importer-exporter' ),
					'',
					array(
						'back_link' => true,
					)
				);
			}
			/*Hook before import.*/
			do_action( 'wie_before_import' );
			$data = apply_filters( 'wie_import_data', $data );
			/*Get all available widgets site supports.*/
			$available_widgets = $this->wpbricks_wie_available_widgets();
			/*Get all existing widget instances.*/
			$widget_instances = array();
			foreach ( $available_widgets as $widget_data ) {
				$widget_instances[ $widget_data['id_base'] ] = get_option( 'widget_' . $widget_data['id_base'] );
			}
			/*Begin results.*/
			$results = array();
			/*Loop import data's sidebars.*/
			foreach ( $data as $sidebar_id => $widgets ) {
				/*Skip inactive widgets (should not be in export file).*/
				if ( 'wp_inactive_widgets' === $sidebar_id ) {
					continue;
				}
				/*Check if sidebar is available on this site.
				Otherwise add widgets to inactive, and say so.*/
				if ( isset( $wp_registered_sidebars[ $sidebar_id ] ) ) {
					$sidebar_available    = true;
					$use_sidebar_id       = $sidebar_id;
					$sidebar_message_type = 'success';
					$sidebar_message      = '';
				} else {
					$sidebar_available    = false;
					$use_sidebar_id       = 'wp_inactive_widgets'; // Add to inactive if sidebar does not exist in theme.
					$sidebar_message_type = 'error';
					$sidebar_message      = esc_html__( 'Widget area does not exist in theme (using Inactive)', 'widget-importer-exporter' );
				}
				/*Result for sidebar
				Sidebar name if theme supports it; otherwise ID.*/
				$results[ $sidebar_id ]['name']         = ! empty( $wp_registered_sidebars[ $sidebar_id ]['name'] ) ? $wp_registered_sidebars[ $sidebar_id ]['name'] : $sidebar_id;
				$results[ $sidebar_id ]['message_type'] = $sidebar_message_type;
				$results[ $sidebar_id ]['message']      = $sidebar_message;
				$results[ $sidebar_id ]['widgets']      = array();
				/*Loop widgets.*/
				foreach ( $widgets as $widget_instance_id => $widget ) {
					$fail = false;
					/*Get id_base (remove -# from end) and instance ID number.*/
					$id_base            = preg_replace( '/-[0-9]+$/', '', $widget_instance_id );
					$instance_id_number = str_replace( $id_base . '-', '', $widget_instance_id );
					/*Does site support this widget?*/
					if ( ! $fail && ! isset( $available_widgets[ $id_base ] ) ) {
						$fail                = true;
						$widget_message_type = 'error';
						$widget_message      = esc_html__( 'Site does not support widget', 'widget-importer-exporter' ); // Explain why widget not imported.
					}
					/*Filter to modify settings object before conversion to array and import
					Leave this filter here for backwards compatibility with manipulating objects (before conversion to array below)
					Ideally the newer wie_widget_settings_array below will be used instead of this.*/
					$widget = apply_filters( 'wie_widget_settings', $widget );
					/*Convert multidimensional objects to multidimensional arrays
					Some plugins like Jetpack Widget Visibility store settings as multidimensional arrays
					Without this, they are imported as objects and cause fatal error on Widgets page
					If this creates problems for plugins that do actually intend settings in objects then may need to consider other approach: https://wordpress.org/support/topic/problem-with-array-of-arrays
					It is probably much more likely that arrays are used than objects, however.*/
					$widget = json_decode( wp_json_encode( $widget ), true );
					/*Filter to modify settings array
					This is preferred over the older wie_widget_settings filter above
					Do before identical check because changes may make it identical to end result (such as URL replacements).*/
					$widget = apply_filters( 'wie_widget_settings_array', $widget );
					/*Does widget with identical settings already exist in same sidebar?*/
					if ( ! $fail && isset( $widget_instances[ $id_base ] ) ) {
						/*Get existing widgets in this sidebar.*/
						$sidebars_widgets = get_option( 'sidebars_widgets' );
						$sidebar_widgets  = isset( $sidebars_widgets[ $use_sidebar_id ] ) ? $sidebars_widgets[ $use_sidebar_id ] : array(); /*Check Inactive if that's where will go.*/
						/*Loop widgets with ID base.*/
						$single_widget_instances = ! empty( $widget_instances[ $id_base ] ) ? $widget_instances[ $id_base ] : array();
						foreach ( $single_widget_instances as $check_id => $check_widget ) {
							/*Is widget in same sidebar and has identical settings?*/
							if ( in_array( "$id_base-$check_id", $sidebar_widgets, true ) && (array) $widget === $check_widget ) {
								$fail                = true;
								$widget_message_type = 'warning';
								/*Explain why widget not imported.*/
								$widget_message = esc_html__( 'Widget already exists', 'widget-importer-exporter' );
								break;
							}
						}
					}
					/*No failure.*/
					if ( ! $fail ) {
						/*Add widget instance*/
						$single_widget_instances   = get_option( 'widget_' . $id_base ); // All instances for that widget ID base, get fresh every time.
						$single_widget_instances   = ! empty( $single_widget_instances ) ? $single_widget_instances : array(
							'_multiwidget' => 1, // Start fresh if have to.
						);
						$single_widget_instances[] = $widget; /*Add it.*/
						/*Get the key it was given.*/
						end( $single_widget_instances );
						$new_instance_id_number = key( $single_widget_instances );
						/*If key is 0, make it 1
						When 0, an issue can occur where adding a widget causes data from other widget to load,
						and the widget doesn't stick (reload wipes it).*/
						if ( '0' === strval( $new_instance_id_number ) ) {
							$new_instance_id_number = 1;
							$single_widget_instances[ $new_instance_id_number ] = $single_widget_instances[0];
							unset( $single_widget_instances[0] );
						}
						/*Move _multiwidget to end of array for uniformity.*/
						if ( isset( $single_widget_instances['_multiwidget'] ) ) {
							$multiwidget = $single_widget_instances['_multiwidget'];
							unset( $single_widget_instances['_multiwidget'] );
							$single_widget_instances['_multiwidget'] = $multiwidget;
						}
						/*Update option with new widget.*/
						update_option( 'widget_' . $id_base, $single_widget_instances );

						/*Assign widget instance to sidebar.
						Which sidebars have which widgets, get fresh every time.*/
						$sidebars_widgets = get_option( 'sidebars_widgets' );
						/*Avoid rarely fatal error when the option is an empty string
						https://github.com/churchthemes/widget-importer-exporter/pull/11.*/
						if ( ! $sidebars_widgets ) {
							$sidebars_widgets = array();
						}
						/*Use ID number from new widget instance.*/
						$new_instance_id = $id_base . '-' . $new_instance_id_number;
						/*Add new instance to sidebar.*/
						$sidebars_widgets[ $use_sidebar_id ][] = $new_instance_id;
						/*Save the amended data.*/
						update_option( 'sidebars_widgets', $sidebars_widgets );
						/*After widget import action.*/
						$after_widget_import = array(
							'sidebar'           => $use_sidebar_id,
							'sidebar_old'       => $sidebar_id,
							'widget'            => $widget,
							'widget_type'       => $id_base,
							'widget_id'         => $new_instance_id,
							'widget_id_old'     => $widget_instance_id,
							'widget_id_num'     => $new_instance_id_number,
							'widget_id_num_old' => $instance_id_number,
						);
						do_action( 'wie_after_widget_import', $after_widget_import );
						/*Success message.*/
						if ( $sidebar_available ) {
							$widget_message_type = 'success';
							$widget_message      = esc_html__( 'Imported', 'widget-importer-exporter' );
						} else {
							$widget_message_type = 'warning';
							$widget_message      = esc_html__( 'Imported to Inactive', 'widget-importer-exporter' );
						}
					}
					/*Result for widget instance*/
					$results[ $sidebar_id ]['widgets'][ $widget_instance_id ]['name']         = isset( $available_widgets[ $id_base ]['name'] ) ? $available_widgets[ $id_base ]['name'] : $id_base; // Widget name or ID if name not available (not supported by site).
					$results[ $sidebar_id ]['widgets'][ $widget_instance_id ]['title']        = ! empty( $widget['title'] ) ? $widget['title'] : esc_html__( 'No Title', 'widget-importer-exporter' ); // Show "No Title" if widget instance is untitled.
					$results[ $sidebar_id ]['widgets'][ $widget_instance_id ]['message_type'] = $widget_message_type;
					$results[ $sidebar_id ]['widgets'][ $widget_instance_id ]['message']      = $widget_message;
				}
			}
			do_action( 'wie_after_import' );
			return apply_filters( 'wie_import_results', $results );

		}
	}
}