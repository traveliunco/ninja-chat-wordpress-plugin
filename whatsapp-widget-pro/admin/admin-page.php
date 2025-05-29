
<?php
if (!defined('ABSPATH')) {
    exit;
}

if (isset($_POST['submit'])) {
    update_option('whatsapp_widget_options', $_POST['whatsapp_widget_options']);
    echo '<div class="notice notice-success"><p>تم حفظ الإعدادات بنجاح!</p></div>';
    $options = get_option('whatsapp_widget_options');
}
?>

<div class="wrap">
    <h1><span class="dashicons dashicons-smartphone" style="color: #25d366;"></span> WhatsApp Widget Pro</h1>
    
    <div class="notice notice-info">
        <p><strong>نصيحة:</strong> لتتبع أفضل مع Google Analytics، تأكد من إدخال معرف التتبع الصحيح وتفعيل التتبع.</p>
    </div>
    
    <form method="post" action="">
        <?php wp_nonce_field('whatsapp_widget_nonce'); ?>
        
        <div id="whatsapp-widget-tabs" class="nav-tab-wrapper">
            <a href="#general" class="nav-tab nav-tab-active">الإعدادات العامة</a>
            <a href="#agents" class="nav-tab">إدارة الفريق</a>
            <a href="#analytics" class="nav-tab">تحليلات جوجل</a>
            <a href="#appearance" class="nav-tab">المظهر</a>
            <a href="#stats" class="nav-tab">الإحصائيات</a>
        </div>
        
        <!-- الإعدادات العامة -->
        <div id="general" class="tab-content active">
            <table class="form-table">
                <tr>
                    <th scope="row">تفعيل الويدجت</th>
                    <td>
                        <label>
                            <input type="checkbox" name="whatsapp_widget_options[enabled]" value="1" <?php checked($options['enabled']); ?>>
                            إظهار ويدجت WhatsApp في الموقع
                        </label>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">رسالة الترحيب</th>
                    <td>
                        <textarea name="whatsapp_widget_options[welcome_message]" rows="3" cols="50" class="large-text"><?php echo esc_textarea($options['welcome_message']); ?></textarea>
                        <p class="description">الرسالة التي ستظهر عند فتح نافذة الدردشة</p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">إظهار معلومات الفريق</th>
                    <td>
                        <label>
                            <input type="checkbox" name="whatsapp_widget_options[show_agent_info]" value="1" <?php checked($options['show_agent_info']); ?>>
                            عرض أسماء وأقسام أعضاء الفريق
                        </label>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- إدارة الفريق -->
        <div id="agents" class="tab-content">
            <h3>أعضاء الفريق</h3>
            <div id="agents-container">
                <?php if (!empty($options['agents'])): ?>
                    <?php foreach ($options['agents'] as $index => $agent): ?>
                        <div class="agent-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                            <table class="form-table">
                                <tr>
                                    <td style="width: 200px;"><strong>الاسم:</strong></td>
                                    <td><input type="text" name="whatsapp_widget_options[agents][<?php echo $index; ?>][name]" value="<?php echo esc_attr($agent['name']); ?>" class="regular-text"></td>
                                </tr>
                                <tr>
                                    <td><strong>رقم WhatsApp:</strong></td>
                                    <td><input type="text" name="whatsapp_widget_options[agents][<?php echo $index; ?>][phone]" value="<?php echo esc_attr($agent['phone']); ?>" class="regular-text" placeholder="+966501234567"></td>
                                </tr>
                                <tr>
                                    <td><strong>القسم:</strong></td>
                                    <td><input type="text" name="whatsapp_widget_options[agents][<?php echo $index; ?>][department]" value="<?php echo esc_attr($agent['department']); ?>" class="regular-text"></td>
                                </tr>
                                <tr>
                                    <td><strong>الحالة:</strong></td>
                                    <td>
                                        <label>
                                            <input type="checkbox" name="whatsapp_widget_options[agents][<?php echo $index; ?>][online]" value="1" <?php checked($agent['online']); ?>>
                                            متاح الآن
                                        </label>
                                    </td>
                                </tr>
                            </table>
                            <button type="button" class="button remove-agent" style="background: #dc3545; color: white; border: none;">حذف العضو</button>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
            
            <button type="button" id="add-agent" class="button button-secondary">إضافة عضو جديد</button>
        </div>
        
        <!-- تحليلات جوجل -->
        <div id="analytics" class="tab-content">
            <h3>إعدادات Google Analytics</h3>
            <table class="form-table">
                <tr>
                    <th scope="row">تفعيل التتبع</th>
                    <td>
                        <label>
                            <input type="checkbox" name="whatsapp_widget_options[google_analytics_enabled]" value="1" <?php checked($options['google_analytics_enabled']); ?>>
                            تفعيل تتبع الأحداث في Google Analytics
                        </label>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">معرف التتبع</th>
                    <td>
                        <input type="text" name="whatsapp_widget_options[ga_tracking_id]" value="<?php echo esc_attr($options['ga_tracking_id']); ?>" class="regular-text" placeholder="G-XXXXXXXXXX أو UA-XXXXXXXXX-X">
                        <p class="description">معرف Google Analytics الخاص بموقعك</p>
                    </td>
                </tr>
            </table>
            
            <div class="notice notice-info inline">
                <h4>الأحداث المتتبعة:</h4>
                <ul>
                    <li><strong>widget_opened:</strong> عند فتح نافذة الدردشة</li>
                    <li><strong>chat_started:</strong> عند بدء محادثة مع أحد أعضاء الفريق</li>
                </ul>
            </div>
        </div>
        
        <!-- المظهر -->
        <div id="appearance" class="tab-content">
            <h3>إعدادات المظهر</h3>
            <table class="form-table">
                <tr>
                    <th scope="row">لون الويدجت</th>
                    <td>
                        <input type="color" name="whatsapp_widget_options[color]" value="<?php echo esc_attr($options['color']); ?>">
                        <p class="description">اللون الأساسي للويدجت</p>
                    </td>
                </tr>
                
                <tr>
                    <th scope="row">موقع الويدجت</th>
                    <td>
                        <select name="whatsapp_widget_options[position]">
                            <option value="bottom-right" <?php selected($options['position'], 'bottom-right'); ?>>أسفل يمين</option>
                            <option value="bottom-left" <?php selected($options['position'], 'bottom-left'); ?>>أسفل يسار</option>
                            <option value="top-right" <?php selected($options['position'], 'top-right'); ?>>أعلى يمين</option>
                            <option value="top-left" <?php selected($options['position'], 'top-left'); ?>>أعلى يسار</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- الإحصائيات -->
        <div id="stats" class="tab-content">
            <h3>إحصائيات الاستخدام (آخر 30 يوم)</h3>
            <?php
            $stats = get_option('whatsapp_widget_stats', array());
            $total_opens = 0;
            $total_chats = 0;
            
            foreach ($stats as $date => $events) {
                if (isset($events['widget_opened'])) {
                    $total_opens += $events['widget_opened'];
                }
                if (isset($events['chat_started'])) {
                    $total_chats += $events['chat_started'];
                }
            }
            ?>
            
            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; text-align: center; min-width: 150px;">
                    <h2 style="margin: 0; color: #0073aa;"><?php echo $total_opens; ?></h2>
                    <p style="margin: 5px 0 0 0;">فتح الويدجت</p>
                </div>
                
                <div style="background: #f0fff0; padding: 20px; border-radius: 8px; text-align: center; min-width: 150px;">
                    <h2 style="margin: 0; color: #25d366;"><?php echo $total_chats; ?></h2>
                    <p style="margin: 5px 0 0 0;">محادثة بدأت</p>
                </div>
                
                <div style="background: #fff8f0; padding: 20px; border-radius: 8px; text-align: center; min-width: 150px;">
                    <h2 style="margin: 0; color: #ff8c00;"><?php echo $total_opens > 0 ? round(($total_chats / $total_opens) * 100, 1) : 0; ?>%</h2>
                    <p style="margin: 5px 0 0 0;">معدل التحويل</p>
                </div>
            </div>
        </div>
        
        <?php submit_button('حفظ الإعدادات'); ?>
    </form>
