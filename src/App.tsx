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
import ContentAdminCourses from "./pages/content-admin/Courses";
import ClientAdminDashboard from "./pages/client-admin/Dashboard";
import ClientAdminCourses from "./pages/client-admin/Courses";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeCourses from "./pages/employee/Courses";
import HelpDeskDashboard from "./pages/helpdesk/Dashboard";
import HelpDeskCourses from "./pages/helpdesk/Courses";
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
          <Route path="/content-admin/courses" element={<ContentAdminCourses />} />
          
          {/* Client Admin Routes */}
          <Route path="/client-admin/dashboard" element={<ClientAdminDashboard />} />
          <Route path="/client-admin/courses" element={<ClientAdminCourses />} />
          
          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/courses" element={<EmployeeCourses />} />
          
          {/* HelpDesk Routes */}
          <Route path="/helpdesk/dashboard" element={<HelpDeskDashboard />} />
          <Route path="/helpdesk/courses" element={<HelpDeskCourses />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
