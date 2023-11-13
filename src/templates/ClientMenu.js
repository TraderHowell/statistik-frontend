import { NavLink } from "react-router-dom";

export default function ClientMenu() {
  return (
      <div id="topnav" className="menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'button active' : 'button inactive')}><span>&#10229;</span></NavLink>
        <NavLink to="/client-dashboard" className={({ isActive }) => (isActive ? 'button active' : 'button inactive')}>Dashboard</NavLink>
        <NavLink to="/client-streams" className={({ isActive }) => (isActive ? 'button active' : 'button inactive')}>Streams</NavLink>
        <NavLink to="/client-settings" className={({ isActive }) => (isActive ? 'button active' : 'button inactive')}>Settings</NavLink>
      </div>
  );
}