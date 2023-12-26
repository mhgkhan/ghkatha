import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

const LandingNavbar = () => {

  const [innerWidth, setinnerWidth] = useState(null)
  const [navOpen, setNavopen] = useState(false)


  useEffect(() => {
    if (window.innerWidth > 600) setinnerWidth(null)
    else setinnerWidth(true)
  }, [])





  return (
    <header>
      <div className="container">

        <div className="nav-top">
          <div className="logo">
            <img src="/logo.png" alt="this website logo" />
          </div>
          {
            innerWidth || innerWidth !== null ? <div className="button-toggle-navbar" onClick={() => setNavopen(!navOpen)}>{!navOpen ? <FaAlignJustify /> : <GrClose />}</div> : null
          }
        </div>

        <nav style={{height:innerWidth || innerWidth !== null ? navOpen ? "60vh" : "0px" : "auto"}}>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/signup">SIGNUP</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><a href="https://github.com/mhgkhan/ghkatha">GITHUB</a></li>
          </ul>
        </nav>


      </div>
    </header>
  )
}

export default LandingNavbar
