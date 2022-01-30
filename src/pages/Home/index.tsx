import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function Home(): JSX.Element {
  return (
    <div id="home" className="home-page">
      <div className="home-page__container">
        <h1 className="home-page__heading">HHG Coding Assignment</h1>
        <div className="home-page__wrapper">
          <Button size="large" shape="round">
            <Link to="/css-menu">Css Menu Challenge</Link>
          </Button>
          <Button size="large" shape="round">
            <Link to="/employees">Employee Management Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
