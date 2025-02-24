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
    children: [
      {
        path: '',
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: 'home',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/Home/index'))} />,
      },
      {
        path: ':labName/courses',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/CourseCenter'))} />,
      },
      {
        path: ':labName/courses/:courseId',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/CourseDetail'))} />,
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
      {
        path: '*',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/NotFound'))} />,
      },
    ]
  },
];

export default routes;
