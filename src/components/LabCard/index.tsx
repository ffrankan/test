import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export interface LabItem {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  courses: number;
  status: string;
  statusColor: string;
  type: 'general' | 'music' | 'psychology' | 'innovation';
}

interface LabCardProps {
  lab: LabItem;
}

const LabCard: React.FC<LabCardProps> = ({ lab }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.labCard}
      onClick={() => navigate(lab.path)}
      data-type={lab.type}
    >
      <div className={styles.icon}>{lab.icon}</div>
      <h3 className={styles.title}>{lab.title}</h3>
      <p className={styles.description}>{lab.description}</p>
      <div className={styles.footer}>
        <span className={styles.courses}>{lab.courses} 门课程</span>
        <span className={styles.status}>{lab.status}</span>
      </div>
      <RightOutlined className={styles.arrow} />
    </div>
  );
};

export default LabCard;
