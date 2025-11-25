export type UserRole = 'super_admin' | 'content_admin' | 'client_admin' | 'employee' | 'helpdesk';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  clientId?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  sector: string;
  category: string;
  subcategory?: string;
  version: string;
  scormType: 'SCORM 1.2' | 'SCORM 2004' | 'xAPI';
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail?: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  contentAdminId: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  assignedAt: string;
  startedAt?: string;
  completedAt?: string;
  progress: number; // 0-100
  score?: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  isMandatory: boolean;
  dueDate?: string;
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  subscriptionPlan: 'Basic' | 'Professional' | 'Enterprise';
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  employeeCount: number;
  adminId: string;
  createdAt: string;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  sectorId: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface AnalyticsData {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  completionRate: number;
  averageScore: number;
  learningHours: number;
  activeUsers: number;
  topCourses: Array<{
    courseId: string;
    title: string;
    enrollments: number;
  }>;
  sectorDistribution: Array<{
    sector: string;
    count: number;
  }>;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationCategory = 'course' | 'system' | 'assignment' | 'achievement' | 'support';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}