</div>

<style>
.nav-tab-wrapper {
    margin-bottom: 20px;
}

.tab-content {
    display: none;
    background: #fff;
    padding: 20px;
    border: 1px solid #ccd0d4;
    border-top: none;
}

.tab-content.active {
    display: block;
}

.agent-row {
    position: relative;
}

.remove-agent {
    margin-top: 10px;
}
</style>

<script>
jQuery(document).ready(function($) {
    // التبديل بين التبويبات
    $('.nav-tab').click(function(e) {
        e.preventDefault();
        
        $('.nav-tab').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');
        
        $('.tab-content').removeClass('active');
        $($(this).attr('href')).addClass('active');
    });
    
    // إضافة عضو جديد
    $('#add-agent').click(function() {
        var index = $('.agent-row').length;
        var html = `
            <div class="agent-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                <table class="form-table">
                    <tr>
                        <td style="width: 200px;"><strong>الاسم:</strong></td>
                        <td><input type="text" name="whatsapp_widget_options[agents][${index}][name]" value="" class="regular-text"></td>
                    </tr>
                    <tr>
                        <td><strong>رقم WhatsApp:</strong></td>
                        <td><input type="text" name="whatsapp_widget_options[agents][${index}][phone]" value="" class="regular-text" placeholder="+966501234567"></td>
                    </tr>
                    <tr>
                        <td><strong>القسم:</strong></td>
                        <td><input type="text" name="whatsapp_widget_options[agents][${index}][department]" value="" class="regular-text"></td>
                    </tr>
                    <tr>
                        <td><strong>الحالة:</strong></td>
                        <td>
                            <label>
                                <input type="checkbox" name="whatsapp_widget_options[agents][${index}][online]" value="1" checked>
                                متاح الآن
                            </label>
                        </td>
                    </tr>
                </table>
                <button type="button" class="button remove-agent" style="background: #dc3545; color: white; border: none;">حذف العضو</button>
            </div>
        `;
        
        $('#agents-container').append(html);
    });
    
    // حذف عضو
    $(document).on('click', '.remove-agent', function() {
        $(this).closest('.agent-row').remove();
    });
});
</script>
