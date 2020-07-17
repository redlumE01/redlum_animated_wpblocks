<?php

/**
 * Plugin Name: Redlum Animated Blocks
 * Description: Adds animations for All Gutenberg blocks (based on Animate.css by Daniel Eden https://animate.style/ )
 * Version: 1.0.0
 * Author: Erik Mulder
  * Author URI: https://www.redlum-media.com
**/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function enqueue_redlum_animated_blocks() {
	wp_enqueue_script(
		'redlum_register_animated_blocks',
		plugins_url( 'build/index.build.js', __FILE__ ),
		array(
			'wp-i18n',
			'wp-editor',
			'wp-element',
			'wp-components',
			'wp-data',
			'wp-hooks',
			'wp-compose'
		)
	);

	wp_enqueue_script(
		'animate_lib_css',
		plugins_url( 'build/entrypoint.build.js', __FILE__ ), null,null,null
	);

};

add_action( 'enqueue_block_editor_assets', 'enqueue_redlum_animated_blocks' );

function load_fe_script() {
	wp_enqueue_script( 'compiled_js', plugin_dir_url( __FILE__ ) . '/build/entrypoint.build.js', null, null, false );
}

add_action('wp_enqueue_scripts', 'load_fe_script');
