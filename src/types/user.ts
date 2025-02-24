export interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: string;
  class?: string;
}

// 用户相关的课程进度信息
export interface UserCourseProgress {
  courseId: number;
  userId: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessTime: string;
  isStarted: boolean;
}