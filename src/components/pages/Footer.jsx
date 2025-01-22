import React from 'react'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import gg_logo from '../images/gg_logo_low.png'

export default function Footer() {
  return (
<footer class="header space-y-10 justify-center ">

<nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
    <Link to="/home" className="menu-item"><span>Home</span></Link>
    <Link to="/mma" className="menu-item" ><span>MMA-ODDS</span></Link>
    <Link to="/page3" className="menu-item"><span>About</span></Link>
    <Link to="/page4" className="menu-item"><span>Gallery</span></Link>
    <Link to="/page5" className="menu-item"><span>Contact</span></Link>
</nav>

<div class="flex justify-center space-x-5">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
    </a>
    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
    </a>
</div>
<p class="text-center text-gray-700 font-medium">&copy; 2025 GG Odds. All rights reservered.</p>
</footer>

  )
}
