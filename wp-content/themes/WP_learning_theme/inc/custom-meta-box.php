<?php
/* this is my custom meta boxes	file */

// add meta box for theme excerpt
function online_shop_theme_post_excerpt() {
        add_meta_box('excerpt_meta_box_id', 'Excerpt', 'excerpt_post_callback', 'post', 'normal', 'low' );
    }
add_action('add_meta_boxes', 'online_shop_theme_post_excerpt');

function excerpt_post_callback() {

	global $post;

	$excerpt_data = get_post_meta($post->ID, 'the_excerpt_key', 'true');
	?>

	<div class="the_excerpt_details">
		<textarea name="the_excerpt" id="the-excerpt" rows="4" style="width: 100%;" ><?php echo $excerpt_data; ?></textarea>
	</div
	>
	<?php
}

function save_excerpt_meta_box_value( $post_id, $post ) {

	if( 'post' === $post->post_type ) {

		$the_excerpt_val = isset($_POST['the_excerpt']) ? $_POST['the_excerpt'] : '';
    	update_post_meta($post->ID, 'the_excerpt_key', $the_excerpt_val);
	}
}
add_action('save_post', 'save_excerpt_meta_box_value', 10, 2);

// add meta box for display post price
function online_shop_theme_post_price() {
	add_meta_box('price_meta_box_id', 'Enter Price', 'price_post_callback', 'post', 'side', 'low' );
}
add_action('add_meta_boxes', 'online_shop_theme_post_price');

function price_post_callback() {

	global $post;

	$price_data = get_post_meta($post->ID, 'the_price_key', true);

	?>

	<div class="the_price_details">
		<table>
			<tbody>
				<tr>
					<td>
						<label for="the-price">Price :-</label>
						<input type="number" name="the_price" id="the-price" value="<?php echo $price_data; ?>" >
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<?php
}

function save_price_meta_box_value( $post_id, $post ) {

	if( 'post' === $post->post_type ) {

		$the_price_val = isset($_POST['the_price']) ? $_POST['the_price'] : '';
		update_post_meta($post->ID, 'the_price_key', $the_price_val);
	}
}
add_action('save_post', 'save_price_meta_box_value', 10, 2);

