import { useUserStore } from '@/stores/user';
import { getUserCourseProgress, getUserAllCoursesProgress } from '@/constants/userProgress';

export const useUser = () => {
  const { currentUser } = useUserStore();

  return {
    user: currentUser,
    // 获取用户特定课程的进度
    getCourseProgress: (courseId: number) => {
      if (!currentUser) return undefined;
      return getUserCourseProgress(currentUser.id, courseId);
    },
    // 获取用户所有课程的进度
    getAllCoursesProgress: () => {
      if (!currentUser) return [];
      return getUserAllCoursesProgress(currentUser.id);
    }
  };
};
