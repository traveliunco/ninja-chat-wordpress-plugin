
<?php
/**
 * Plugin Name: WhatsApp Widget Pro
 * Plugin URI: https://your-website.com/whatsapp-widget-pro
 * Description: إضافة احترافية لإضافة ويدجت WhatsApp لموقع ووردبريس مع دعم تحليلات جوجل
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://your-website.com
 * Text Domain: whatsapp-widget-pro
 * Domain Path: /languages
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 */

// منع الوصول المباشر
if (!defined('ABSPATH')) {
    exit;
}

// تعريف الثوابت
define('WWP_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WWP_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('WWP_VERSION', '1.0.0');

class WhatsAppWidgetPro {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_widget'));
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        register_activation_hook(__FILE__, array($this, 'activate'));
    }
    
    public function init() {
        load_plugin_textdomain('whatsapp-widget-pro', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function activate() {
        // إعداد الخيارات الافتراضية
        $default_options = array(
            'enabled' => true,
            'welcome_message' => 'مرحباً! كيف يمكننا مساعدتك؟',
            'position' => 'bottom-right',
            'color' => '#25d366',
            'show_agent_info' => true,
            'google_analytics_enabled' => false,
            'ga_tracking_id' => '',
            'agents' => array(
                array(
                    'name' => 'فريق المبيعات',
                    'phone' => '+966501234567',
                    'department' => 'المبيعات',
                    'online' => true
                )
            )
        );
        
        add_option('whatsapp_widget_options', $default_options);
    }
    
    public function enqueue_scripts() {
        $options = get_option('whatsapp_widget_options');
        
        if (!$options['enabled']) {
            return;
        }
        
        wp_enqueue_script('whatsapp-widget-js', WWP_PLUGIN_URL . 'assets/widget.js', array('jquery'), WWP_VERSION, true);
        wp_enqueue_style('whatsapp-widget-css', WWP_PLUGIN_URL . 'assets/widget.css', array(), WWP_VERSION);
        
        // تمرير البيانات إلى JavaScript
        wp_localize_script('whatsapp-widget-js', 'whatsappWidget', array(
            'options' => $options,
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('whatsapp_widget_nonce')
        ));
    }
    
    public function render_widget() {
        $options = get_option('whatsapp_widget_options');
        
        if (!$options['enabled']) {
            return;
        }
        
        echo '<div id="whatsapp-widget-container"></div>';
    }
    
    public function admin_menu() {
        add_options_page(
            'WhatsApp Widget Pro',
            'WhatsApp Widget',
            'manage_options',
            'whatsapp-widget-pro',
            array($this, 'admin_page')
        );
    }
    
    public function admin_init() {
        register_setting('whatsapp_widget_options', 'whatsapp_widget_options', array($this, 'sanitize_options'));
    }
    
    public function sanitize_options($input) {
        $sanitized = array();
        
        $sanitized['enabled'] = isset($input['enabled']) ? true : false;
        $sanitized['welcome_message'] = sanitize_textarea_field($input['welcome_message']);
        $sanitized['position'] = sanitize_text_field($input['position']);
        $sanitized['color'] = sanitize_hex_color($input['color']);
        $sanitized['show_agent_info'] = isset($input['show_agent_info']) ? true : false;
        $sanitized['google_analytics_enabled'] = isset($input['google_analytics_enabled']) ? true : false;
        $sanitized['ga_tracking_id'] = sanitize_text_field($input['ga_tracking_id']);
        
        // تنظيف بيانات الوكلاء
        $sanitized['agents'] = array();
        if (isset($input['agents']) && is_array($input['agents'])) {
            foreach ($input['agents'] as $agent) {
                $sanitized['agents'][] = array(
                    'name' => sanitize_text_field($agent['name']),
                    'phone' => sanitize_text_field($agent['phone']),
                    'department' => sanitize_text_field($agent['department']),
                    'online' => isset($agent['online']) ? true : false
                );
            }
        }
        
        return $sanitized;
    }
    
    public function admin_page() {
        $options = get_option('whatsapp_widget_options');
        include_once WWP_PLUGIN_PATH . 'admin/admin-page.php';
    }
}

// تشغيل الإضافة
new WhatsAppWidgetPro();

// إضافة AJAX للإحصائيات
add_action('wp_ajax_whatsapp_widget_track', 'whatsapp_widget_track_event');
add_action('wp_ajax_nopriv_whatsapp_widget_track', 'whatsapp_widget_track_event');

function whatsapp_widget_track_event() {
    check_ajax_referer('whatsapp_widget_nonce', 'nonce');
    
    $event_type = sanitize_text_field($_POST['event_type']);
    $agent_id = sanitize_text_field($_POST['agent_id']);
    
    // حفظ الإحصائيات في قاعدة البيانات
    $stats = get_option('whatsapp_widget_stats', array());
    $today = date('Y-m-d');
    
    if (!isset($stats[$today])) {
        $stats[$today] = array();
    }
    
    if (!isset($stats[$today][$event_type])) {
        $stats[$today][$event_type] = 0;
    }
    
    $stats[$today][$event_type]++;
    
    update_option('whatsapp_widget_stats', $stats);
    
    wp_die();
}
