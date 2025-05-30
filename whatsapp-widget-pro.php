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
        add_action('wp_ajax_download_whatsapp_widget', array($this, 'download_plugin'));
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
        
        // معالجة تحميل الإضافة
        if (isset($_POST['download_plugin']) && wp_verify_nonce($_POST['download_nonce'], 'download_plugin_nonce')) {
            $this->create_plugin_download();
            return;
        }
        
        include_once WWP_PLUGIN_PATH . 'admin/admin-page.php';
    }
    
    public function download_plugin() {
        // التحقق من الصلاحيات
        if (!current_user_can('manage_options')) {
            wp_die('غير مصرح لك بهذا الإجراء');
        }
        
        check_ajax_referer('download_plugin_nonce', 'nonce');
        
        $this->create_plugin_download();
    }
    
    private function create_plugin_download() {
        // إنشاء مجلد مؤقت
        $temp_dir = wp_upload_dir()['basedir'] . '/whatsapp-widget-temp/';
        $plugin_dir = $temp_dir . 'whatsapp-widget-pro/';
        
        // إنشاء المجلدات
        wp_mkdir_p($plugin_dir);
        wp_mkdir_p($plugin_dir . 'admin/');
        wp_mkdir_p($plugin_dir . 'assets/');
        wp_mkdir_p($plugin_dir . 'languages/');
        
        // نسخ الملفات
        $files = array(
            'whatsapp-widget-pro.php' => WWP_PLUGIN_PATH . 'whatsapp-widget-pro.php',
            'readme.txt' => WWP_PLUGIN_PATH . 'readme.txt',
            'uninstall.php' => WWP_PLUGIN_PATH . 'uninstall.php',
            'admin/admin-page.php' => WWP_PLUGIN_PATH . 'admin/admin-page.php',
            'assets/widget.js' => WWP_PLUGIN_PATH . 'assets/widget.js',
            'assets/widget.css' => WWP_PLUGIN_PATH . 'assets/widget.css',
            'languages/whatsapp-widget-pro-ar.po' => WWP_PLUGIN_PATH . 'languages/whatsapp-widget-pro-ar.po'
        );
        
        foreach ($files as $dest => $source) {
            if (file_exists($source)) {
                copy($source, $plugin_dir . $dest);
            }
        }
        
        // إنشاء ملف zip
        $zip_file = $temp_dir . 'whatsapp-widget-pro-v' . WWP_VERSION . '.zip';
        
        if (class_exists('ZipArchive')) {
            $zip = new ZipArchive();
            if ($zip->open($zip_file, ZipArchive::CREATE) === TRUE) {
                $this->add_directory_to_zip($zip, $plugin_dir, 'whatsapp-widget-pro/');
                $zip->close();
                
                // تحميل الملف
                header('Content-Type: application/zip');
                header('Content-Disposition: attachment; filename="whatsapp-widget-pro-v' . WWP_VERSION . '.zip"');
                header('Content-Length: ' . filesize($zip_file));
                readfile($zip_file);
                
                // تنظيف الملفات المؤقتة
                $this->delete_directory($temp_dir);
                exit;
            }
        }
        
        wp_die('خطأ في إنشاء ملف التحميل');
    }
    
    private function add_directory_to_zip($zip, $dir, $base) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                $file_path = $dir . $file;
                $zip_path = $base . $file;
                
                if (is_dir($file_path)) {
                    $zip->addEmptyDir($zip_path);
                    $this->add_directory_to_zip($zip, $file_path . '/', $zip_path . '/');
                } else {
                    $zip->addFile($file_path, $zip_path);
                }
            }
        }
    }
    
    private function delete_directory($dir) {
        if (!is_dir($dir)) return;
        
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                $file_path = $dir . $file;
                if (is_dir($file_path)) {
                    $this->delete_directory($file_path . '/');
                } else {
                    unlink($file_path);
                }
            }
        }
        rmdir($dir);
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
