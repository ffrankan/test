// 课程中心页面使用的课程信息
import {Lab} from "@/types/lab.ts";

export interface CourseOverview {
    id: number;
    title: string;
    description: string;
    lab: Lab;
    duration: string;
    totalLessons: number;
    grade: number;
}


// 课程详情页使用的完整课程信息
export interface CourseDetail extends CourseOverview {
    chapters: {
        title: string;
        description: string;
        hours: number;
        objectives: string[];
        lessons: {
            title: string;
            duration: string;
        }[];
    }[];
}
