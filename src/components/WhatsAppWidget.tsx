
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, User, Clock } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  phone: string;
  department: string;
  isOnline: boolean;
}

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const agents: Agent[] = [
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
      isOnline: true,
    },
    {
      id: "3",
      name: "محمد العلي",
      phone: "+966509876543",
      department: "الاستشارات",
      isOnline: false,
    },
  ];

  const onlineAgents = agents.filter(agent => agent.isOnline);

  const handleChatWithAgent = (agent: Agent) => {
    const message = encodeURIComponent("مرحباً! أحتاج مساعدة من قسم " + agent.department);
    const whatsappUrl = `https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Notification Badge */}
          {onlineAgents.length > 0 && !isOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {onlineAgents.length}
            </div>
          )}
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            size="lg"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 z-50 animate-in slide-in-from-bottom duration-300">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-green-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">WhatsApp Chat</CardTitle>
                    <p className="text-green-100 text-sm">
                      {onlineAgents.length} عضو متاح الآن
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Welcome Message */}
            <div className="bg-green-50 p-4 border-b">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    مرحباً! كيف يمكننا مساعدتك اليوم؟ 👋
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    الآن
                  </div>
                </div>
              </div>
            </div>

            {/* Agents List */}
            <CardContent className="p-0 max-h-80 overflow-y-auto">
              <div className="space-y-1">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0 ${
                      !agent.isOnline ? 'opacity-60' : ''
                    }`}
                    onClick={() => agent.isOnline && handleChatWithAgent(agent)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          {agent.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {agent.name}
                          </h4>
                          <p className="text-xs text-gray-500">{agent.department}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <Badge 
                          variant={agent.isOnline ? "default" : "secondary"}
                          className={agent.isOnline ? "bg-green-500" : ""}
                        >
                          {agent.isOnline ? "متاح" : "غير متاح"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {onlineAgents.length === 0 && (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    جميع الأعضاء غير متاحين حالياً
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    يرجى المحاولة لاحقاً
                  </p>
                </div>
              )}
            </CardContent>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 text-center">
              <p className="text-xs text-gray-500">
                Powered by WhatsApp Widget Pro
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
