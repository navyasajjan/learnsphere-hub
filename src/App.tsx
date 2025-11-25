import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
// Super Admin
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import SuperAdminCourses from "./pages/super-admin/Courses";
import SuperAdminSectors from "./pages/super-admin/Sectors";
import SuperAdminClients from "./pages/super-admin/Clients";
import SuperAdminUsers from "./pages/super-admin/Users";
import SuperAdminAnalytics from "./pages/super-admin/Analytics";
import SuperAdminSettings from "./pages/super-admin/Settings";

// Content Admin
import ContentAdminDashboard from "./pages/content-admin/Dashboard";
import ContentAdminCourses from "./pages/content-admin/Courses";
import ContentAdminUpload from "./pages/content-admin/Upload";
import ContentAdminCategories from "./pages/content-admin/Categories";
import ContentAdminAnalytics from "./pages/content-admin/Analytics";
import ContentAdminSettings from "./pages/content-admin/Settings";

// Client Admin
import ClientAdminDashboard from "./pages/client-admin/Dashboard";
import ClientAdminCourses from "./pages/client-admin/Courses";
import ClientAdminEmployees from "./pages/client-admin/Employees";
import ClientAdminAssignments from "./pages/client-admin/Assignments";
import ClientAdminReports from "./pages/client-admin/Reports";
import ClientAdminTeams from "./pages/client-admin/Teams";
import ClientAdminSettings from "./pages/client-admin/Settings";

// Employee
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeCourses from "./pages/employee/Courses";
import EmployeeCertificates from "./pages/employee/Certificates";
import EmployeeHistory from "./pages/employee/History";
import EmployeeProfile from "./pages/employee/Profile";

// HelpDesk
import HelpDeskDashboard from "./pages/helpdesk/Dashboard";
import HelpDeskCourses from "./pages/helpdesk/Courses";
import HelpDeskSearch from "./pages/helpdesk/Search";
import HelpDeskTickets from "./pages/helpdesk/Tickets";
import HelpDeskLogs from "./pages/helpdesk/Logs";
import HelpDeskXAPI from "./pages/helpdesk/XAPI";
import HelpDeskSettings from "./pages/helpdesk/Settings";

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
          <Route path="/super-admin/sectors" element={<SuperAdminSectors />} />
          <Route path="/super-admin/clients" element={<SuperAdminClients />} />
          <Route path="/super-admin/users" element={<SuperAdminUsers />} />
          <Route path="/super-admin/analytics" element={<SuperAdminAnalytics />} />
          <Route path="/super-admin/settings" element={<SuperAdminSettings />} />
          
          {/* Content Admin Routes */}
          <Route path="/content-admin/dashboard" element={<ContentAdminDashboard />} />
          <Route path="/content-admin/courses" element={<ContentAdminCourses />} />
          <Route path="/content-admin/upload" element={<ContentAdminUpload />} />
          <Route path="/content-admin/categories" element={<ContentAdminCategories />} />
          <Route path="/content-admin/analytics" element={<ContentAdminAnalytics />} />
          <Route path="/content-admin/settings" element={<ContentAdminSettings />} />
          
          {/* Client Admin Routes */}
          <Route path="/client-admin/dashboard" element={<ClientAdminDashboard />} />
          <Route path="/client-admin/courses" element={<ClientAdminCourses />} />
          <Route path="/client-admin/employees" element={<ClientAdminEmployees />} />
          <Route path="/client-admin/assignments" element={<ClientAdminAssignments />} />
          <Route path="/client-admin/reports" element={<ClientAdminReports />} />
          <Route path="/client-admin/teams" element={<ClientAdminTeams />} />
          <Route path="/client-admin/settings" element={<ClientAdminSettings />} />
          
          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/courses" element={<EmployeeCourses />} />
          <Route path="/employee/certificates" element={<EmployeeCertificates />} />
          <Route path="/employee/history" element={<EmployeeHistory />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          
          {/* HelpDesk Routes */}
          <Route path="/helpdesk/dashboard" element={<HelpDeskDashboard />} />
          <Route path="/helpdesk/courses" element={<HelpDeskCourses />} />
          <Route path="/helpdesk/search" element={<HelpDeskSearch />} />
          <Route path="/helpdesk/tickets" element={<HelpDeskTickets />} />
          <Route path="/helpdesk/logs" element={<HelpDeskLogs />} />
          <Route path="/helpdesk/xapi" element={<HelpDeskXAPI />} />
          <Route path="/helpdesk/settings" element={<HelpDeskSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
