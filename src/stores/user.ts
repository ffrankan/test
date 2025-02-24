import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

// 创建用户状态存储
export const useUserStore = create<UserState>((set) => ({
  currentUser: {
    id: 1,
    name: '张三',
    avatar: 'https://www.gravatar.com/avatar/default?d=robohash',
    email: 'zhangsan@example.com',
    role: 'student',
    grade: '三年级',
    class: '1班'
  },
  setCurrentUser: (user) => set({ currentUser: user }),
}));
