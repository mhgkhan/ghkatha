import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigtion = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token") && localStorage.getItem("auth-token").length > 30) {
      console.log("user is authorize")
    }
    else {
      navigtion("/signup")
    }
  }, [])

  return (
    <main>
      <section className='intro'>
        <div className="container">
          <h1>GHAZNAA'S <br />
            WE ARE BUILDING AN APP FOR OUR STORE
            <br />
            comming soon <br />
            This website is under the construction </h1>
        </div>
      </section>
    </main>
  )
}

export default Home
