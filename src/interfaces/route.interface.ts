export interface IRoute {
  name: string;
  path: string;
  isExact?: boolean;
  component(props: any): JSX.Element;
  routes?: IRoute[];
}
