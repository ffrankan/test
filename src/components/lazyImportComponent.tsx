import React, { Suspense, LazyExoticComponent } from 'react';

const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> | React.FC}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <props.lazyChildren />
    </Suspense>
  );
};

export default LazyImportComponent;

