import React, { FC } from 'react';
import { Card, Badge } from 'antd';
import { 
  ExperimentOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
  AppstoreAddOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';
import { LabItem } from './types';
import styles from './index.module.less';

const Home: FC = () => {
  const navigate = useNavigate();

  const labs: LabItem[] = [
    {
      title: '通用AI实验室',
      description: '探索AI的基础应用和实验',
      path: '/course-center/general',
      icon: <ExperimentOutlined />,
      courses: 3,
      status: '最受欢迎'
    },
    {
      title: '算法音乐实验室',
      description: '体验AI音乐创作与算法作曲',
      path: '/course-center/algorithm',
      icon: <CustomerServiceOutlined />,
      courses: 2,
      status: '新课程'
    },
    {
      title: 'AI心理实验室',
      description: '探索AI在心理学领域的应用',
      path: '/course-center/psychology',
      icon: <HeartOutlined />,
      courses: 2,
      status: '热门'
    },
    {
      title: 'AI+N实验室',
      description: 'AI与其他领域的创新融合',
      path: '/course-center/aiplus',
      icon: <AppstoreAddOutlined />,
      courses: 3,
      status: '推荐'
    }
  ];

  const handleLabClick = (path: string): void => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <UserAvatar />
      </div>
      
      <div className={styles.content}>
        <div className={styles.banner}>
          <h1>欢迎来到藤养学园AI交互式教学实验平台</h1>
          <p>探索AI的无限可能，开启你的学习之旅</p>
        </div>

        <div className={styles.labGrid}>
          {labs.map((lab, index) => (
            <Card
              key={index}
              className={styles.labCard}
              onClick={() => handleLabClick(lab.path)}
              hoverable
            >
              <Badge.Ribbon text={lab.status} color={index === 0 ? "blue" : index === 1 ? "green" : index === 2 ? "volcano" : "purple"}>
                <div className={styles.cardContent}>
                  <div className={styles.iconWrapper}>
                    {lab.icon}
                  </div>
                  <div className={styles.labInfo}>
                    <h3>{lab.title}</h3>
                    <p>{lab.description}</p>
                    <div className={styles.courseCount}>
                      {lab.courses} 门课程
                      <ArrowRightOutlined className={styles.arrow} />
                    </div>
                  </div>
                </div>
              </Badge.Ribbon>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
