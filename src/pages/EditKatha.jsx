import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
import Inputs from '../components/form/Inputs';


const EditKatha = () => {

    // const [authenticated, setAuthenticated] = useState(false);
    const nav = useNavigate()
    const params = useParams();
    const { kathaid } = params;



    const [kathaInfo, setKathaInfo] = useState({});
    const [kahtaDataResponseError, setKahtaDataResponseError] = useState("");
    const [isKathaResponseErr, setiskathaResposneErr] = useState(false);
    const [kathaInfoLoading, setKathaInfoLoading] = useState(false)



    const [userToken, setUserToken] = useState("");


    const [kathaInputs, setKathaInputs] = useState({
        fullname: "", fathername: "", phone: "", cnic: "", area: "", address: ""
    })

    const [submitFormLoading, setFormSubmitLoading] = useState(false);
    const [isChange,setIsChange] = useState(false);

    const [submitFormResponseErr,setAubmitFormResponseErr] = useState(false);
    const [submitFormResponseMsg, setSubmitFormResponseMsg] = useState("");





    const fetchKathaInfo = async (tok, kathaid) => {
        try {
            setKathaInfoLoading(true)
            const reqAndRes = await (await fetch(`https://ghkhata.cyclic.app/api/kathaoperations/katha/${kathaid}`, {
                method: "GET",
                headers: { "content-type": "application/json", token: tok }
            })).json();
            setKathaInfoLoading(false)
            console.log(reqAndRes);

            if (reqAndRes.success) {
                setKathaInfo(reqAndRes.info);
                setiskathaResposneErr(false);
                setKathaInputs({
                    fullname: reqAndRes.info.fullname,
                    fathername: reqAndRes.info.fathername,
                    phone: reqAndRes.info.phone,
                    cnic: reqAndRes.info.cnic,
                    address: reqAndRes.info.address,
                    area: reqAndRes.info.area
                })
            }
            else {
                setiskathaResposneErr(true);
                setKahtaDataResponseError(reqAndRes.message)
            }

        } catch (error) {
            console.log(error)
            setiskathaResposneErr(true);
            setKahtaDataResponseError("SOME ERROR OCCURED PLEASE COME AGAIN...")
        }
    }

    useEffect(() => {
        // console.log(localStorage.getItem("ghkathatoken"))
        if (localStorage.getItem("ghkathatoken"))
            setUserToken(localStorage.getItem("ghkathatoken"))
        else {
            localStorage.clear();
            nav("/login")
        }

        // setKathaInfoLoading(true)
        // setTimeout(() => {
        fetchKathaInfo(localStorage.getItem("ghkathatoken"), kathaid);
        // }, 2000);
        console.log(kathaInputs)

        // eslint-disable-next-line
    }, [])


    const changeInputs = e =>{
        setKathaInputs({ ...kathaInputs, [e.target.name]: e.target.value });
        setIsChange(true)
    }

    const submitUpdateKathaEditInfoForm = async e => {
        e.preventDefault();
        console.log(kathaInputs)

        try {
            // calling to api 
            setFormSubmitLoading(true);
            const reqAndRes = await (await fetch(`https://ghkhata.cyclic.app/api/kathaoperations/edit/katha/${kathaid}`, {
                method: "PUT",
                headers: { "content-type": "application/json", token: userToken },
                body: JSON.stringify({
                    ...kathaInputs
                })
            })).json();
            setFormSubmitLoading(false)
            // console.log(reqAndRes)
            if(reqAndRes.success){
                setAubmitFormResponseErr(false);
                setSubmitFormResponseMsg(reqAndRes.message);
                fetchKathaInfo(userToken,kathaid);
            }
            else{
                setAubmitFormResponseErr(true)
                setSubmitFormResponseMsg(reqAndRes.message);
            }
            
        } catch (error) {
            setAubmitFormResponseErr(true)
            setFormSubmitLoading(false);
            setSubmitFormResponseMsg("Some Error Occured Please Try Again")
        }

        setTimeout(() => {
            setAubmitFormResponseErr(false);
            setSubmitFormResponseMsg("");
            setFormSubmitLoading(false)
            setIsChange(false)
        }, 3000);
        

    }


    return (
        <main className='edit-katha-main'>
            <div className="container">
                <button className='btn' style={{background:"red",color:"white"}} onClick={(()=>{nav(`/katha/${kathaid}`)})}>back</button>
                <br />
                <br />
                {
                    kathaInfoLoading ? <LoadingBar />
                        :

                        isKathaResponseErr ? <h1 style={{ color: "red" }}>{kahtaDataResponseError}</h1>
                            :
                            <>
                                <header className='edit-katha-header'>
                                    <h1>Edit {kathaInfo && kathaInfo.fullname} Katha </h1>
                                    <p> <b style={{ color: "red" }}>Only</b> You have acces to update the {kathaInfo && kathaInfo.fullname} Katha information...  </p>
                                    <p><b>NOTE</b>: &nbsp; Please fill the information correct!.</p>
                                </header>

                            </>

                }

                <div className="editKathaForm">

                    <form onSubmit={submitUpdateKathaEditInfoForm} style={{ width: "100%" }}>
                        <div className="inputBlock">
                            <span>Full name</span> <br />
                            <Inputs name={'fullname'} ph={kathaInputs.fullname} type={'text'} val={kathaInputs.fullname} disable={submitFormLoading ? true : false} onchange={changeInputs} minl={2} required={true} />
                        </div>

                        <div className="inputBlock">
                            <span>Father name</span> <br />
                            <Inputs name={'fathername'} ph={kathaInputs.fathername} type={'text'} val={kathaInputs.fathername} disable={submitFormLoading ? true : false} onchange={changeInputs} minl={2} required={true} />
                        </div>

                        <div className="inputBlock">
                            <span>Phone</span> <br />
                            <Inputs name={'phone'} ph={kathaInputs.phone} type={'text'} val={kathaInputs.phone} disable={submitFormLoading ? true : false} onchange={changeInputs} minl={2} required={true} />
                        </div>

                        <div className="inputBlock">
                            <span>CNIC</span> <br />
                            <Inputs name={'cnic'} ph={kathaInputs.cnic} type={'text'} val={kathaInputs.cnic} disable={submitFormLoading ? true : false} onchange={changeInputs} minl={2} required={true} />
                        </div>

                        <div className="inputBlock">
                            <span>Area</span> <br />
                            <Inputs name={'area'} ph={kathaInputs.area} type={'text'} val={kathaInputs.area} disable={submitFormLoading ? true : false} onchange={changeInputs} minl={2} required={true} />
                        </div>

                        <div className="inputBlock">
                            <span>Full Address </span> <br />
                            <textarea name="address" id="addresss" cols="30" rows="10" value={kathaInputs.address} disabled={submitFormLoading ? true : false} onChange={changeInputs} placeholder="Full Address"></textarea>
                        </div>

                    {
                        isChange?   <div className="flex" style={{display:"flex",gap:"10px"}}>
                        <button className="btn" type='submit' disabled={submitFormLoading?true:false}>Update now </button>
                         {submitFormLoading?<LoadingBar /> :""}
                        </div>:""
                    }
                      <br /><br />
                         {
                            <h3 style={{color:submitFormResponseErr?"red":"green"}}>{submitFormResponseMsg}</h3>
                         }
                    </form>




                </div>

            </div>
        </main>
    )
}

export default EditKatha
