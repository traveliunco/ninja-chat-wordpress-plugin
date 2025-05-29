
<?php
/**
 * Uninstall script for WhatsApp Widget Pro
 */

// إذا لم يتم استدعاء uninstall من ووردبريس، اخرج
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// حذف جميع خيارات الإضافة من قاعدة البيانات
delete_option('whatsapp_widget_options');
delete_option('whatsapp_widget_stats');

// لتنظيف قاعدة البيانات أكثر يمكننا حذف أي خيارات أخرى تم إنشاؤها بواسطة الإضافة
// delete_option('whatsapp_widget_version');
