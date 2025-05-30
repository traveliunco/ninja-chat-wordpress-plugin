
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Users, Eye, Download, MessageCircle, Palette, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  العودة
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">لوحة إدارة WhatsApp Widget</h1>
              </div>
            </div>
            <Link to="/preview">
              <Button className="bg-green-500 hover:bg-green-600">
                <Eye className="h-4 w-4 mr-2" />
                معاينة
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            مرحباً بك في لوحة الإدارة
          </h2>
          <p className="text-lg text-gray-600">
            اختر القسم الذي تريد إدارته من الخيارات أدناه
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/agents">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>إدارة الفريق</CardTitle>
                <CardDescription>
                  إضافة وتعديل أعضاء فريق WhatsApp
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/admin/widget">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>إعدادات الويدجت</CardTitle>
                <CardDescription>
                  تخصيص رسائل الترحيب وسلوك الويدجت
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/admin/appearance">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>المظهر</CardTitle>
                <CardDescription>
                  تخصيص ألوان وموقع الويدجت
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/admin/stats">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>الإحصائيات</CardTitle>
                <CardDescription>
                  عرض إحصائيات الاستخدام والتفاعل
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/admin/download">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>تحميل الإضافة</CardTitle>
                <CardDescription>
                  تحميل ملف الإضافة للتثبيت في ووردبريس
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/preview">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>معاينة الويدجت</CardTitle>
                <CardDescription>
                  مشاهدة الويدجت كما سيظهر للزوار
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">أعضاء الفريق</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الويدجت</p>
                  <p className="text-2xl font-bold text-green-600">مفعل</p>
                </div>
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المحادثات اليوم</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
