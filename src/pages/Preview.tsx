
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, X, Send } from "lucide-react";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Preview = () => {
  const [showDemo, setShowDemo] = useState(false);

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
                  العودة للإدارة
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">معاينة WhatsApp Widget</h1>
            </div>
            <Button onClick={() => setShowDemo(!showDemo)} className="bg-green-500 hover:bg-green-600">
              {showDemo ? "إخفاء" : "إظهار"} الويدجت
            </Button>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">معاينة الموقع</h2>
            <p className="text-gray-600">
              هذه معاينة تفاعلية لكيفية ظهور ويدجت WhatsApp في موقعك
            </p>
          </div>

          {/* Demo Website Content */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-4">مرحباً بك في موقعنا</h3>
              <p className="text-lg opacity-90">
                نحن هنا لمساعدتك! استخدم ويدجت WhatsApp للتواصل معنا مباشرة
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">خدماتنا</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• استشارات تقنية</li>
                  <li>• تطوير المواقع</li>
                  <li>• التسويق الرقمي</li>
                  <li>• الدعم الفني</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">اتصل بنا</h4>
                <div className="space-y-2 text-gray-600">
                  <p>📧 info@example.com</p>
                  <p>📱 +966 50 123 4567</p>
                  <p>🏢 الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">نبذة عن الشركة</h4>
              <p className="text-gray-600">
                نحن شركة رائدة في مجال التكنولوجيا، نقدم حلولاً مبتكرة لعملائنا حول العالم. 
                فريقنا من الخبراء جاهز لمساعدتك في تحقيق أهدافك التقنية والتجارية.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Widget */}
      {showDemo && <WhatsAppWidget />}
    </div>
  );
};

export default Preview;
