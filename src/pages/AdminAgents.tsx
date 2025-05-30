
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, MessageCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppAgent {
  id: string;
  name: string;
  phone: string;
  department: string;
  isOnline: boolean;
  avatar?: string;
}

const AdminAgents = () => {
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
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  العودة للوحة الرئيسية
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">إدارة الفريق</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </div>
    </div>
  );
};

export default AdminAgents;
