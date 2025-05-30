
<?php
// منع الوصول المباشر
if (!defined('ABSPATH')) {
    exit;
}

// معالجة الحفظ
if (isset($_POST['submit'])) {
    $options = array(
        'enabled' => isset($_POST['enabled']),
        'welcome_message' => sanitize_textarea_field($_POST['welcome_message']),
        'position' => sanitize_text_field($_POST['position']),
        'color' => sanitize_hex_color($_POST['color']),
        'show_agent_info' => isset($_POST['show_agent_info']),
        'google_analytics_enabled' => isset($_POST['google_analytics_enabled']),
        'ga_tracking_id' => sanitize_text_field($_POST['ga_tracking_id']),
        'agents' => array()
    );
    
    // معالجة بيانات الوكلاء
    if (isset($_POST['agents']) && is_array($_POST['agents'])) {
        foreach ($_POST['agents'] as $agent) {
            if (!empty($agent['name']) && !empty($agent['phone'])) {
                $options['agents'][] = array(
                    'name' => sanitize_text_field($agent['name']),
                    'phone' => sanitize_text_field($agent['phone']),
                    'department' => sanitize_text_field($agent['department']),
                    'online' => isset($agent['online'])
                );
            }
        }
    }
    
    update_option('whatsapp_widget_options', $options);
    echo '<div class="notice notice-success"><p>تم حفظ الإعدادات بنجاح!</p></div>';
    $options = get_option('whatsapp_widget_options');
}

$stats = get_option('whatsapp_widget_stats', array());
?>

<div class="wrap">
    <h1>إعدادات WhatsApp Widget Pro</h1>
    
    <!-- زر تحميل الإضافة -->
    <div class="notice notice-info">
        <p>
            <strong>تحميل آخر نسخة من الإضافة:</strong>
            <a href="#" id="download-plugin" class="button button-primary" style="margin-right: 10px;">
                📥 تحميل الإضافة (v<?php echo WWP_VERSION; ?>)
            </a>
            <span class="description">قم بتحميل ملف zip يحتوي على جميع ملفات الإضافة</span>
        </p>
    </div>
    
    <form method="post" action="">
        <?php wp_nonce_field('whatsapp_widget_settings', 'whatsapp_widget_nonce'); ?>
        
        <table class="form-table">
            <!-- إعدادات عامة -->
            <tr>
                <th scope="row">تفعيل الويدجت</th>
                <td>
                    <label>
                        <input type="checkbox" name="enabled" value="1" <?php checked($options['enabled']); ?>>
                        تفعيل ويدجت WhatsApp
                    </label>
                </td>
            </tr>
            
            <tr>
                <th scope="row">رسالة الترحيب</th>
                <td>
                    <textarea name="welcome_message" rows="3" cols="50" class="large-text"><?php echo esc_textarea($options['welcome_message']); ?></textarea>
                    <p class="description">الرسالة التي ستظهر للزوار عند فتح نافذة الدردشة</p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">موقع الويدجت</th>
                <td>
                    <select name="position">
                        <option value="bottom-right" <?php selected($options['position'], 'bottom-right'); ?>>أسفل اليمين</option>
                        <option value="bottom-left" <?php selected($options['position'], 'bottom-left'); ?>>أسفل اليسار</option>
                        <option value="top-right" <?php selected($options['position'], 'top-right'); ?>>أعلى اليمين</option>
                        <option value="top-left" <?php selected($options['position'], 'top-left'); ?>>أعلى اليسار</option>
                    </select>
                </td>
            </tr>
            
            <tr>
                <th scope="row">لون الويدجت</th>
                <td>
                    <input type="color" name="color" value="<?php echo esc_attr($options['color']); ?>">
                    <p class="description">اختر لون خلفية زر WhatsApp</p>
                </td>
            </tr>
        </table>
        
        <!-- إعدادات الفريق -->
        <h2>إعدادات الفريق</h2>
        <table class="form-table">
            <tr>
                <th scope="row">إظهار معلومات الوكلاء</th>
                <td>
                    <label>
                        <input type="checkbox" name="show_agent_info" value="1" <?php checked($options['show_agent_info']); ?>>
                        إظهار أسماء وأقسام الفريق
                    </label>
                </td>
            </tr>
        </table>
        
        <div id="agents-section">
            <h3>أعضاء الفريق</h3>
            <div id="agents-list">
                <?php foreach ($options['agents'] as $index => $agent): ?>
                <div class="agent-row" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
                    <table class="form-table">
                        <tr>
                            <td>
                                <label>الاسم:</label><br>
                                <input type="text" name="agents[<?php echo $index; ?>][name]" value="<?php echo esc_attr($agent['name']); ?>" style="width: 200px;">
                            </td>
                            <td>
                                <label>رقم WhatsApp:</label><br>
                                <input type="text" name="agents[<?php echo $index; ?>][phone]" value="<?php echo esc_attr($agent['phone']); ?>" style="width: 200px;" placeholder="+966501234567">
                            </td>
                            <td>
                                <label>القسم:</label><br>
                                <input type="text" name="agents[<?php echo $index; ?>][department]" value="<?php echo esc_attr($agent['department']); ?>" style="width: 150px;">
                            </td>
                            <td>
                                <label>
                                    <input type="checkbox" name="agents[<?php echo $index; ?>][online]" value="1" <?php checked($agent['online']); ?>>
                                    متاح الآن
                                </label>
                            </td>
                            <td>
                                <button type="button" class="button remove-agent">حذف</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <?php endforeach; ?>
            </div>
            <button type="button" id="add-agent" class="button">إضافة عضو جديد</button>
        </div>
        
        <!-- إعدادات Google Analytics -->
        <h2>إعدادات Google Analytics</h2>
        <table class="form-table">
            <tr>
                <th scope="row">تفعيل التتبع</th>
                <td>
                    <label>
                        <input type="checkbox" name="google_analytics_enabled" value="1" <?php checked($options['google_analytics_enabled']); ?>>
                        تفعيل تتبع الأحداث مع Google Analytics
                    </label>
                </td>
            </tr>
            
            <tr>
                <th scope="row">معرف التتبع</th>
                <td>
                    <input type="text" name="ga_tracking_id" value="<?php echo esc_attr($options['ga_tracking_id']); ?>" class="regular-text" placeholder="GA_TRACKING_ID">
                    <p class="description">أدخل معرف Google Analytics الخاص بك</p>
                </td>
            </tr>
        </table>
        
        <?php submit_button('حفظ الإعدادات'); ?>
    </form>
    
    <!-- إحصائيات الاستخدام -->
    <?php if (!empty($stats)): ?>
    <div style="margin-top: 30px;">
        <h2>إحصائيات الاستخدام</h2>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>التاريخ</th>
                    <th>فتح النافذة</th>
                    <th>بدء المحادثات</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach (array_slice($stats, -7, 7, true) as $date => $day_stats): ?>
                <tr>
                    <td><?php echo esc_html($date); ?></td>
                    <td><?php echo isset($day_stats['widget_opened']) ? $day_stats['widget_opened'] : 0; ?></td>
                    <td><?php echo isset($day_stats['chat_started']) ? $day_stats['chat_started'] : 0; ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>
