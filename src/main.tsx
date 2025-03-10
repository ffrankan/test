import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import router from './router';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RouterProvider 
    future={{ v7_startTransition: true}} 
    router={router} 
  />
);
