
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Settings, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">WhatsApp Widget Pro</h1>
            </div>
            <Link to="/admin">
              <Button className="bg-green-500 hover:bg-green-600">
                <Settings className="h-4 w-4 mr-2" />
                الإدارة
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            اربط موقعك بـ WhatsApp بسهولة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            إضافة احترافية تتيح لعملائك التواصل معك مباشرة عبر WhatsApp من موقعك الإلكتروني
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-right">ويدجت دردشة عائم</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-right">
                زر دردشة عائم جذاب يظهر في زاوية الموقع مع رسائل ترحيبية مخصصة
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-right">فرق متعددة</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-right">
                أضف أرقام WhatsApp متعددة لفرق مختلفة (المبيعات، الدعم الفني، إلخ)
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-right">سهولة التخصيص</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-right">
                واجهة إدارة بسيطة لتخصيص الرسائل والألوان ومواقع الظهور
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/admin">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-3">
              <Phone className="h-5 w-5 mr-2" />
              ابدأ الإعداد الآن
            </Button>
          </Link>
        </div>
      </div>

      {/* Demo Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 animate-pulse">
          <MessageCircle className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Index;
