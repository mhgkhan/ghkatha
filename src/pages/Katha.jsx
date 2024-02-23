import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCalendar, FaFlag, FaGenderless, FaLocationArrow, FaPhone, FaUser } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import Inputs from '../components/form/Inputs'
import LoadingBar from '../components/LoadingBar'
// import WrongOpener from '../components/errors/WrongOpener'

const Katha = () => {

  const nav = useNavigate()

  const params = useParams();
  const { kathaid } = params
  // console.log(kathaid) 

  const [openedSidebar, setOpenedSidebar] = useState(false);
  const [mobilSize, setMobileSize] = useState(false);

  const [openBill, SetOpenBill] = useState(false);


  const [userData, setuserData] = useState({});
  const [responseTotalSell, setResponseTotalSell] = useState(0)
  // eslint-disable-next-line
  const [responseTotalBakya, setResponseTotalBakya] = useState(0)


  const [uerToken, setUserToken] = useState("")


  const [finizeResponse, setFinizeResponse] = useState("");
  const [finizelzeResponseStatus, setFinizeResponseStatus] = useState(true);
  const [loading, setLoading] = useState(false)



  // for bill 
  const [allBillData, setAllBillData] = useState([
  ])

  // for bill inputs 
  const [bilInputs, setBillInputs] = useState({
    itemname: "",
    itemqty: "",
    itemprice: "",
  })

  const [counter, setCounter] = useState(0);


  const [openFinalBillOption, setOpenFinalBiollOptions] = useState(false);
  const [total, setTotal] = useState(0);


  const [finilizeInput, setFinilizeInput] = useState(0)



  const [responseKathasHistoryList, setResponseKathasHistoryList] = useState([]);
  // eslint-disable-next-line
  const [responseHistoryMsg, setResponseHistoryMsg] = useState("");
  // eslint-disable-next-line
  const [responseHistoryStatus, setResponseHistoryStatus] = useState(true);
  const [responseHistoryLoading, SetresponseHistoryLoading] = useState(false);



  const [delKathaResponsse, setDelKathaResponse] = useState("");
  // eslint-disable-next-line
  const [delKathaErrorStatus, setDelKathaErrorStatus] = useState(false);
  // eslint-disable-next-line
  const [delKathaLoaing, setDelKathaLoading] = useState(false);


  const [lastUpdated,setLastUdpated] = useState("")


  const fetchThisKathaInfo = async (id, tok) => {
    try {
      // const reqAndRes = await (await fetch(`https://ant-robe.cyclic.app/api/kathaoperations/katha/${id}`, {
      const reqAndRes = await (await fetch(`http://localhost:4000/api/kathaoperations/katha/${id}`, {
        method: "GET",
        headers: { "content-type": "application/json", token: tok }
      })).json();
      // console.log(reqAndRes);
      if (reqAndRes.success) {
        setuserData(reqAndRes.info);
        setResponseTotalBakya(reqAndRes.totalBakya)
        setResponseTotalSell(reqAndRes.totalSell);
        setLastUdpated(reqAndRes.lastUpdate)
        fetchKathaHistory(id, tok);
      }
      else nav("/")
    } catch (error) {
      localStorage.clear();
      nav("/");
    }
  }

  const fetchKathaHistory = async (id, tok) => {
    try {
      SetresponseHistoryLoading(true)
      // const reqAndRes = await (await fetch(`https://ant-robe.cyclic.app/api/get/gethistory/${id}/`, {
      const reqAndRes = await (await fetch(`http://localhost:4000/api/get/gethistory/${id}/`, {
        method: "GET",
        headers: { 'content-type': "application/json", token: tok }
      })).json();
      // console.log("the fetch katha history response is ", fetchKathaHistory)
      SetresponseHistoryLoading(false)

      if (reqAndRes.success) {
        // console.log(reqAndRes);
        setResponseKathasHistoryList(reqAndRes.historyKathas)
      }
      else {
        setResponseHistoryStatus(false)
        setResponseHistoryMsg(reqAndRes.message);

      }


    } catch (error) {
      SetresponseHistoryLoading(false)
      setResponseHistoryStatus(false)
      setResponseHistoryMsg("Some Error Occured Please Try again later.");
    }
  }

  useEffect(() => {
    let token;
    // localStorage.getItem("ghkathatoken") ? token = localStorage.getItem("ghkathatoken") : nav("/login");
    if (localStorage.getItem("ghkathatoken")) {
      token = localStorage.getItem("ghkathatoken");
      setUserToken(localStorage.getItem("ghkathatoken"))


      if (window.innerWidth < 600) {
        setMobileSize(true)
        setOpenedSidebar(false)
      }
      else {
        setMobileSize(false)
        setOpenedSidebar(false)
      }

      fetchThisKathaInfo(kathaid, token)
    }
    else {
      localStorage.clear();
      nav("/login")
    }

    // eslint-disable-next-line
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


  const delKathaAction = async (id, token) => {
    let openconfirm = prompt("Are you sure Delete this katha: \t\t\n if sure type 'yes' else cancel it.")
    if (openconfirm === "yes") {
      // console.log("katha is deleted")
      // nav("/")

      try {
        // const reqAndRes = await (await fetch(`https://ant-robe.cyclic.app/api/kathaoperations/del/katha/${id}`, {
        const reqAndRes = await (await fetch(`http://localhost:4000/api/kathaoperations/del/katha/${id}`, {
          method: "DELETE",
          headers: { 'content-type': "application/json", token }
        })).json();

        // console.log(reqAndRes);


        if (reqAndRes.success) {
          setDelKathaErrorStatus(false)
          setDelKathaResponse("Katha has been deleted...");
          alert(`${delKathaResponsse}`)
          setTimeout(() => nav("/"), 1500);
        }
        else {
          setDelKathaErrorStatus(true)
          setDelKathaResponse("Some Error Occured..");
          alert(`${delKathaResponsse}`)
        }


      } catch (error) {
        setLoading(false)
        setDelKathaErrorStatus(true);
        setDelKathaResponse("Some Error Occured Please Try again later..")
        alert(`${delKathaResponsse}`)
      }


    }
    else {
      console.log("katha is not been deleted..")
    }
  }











  const changeBillInputs = (e) => {setBillInputs({ ...bilInputs, [e.target.name]: e.target.value })}

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
        itemQty: bilInputs.itemqty,
        amount: parseInt(bilInputs.itemprice * bilInputs.itemqty)
      }]);
      setTotal(total + parseInt(bilInputs.itemprice * bilInputs.itemqty))
      setCounter(counter + 1);
      setBillInputs({ itemname: "", itemprice: "", itemqty: "" })
    }
  }

  const clearForm = () => {setBillInputs({ itemname: "", itemprice: "", itemqty: "" })}

  const delBillRow = (counter) => {alert("Please wait for this feature soon.")}

  const editBillRow = () => {alert("Please wait for this feature son.")}


  const finilizeBill = () => setOpenFinalBiollOptions(!openFinalBillOption);


  const submitAndClearBill = async () => {
    if (Number.parseInt(finilizeInput) > total) {
      alert("Please check the vlaue you entered are correct ? ")
    }
    else if (Number.parseInt(finilizeInput) < 1) {
      alert("Please check again you enter incorrect value")
    }
    else {
      // alert("your bill is been submitted successfully.... ");

      try {
        setLoading(true)
        // const reqAndRes = await (await fetch("https://ant-robe.cyclic.app/api/kathaoperations/addnewbill/", {
        const reqAndRes = await (await fetch("http://localhost:4000/api/kathaoperations/addnewbill/", {
          method: "POST",
          headers: { 'content-type': "application/json", token: uerToken },
          body: JSON.stringify({
            allBillData,
            total,
            wasool: parseInt(finilizeInput),
            netTotal: parseInt(total) - parseInt(finilizeInput),
            kathaid
          })
        })).json();

        setLoading(false)
        if (reqAndRes.success) {
          setFinizeResponseStatus(true)
          setFinizeResponse("Bill created and submitted sucessfully....")
          fetchThisKathaInfo(kathaid, uerToken)
          setTimeout(() => {
            setAllBillData([]);
            setBillInputs({ itemname: "", itemprice: "", itemqty: "" });
            setFinilizeInput("");
            setTotal(0)
            SetOpenBill(!openBill);
            setFinizeResponse("")
          }, 2000);
        }
        else {
          setFinizeResponseStatus(false)
          setFinizeResponse(reqAndRes.message)
        }
      } catch (error) {
        setLoading(false)
        setFinizeResponseStatus(false);
        setFinizeResponse("Some Error Occured Please Try again later....")
      }


    }
    // console.log('submit are calling..')
  }



  return (
    <main style={{ filter: delKathaLoaing ? "blur(10px)" : "none" }}>

      <header className='info-customer'>
        <div className="container">
          <div className="user-info" style={openedSidebar ? openSidebarStyle : closeSidebarStyle}>
            {mobilSize ? <span style={{ float: "right", fontSize: "1.5rem", cursor: "pointer" }} onClick={openClosesidebarFun}><GrClose /></span> : ""}

            <div className="imgWithnameandId">
              <div className="img-customer">
                <img src="/userimg.png" alt="the customer pic" />
              </div>
              <div className="nameandid-customer">
                <h4>{userData && userData.cnic ? userData.cnic : "cnic"}</h4>
                <h2>{userData && userData.fullname ? userData.fullname : "username"}</h2>
              </div>
            </div>


            <div className="about-customer">

              <div className="customer-info-block">
                <span><FaPhone /></span>
                <h3>{userData && userData.phone ? userData.phone : "03123456768"}</h3>
              </div>
              <div className="customer-info-block">
                <span className='notr'><FaUser /></span>
                <h3>{userData && userData.fathername ? userData.fathername : "father"}</h3>
              </div>
              <div className="customer-info-block">
                <span className='notr'><FaLocationArrow /></span>
                <h3>{userData && userData.area ? userData.area : "area"}  </h3>
              </div>
              <div className="customer-info-block">
                <span className='notr'><FaFlag /></span>
                <h3>{userData && userData.address ? userData.address.substring(0, 50) : "address"}  </h3>
              </div>
              {/* 
              <br />
              <h2>Account info</h2>

              <div className="customer-info-block">
                <span className='notr'><FaSave /></span>
                <h3>Verified </h3>
              </div>

              <div className="customer-info-block">
                <span className='notr'><FaCalendar /></span>
                <h3>{userData && userData.updateAt ? userData.updateAt : new Date(Date.now()).toLocaleDateString()}</h3>
              </div>

              <div className="customer-info-block">
                <span className='notr'><FaDollarSign /></span>
                <h3>{responseTotalSell && responseTotalSell}</h3>
              </div> */}

              <br />
              <h3>Author</h3>
              <div className="customer-info-block">
                <span className='notr'><FaGenderless /></span>
                <h3>{userData && userData.author ? userData.author : "Author"}</h3>
              </div>



            </div>


          </div>
          <div className="katha-actions" style={{ padding: "10px" }}>
            <button onClick={openClosesidebarFun}>{openedSidebar ? "Close" : "Open"} menu</button>
            <section className='katha-status'>
              {/* <h3>Katha Status </h3>
              <br /><br /> */}
              <div className="katha-status-blocks">
                <div className="katha-status-block">
                  <h4>$ Total Cell</h4>
                  <h2>{responseTotalSell && responseTotalSell}</h2>
                </div>


                <div className="katha-status-block">
                  <h4>$ Bakaya </h4>
                  <h2>{responseTotalBakya && responseTotalBakya?responseTotalBakya:0}</h2>
                </div>


                <div className="katha-status-block">
                  <h4><span className='notr'><FaCalendar /></span> Updated On</h4>
                  <h2>{lastUpdated.length>1 ?  new Date(lastUpdated).toLocaleDateString(): new Date(Date.now()).toLocaleDateString()}</h2>
                </div>


              </div>
            </section>
            <br />


            <header style={{ borderBottom: "2px dotted purple" }}>
              <div className='katha-action-buttons katha-header-buttons'>
                <button style={{ background: 'red', color: "white" }} onClick={e => nav("/")} >Back</button>
                <button onClick={() => SetOpenBill(!openBill)}>New Bill</button>
                <button onClick={(()=>nav(`/edit/katha/${userData._id}`))}>Edit </button>
                {/* <button>Wasool</button> */}
                <button style={{ background: 'red', color: "white" }} onClick={() => delKathaAction(kathaid, uerToken)} >Delete</button>
              </div>
            </header>

            <br />
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
                  {
                    responseHistoryLoading ? <LoadingBar /> : responseKathasHistoryList && responseKathasHistoryList.length < 1 ? <>
                      <tr>
                        <td colSpan={6}>
                          <h2 align='centere'>You have no submitted any billl</h2>
                        </td>
                      </tr>
                    </>
                      : responseKathasHistoryList && responseKathasHistoryList.map((ele, index) => {
                        return <tr>
                          <td>{index + 1}</td>
                          <td className='nowr'>{new Date(ele.createdAt).toLocaleDateString()} <br /> {new Date(ele.createdAt).toLocaleTimeString()}</td>
                          <td>{ele.products_total_money}</td>
                          <td>{ele.products_wasool_money}</td>
                          <td>{ele.products_bakya_money}</td>
                          <td><button onClick={()=>nav(`/kathahistory/bill/${ele._id}`)}>OPEN</button></td>
                        </tr>
                      })
                  }
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
                      <Inputs disable={loading ? true : false} type={'text'} name={'itemname'} required={true} ph={'Product name'} onchange={changeBillInputs} val={bilInputs.itemname} />
                    </td>
                    <td className='smalTdinput'>
                      <Inputs disable={loading ? true : false} type={'number'} name={'itemqty'} required={true} ph={'Qty'} onchange={changeBillInputs} val={bilInputs.itemqty} />
                    </td>
                    <td className='smalTdinput'>
                      <Inputs disable={loading ? true : false} type={'number'} name={'itemprice'} required={true} ph={'$Rate'} onchange={changeBillInputs} val={bilInputs.itemprice} />
                    </td>
                    <td>
                      ${parseInt(bilInputs.itemprice * bilInputs.itemqty)}
                    </td>
                    <td><button type='reset' onClick={clearForm} title='Clear'>-</button></td>
                    <td><button type='submit' title='add' >+</button></td>
                  </tr>


                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan={2}>Total Items</td>
                      <td>{allBillData.length}</td>
                      <td>Amount</td>
                      <td>
                        ${total}
                      </td>
                      <td colSpan={2}><button className='finalBtns' type='button' onClick={finilizeBill} >{openFinalBillOption ? "UNDO" : 'Fanilize'}</button></td>
                    </tr>
                  </tfoot>

                </table>
              </form>


              {
                openFinalBillOption ?
                  <>
                    <br />
                    <table>
                      <thead>
                        <tr>
                          <td>Total Amount </td>
                          <td>Wasool amount </td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${total}</td>
                          <td><Inputs disable={loading ? true : false} onchange={(e) => { setFinilizeInput(e.target.value) }} type={'number'} name={'finalInput'} ph={'Enter Amount '} /></td>
                          <td><button className='finalBtns' onClick={submitAndClearBill}  >Submit</button></td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <h3 align="center" style={{ color: finizelzeResponseStatus ? "white" : "red" }}>{finizeResponse.length < 1 ? "" : finizeResponse}</h3>
                  </>
                  : ""
              }




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
                        ${row.itemPrice}
                      </td>
                      <td>${row.amount}</td>
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
