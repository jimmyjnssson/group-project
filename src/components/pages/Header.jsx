import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Header.css';
import gg_logo from '../images/gg_logo_low.png'

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Open Drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Close Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="header">
      <div className="menu-toggle" id="menu-toggle" onClick={openDrawer}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src={gg_logo} className="logo" alt="Merkier Portrait" />
      <p>Green Group Odds</p>


      <nav className={`drawer ${isDrawerOpen ? 'open' : ''}`} id="drawer">
        <button className="menu-close" id="menu-close" onClick={closeDrawer}>
          X
        </button>
        <ul>
          <li>
            <Link to="/home" className="menu-item" onClick={closeDrawer}>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/mma" className="menu-item" onClick={closeDrawer}>
              <span>MMA-ODDS</span>
            </Link>
          </li>
          <li>
            <Link to="/page3" className="menu-item" onClick={closeDrawer}>
              <span>Page 3</span>
            </Link>
          </li>
          <li>
            <Link to="/page4" className="menu-item" onClick={closeDrawer}>
              <span>Page 4</span>
            </Link>
          </li>
          <li>
            <Link to="/page5" className="menu-item" onClick={closeDrawer}>
              <span>Page 5</span>
            </Link>
          </li>
        </ul>
      </nav>

      {isDrawerOpen && <div className="overlay" onClick={closeDrawer}></div>}
    </div>

  );
}
