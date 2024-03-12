import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
import { FaLocationArrow } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';

const Bill = () => {

  const [billData, setBillData] = useState({});
  const [kathaInfo, setKathaInfo] = useState({});
  const [kathaAuthorInfo, setKathaAuthorInfo] = useState({});
  const [isResError, setIsKathaError] = useState(false);
  const [errRes, setErrRes] = useState("");

  const [fetchBillLoading, setFetchbillLoading] = useState(false);

  const nav = useNavigate()

  const params = useParams();
  const { billid } = params;

  const fetchAllBilInfo = async (tok, billId) => {
    try {
      const reqAndRes = await (await fetch(`http://localhost:4000/api/bill/open/${billId}`, {
      // const reqAndRes = await (await fetch(`https://ghkhata.cyclic.app/api/bill/open/${billId}`, {
        method: "GET",
        headers: { 'content-type': "application/json", token: tok }
      })).json();
      console.log(reqAndRes)
      setFetchbillLoading(false)
      if (reqAndRes.success) {
        setIsKathaError(false);
        setErrRes("")
        setBillData(reqAndRes.billData);
        setKathaInfo(reqAndRes.kathaInfo);
        setKathaAuthorInfo(reqAndRes.kathaAuthorInfo)
      }
      else {
        setIsKathaError(true);
        setErrRes(reqAndRes.message)
      }

    } catch (error) {
      setFetchbillLoading(false);
      setIsKathaError(true);
      setErrRes("SOME ERROR OCCURED PLEASE TRY AGAIN")
    }
  }



  useEffect(() => {
    // let token;
    if (localStorage.getItem("ghkathatoken")) {
      fetchAllBilInfo(localStorage.getItem("ghkathatoken"), billid);

    }
    else {
      setIsKathaError(true)
      setErrRes("you need to singup first... Redirecting to home in 3 seconds.");
      setTimeout(() => {
        nav("/")
      }, 3000);
    }
    // eslint-disable-next-line
  }, [])


  return (
    <main className='edit-katha-main bill-main'>
      {fetchBillLoading ? <LoadingBar /> : <div className="container">
        {
          isResError ? <h3 style={{ color: "red" }}>{errRes}</h3>
            :
            <>
            <header style={{display:"flex", justifyContent:"space-between"}}>
              <button className="btn" onClick={(()=>window.history.back())}>Back</button><button className="btn" onClick={(()=>window.print())}>Print</button>
            </header>
              <h1 align='center'>{kathaAuthorInfo.businessname && kathaAuthorInfo.businessname?kathaAuthorInfo.businessname : "businessname"}</h1>
              <h4 align='center' style={{borderBottom:"2px dotted purple"}}>{kathaAuthorInfo.description && kathaAuthorInfo.description?kathaAuthorInfo.description : "description"}</h4>
              <br />
              <div className="datas" style={{ display: "flex", justifyContent: "space-between",  padding:"10px", borderRadius:"6px", flexWrap:"wrap" }}>
                <div className="propriterDetails">
                  <div className="details_block">
                    <span>Propriter </span>
                    <h4>{kathaAuthorInfo.fullname ? kathaAuthorInfo.fullname : "store id"}</h4>
                  </div>
                  <div className="details_block">
                    <span>Contact </span>
                    <h4>{kathaAuthorInfo.phone ? kathaAuthorInfo.phone : "00000000000"}</h4>
                  </div>
                  <div className="details_block">
                    <span>Email  </span>
                    <h4>{kathaAuthorInfo.email ? kathaAuthorInfo.email : "0101@0101.0101"}</h4>
                  </div>
                </div>
                <div className="customerDetails">
                <div className="details_block">
                    <span>Customer </span>
                    <h4>{kathaInfo.fullname ? kathaInfo.fullname : "c name"}</h4>
                  </div>
                <div className="details_block">
                    <span>Area </span>
                    <h4>{kathaInfo.area ? kathaInfo.area : "are name"}</h4>
                  </div>
                <div className="details_block">
                    <span>Phone </span>
                    <h4>{kathaInfo.phone ? kathaInfo.phone : "Phone"}</h4>
                  </div>
                </div>
              </div>

              <br />


              <h3>Products list </h3>
              <br />
              <table width={"100%"}>
                <thead>
                  <tr>
                    <th>S#</th>
                    <th>Product Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody style={{ textAlign: "center" }}>
                  {billData.products?.map(row => {
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
                    </tr>
                  })}

                </tbody>

                <tfoot style={{ textAlign: "center", fontWeight: "bolder" }}>
                 <tr>
                 <td>Total</td>
                  <td>{billData.products_total_money}</td>
                  <td>Wasool</td>
                  <td>{billData.products_wasool_money}</td>
                  <td> Bakya <br />
                    {billData.products_bakya_money}</td>
                 </tr>
                </tfoot>



              </table>

              <br />
              <div className="dates" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <div className="billdat">
                  <span>Bill Date</span>
                  <h4>{new Date(billData.createdAt).toLocaleDateString()}</h4>
                </div>
                <div className="billdat">
                  <span>Current Date</span>
                  <h4>{new Date(Date.now()).toLocaleDateString()}</h4>
                </div>
              </div>

              <br /><br />
              <div className="sign">
                <span>Signature : ____________________________</span>
              </div>

                  <br /><br />
                  <h4 style={{textAlign:"center", borderTop:"2px dotted purple"}}> <GrLocation /> {kathaAuthorInfo.businessaddress && kathaAuthorInfo.businessaddress?kathaAuthorInfo.businessaddress : "businessaddress"}</h4>

            </>
        }
      </div>}
    </main>
  )
}

export default Bill
