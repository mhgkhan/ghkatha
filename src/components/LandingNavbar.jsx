import React from 'react'
import { Link } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

const LandingNavbar = () => {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="this website logo" />
      </div>
      <div className="button-toggle-navbar"><FaAlignJustify /></div>
      <nav>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/signup">SIGNUP</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><a href="https://github.com/mhgkhan/ghkatha">GITHUB</a></li>
        </ul>
      </nav>

    </header>
  )
}

export default LandingNavbar
