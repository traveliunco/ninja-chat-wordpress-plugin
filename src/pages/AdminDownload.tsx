
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JSZip from 'jszip';

const AdminDownload = () => {
  const { toast } = useToast();

  const downloadPlugin = () => {
    // إنشاء ملفات الإضافة
    const pluginFiles: { [key: string]: string } = {
      'whatsapp-widget-pro.php': `<?php
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
        include_once WWP_PLUGIN_PATH . 'admin/admin-page.php';
    }
}

// تشغيل الإضافة
new WhatsAppWidgetPro();
?>`,
      'readme.txt': `=== WhatsApp Widget Pro ===
Contributors: yourname
Tags: whatsapp, chat, widget, contact, support
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

إضافة احترافية لإضافة ويدجت WhatsApp لموقع ووردبريس مع دعم تحليلات جوجل

== Description ==

إضافة WhatsApp Widget Pro تسمح لك بإضافة ويدجت WhatsApp احترافي لموقعك مع العديد من المميزات:

* دعم فريق متعدد الأعضاء
* تحليلات جوجل
* تخصيص كامل للمظهر
* رسائل ترحيب مخصصة
* إحصائيات مفصلة

== Installation ==

1. ارفع ملفات الإضافة إلى مجلد '/wp-content/plugins/whatsapp-widget-pro/'
2. فعل الإضافة من خلال قائمة 'الإضافات' في ووردبريس
3. اذهب إلى الإعدادات > WhatsApp Widget لإعداد الإضافة

== Changelog ==

= 1.0.0 =
* إصدار أولي للإضافة`,
      'assets/widget.css': `#whatsapp-widget {
    position: fixed;
    z-index: 9999;
    font-family: Arial, sans-serif;
}

#whatsapp-widget.bottom-right {
    bottom: 20px;
    right: 20px;
}

#whatsapp-widget.bottom-left {
    bottom: 20px;
    left: 20px;
}

#whatsapp-widget.top-right {
    top: 20px;
    right: 20px;
}

#whatsapp-widget.top-left {
    top: 20px;
    left: 20px;
}

.whatsapp-button {
    width: 60px;
    height: 60px;
    background-color: #25d366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.whatsapp-button:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.whatsapp-button svg {
    width: 30px;
    height: 30px;
    fill: white;
}

.whatsapp-popup {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.3);
    display: none;
    direction: rtl;
}

.whatsapp-popup.show {
    display: block;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.whatsapp-header {
    background: #25d366;
    color: white;
    padding: 15px;
    border-radius: 10px 10px 0 0;
    text-align: center;
}

.whatsapp-agents {
    padding: 15px;
}

.whatsapp-agent {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
}

.whatsapp-agent:hover {
    background: #f5f5f5;
}

.whatsapp-agent:last-child {
    margin-bottom: 0;
}

.agent-avatar {
    width: 40px;
    height: 40px;
    background: #25d366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    color: white;
    font-weight: bold;
}

.agent-info h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
    color: #333;
}

.agent-info p {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.agent-status {
    margin-right: auto;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
}

.agent-status.online {
    background: #d4edda;
    color: #155724;
}

.agent-status.offline {
    background: #f8d7da;
    color: #721c24;
}`,
      'assets/widget.js': `(function($) {
    'use strict';

    $(document).ready(function() {
        if (typeof whatsappWidget === 'undefined') {
            return;
        }

        const options = whatsappWidget.options;
        
        if (!options.enabled) {
            return;
        }

        // إنشاء HTML للويدجت
        const widgetHTML = createWidgetHTML(options);
        $('body').append(widgetHTML);

        // إضافة الأحداث
        bindEvents();
    });

    function createWidgetHTML(options) {
        const position = options.position || 'bottom-right';
        const color = options.color || '#25d366';
        const welcomeMessage = options.welcome_message || 'مرحباً! كيف يمكننا مساعدتك؟';
        
        let agentsHTML = '';
        if (options.agents && options.agents.length > 0) {
            options.agents.forEach(function(agent) {
                if (agent.online) {
                    const initial = agent.name.charAt(0);
                    agentsHTML += \`
                        <div class="whatsapp-agent" data-phone="\${agent.phone}" data-name="\${agent.name}">
                            <div class="agent-avatar">\${initial}</div>
                            <div class="agent-info">
                                <h4>\${agent.name}</h4>
                                <p>\${agent.department}</p>
                            </div>
                            <span class="agent-status online">متاح</span>
                        </div>
                    \`;
                }
            });
        }

        return \`
            <div id="whatsapp-widget" class="\${position}">
                <div class="whatsapp-button" style="background-color: \${color}">
                    <svg viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
                    </svg>
                </div>
                <div class="whatsapp-popup">
                    <div class="whatsapp-header">
                        <h3>\${welcomeMessage}</h3>
                    </div>
                    <div class="whatsapp-agents">
                        \${agentsHTML}
                    </div>
                </div>
            </div>
        \`;
    }

    function bindEvents() {
        // فتح/إغلاق النافذة
        $(document).on('click', '.whatsapp-button', function() {
            const popup = $('.whatsapp-popup');
            popup.toggleClass('show');
            
            // تتبع فتح الويدجت
            trackEvent('widget_opened');
        });

        // بدء محادثة مع وكيل
        $(document).on('click', '.whatsapp-agent', function() {
            const phone = $(this).data('phone');
            const name = $(this).data('name');
            const message = encodeURIComponent('مرحباً، أريد التحدث مع ' + name);
            
            // تتبع بدء المحادثة
            trackEvent('chat_started');
            
            // فتح WhatsApp
            window.open(\`https://wa.me/\${phone}?text=\${message}\`, '_blank');
        });

        // إغلاق النافذة عند الضغط خارجها
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#whatsapp-widget').length) {
                $('.whatsapp-popup').removeClass('show');
            }
        });
    }

    function trackEvent(eventType) {
        // تتبع الأحداث في WordPress
        $.ajax({
            url: whatsappWidget.ajaxurl,
            type: 'POST',
            data: {
                action: 'whatsapp_widget_track',
                event_type: eventType,
                nonce: whatsappWidget.nonce
            }
        });

        // تتبع Google Analytics إذا كان مفعلاً
        if (whatsappWidget.options.google_analytics_enabled && typeof gtag !== 'undefined') {
            gtag('event', eventType, {
                event_category: 'WhatsApp Widget',
                event_label: 'User Interaction'
            });
        }
    }

})(jQuery);`
    };

    // إنشاء ملف ZIP
    const zip = new JSZip();
    
    // إضافة الملفات للـ ZIP
    Object.keys(pluginFiles).forEach(filename => {
      if (filename.includes('/')) {
        // إنشاء مجلد فرعي
        const parts = filename.split('/');
        const folder = parts[0];
        const file = parts[1];
        
        if (!zip.folder(folder)) {
          zip.folder(folder);
        }
        zip.file(filename, pluginFiles[filename]);
      } else {
        zip.file(filename, pluginFiles[filename]);
      }
    });

    // توليد وتحميل ملف ZIP
    zip.generateAsync({type: "blob"}).then(function(content) {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'whatsapp-widget-pro-v1.0.0.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "تم بنجاح",
        description: "تم تحميل ملف الإضافة بنجاح",
      });
    }).catch(function(error) {
      console.error('خطأ في إنشاء ملف ZIP:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء ملف التحميل",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  العودة للوحة الرئيسية
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">تحميل الإضافة</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              تحميل الإضافة
            </CardTitle>
            <CardDescription>
              قم بتحميل آخر نسخة من إضافة WhatsApp Widget Pro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <h3 className="font-medium text-blue-900 text-lg">WhatsApp Widget Pro v1.0.0</h3>
                  <p className="text-sm text-blue-700 mt-1">ملف zip جاهز للتثبيت في ووردبريس</p>
                  <p className="text-xs text-blue-600 mt-2">يتضمن جميع الملفات والإعدادات المطلوبة</p>
                </div>
                <Button onClick={downloadPlugin} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <Download className="h-5 w-5 mr-2" />
                  تحميل الآن
                </Button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">خطوات التثبيت:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>حمل ملف الإضافة من الزر أعلاه</li>
                  <li>اذهب إلى لوحة إدارة ووردبريس</li>
                  <li>انتقل إلى الإضافات > إضافة جديد</li>
                  <li>اضغط على "رفع إضافة" واختر الملف المحمل</li>
                  <li>فعل الإضافة بعد التثبيت</li>
                  <li>اذهب إلى الإعدادات > WhatsApp Widget لإعداد الإضافة</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDownload;
