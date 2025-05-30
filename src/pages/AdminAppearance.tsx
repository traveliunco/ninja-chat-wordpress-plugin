
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Palette, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAppearance = () => {
  const { toast } = useToast();
  const [widgetSettings, setWidgetSettings] = useState({
    color: "#25d366",
    position: "bottom-right",
  });

  const saveSettings = () => {
    toast({
      title: "تم بنجاح",
      description: "تم حفظ إعدادات المظهر",
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
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">إعدادات المظهر</h1>
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
            <CardTitle>إعدادات المظهر</CardTitle>
            <CardDescription>
              خصص ألوان وموقع الويدجت
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="widget-color">لون الويدجت</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="widget-color"
                  type="color"
                  value={widgetSettings.color}
                  onChange={(e) => 
                    setWidgetSettings({ ...widgetSettings, color: e.target.value })
                  }
                  className="w-20 h-10"
                />
                <span className="text-sm text-gray-500">{widgetSettings.color}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>موقع الويدجت</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "bottom-right", label: "أسفل يمين" },
                  { value: "bottom-left", label: "أسفل يسار" },
                  { value: "top-right", label: "أعلى يمين" },
                  { value: "top-left", label: "أعلى يسار" },
                ].map((position) => (
                  <Button
                    key={position.value}
                    variant={widgetSettings.position === position.value ? "default" : "outline"}
                    onClick={() => 
                      setWidgetSettings({ ...widgetSettings, position: position.value })
                    }
                    className="justify-start"
                  >
                    {position.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAppearance;
