import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import '../styles/Header.css';
import gg_logo from '../images/gg_logo_low.png';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fakeUser, setFakeUser] = useState(null);
  const navigate = useNavigate();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const logout = () => {
    auth.signOut()
      .then(() => {
        console.log("User signed out");
        localStorage.removeItem("fakeUser");
        setFakeUser(null);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.error("Error signing out:", error));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("fakeUser"));
    if (storedUser) {
      setFakeUser(storedUser);
    }
  }, []);

  return (
    
    <div className="relative p-10 text-aliceblue bg-gradient-to-r from-[#004F2D] via-[#3CB371] to-[#8FD694] font-sans"
    >
      {/* Hamburger menu icon (absolute so it doesn't push the center) */}
      {!isDrawerOpen && (
        <div
          className="absolute top-10 left-10 cursor-pointer"
          onClick={openDrawer}
        >
          <span className="block w-6 h-1 bg-black mb-1"></span>
          <span className="block w-6 h-1 bg-black mb-1"></span>
          <span className="block w-6 h-1 bg-black"></span>
        </div>
      )}

      <div className="flex justify-center">
        <img src={gg_logo} className="mx-auto h-28" alt="Logo" />
      </div>

      {/* User Info (absolutely positioned on the right so it does not affect the center) */}
      {fakeUser && (
        <div className="absolute top-10 right-10 text-right font-sans">
          <h1 className="text-sm font-bold">Welcome, {fakeUser.email}!</h1>
          <p className="text-xs font-bold">Your credits: {fakeUser.credits}</p>
          <button
            onClick={logout}
            className="bg-warning text-white px-3 py-1.5 text-sm rounded-md transition-all duration-500 ease-in-out hover:bg-gray-700 mt-4"
          >
            Logout
          </button>
        </div>
      )}

      <nav
        className={`drawer ${isDrawerOpen ? 'open' : ''}`}
        id="drawer"
        style={{ backgroundColor: '#F5FBF0', height: '100vh' }}
      >
        <button className="menu-close" id="menu-close" onClick={closeDrawer}>
          X
        </button>
        <ul className="text-[#004F2D] font-sans rounded-lg shadow-md p-4 h-full">
          {[
            { path: "/home", label: "Home" },
            { path: "/mma", label: "MMA" },
            { path: "/page3", label: "Hockey" },
            { path: "/page4", label: "Formula 1" },
            { path: "/page5", label: "Football" },
          ].map(({ path, label }) => (
            <li
              key={path}
              className="border-b border-[#004F2D] last:border-b-0"
            >
              <Link
                to={path}
                className="menu-item py-3 px-4 block transition-all duration-300 ease-in-out hover:bg-[#DDEFD0] hover:text-[#00331F] leading-loose"
                onClick={closeDrawer}
              >
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isDrawerOpen && <div className="overlay" onClick={closeDrawer}></div>}
    </div>
  );
}
