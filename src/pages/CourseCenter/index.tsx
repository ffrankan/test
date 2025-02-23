import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Progress, Badge, Tooltip } from 'antd';
import { 
  BookOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import CustomPageHeader from '@/components/PageHeader';
import styles from './index.module.less';

interface CourseCategory {
  title: string;
  description: string;
  courses: Course[];
}

interface Course {
  title: string;
  chapters: string[];
  totalLessons: number;
  completedLessons: number;
}

const categoryMap: Record<string, CourseCategory> = {
  general: {
    title: '通用 AI 实验室',
    description: '探索AI的基础应用和实验',
    courses: [
      {
        title: '人工智能通识课',
        chapters: [
          'CH1. 人工智能导论',
          'CH2. 机器学习基础',
          'CH3. 深度学习入门',
          'CH4. 神经网络原理',
          'CH5. 计算机视觉',
          'CH6. 自然语言处理',
          'CH7. 强化学习基础',
          'CH8. AI伦理与未来'
        ],
        totalLessons: 161,
        completedLessons: 100
      },
      {
        title: '机器学习基础',
        chapters: [
          'CH1. 数据预处理',
          'CH2. 监督学习',
          'CH3. 无监督学习',
          'CH4. 模型评估与调优'
        ],
        totalLessons: 28,
        completedLessons: 0
      },
      {
        title: '深度学习实践',
        chapters: [
          'CH1. 神经网络基础',
          'CH2. CNN原理与应用',
          'CH3. RNN与序列模型',
          'CH4. Transformer架构',
          'CH5. 生成模型',
          'CH6. 项目实战'
        ],
        totalLessons: 96,
        completedLessons: 0
      }
    ]
  },
  algorithm: {
    title: '算法音乐实验室',
    description: '体验AI音乐创作与算法作曲',
    courses: [
      {
        title: '音乐理论基础',
        chapters: [
          'CH1. 乐理基础',
          'CH2. 和声学',
          'CH3. 曲式分析',
          'CH4. 编曲基础'
        ],
        totalLessons: 32,
        completedLessons: 0
      },
      {
        title: 'AI作曲技术',
        chapters: [
          'CH1. MIDI基础',
          'CH2. 音乐生成模型',
          'CH3. 风格迁移'
        ],
        totalLessons: 24,
        completedLessons: 0
      }
    ]
  },
  psychology: {
    title: 'AI心理实验室',
    description: '探索AI在心理学领域的应用',
    courses: [
      {
        title: '心理学基础',
        chapters: [
          'CH1. 认知心理学',
          'CH2. 发展心理学',
          'CH3. 社会心理学',
          'CH4. 人格心理学',
          'CH5. 心理测量'
        ],
        totalLessons: 45,
        completedLessons: 0
      },
      {
        title: 'AI心理评估',
        chapters: [
          'CH1. 数据收集与分析',
          'CH2. 情感计算',
          'CH3. 行为预测'
        ],
        totalLessons: 18,
        completedLessons: 0
      }
    ]
  },
  aiplus: {
    title: 'AI+N实验室',
    description: 'AI与其他领域的创新融合',
    courses: [
      {
        title: 'AI+医疗健康',
        chapters: [
          'CH1. 医学影像分析',
          'CH2. 疾病诊断',
          'CH3. 健康监测',
          'CH4. 智慧医疗'
        ],
        totalLessons: 36,
        completedLessons: 0
      },
      {
        title: 'AI+教育',
        chapters: [
          'CH1. 个性化学习',
          'CH2. 智能题库',
          'CH3. 学习分析'
        ],
        totalLessons: 24,
        completedLessons: 0
      },
      {
        title: 'AI+金融',
        chapters: [
          'CH1. 金融预测',
          'CH2. 风险评估',
          'CH3. 智能投顾',
          'CH4. 反欺诈系统'
        ],
        totalLessons: 32,
        completedLessons: 0
      }
    ]
  }
};

const CourseCenter: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const currentCategory = category ? categoryMap[category] : null;

  if (!currentCategory) {
    return <div>未找到相关课程</div>;
  }

  const getProgressStatus = (completed: number, total: number) => {
    const percent = (completed / total) * 100;
    if (percent === 0) return 'notStarted';
    if (percent === 100) return 'completed';
    return 'inProgress';
  };

  const getStatusBadge = (completed: number, total: number) => {
    const status = getProgressStatus(completed, total);
    switch (status) {
      case 'completed':
        return <Badge color="green" text="已完成" />;
      case 'inProgress':
        return <Badge color="blue" text="学习中" />;
      default:
        return <Badge color="gray" text="未开始" />;
    }
  };

  const handleCourseClick = (courseTitle: string) => {
    // 使用课程标题作为URL参数，实际项目中应该使用courseId
    const courseParam = encodeURIComponent(courseTitle);
    navigate(`/course-center/${category}/course/${courseParam}`);
  };

  return (
    <div className={styles.container}>
      <CustomPageHeader
        title={currentCategory.title}
        backPath="/"
      />
      <div className={styles.content}>
        <div className={styles.courseGrid}>
          {currentCategory.courses.map((course, index) => (
            <Card
              key={index}
              className={styles.courseCard}
              onClick={() => handleCourseClick(course.title)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.titleSection}>
                  <BookOutlined className={styles.courseIcon} />
                  <div>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <div className={styles.courseStats}>
                      <Tooltip title="课程数">
                        <span><ClockCircleOutlined /> {course.totalLessons} 课时</span>
                      </Tooltip>
                      <span className={styles.divider}>|</span>
                      {getStatusBadge(course.completedLessons, course.totalLessons)}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.progressSection}>
                <Progress
                  percent={Math.round((course.completedLessons / course.totalLessons) * 100)}
                  size="small"
                  format={(percent) => {
                    const isCompleted = percent === 100;
                    return (
                      <span className={styles.progressText}>
                        {isCompleted ? (
                          <><CheckCircleOutlined /> 已完成</>
                        ) : (
                          `${course.completedLessons}/${course.totalLessons}`
                        )}
                      </span>
                    );
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCenter;
