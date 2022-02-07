import { GoBackButton } from '../../components';

export default function CssMenu(): JSX.Element {
  return (
    <div id="css-menu" className="css-menu-page">
      <div className="css-menu-page__container">
        <div className="css-menu-page__header">
          <GoBackButton />
          <h1 className="css-menu-page__heading">CSS Menu Challenge</h1>
        </div>
        <div className="css-menu-page__wrapper">
          {/* <div id="show-menu" />
          <a className="toggle-menu__btn" href="#show-menu">
            &#9776;
          </a>
          <a
            className="toggle-menu__btn toggle-menu__btn--hidden"
            href="#hide-menu"
          >
            &#9776;
          </a> */}

          <input type="checkbox" id="toggle-menu-control" />
          <label className="toggle-menu__btn" htmlFor="toggle-menu-control">
            &#9776;
          </label>
          <div className="toggle-menu">
            <ul className="toggle-menu__container">
              <li className="toggle-menu__item">
                <a href="/">1</a>
              </li>
              <li className="toggle-menu__item">
                <a href="/">2</a>
              </li>
              <li className="toggle-menu__item">
                <a href="/">3</a>
              </li>
              <li className="toggle-menu__item">
                <a href="/">4</a>
              </li>
              <li className="toggle-menu__item">
                <a href="/">5</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
