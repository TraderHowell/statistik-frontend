import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="container">
        <NavLink to="/">
            <img id="logo" src={logo} alt="StatisTik"/>
        </NavLink>
    </header>
  );
}

export default Header;