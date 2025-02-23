import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Progress, Badge, List, Button } from 'antd';
import { 
  CheckCircleOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import CustomPageHeader from '@/components/PageHeader';
import styles from './index.module.less';

interface Course {
  title: string;
  chapters: string[];
  totalLessons: number;
  completedLessons: number;
}

const CourseDetail: React.FC = () => {
  const { category, courseTitle } = useParams<{ category: string; courseTitle: string }>();
  const navigate = useNavigate();

  // 在实际项目中，这里应该通过API获取课程详情
  const mockCourse: Course = {
    title: decodeURIComponent(courseTitle || ''),
    chapters: [
      'CH1. 认知心理学',
      'CH2. 发展心理学',
      'CH3. 社会心理学',
      'CH4. 人格心理学',
      'CH5. 心理测量'
    ],
    totalLessons: 45,
    completedLessons: 0
  };

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

  return (
    <div className={styles.container}>
      <CustomPageHeader
        title={mockCourse.title}
        backPath={`/course-center/${category}`}
      />
      <div className={styles.content}>
        <Card className={styles.progressCard}>
          <div className={styles.progressInfo}>
            <h3>学习进度</h3>
            <Progress
              percent={Math.round((mockCourse.completedLessons / mockCourse.totalLessons) * 100)}
              format={(percent) => {
                const isCompleted = percent === 100;
                return (
                  <span className={styles.progressText}>
                    {isCompleted ? (
                      <><CheckCircleOutlined /> 已完成</>
                    ) : (
                      `${mockCourse.completedLessons}/${mockCourse.totalLessons}`
                    )}
                  </span>
                );
              }}
            />
          </div>
        </Card>

        <Card className={styles.chaptersCard} title="课程章节">
          <List
            dataSource={mockCourse.chapters}
            renderItem={(chapter, index) => (
              <List.Item className={styles.chapterItem}>
                <div className={styles.chapterContent}>
                  <div className={styles.chapterInfo}>
                    <span className={styles.chapterNumber}>第 {index + 1} 章</span>
                    <h4>{chapter}</h4>
                  </div>
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    className={styles.startButton}
                  >
                    开始学习
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
