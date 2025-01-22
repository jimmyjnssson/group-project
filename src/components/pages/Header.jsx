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
    <div className="flex justify-between items-center p-10 text-aliceblue bg-gradient-to-r from-[#004F2D] via-[#3CB371] to-[#8FD694]">
      {/* Drawer Toggle - only show if the drawer is closed */}
      {!isDrawerOpen && (
        <div className="menu-toggle cursor-pointer" onClick={openDrawer}>
          <span className="block w-6 h-1 bg-white mb-1"></span>
          <span className="block w-6 h-1 bg-white mb-1"></span>
          <span className="block w-6 h-1 bg-white"></span>
        </div>
      )}

      {/* Logo - Centered */}
      <div className="flex-grow text-center">
        <img src={gg_logo} className="mx-auto h-28" alt="Logo" />
      </div>

      {/* User Info (Credits, Username, Logout) */}
      <div className="flex items-center space-x-4">
        {fakeUser ? (
          <div className="text-right font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <h1 className="text-sm font-bold">Welcome, {fakeUser.email}!</h1> {/* Make username bold */}
            <p className="text-xs font-bold">Your credits: {fakeUser.credits}</p> {/* Make credits bold */}
            <button
              onClick={logout}
              className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded-md transition-all duration-500 ease-in-out hover:bg-gray-700 mt-4">
              Logout
            </button>
          </div>
        ) : (
          <h1 className="text-sm"></h1> // Empty when user is not logged in
        )}
      </div>

      {/* Navigation Drawer */}
      <nav className={`drawer ${isDrawerOpen ? 'open' : ''}`} id="drawer">
        <button className="menu-close" id="menu-close" onClick={closeDrawer}>
          X
        </button>
        <ul className="bg-gray-200 text-gray-800 font-sans rounded-lg shadow-md">
          <li>
            <Link to="/home" className="menu-item py-3 px-4 block hover:bg-gray-300 leading-loose" onClick={closeDrawer}>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/mma" className="menu-item py-3 px-4 block hover:bg-gray-300 leading-loose" onClick={closeDrawer}>
              <span>MMA</span>
            </Link>
          </li>
          <li>
            <Link to="/page3" className="menu-item py-3 px-4 block hover:bg-gray-300 leading-loose" onClick={closeDrawer}>
              <span>Hockey</span>
            </Link>
          </li>
          <li>
            <Link to="/page4" className="menu-item py-3 px-4 block hover:bg-gray-300 leading-loose" onClick={closeDrawer}>
              <span>Formula 1</span>
            </Link>
          </li>
          <li>
            <Link to="/page5" className="menu-item py-3 px-4 block hover:bg-gray-300 leading-loose" onClick={closeDrawer}>
              <span>Football</span>
            </Link>
          </li>
        </ul>
      </nav>

      {isDrawerOpen && <div className="overlay" onClick={closeDrawer}></div>}
    </div>
  );
}