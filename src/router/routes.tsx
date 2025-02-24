import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import LazyImportComponent from '@/components/lazyImportComponent';

import { protectedLoader } from './loader';
import { tokenLoader } from './loader';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Login/index'))} />,
  },
  {
    path: '/melody',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/components/Melody'))} />,
  },
  {
    path: '/',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/layout'))} />,
    handle: {
      title: '藤养学园AI交互式教学实验平台'
    },
    children: [
      {
        path: '',
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: 'home',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
        handle: {
          title: '藤养学园AI交互式教学实验平台'
        }
      },
      {
        path: ':labName/courses',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/CourseCenter'))} />,
        handle: {
          title: '课程中心'
        }
      },
      {
        path: ':labName/courses/:courseId',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/CourseDetail'))} />,
        handle: {
          title: '课程详情'
        }
      },
      {
        path: 'user',
        loader: protectedLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/user'))} />,
        handle: {
          title: '用户中心'
        }
      },
      {
        path: 'manage',
        loader: tokenLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/manage'))} />,
        handle: {
          title: '管理中心'
        }
      },
      {
        path: 'file/:id?',
        loader: protectedLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/file'))} />,
        handle: {
          title: '文件管理'
        }
      },
      {
        path: 'info',
        loader: protectedLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/info'))} />,
      },
      {
        path: 'pdf',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/components/PdfView'))} />,
      },
      {
        path: '*',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/NotFound'))} />,
      },
    ]
  },
];

export default routes;
