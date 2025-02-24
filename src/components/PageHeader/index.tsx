import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';
import styles from './index.module.less';

const { Header } = Layout;

interface CustomPageHeaderProps {
  title: ReactNode;
  showBack?: boolean;
}

const CustomPageHeader: React.FC<CustomPageHeaderProps> = ({
  title,
  showBack = true,
}) => {
  const navigate = useNavigate();

  return (
    <Header className={styles.pageHeader}>
      <div className={styles.left}>
        {showBack && (
          <div 
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <LeftOutlined />
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.right}>
        <UserAvatar />
      </div>
    </Header>
  );
};

export default CustomPageHeader;
