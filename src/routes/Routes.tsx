import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { EmployeeManagement, MenuCss } from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="employee-management" />
        },
        {
          path: 'employee-management',
          element: <EmployeeManagement />
        },
        {
          path: 'menu-css',
          element: <MenuCss />
        }
      ]
    }
  ]);
}
