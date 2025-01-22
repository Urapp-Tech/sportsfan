/* eslint-disable react-refresh/only-export-components */
import AppLayout from '@/layout/AppLayout';
import AuthLayout from '@/layout/AuthLayout';
import LayoutOutlet from '@/layout/LayoutOutlet';
import Login from '@/pages/auth/Login';
import EmployeeCabinHistory from '@/pages/employees/EmployeeCabinHistory';
import Employees from '@/pages/employees/Employees';
import PanelSetting from '@/pages/setting/panelSetting';
import SystemConfiguration from '@/pages/setting/systemConfiguration';
import Users from '@/pages/users/Users';
import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router';
import Otp from './pages/auth/Otp';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

export const routeObjects: RouteObject[] = [
  {
    path: '/',
    element: <LayoutOutlet />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: 'login',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            ),
          },

          {
            path: 'otp',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Otp />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'dashboard',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />,
          },
          {
            path: 'home',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                element: <Navigate to="admin-users" replace />,
              },
              {
                path: 'admin-users',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Users />
                  </Suspense>
                ),
              },
              {
                path: 'employees',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Employees />
                  </Suspense>
                ),
              },
              {
                path: 'employees/history',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EmployeeCabinHistory />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'setting',
            children: [
              {
                index: true,
                element: <Navigate to="panel-settings" replace />,
              },
              {
                path: 'panel-settings',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PanelSetting />
                  </Suspense>
                ),
              },
              {
                path: 'system-configuration',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <SystemConfiguration />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
];
