import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCalendar, FaDollarSign, FaFlag, FaLocationArrow, FaPhone, FaSave, FaUser } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
const Katha = () => {

  const nav = useNavigate()

  const params = useParams();
  const { kathaid } = params
  console.log(kathaid)


  const [openedSidebar, setOpenedSidebar] = useState(true);
  const [mobilSize, setMobileSize] = useState(false);

  const [openBill, SetOpenBill] = useState(false)


  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileSize(true)
      setOpenedSidebar(false)
    }
    else {
      setMobileSize(false)
      setOpenedSidebar(true)
    }
  }, [])


  const openSidebarStyle = {
    position: mobilSize ? "absolute" : "static",
    width: "auto",
    transform: "translateX(0px)",
    padding: "10px",
    borderRadius: "0px 0px 30px 30px",
    boxShadow: "4px 7px 18px darkgray",
  }
  const closeSidebarStyle = {
    position: "absolute",
    width: "0px",
    transform: "translateX(-200vw)",
    padding: "0px",
    boxShadow: "0px 0px 0px transparent"
  }


  const billStyling = {
    transform: openBill ? "translateY(0px)" : "translateY(-200vh)",
  }

  const openClosesidebarFun = () => {
    setOpenedSidebar(!openedSidebar)
  }


  const delKathaAction = () => {
    let openconfirm = prompt("Are you sure Delete this katha: \t\t\n if sure type \'yes\' else cancel it.")
    if (openconfirm === "yes") {
      console.log("katha is deleted")
      nav("/")
    }
    else {
      console.log("katha is not been deleted..")
    }
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
          <div className="katha-actions" style={{ padding: "10px" }}>
            <header>
              <div className='katha-action-buttons'>
                <button onClick={openClosesidebarFun}>{openedSidebar ? "Close" : "Open"} menu</button>
                <button onClick={() => SetOpenBill(!openBill)}>New Bill</button>
                <button style={{ background: 'red', color: "white" }} onClick={delKathaAction} >Delete Katha</button>
              </div>
            </header>

            <br />
            <section className="katha-action-btns">
              <h3>Options</h3>
              <div className="katha-action-buttons">
                <button>Edit katha </button>
                <button>Wasool Money</button>
              </div>
            </section>


            <br />
            <section className='katha-activity-log'>
              <h3>Activity log list </h3>
              <br />

              <table style={{ width: '100%', borderRadius: "5px" }}>
                <thead>
                  <tr>
                    <th>S#</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Wasool</th>
                    <th>Bakya</th>
                    <th>Open</th>
                  </tr>
                </thead>


                <tbody>
                  {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((ele, index) => {
                    return <tr>
                      <td>{index + 1}</td>
                      <td className='nowr'>{new Date(Date.now()).toLocaleDateString()} <br /> {new Date(Date.now()).toLocaleTimeString()}</td>
                      <td>Rs {55000 * index}</td>
                      <td>Rs {5000 * index}</td>
                      <td>Rs 0</td>
                      <td><button>OPEN</button></td>
                    </tr>
                  })}
                </tbody>


              </table>
            </section>


            <div className="new-bill-start" style={billStyling}>
              <span className='closeBill' onClick={() => SetOpenBill(!openBill)}><GrClose /></span>
            </div>


          </div>
        </div>
      </header>

    </main>
  )
}

export default Katha
