import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'


const LandingNavbar = () => {


  const location = useLocation()

  const [innerWidth, setinnerWidth] = useState(null)
  const [navOpen, setNavopen] = useState(false)


  useEffect(() => {
    setNavopen(false)
    if (window.innerWidth > 600) setinnerWidth(null);
    else setinnerWidth(true);
  }, [location.pathname])



  return (

    <header className='webheader'>
      <div className="container">

        {/* NAV-TOP  = WHEN ITS RESPONSIVE THE HEADER HAVE TO PARTS 1=LOGO AND TOGGLE NAV BUTTON 2=NAVBAR */}
        <div className="nav-top">
          <div className="logo">
            <img src="/logo.png" alt="this website logo" />
          </div>
          {
            innerWidth || innerWidth !== null ? <div className="button-toggle-navbar" onClick={() => setNavopen(!navOpen)}>{!navOpen ? <FaAlignJustify /> : <GrClose />}</div> : null
          }
        </div>


        {/* NAVBAR WHEN ANYONE IT OPEN IN THEIR PHONE THEY HEIGHT OF THIS NAVBAR IS 0PX BUT IN LAOPTOP OR ANY DESKTOP THE HEIGHT IS AUTO */}
        <nav style={{ height: innerWidth || innerWidth !== null ? navOpen ? "60vh" : "0px" : "auto" }}>
          <ul>
            <li><Link to="/" style={{ color: location.pathname === "/" ? "white" : "black", background: location.pathname === "/" ? "violet" : "none" }}>HOME</Link></li>
            <li><Link to="/signup" style={{ color: location.pathname === "/signup" ? "white" : "black", background: location.pathname === "/signup" ? "violet" : "none" }} >SIGNUP</Link></li>
            <li><Link to="/about" style={{ color: location.pathname === "/about" ? "white" : "black", background: location.pathname === "/about" ? "violet" : "none" }} >ABOUT</Link></li>
            <li><Link to="/contact" style={{ color: location.pathname === "/contact" ? "white" : "black", background: location.pathname === "/contact" ? "violet" : "none" }} >CONTACT</Link></li>
            <li><a href="https://github.com/mhgkhan/ghkatha">GITHUB</a></li>
          </ul>
        </nav>


      </div>
    </header>
  )
}

export default LandingNavbar
