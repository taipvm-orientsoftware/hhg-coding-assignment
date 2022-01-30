import { IRoute } from '../interfaces';
import { CssMenu, Employee, Home } from '../pages';

const routes: IRoute[] = [
  {
    name: 'Home',
    path: '/',
    isExact: true,
    component: Home,
  },
  {
    name: 'Employee',
    path: '/employees',
    component: Employee,
  },
  {
    name: 'CssMenu',
    path: '/css-menu',
    component: CssMenu,
  },
];

export default routes;
