import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Progress, Avatar, Tag, Collapse } from 'antd';
import { 
  UserOutlined,
  CheckCircleOutlined,
  RightOutlined 
} from '@ant-design/icons';
import { courseDetails } from '@/constants/course';
import styles from './index.module.less';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseDetails[Number(courseId)];
  
  // 模拟当前用户的课程进度，实际项目中应该从API获取
  const currentProgress = {
    completedLessons: 3,
    totalLessons: course?.totalLessons || 0,
  };

  if (!course) {
    return <div>课程不存在</div>;
  }

  const progress = Math.round((currentProgress.completedLessons / currentProgress.totalLessons) * 100);

  return (
    <div className={styles.container}>
      
      <div className={styles.content}>
        <div className={styles.overview}>
          <Card>
            <div className={styles.courseInfo}>
              <div className={styles.mainInfo}>
                <h1>{course.title}</h1>
                <p className={styles.description}>{course.description}</p>
                <div className={styles.progressWrapper}>
                  <div className={styles.progressHeader}>
                    <span>学习进度</span>
                    <span className={styles.progressText}>
                      {currentProgress.completedLessons}/{currentProgress.totalLessons}课时
                    </span>
                  </div>
                  <Progress 
                    percent={progress}
                    strokeColor={{
                      '0%': '#4f46e5',
                      '100%': '#0ea5e9'
                    }}
                    status="active"
                  />
                </div>
              </div>
              
              <div className={styles.teacherInfo}>
                <Avatar size={64} src={course.teacher.avatar} icon={<UserOutlined />} />
                <div className={styles.teacherDetail}>
                  <h3>{course.teacher.name}</h3>
                  <p>{course.teacher.title}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.chapters}>
          <Card title="课程大纲">
            <Collapse expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}>
              {course.chapters.map((chapter, index) => (
                <Collapse.Panel
                  key={index}
                  header={
                    <div className={styles.chapterHeader}>
                      <span className={styles.chapterTitle}>
                        第{index + 1}章 {chapter.title}
                      </span>
                      <Tag color="primary">{chapter.hours}学时</Tag>
                    </div>
                  }
                >
                  <div className={styles.chapterContent}>
                    <p>{chapter.description}</p>
                    <div className={styles.objectives}>
                      <h4>本章目标</h4>
                      <ul>
                        {chapter.objectives.map((objective, idx) => (
                          <li key={idx}>
                            <CheckCircleOutlined className={styles.objectiveIcon} />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.lessons}>
                      {chapter.lessons.map((lesson, idx) => (
                        <div key={idx} className={styles.lesson}>
                          <span className={styles.lessonTitle}>
                            <span className={styles.lessonIndex}>{idx + 1}</span>
                            {lesson.title}
                          </span>
                          <span className={styles.lessonDuration}>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
