import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Building2, 
  Settings, 
  BarChart3,
  Upload,
  FolderTree,
  UserCog,
  HelpCircle,
  GraduationCap,
  FileText
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { UserRole } from '@/types';

interface AppSidebarProps {
  userRole: UserRole;
}

const roleMenus: Record<UserRole, Array<{ title: string; url: string; icon: any }>> = {
  super_admin: [
    { title: 'Dashboard', url: '/super-admin/dashboard', icon: LayoutDashboard },
    { title: 'Course Library', url: '/super-admin/courses', icon: BookOpen },
    { title: 'Sectors & Categories', url: '/super-admin/sectors', icon: FolderTree },
    { title: 'Clients', url: '/super-admin/clients', icon: Building2 },
    { title: 'Users', url: '/super-admin/users', icon: Users },
    { title: 'Analytics', url: '/super-admin/analytics', icon: BarChart3 },
    { title: 'Settings', url: '/super-admin/settings', icon: Settings },
  ],
  content_admin: [
    { title: 'Dashboard', url: '/content-admin/dashboard', icon: LayoutDashboard },
    { title: 'My Courses', url: '/content-admin/courses', icon: BookOpen },
    { title: 'Upload Course', url: '/content-admin/upload', icon: Upload },
    { title: 'Categories', url: '/content-admin/categories', icon: FolderTree },
    { title: 'Analytics', url: '/content-admin/analytics', icon: BarChart3 },
  ],
  client_admin: [
    { title: 'Dashboard', url: '/client-admin/dashboard', icon: LayoutDashboard },
    { title: 'Course Library', url: '/client-admin/courses', icon: BookOpen },
    { title: 'Employees', url: '/client-admin/employees', icon: Users },
    { title: 'Course Assignments', url: '/client-admin/assignments', icon: FileText },
    { title: 'Reports', url: '/client-admin/reports', icon: BarChart3 },
    { title: 'Teams', url: '/client-admin/teams', icon: UserCog },
    { title: 'Settings', url: '/client-admin/settings', icon: Settings },
  ],
  employee: [
    { title: 'Dashboard', url: '/employee/dashboard', icon: LayoutDashboard },
    { title: 'My Courses', url: '/employee/courses', icon: BookOpen },
    { title: 'Certificates', url: '/employee/certificates', icon: GraduationCap },
    { title: 'Learning History', url: '/employee/history', icon: FileText },
    { title: 'Profile', url: '/employee/profile', icon: Settings },
  ],
  helpdesk: [
    { title: 'Dashboard', url: '/helpdesk/dashboard', icon: LayoutDashboard },
    { title: 'All Courses', url: '/helpdesk/courses', icon: BookOpen },
    { title: 'User Search', url: '/helpdesk/search', icon: Users },
    { title: 'Support Tickets', url: '/helpdesk/tickets', icon: HelpCircle },
    { title: 'SCORM Logs', url: '/helpdesk/logs', icon: FileText },
    { title: 'xAPI Timeline', url: '/helpdesk/xapi', icon: BarChart3 },
  ],
};

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const menuItems = roleMenus[userRole] || [];
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-6">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">LearnHub</h2>
              <p className="text-xs text-sidebar-foreground/70">LMS Platform</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <GraduationCap className="h-6 w-6 text-sidebar-primary mx-auto" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
