import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { Employee, MenuCss } from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="employees" />
        },
        {
          path: 'employees',
          element: <Employee />
        },
        {
          path: 'menu-css',
          element: <MenuCss />
        }
      ]
    }
  ]);
}
