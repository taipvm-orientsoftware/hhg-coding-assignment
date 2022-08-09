export default function MenuCss(): JSX.Element {
  return (
    <div id="css-menu" className="css-menu-page">
      <a href=" #">
        <div className="css-menu-page__container">
          <div className="css-menu-page__header">
            <h1 className="css-menu-page__heading">CSS Menu Challenge</h1>
          </div>
          <div className="css-menu-page__wrapper">
            <div id="show-menu" />
            <a className="toggle-menu__btn" href="#show-menu">
              &#9776;
            </a>
            <a className="toggle-menu__btn toggle-menu__btn--hidden" href=" #">
              &#9776;
            </a>
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
      </a>
    </div>
  );
}
