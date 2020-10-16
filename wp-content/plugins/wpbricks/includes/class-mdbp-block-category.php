<?php
/**
 * Bricks Plugin Category Class
 *
 * Handles the blocks category of plugin
 *
 * @package WPBricks
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * A class definition to create category for blocks
 */
class Mdbp_Block_Category {
	/**
	 * This class's instance.
	 *
	 * @var Mdbp_Block_Category
	 */
	private static $instance;

	/**
	 * The Constructor
	 */
	private function __construct() {
		add_filter( 'block_categories', array( $this, 'mdbp_block_categories' ) );
	}

	/**
	 * Registers the class.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new Mdbp_Block_Category();
		}
	}

	/**
	 * Register our custom block category.
	 *
	 * @param string $categories category name.
	 *
	 * @return array
	 */
	public function mdbp_block_categories( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'bricksblocks',
					'title' => __( 'Bricks Blocks', 'wpbricks' ),
				),
			),
			$categories
		);
	}
}

Mdbp_Block_Category::register();
