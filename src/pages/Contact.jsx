import React, { useEffect, useState } from 'react'
import MemberProfile from '../components/cards/MemberProfile'
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import PageLink from '../components/cards/PageLink'
import ContactusForm from '../components/form/ContactusForm'
import MapFrame from '../components/MapFrame'


const Contact = () => {

  const [userToken, setUserToken] = useState("");
  const [noToken, setnoToken] = useState(false)

  useEffect(() => {
    // localStorage.getItem("ghkathatoken") ? token = localStorage.getItem("ghkathatoken") : nav("/login");
    if (localStorage.getItem("ghkathatoken")) {
      setnoToken(true)
      setUserToken(localStorage.getItem("ghkathatoken"))
    }
    else {
      setnoToken(false);
      
    }

    // eslint-disable-next-line
  }, [])

  return (
    <main>
      <section className="intro">
        <div className="container">
          <h1>Contact us </h1>
          <p>Here in in this page avaliable all team members, official contact links, social media accounts, and contact form with map . <br /> Free feel for contactus.</p>
        </div>
      </section>


      <section className='intro'>
        <div className="container">
          <h2>Our Team Members </h2>
          <p>Here is all members that are work on this website.</p>


          <div className="team-members">


            <MemberProfile imgPath={'/author-1.png'} name={`Hasnain GHAZNAA'S`} disg={'AUTHOR'} insta={'https://instagram.com/mhgkhan'} tw={'https://twitter.com/mhgkhan'} fb={'https://facebook.com/mhghazna'} gh={'https://github.com/mhgkhan'} />
            <MemberProfile imgPath={'/author-1.png'} name={`Hasnain GHAZNAA'S`} disg={'DESIGNER'} insta={'https://instagram.com/mhgkhan'} tw={'https://twitter.com/mhgkhan'} fb={'https://facebook.com/mhghazna'} gh={'https://github.com/mhgkhan'} />
            <MemberProfile imgPath={'/author-1.png'} name={`Hasnain GHAZNAA'S`} disg={'DEVELOPER'} insta={'https://instagram.com/mhgkhan'} tw={'https://twitter.com/mhgkhan'} fb={'https://facebook.com/mhghazna'} gh={'https://github.com/mhgkhan'} />


          </div>


        </div>
      </section>


      <section className="intro officialpages">
        <div className="container">
          <h2>Official Social Media Pages </h2>
          <p>All our offical social media pages link are given blow</p>

          <div className="pages_links">

            <PageLink iconname={<FaFacebook />} color={'darkblue'} link={'https://facebook.com/mhghazna'} />
            <PageLink iconname={<FaTwitter />} color={'blue'} link={'https://twitter.com/mhgkhan'} />
            <PageLink iconname={<FaGithub />} color={'black'} link={'https://github.com/mhgkhan'} />
            <PageLink iconname={<FaWhatsapp />} color={'green'} link={'https://wa.me/+923251857693'} />
            <PageLink iconname={<FaLinkedin />} color={'blue'} link={'https://telegram.com/mhgkhan'} />
            <PageLink iconname={<FaTiktok />} color={'black'} link={'https://tiktok.com/mhgkhan'} />
            <PageLink iconname={<FaGoogle />} color={'green'} link={'muhammadhasnainghazna@gmaii.com'} />
            <PageLink iconname={<FaYoutube />} color={'red'} link={'https://youtube.com/@commingsoonghaznachannel'} />

          </div>
        </div>
      </section>

      <section className="contactusform intro">
        <div className="container">

          <h2>Leave your message </h2>
          <p>Free feel to Leave your message, advise, comment, review or problem we will replay you soon.</p>

          <ContactusForm token={userToken} notoken={noToken} />


        </div>
      </section>

      <section className="map intro">
        <div className="container">
          <h2>Welcome To my office</h2>
          <br />

          <MapFrame />
        </div>
      </section>


    </main>
  )
}

export default Contact
