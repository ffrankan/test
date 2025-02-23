import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import ErrorBoundary from '@/components/errorBoundary';
import LazyImportComponent from '@/components/lazyImportComponent';

import { protectedLoader } from './loader';
import { usersLoader } from './loader';
import { tokenLoader } from './loader';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Login/index'))} />,
  },
  {
    path: '/melody',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Melody'))} />,
  },
  {
    path: '/',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/layout'))} />,
    children: [
      {
        path: '',
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: 'home',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
        children: [
          {
            path: '',
            element: <Navigate to="/home/general" replace />,
          },
          {
            path: 'general',
            element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
          },
          {
            path: 'algorithm',
            element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
          },
          {
            path: 'psychology',
            element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
          },
          {
            path: 'aiplus',
            element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
          },
        ],
      },
      {
        path: 'course-center/:category',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/CourseCenter'))} />,
      },
      {
        path: 'user',
        loader: protectedLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/user'))} />,
      },
      {
        path: 'manage',
        loader: tokenLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/manage'))} />,
      },
      {
        path: 'file/:id?',
        loader: protectedLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/file'))} />,
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
    ]
  },
  {
    path: '*',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/notFound'))} />,
  },
];

export default routes;
