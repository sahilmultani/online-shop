<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'prj_online_shop' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'SU;|Je$%|egiB2@@bh`5qcI[zhWvhK!;`>H,l:b|tPkm0_Z8|xR6oA9Z$ND0h)3u' );
define( 'SECURE_AUTH_KEY',  'aG$JjSc6LbxU?;H(EH7fbP<T84YQ*xwKqsQh1I~{fqG>C%2[/8&x*#2Xc|qvOTb,' );
define( 'LOGGED_IN_KEY',    'ivtfuK9_=f).I[{k&^+6}2KbF*@)[sZ}ptT~]V=gy1~XuPk|Xu<rE6V=>0p=|3Je' );
define( 'NONCE_KEY',        '612-kbPx7@2|u[LnO~aSB_YA*{rQ*^K?4K#%A=};3D)6?)o;V+8:7C?!PGRWse6(' );
define( 'AUTH_SALT',        'q9H~h%]D~3;=]T+0WmNk@ ye~*]C%~=u]]BXn&85nub2_wJo@^]8Hb!D>Al:q t1' );
define( 'SECURE_AUTH_SALT', 'dY9Q-~n&.a|_E6Y&fjE{@P7Lf$K,(hc~A4Gbm]5esDU}I`[pj:Ban^{Hv/r2wonS' );
define( 'LOGGED_IN_SALT',   '3s@8J`CT5l6kI-bH C@]ME4fF;rJPubaN)qkNGvy%<*S`VX%y$9ES[=y5}hst$G7' );
define( 'NONCE_SALT',       'LjMEL7cRXfz_2;(6>]1ggWE5}t5EUhD/uWG6ZZMV&_PV51AZzV+ie)-ZXV<{5uM$' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
