export interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: string;
  class?: string;
}
