<?php
/**
 * Plugin Name: Simple Dark Mode
 * Description: Минималистичный плагин тёмной темы. Лёгкий, быстрый, никакого мусора.
 * Version: 1.0
 * Author: Александр & Жестокое Зеркало
 */

if (!defined('ABSPATH')) exit;

// Подключаем JS и CSS в footer сайта
add_action('wp_footer', function() {
    ?>
    <script src="<?php echo plugin_dir_url(__FILE__); ?>darkmode.js"></script>
    <style>
    html, body {
      background: var(--background-color) !important;
      color: var(--text-color) !important;
      transition: background 0.2s, color 0.2s;
    }
    </style>
    <?php
});
