import { useRoutes } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { CssMenu, Employee } from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'employee',
          element: <Employee />,
          index: true
        },
        {
          path: 'css-menu',
          element: <CssMenu />
        }
      ]
    }
  ]);
}
