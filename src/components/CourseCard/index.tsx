import React from 'react';
import { Space, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import type { CourseOverview } from '@/types/course';
import { useUser } from '@/hooks/useUser';
import styles from './index.module.less';

interface CourseCardProps {
  course: CourseOverview;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const {getCourseProgress } = useUser();

  const handleClick = () => {
    navigate(`${course.id}`);
  };

  const progress = getCourseProgress(course.id);
  const completedLessons = progress?.completedLessons ?? 0;
  const status = completedLessons > 0 ? '开始' : '未开始';
  const statusClass = completedLessons > 0 ? styles.started : styles.notStarted;
  const progressPercent = Math.round((completedLessons / course.totalLessons) * 100);

  return (
    <div className={styles.courseCard} onClick={handleClick}>
      <div className={styles.header}>
        <Space className={styles.duration}>
          <ClockCircleOutlined />
          <span>{course.totalLessons}课时</span>
        </Space>
        <span className={`${styles.status} ${statusClass}`}>• {status}</span>
      </div>
      <h3 className={styles.title}>{course.title}</h3>
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <Progress 
            percent={progressPercent} 
            showInfo={false}
            strokeColor="#1677ff"
            trailColor="#f5f5f5"
            size="small"
          />
        </div>
        <span className={styles.progressText}>{completedLessons}/{course.totalLessons}</span>
      </div>
    </div>
  );
};

export default CourseCard;
