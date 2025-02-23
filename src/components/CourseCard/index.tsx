import React from 'react';
import { Card, Progress } from 'antd';
import { 
  ClockCircleOutlined,
  RobotOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  ExperimentOutlined,
  AudioOutlined,
  MedicineBoxOutlined,
  ReadOutlined,
  StockOutlined,
  HeartOutlined,
  LineChartOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export interface Course {
  title: string;
  chapters: string[];
  totalLessons: number;
  completedLessons: number;
}

interface CourseCardProps {
  course: Course;
  category: string;
  index: number;
}

const getCourseIcon = (title: string) => {
  // 通用AI课程
  if (title === '人工智能通识课') return <RobotOutlined className={styles.icon} />;
  if (title === '机器学习基础') return <DatabaseOutlined className={styles.icon} />;
  if (title === '深度学习实践') return <NodeIndexOutlined className={styles.icon} />;
  
  // 音乐相关课程
  if (title === '音乐理论基础') return <AudioOutlined className={styles.icon} />;
  if (title === 'AI作曲技术') return <AudioOutlined className={styles.icon} />;
  
  // 心理学相关课程
  if (title === '心理学基础') return <HeartOutlined className={styles.icon} />;
  if (title === 'AI心理评估') return <LineChartOutlined className={styles.icon} />;
  
  // AI+其他领域课程
  if (title === 'AI+医疗健康') return <MedicineBoxOutlined className={styles.icon} />;
  if (title === 'AI+教育') return <ReadOutlined className={styles.icon} />;
  if (title === 'AI+金融') return <StockOutlined className={styles.icon} />;
  
  // 默认图标
  return <ExperimentOutlined className={styles.icon} />;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, category, index }) => {
  const navigate = useNavigate();
  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  return (
    <Card
      className={styles.courseCard}
      onClick={() => navigate(`/course-detail/${category}/${index}`)}
    >
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          {getCourseIcon(course.title)}
        </div>
        <div className={styles.courseInfo}>
          <h3 className={styles.courseTitle}>{course.title}</h3>
          <div className={styles.courseStatus}>
            <span className={styles.lessonCount}>
              <ClockCircleOutlined /> {course.totalLessons} 课时
            </span>
            <span className={styles.separator}>|</span>
            <span className={`${styles.status} ${
              course.completedLessons === 0 
                ? styles.notStarted 
                : course.completedLessons === course.totalLessons 
                  ? styles.completed 
                  : styles.inProgress
            }`}>
              {course.completedLessons === 0 ? '未开始' : 
               course.completedLessons === course.totalLessons ? '已完成' : '进行中'}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.progressWrapper}>
        <Progress 
          percent={progress} 
          format={(percent) => (
            <span className={styles.progressText}>
              {course.completedLessons}/{course.totalLessons}
            </span>
          )}
          strokeColor={{
            '0%': '#818cf8',
            '100%': '#6366f1',
          }}
          trailColor="#f1f5f9"
          size="small"
        />
      </div>
    </Card>
  );
};

export default CourseCard;
