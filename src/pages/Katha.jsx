import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCalendar, FaDollarSign, FaFlag, FaLocationArrow, FaPhone, FaSave, FaUser } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
const Katha = () => {

  const params = useParams();
  const { kathaid } = params
  console.log(kathaid)


  const [openedSidebar, setOpenedSidebar] = useState(true);
  const [mobilSize, setMobileSize] = useState(false);


  useEffect(() => {
    setMobileSize(window.innerWidth < 600 ? true : false)
  }, [])


  const openSidebarStyle = {
    position: mobilSize ? "absolute" : "static",
    width: "auto",
    transform: "translteX(0px)",
    padding: "10px",
    borderRadius: "0px 0px 30px 30px",
    boxShadow: "4px 7px 18px darkgray",
  }
  const closeSidebarStyle = {
    position: "absolute",
    width: "0px",
    transform: "translteX(-200vw)",
    padding: "0px",
    boxShadow: "0px 0px 0px transparent"
  }


  const openClosesidebarFun = () => {
    setOpenedSidebar(!openedSidebar)
  }

  return (
    <main>

      <header className='info-customer'>
        <div className="container">
          <div className="user-info" style={openedSidebar ? openSidebarStyle : closeSidebarStyle}>
            {mobilSize ? <span style={{ float: "right", fontSize: "1.5rem", cursor: "pointer" }} onClick={openClosesidebarFun}><GrClose /></span> : ""}

            <div className="imgWithnameandId">
              <div className="img-customer">
                <img src="/author-1.png" alt="the customer pic" />
              </div>
              <div className="nameandid-customer">
                <h4>21202 1512793 5</h4>
                <h2>Muhammad Hasnain </h2>
              </div>
            </div>


            <div className="about-customer">

              <div className="customer-info-block">
                <span><FaPhone /></span>
                <h3>+92 325 1857693</h3>
              </div>
              <div className="customer-info-block">
                <span className='notr'><FaUser /></span>
                <h3>father name</h3>
              </div>
              <div className="customer-info-block">
                <span className='notr'><FaLocationArrow /></span>
                <h3>Jamrud  </h3>
              </div>
              <div className="customer-info-block">
                <span className='notr'><FaFlag /></span>
                <h3>Surkamr jamrud district khyber  </h3>
              </div>

              <br />
              <h2>Account info</h2>

              <div className="customer-info-block">
                <span className='notr'><FaSave /></span>
                <h3>Verified </h3>
              </div>

              <div className="customer-info-block">
                <span className='notr'><FaCalendar /></span>
                <h3>12/12/2023 </h3>
              </div>

              <div className="customer-info-block">
                <span className='notr'><FaDollarSign /></span>
                <h3>23,000,000 </h3>
              </div>




            </div>


          </div>
          <div className="katha-actions">
            <header>
              <div className='katha-action-buttons'>
                <button onClick={openClosesidebarFun}>{openedSidebar ? "Close" : "Open"} menu</button>
                <button>New Bill</button>
                <button>Delete Katha</button>
              </div>
            </header>
            <section className="info">
              <p style={{ padding: "20px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus delectus similique sequi quos, perspiciatis, soluta a suscipit totam hic iure vero fugit id nisi quia laudantium illum alias deleniti odio fugiat corporis enim esse commodi eligendi quasi. Dolor quo culpa, id a perspiciatis quis impedit laudantium? Sunt earum modi recusandae pariatur nulla porro enim sapiente omnis at quas eligendi ab voluptates vero, sed possimus iusto accusantium aliquid magnam! Voluptas quis pariatur minus vel quae, delectus ut, animi culpa error minima dignissimos ex! Voluptatum eligendi aliquid veritatis eveniet fugit aspernatur unde? Dolore magnam obcaecati in neque id veritatis perferendis facilis velit magni. Tenetur autem animi distinctio veniam beatae consequuntur repellendus, laboriosam explicabo ratione et, sapiente ipsa ducimus voluptas. Ipsam, nemo! Officia vitae atque blanditiis totam consequuntur aliquam ullam quidem doloribus in consectetur magni commodi, ab debitis dolorum nemo quod nisi! Facilis nobis ducimus asperiores veritatis totam. Neque aliquam quisquam vero totam voluptates nisi consectetur repellendus id, aut officia. Porro distinctio aspernatur adipisci fugit fuga, illum mollitia repellat quaerat ea quos, excepturi quae praesentium tempora facere, aut quam eos ipsa velit. Cupiditate magnam tempora, rerum a quam doloribus, possimus sunt sint dolorem molestias dolore voluptate similique tempore aliquid quisquam sapiente nobis animi praesentium iste esse facilis placeat ducimus perspiciatis. Rem facilis voluptatem nihil quibusdam modi? Rem pariatur cum numquam blanditiis, sunt, fugit molestiae suscipit nisi debitis reprehenderit molestias maxime exercitationem laborum. Corrupti, atque? Praesentium similique a necessitatibus amet reiciendis facere esse, consequuntur beatae dolore ipsam labore corrupti excepturi non hic vero id mollitia at, voluptate aliquid commodi deleniti iure perferendis blanditiis ipsum! Perspiciatis ipsum, illum ipsam explicabo quibusdam pariatur, aliquid unde atque voluptates fuga repellat, laudantium id enim sequi dolores? Maiores debitis, cum quod quisquam, aperiam animi totam, a architecto obcaecati natus dicta tempora nulla quo doloribus. Provident eos ratione dolor. Veritatis molestias, pariatur magni obcaecati recusandae inventore dolor! Dolorum neque labore fugit at optio. Ipsum iusto expedita mollitia officia eius, exercitationem amet temporibus? Ea impedit quaerat mollitia, libero iure debitis, accusamus magni voluptates veniam numquam fuga, laborum sed reiciendis cum. Eaque expedita sint eius perferendis cum soluta fuga blanditiis ea? Veritatis sed maiores officiis ipsam eveniet distinctio, quos voluptates beatae, nihil hic excepturi similique at. Modi, culpa? Ipsum nostrum accusamus saepe iusto temporibus repudiandae suscipit modi earum recusandae sit consequuntur ducimus culpa tempora natus nemo vitae repellat ipsa, veniam atque nisi quaerat quibusdam. Ullam voluptatum nostrum quasi adipisci laboriosam cupiditate recusandae.</p>
            </section>
          </div>
        </div>
      </header>

    </main>
  )
}

export default Katha
