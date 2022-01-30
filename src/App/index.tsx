import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from '../routes';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.name}
            path={route.path}
            exact={route.isExact}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}