</div>

<script>
jQuery(document).ready(function($) {
    var agentIndex = <?php echo count($options['agents']); ?>;
    
    // إضافة عضو جديد
    $('#add-agent').click(function() {
        var agentHtml = '<div class="agent-row" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">' +
            '<table class="form-table">' +
            '<tr>' +
            '<td><label>الاسم:</label><br><input type="text" name="agents[' + agentIndex + '][name]" style="width: 200px;"></td>' +
            '<td><label>رقم WhatsApp:</label><br><input type="text" name="agents[' + agentIndex + '][phone]" style="width: 200px;" placeholder="+966501234567"></td>' +
            '<td><label>القسم:</label><br><input type="text" name="agents[' + agentIndex + '][department]" style="width: 150px;"></td>' +
            '<td><label><input type="checkbox" name="agents[' + agentIndex + '][online]" value="1" checked> متاح الآن</label></td>' +
            '<td><button type="button" class="button remove-agent">حذف</button></td>' +
            '</tr>' +
            '</table>' +
            '</div>';
        
        $('#agents-list').append(agentHtml);
        agentIndex++;
    });
    
    // حذف عضو
    $(document).on('click', '.remove-agent', function() {
        $(this).closest('.agent-row').remove();
    });
    
    // تحميل الإضافة
    $('#download-plugin').click(function(e) {
        e.preventDefault();
        
        // إنشاء نموذج مخفي للتحميل
        var form = $('<form>', {
            'method': 'POST',
            'action': ajaxurl
        });
        
        form.append($('<input>', {
            'type': 'hidden',
            'name': 'action',
            'value': 'download_whatsapp_widget'
        }));
        
        form.append($('<input>', {
            'type': 'hidden',
            'name': 'nonce',
            'value': '<?php echo wp_create_nonce('download_plugin_nonce'); ?>'
        }));
        
        // إضافة النموذج للصفحة وإرساله
        $('body').append(form);
        form.submit();
        form.remove();
    });
});
</script>

<style>
.agent-row {
    background: #f9f9f9;
}
.agent-row:hover {
    background: #f0f0f0;
}
#download-plugin {
    text-decoration: none;
}
#download-plugin:hover {
    background: #0073aa;
}
</style>
