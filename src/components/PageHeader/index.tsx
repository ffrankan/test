import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-components';
import { LeftOutlined } from '@ant-design/icons';
import UserAvatar from '@/components/UserAvatar';
import styles from './index.module.less';

interface CustomPageHeaderProps {
  title: string;
  showBack?: boolean;
  backPath?: string;
}

const CustomPageHeader: React.FC<CustomPageHeaderProps> = ({
  title,
  showBack = true,
  backPath
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <PageHeader
      className={styles.pageHeader}
      onBack={showBack ? handleBack : undefined}
      backIcon={showBack ? <LeftOutlined /> : null}
      title={title}
      extra={[
        <UserAvatar key="avatar" />
      ]}
    />
  );
};

export default CustomPageHeader;
