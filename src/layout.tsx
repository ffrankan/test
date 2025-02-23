import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import styles from './layout.module.less';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getHeaderTitle = () => {
    if (pathname === '/' || pathname === '/home') {
      return '藤养学园AI交互式教学实验平台';
    }
    
    const categoryMatch = pathname.match(/\/course-center\/([^/]+)/);
    if (categoryMatch) {
      const category = categoryMatch[1];
      switch (category) {
        case 'general':
          return '通用 AI 实验室';
        case 'algorithm':
          return '算法音乐实验室';
        case 'psychology':
          return 'AI 心理实验室';
        case 'aiplus':
          return 'AI+N 实验室';
        default:
          return '课程中心';
      }
    }
    return '藤养学园';
  };

  const showBack = pathname !== '/' && pathname !== '/home';

  return (
    <Layout className={styles.layout}>
      <PageHeader 
        title={getHeaderTitle()}
        showBack={showBack}
        backPath="/"
      />
      <Content>
        <Outlet />
      </Content>
      <Footer>
        {new Date().getFullYear()} 藤养学园AI交互式教学实验平台
      </Footer>
    </Layout>
  );
};

export default App;
