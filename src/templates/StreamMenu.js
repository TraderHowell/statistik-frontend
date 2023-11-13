import { NavLink } from "react-router-dom";

export default function StreamMenu() {
  return (
      <div id="topnav" className="menu">
        <NavLink to="/client-streams" className={({ isActive }) => (isActive ? 'button active' : 'button inactive')}><span>&#10229;</span></NavLink>
      </div>
  );
}