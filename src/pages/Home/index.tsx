import React, { FC } from 'react';
import { Card, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LabItem } from './types';
import styles from './index.module.less';

const Home: FC = () => {
  const navigate = useNavigate();

  const labs: LabItem[] = [
    {
      title: '通用AI实验室',
      description: '探索AI的基础应用和实验',
      path: '/course-center/general'
    },
    {
      title: '算法音乐实验室',
      description: '体验AI音乐创作与算法作曲',
      path: '/course-center/algorithm'
    },
    {
      title: 'AI心理实验室',
      description: '探索AI在心理学领域的应用',
      path: '/course-center/psychology'
    },
    {
      title: 'AI+N实验室',
      description: 'AI与其他领域的创新融合',
      path: '/course-center/aiplus'
    }
  ];

  const handleLabClick = (path: string): void => {
    navigate(path);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // TODO: Implement logout logic here
    console.log('Logging out...');
  };

  const menu = (
    <Menu>
      <Menu.Item key="login" onClick={handleLogin} icon={<LoginOutlined />}>
        登录
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        登出
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Avatar icon={<UserOutlined />} className={styles.avatar} />
        </Dropdown>
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
              <h3>{lab.title}</h3>
              <p>{lab.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
