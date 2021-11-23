import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <header className="app__header">
      <hi className="app__title">
        <a href="#">
          <span>Marvel</span> Information portal
        </a>
      </hi>
      <nav className="app__menu">
        <ul>
          <li>
            <a href="#">Characters</a>
          </li>
          /
          <li>
            <a href="#">Comics</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;
