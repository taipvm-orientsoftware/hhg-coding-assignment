import { useRoutes } from 'react-router-dom';

import { CssMenu, Employee, Home } from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/employees',
      element: <Employee />,
    },
    {
      path: '/css-menu',
      element: <CssMenu />,
    },
  ]);
}
