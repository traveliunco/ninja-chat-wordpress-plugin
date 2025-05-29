
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, MessageCircle, Settings, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppAgent {
  id: string;
  name: string;
  phone: string;
  department: string;
  isOnline: boolean;
  avatar?: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<WhatsAppAgent[]>([
    {
      id: "1",
      name: "أحمد محمد",
      phone: "+966501234567",
      department: "المبيعات",
      isOnline: true,
    },
    {
      id: "2",
      name: "فاطمة علي",
      phone: "+966507654321",
      department: "الدعم الفني",
      isOnline: false,
    },
  ]);

  const [widgetSettings, setWidgetSettings] = useState({
    welcomeMessage: "مرحباً! كيف يمكنني مساعدتك؟",
    isEnabled: true,
    position: "bottom-right",
    color: "#25d366",
    showAgentInfo: true,
  });

  const [newAgent, setNewAgent] = useState({
    name: "",
    phone: "",
    department: "",
  });

  const addAgent = () => {
    if (!newAgent.name || !newAgent.phone || !newAgent.department) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const agent: WhatsAppAgent = {
      id: Date.now().toString(),
      ...newAgent,
      isOnline: true,
    };

    setAgents([...agents, agent]);
    setNewAgent({ name: "", phone: "", department: "" });
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة العضو الجديد",
    });
  };

  const removeAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
    toast({
      title: "تم بنجاح",
      description: "تم حذف العضو",
    });
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, isOnline: !agent.isOnline } : agent
    ));
  };

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
        <Tabs defaultValue="agents" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              إدارة الفريق
            </TabsTrigger>
            <TabsTrigger value="widget" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              إعدادات الويدجت
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              المظهر العام
            </TabsTrigger>
          </TabsList>

          {/* Agents Management */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add New Agent */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    إضافة عضو جديد
                  </CardTitle>
                  <CardDescription>
                    أضف أعضاء فريق جدد للتعامل مع استفسارات العملاء
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input
                      id="name"
                      placeholder="اسم العضو"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم WhatsApp</Label>
                    <Input
                      id="phone"
                      placeholder="+966501234567"
                      value={newAgent.phone}
                      onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">القسم</Label>
                    <Input
                      id="department"
                      placeholder="المبيعات، الدعم الفني، إلخ"
                      value={newAgent.department}
                      onChange={(e) => setNewAgent({ ...newAgent, department: e.target.value })}
                    />
                  </div>
                  <Button onClick={addAgent} className="w-full bg-green-500 hover:bg-green-600">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة العضو
                  </Button>
                </CardContent>
              </Card>

              {/* Current Agents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      الفريق الحالي
                    </span>
                    <Badge variant="secondary">{agents.length} عضو</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <MessageCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{agent.name}</h4>
                              <p className="text-sm text-gray-500">{agent.phone}</p>
                              <Badge variant="outline" className="text-xs">
                                {agent.department}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`status-${agent.id}`} className="text-sm">
                              {agent.isOnline ? "متاح" : "غير متاح"}
                            </Label>
                            <Switch
                              id={`status-${agent.id}`}
                              checked={agent.isOnline}
                              onCheckedChange={() => toggleAgentStatus(agent.id)}
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeAgent(agent.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Widget Settings */}
          <TabsContent value="widget" className="space-y-6">
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
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
