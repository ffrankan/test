import React from 'react';
import LabCard from '../../components/LabCard';
import { labs } from '../../constants/labs';
import styles from './index.module.less';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>探索AI的无限可能，开启你的学习之旅</h1>
        </div>
        <div className={styles.labGrid}>
          {labs.map((lab) => (
            <LabCard key={lab.path} lab={lab} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
