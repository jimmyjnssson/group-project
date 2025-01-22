import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import '../styles/Header.css';
import gg_logo from '../images/gg_logo_low.png';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fakeUser, setFakeUser] = useState(null);
  const navigate = useNavigate();

  // Open Drawer
  const openDrawer = () => setIsDrawerOpen(true);

  // Close Drawer
  const closeDrawer = () => setIsDrawerOpen(false);

  // Logout Function
  const logout = () => {
    auth.signOut()
      .then(() => {
        console.log("User signed out");
        localStorage.removeItem("fakeUser"); // Clear user data from localStorage
        setFakeUser(null); // Clear user state
        navigate("/"); // Redirect to login page
        window.location.reload();
      })
      .catch((error) => console.error("Error signing out:", error));
  };

  // Load Fake User Data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("fakeUser"));
    if (storedUser) {
      setFakeUser(storedUser); // Set user data to state if found
    }
  }, []);

  return (
    <div className="header">
      <div className="menu-toggle" id="menu-toggle" onClick={openDrawer}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src={gg_logo} className="logo" alt="Logo" />
      <p>Green Group Odds</p>

      <div className="user-info">
        {fakeUser ? (
          <div>
            <h1>Welcome, {fakeUser.email}!</h1>
            <p>Your credits: {fakeUser.credits}</p>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <h1> </h1> // Show loading if no user data is found
        )}
      </div>

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
