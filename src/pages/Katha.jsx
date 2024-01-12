import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCalendar, FaDollarSign, FaFlag, FaLocationArrow, FaPhone, FaSave, FaUser } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import Inputs from '../components/form/Inputs'

const Katha = () => {

  const nav = useNavigate()

  const params = useParams();
  const { kathaid } = params
  console.log(kathaid)


  const [openedSidebar, setOpenedSidebar] = useState(true);
  const [mobilSize, setMobileSize] = useState(false);

  const [openBill, SetOpenBill] = useState(false)



  // for bill 
  const [allBillData, setAllBillData] = useState([
  ])

  // for bill inputs 
  const [bilInputs, setBillInputs] = useState({
    itemname: "",
    itemqty: "",
    itemprice: ""
  })

  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0)


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

  const openClosesidebarFun = () => setOpenedSidebar(!openedSidebar)


  const delKathaAction = () => {
    let openconfirm = prompt("Are you sure Delete this katha: \t\t\n if sure type 'yes' else cancel it.")
    if (openconfirm === "yes") {
      console.log("katha is deleted")
      nav("/")
    }
    else {
      console.log("katha is not been deleted..")
    }
  }











  const changeBillInputs = (e) => {
    setBillInputs({ ...bilInputs, [e.target.name]: e.target.value })
  }

  const submitBillForm = (e) => {
    e.preventDefault();
    if (bilInputs.itemname.length < 1 || bilInputs.itemprice.length < 1 || bilInputs.itemqty.length < 1) {
      return alert(`Please Enter some values then submit..`)
    }
    else {
      setAllBillData([...allBillData, {
        serial: counter,
        itemName: bilInputs.itemname,
        itemPrice: bilInputs.itemprice,
        itemQty: bilInputs.itemqty
      }]);
      setCounter(counter + 1);
      let ttl = 0;
      for (let i = 0; i< allBillData.length; i++) {
        ttl = ttl + parseFloat(allBillData[i].itemPrice * allBillData[i].itemQty)
      }
      setTotal(ttl)
      setBillInputs({ itemname: "", itemprice: "", itemqty: "" })
    }
  }

  const clearForm = () => {
    setBillInputs({ itemname: "", itemprice: "", itemqty: "" })
  }

  const delBillRow = (counter) => {
    alert("Please wait for this feature soon.")
  }

  const editBillRow = () => {

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
              <h2>Instructions</h2>
              <br />
              <ul className='newBillinstruction'>
                <li>First Add data into in first row then you able to create or add new row using click on plus button.</li>
                <li>If you want to delete any row click on the minus button (-) button and note if the row is first you will no able to delete it.</li>
                <li>Do leave any cell empty because you will no able to insert new row.</li>
                <li>If you final your bill then click on the finilize button to finle it.</li>
              </ul>
              <br /><br />

              <form onSubmit={submitBillForm}>
                <table>
                  <thead>
                    <tr>
                      <th>S#</th>
                      <th>Product Description</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th colSpan={2}>Actions</th>
                    </tr>
                  </thead>


                  <tbody> <tr>
                    <td>1</td>
                    <td>
                      <Inputs type={'text'} name={'itemname'} required={true} ph={'Product name'} onchange={changeBillInputs} val={bilInputs.itemname} />
                    </td>
                    <td className='smalTdinput'>
                      <Inputs type={'number'} name={'itemqty'} required={true} ph={'Qty'} onchange={changeBillInputs} val={bilInputs.itemqty} />
                    </td>
                    <td className='smalTdinput'>
                      <Inputs type={'number'} name={'itemprice'} required={true} ph={'Rate'} onchange={changeBillInputs} val={bilInputs.itemprice} />
                    </td>
                    <td>
                      {parseInt(bilInputs.itemprice * bilInputs.itemqty)}
                    </td>
                    <td><button type='reset' onClick={clearForm} title='Clear'>-</button></td>
                    <td><button type='submit' title='add'>+</button></td>
                  </tr>


                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan={2}>Total Items</td>
                      <td>{allBillData.length}</td>
                      <td>Amount</td>
                      <td>
                        {total}
                      </td>
                      <td colSpan={2}><button type='button'>Finalize</button></td>
                    </tr>
                  </tfoot>

                </table>
              </form>




              <br /><br />
              <br />
              <h3>Bill Data </h3>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>S#</th>
                    <th>Product Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th colSpan={2}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allBillData.map(row => {
                    return <tr key={row.serial}>
                      <td>{row.serial + 1}</td>
                      <td>{row.itemName}</td>
                      <td className='smalTdinput'>
                        {row.itemQty}
                      </td>
                      <td className='smalTdinput'>
                        {row.itemPrice}
                      </td>
                      <td>{parseInt(row.itemPrice * row.itemQty)}</td>
                      <td><button onClick={() => delBillRow(row.serial)}>📝</button></td>
                      <td><button onClick={() => editBillRow(row.serial)}>🗑️</button></td>
                    </tr>
                  })}

                </tbody>


              </table>
            </div>


          </div>
        </div>
      </header>

    </main>
  )
}

export default Katha
