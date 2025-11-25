import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import SuperAdminCourses from "./pages/super-admin/Courses";
import ContentAdminDashboard from "./pages/content-admin/Dashboard";
import ClientAdminDashboard from "./pages/client-admin/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import HelpDeskDashboard from "./pages/helpdesk/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* Super Admin Routes */}
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/courses" element={<SuperAdminCourses />} />
          
          {/* Content Admin Routes */}
          <Route path="/content-admin/dashboard" element={<ContentAdminDashboard />} />
          
          {/* Client Admin Routes */}
          <Route path="/client-admin/dashboard" element={<ClientAdminDashboard />} />
          
          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          
          {/* HelpDesk Routes */}
          <Route path="/helpdesk/dashboard" element={<HelpDeskDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
