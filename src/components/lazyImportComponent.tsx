import React, { Suspense, LazyExoticComponent } from 'react';
import { Spin } from 'antd';
import styles from './lazyImportComponent.module.less';

const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> | React.FC }) => {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    }>
      <props.lazyChildren />
    </Suspense>
  );
};

export default LazyImportComponent;
