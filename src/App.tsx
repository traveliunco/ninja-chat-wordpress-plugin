
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAgents from "./pages/AdminAgents";
import AdminWidget from "./pages/AdminWidget";
import AdminAppearance from "./pages/AdminAppearance";
import AdminStats from "./pages/AdminStats";
import AdminDownload from "./pages/AdminDownload";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/agents" element={<AdminAgents />} />
          <Route path="/admin/widget" element={<AdminWidget />} />
          <Route path="/admin/appearance" element={<AdminAppearance />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/download" element={<AdminDownload />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
