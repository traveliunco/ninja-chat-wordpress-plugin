
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminWidget = () => {
  const { toast } = useToast();
  const [widgetSettings, setWidgetSettings] = useState({
    welcomeMessage: "مرحباً! كيف يمكنني مساعدتك؟",
    isEnabled: true,
    showAgentInfo: true,
  });

  const saveSettings = () => {
    toast({
      title: "تم بنجاح",
      description: "تم حفظ إعدادات الويدجت",
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
                <div className="bg-green-500 p-2 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">إعدادات الويدجت</h1>
              </div>
            </div>
            <Button onClick={saveSettings} className="bg-green-500 hover:bg-green-600">
              <Save className="h-4 w-4 mr-2" />
              حفظ الإعدادات
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الويدجت</CardTitle>
            <CardDescription>
              خصص رسائل الترحيب وسلوك الويدجت
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="widget-enabled">تفعيل الويدجت</Label>
                <p className="text-sm text-gray-500">إظهار أو إخفاء ويدجت WhatsApp</p>
              </div>
              <Switch
                id="widget-enabled"
                checked={widgetSettings.isEnabled}
                onCheckedChange={(checked) => 
                  setWidgetSettings({ ...widgetSettings, isEnabled: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="welcome-message">رسالة الترحيب</Label>
              <Textarea
                id="welcome-message"
                placeholder="مرحباً! كيف يمكنني مساعدتك؟"
                value={widgetSettings.welcomeMessage}
                onChange={(e) => 
                  setWidgetSettings({ ...widgetSettings, welcomeMessage: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>إظهار معلومات العضو</Label>
                <p className="text-sm text-gray-500">عرض اسم وقسم العضو في الويدجت</p>
              </div>
              <Switch
                checked={widgetSettings.showAgentInfo}
                onCheckedChange={(checked) => 
                  setWidgetSettings({ ...widgetSettings, showAgentInfo: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminWidget;
