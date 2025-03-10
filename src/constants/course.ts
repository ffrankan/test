import type {CourseOverview, CourseDetail} from '@/types/course';
import {Lab} from "@/types/lab.ts";

const aiGenerateLab: Lab = {
    id: 1,
    name: "ai_general_lab"
}

// 课程中心页面使用的课程列表
export const courses: CourseOverview[] = [
    {
        id: 1,
        title: '人工智能通识课',
        description: '探索AI的基础概念和应用场景，了解AI如何改变我们的生活和工作',
        lab: aiGenerateLab,
        grade: 3,
        totalLessons: 28,
        teacher: {
            id: 1,
            name: '张教授',
            title: 'AI研究院首席科学家',
            avatar: '/assets/images/teachers/zhang.jpg',
            description: '在人工智能领域有超过15年研究经验，曾在多个国际顶级AI项目中担任核心研究员。'
        }
    },
    {
        id: 2,
        title: '机器学习基础',
        description: '学习机器学习的核心概念和算法，掌握数据分析和模型训练的基本技能',
        lab: aiGenerateLab,
        grade: 3,
        totalLessons: 32,
        teacher: {
            id: 2,
            name: '李博士',
            title: '机器学习高级研究员',
            avatar: '/assets/images/teachers/li.jpg',
            description: '专注于机器学习算法研究和应用，拥有丰富的教学经验和多项专利。'
        }
    },
    {
        id: 3,
        title: '深度学习实践',
        description: '深入学习神经网络和深度学习模型，实践AI应用开发',
        lab: aiGenerateLab,
        grade: 3,
        totalLessons: 40,
        teacher: {
            id: 3,
            name: '王教授',
            title: '深度学习研究中心主任',
            avatar: '/assets/images/teachers/wang.jpg',
            description: '在计算机视觉和自然语言处理领域有突出贡献，指导过多个成功的AI商业项目。'
        }
    }
];

// 课程详情数据
export const courseDetails: Record<number, CourseDetail> = {
    1: {
        ...courses[0],
        chapters: [
            {
                title: '人工智能概述',
                description: '了解人工智能的定义、发展历史和主要应用领域',
                hours: 2,
                objectives: [
                    '理解人工智能的基本概念',
                    '了解人工智能的发展历程',
                    '认识人工智能的主要应用场景'
                ],
                lessons: [
                    {
                        title: '什么是人工智能',
                        duration: '45分钟'
                    },
                    {
                        title: 'AI发展简史',
                        duration: '45分钟'
                    }
                ]
            },
            {
                title: 'AI技术基础',
                description: '学习人工智能的基础技术组件和工作原理',
                hours: 3,
                objectives: [
                    '掌握机器学习的基本概念',
                    '了解深度学习的工作原理',
                    '认识自然语言处理的应用'
                ],
                lessons: [
                    {
                        title: '机器学习入门',
                        duration: '60分钟'
                    },
                    {
                        title: '深度学习基础',
                        duration: '60分钟'
                    }
                ]
            }
        ]
    },
    2: {
        ...courses[1],
        chapters: [
            {
                title: '机器学习基础概念',
                description: '学习机器学习的核心概念和基本原理',
                hours: 3,
                objectives: [
                    '理解监督学习和非监督学习',
                    '掌握模型评估方法',
                    '了解常见的机器学习算法'
                ],
                lessons: [
                    {
                        title: '机器学习类型简介',
                        duration: '60分钟'
                    },
                    {
                        title: '模型评估方法',
                        duration: '60分钟'
                    }
                ]
            }
        ]
    },
    3: {
        ...courses[2],
        chapters: [
            {
                title: '神经网络基础',
                description: '学习神经网络的基本结构和工作原理',
                hours: 4,
                objectives: [
                    '理解神经元和激活函数',
                    '掌握前向传播和反向传播',
                    '了解深度神经网络架构'
                ],
                lessons: [
                    {
                        title: '神经元和激活函数',
                        duration: '60分钟'
                    },
                    {
                        title: '神经网络训练原理',
                        duration: '60分钟'
                    }
                ]
            }
        ]
    }
};
