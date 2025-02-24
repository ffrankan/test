import {UserCourseProgress} from "@/types/user.ts";

// 模拟用户课程进度数据
export const userCourseProgress: UserCourseProgress[] = [
    {
        courseId: 1,
        userId: 1,
        completedLessons: 2,
        totalLessons: 4,
        lastAccessTime: '2025-02-24T08:00:00Z',
        isStarted: true
    },
    {
        courseId: 2,
        userId: 1,
        completedLessons: 0,
        totalLessons: 2,
        lastAccessTime: '',
        isStarted: false
    },
    {
        courseId: 3,
        userId: 1,
        completedLessons: 1,
        totalLessons: 2,
        lastAccessTime: '2025-02-23T15:30:00Z',
        isStarted: true
    }
];

// 获取用户特定课程的进度
export const getUserCourseProgress = (userId: number, courseId: number): UserCourseProgress | undefined => {
    return userCourseProgress.find(progress =>
        progress.userId === userId && progress.courseId === courseId
    );
};

// 获取用户的所有课程进度
export const getUserAllCoursesProgress = (userId: number): UserCourseProgress[] => {
    return userCourseProgress.filter(progress => progress.userId === userId);
};
