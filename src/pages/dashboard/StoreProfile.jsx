import React, { useEffect, useState } from 'react'
import Inputs from '../../components/form/Inputs'
import { FaMoneyCheck, FaSignal, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import LoadingBar from '../../components/LoadingBar';

const StoreProfile = () => {
    const nav = useNavigate();

    const [token, setToken] = useState("")


    const [loading, setLoading] = useState(false);
    const [responseErr, setResponseErr] = useState("");
    const [isBackErr, setIsBackErr] = useState(false);

    const [userData, setUserData] = useState({});

    const [responseMsg, setResponseMsg] = useState("");

    const [isUserComplete, setIsuserComplete] = useState(false);


    // states for form inputs 
    const [formInputs, setFromInputs] = useState({
        fullname: userData && userData.fullname ? userData.fullname : "",
        businessname: userData && userData.fullname ? userData.fullname : "",
        businessaddress: userData && userData.fullname ? userData.fullname : "",
        description: userData && userData.fullname ? userData.fullname : "",
        jezzcash: userData && userData.fullname ? userData.fullname : "", easypisanumber: userData && userData.easypisanumber ? userData.easypisanumber : "",
        email: userData && userData.fullname ? userData.fullname : "",
        phone: userData && userData.fullname ? userData.fullname : ""
    })
    const [chenged, setChanged] = useState(false);


    const handleChangeInputs = e => {
        setChanged(true);
        setFromInputs({ ...formInputs, [e.target.name]: e.target.value })
    }






    const checkingInformations = async (token) => {



        setLoading(true)
        try {
            // const reqAndResponse = await (await fetch(`http://localhost:4000/api/auth/checkprofile/`, {
            const reqAndResponse = await (await fetch(`https://ghkhata.cyclic.app/api/auth/checkprofile/`, {
                method: "GET",
                headers: { "content-type": "application/json", token }
            })).json();

            
            setLoading(false)

            if (reqAndResponse.success) {
                setUserData(reqAndResponse.userData)
                setFromInputs({
                    fullname: reqAndResponse.userData.fullname,
                    email: reqAndResponse.userData.email,
                    cnic: reqAndResponse.userData.cnic,
                    phone: reqAndResponse.userData.phone,
                    businessname: reqAndResponse.userData.businessname,
                    businessaddress: reqAndResponse.userData.businessaddress,
                    description: reqAndResponse.userData.description,
                    jezzcash: reqAndResponse.userData.jezzcash,
                    easypisanumber: reqAndResponse.userData.easypisanumber

                })
                if (reqAndResponse.userData.verified) {
                    setIsuserComplete(true);
                    setResponseMsg("You profile has been completed..")
                }
                else {
                    setIsuserComplete(false)
                }
            }
            else {
                setIsBackErr(true);
                setResponseErr(reqAndResponse.message);
            }




        } catch (error) {
            setLoading(false)
            setIsBackErr(true);
            setResponseErr("SOME ERROR OCCURED PLEASE TRY AGAIN LATER")
        }
    }




    useEffect(() => {
        if (localStorage.getItem("ghkathatoken")) {
            checkingInformations(localStorage.getItem("ghkathatoken"))
            setToken(localStorage.getItem("ghkathatoken"))
        }
        else {
            nav("/login")
        }
        // eslint-disable-next-line
    }, [])



    const [formResponseErrorMsg, setFormResponseErrorMsg] = useState("");
    const [isformRespErr, setIsformRespErr] = useState(false);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [submitFormRes, setSubmitFormRes] = useState("");

    const submitUpdatForm = async e => {
        e.preventDefault();
        try {
            setFormSubmitLoading(true);
            setChanged(false);

            // calling to api 
            // const reqAndRes = await (await fetch(`http://localhost:4000/api/auth/updateuserinfo`, {
            const reqAndRes = await (await fetch(`https://ghkhata.cyclic.app/api/auth/updateuserinfo`, {
                method: "PUT",
                headers: { "content-type": "application/json", token: token },
                body: JSON.stringify({
                    ...formInputs,
                    cnic: userData && userData.cnic
                })
            })).json();
        
            setFormSubmitLoading(false)
            if (reqAndRes.success) {
                setSubmitFormRes("Updated sucessfully..")
                setIsformRespErr(false)
                checkingInformations(token)
            }
            else {
                setIsformRespErr(false)
            }


        } catch (error) {
            setFormSubmitLoading(false);
            setIsformRespErr(true)
            setFormResponseErrorMsg("Some Error Occurec Please Try Again later")
        }
    }





    return (
        <main className='edit-katha-main store-profile'>
            <div className="container store-container">
                <h1> Complete Your Business  Profile </h1> <br />
                <p>click on the info text to enable edit mode </p>
                <br />
                {
                    loading ? <LoadingBar /> :
                        isBackErr ? <h1 style={{ margin: "2rem auto", color: "red" }}>{responseErr}</h1> :
                            <form onSubmit={submitUpdatForm}>
                                <div className="profile-input-container">
                                    <h2> <FaSignal color={"darkgreen"} />  Enter your business info </h2>
                                    <div className="profile-inputs">
                                        <Inputs type={'text'} name={'businessname'} ph={'Business name'} classname={'businessName'} val={formInputs.businessname} onchange={handleChangeInputs} />
                                        <Inputs type={'text'} name={'description'} ph={'Business description'} classname={'businessDesc'} val={formInputs.description} onchange={handleChangeInputs} />
                                        <Inputs type={'text'} name={'businessaddress'} ph={'Business Address'} classname={'businessDesc'} val={formInputs.businessaddress} onchange={handleChangeInputs} />
                                    </div>
                                </div>

                                <div className="profile-input-container">
                                    <br />
                                    <h2> <FaUser color={"darkgreen"} /> Your Info </h2>
                                    <div className="profile-inputs" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div className="input-block-profile " style={{ width: "45%" }}>
                                            <Inputs type={'text'} name={'fullname'} ph={'Fullname'} classname={'businessDesc'} val={formInputs.fullname} onchange={handleChangeInputs} />
                                        </div>
                                        <div className="input-block-profile " style={{ width: "45%" }}>
                                            <Inputs type={'email'} name={'email'} ph={'Email'} classname={'businessDesc'} val={formInputs.email} onchange={handleChangeInputs} />
                                        </div>
                                    </div>
                                    <div className="profile-inputs" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div className="input-block-profile " style={{ width: "45%" }}>
                                            <Inputs type={'text'} name={'phone'} ph={'Phone'} classname={'businessDesc'} val={formInputs.phone} onchange={handleChangeInputs} />
                                        </div>
                                        <div className="input-block-profile " style={{ width: "45%" }}>
                                            <Inputs type={'text'} ph={'CNIC'} name={'cnic'} disable={true} onchange={() => { alert("You cannot change this input") }} classname={'businessDesc cnicinpt'} val={userData && userData.cnic ? userData.cnic : ""} />
                                        </div>
                                    </div>
                                </div>


                                <br /><br />

                                <div className="profile-input-container">
                                    <br />
                                    <h2> <FaMoneyCheck color={"darkgreen"} />  Payment Info </h2>
                                    <div className="profile-inputs" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div className="input-block-profile " style={{ width: "45%" }}>
                                            <Inputs type={'text'} ph={'Jezz cash number '} name={'jezzcash'} classname={'businessDesc'} val={formInputs.jezzcash} onchange={handleChangeInputs} />
                                        </div>
                                        <div className="input-block-profile " style={{ width: "45%" }}>
                                            <Inputs type={'text'} ph={'Easy pisa number '} name={'easypisanumber'} classname={'businessDesc'} val={formInputs.easypisanumber} onchange={handleChangeInputs} />
                                        </div>
                                    </div>

                                </div>





                                <br />
                                <button type="submit" className="btn" style={{ margin: "1rem auto", width: "50%", display: "block" }} disabled={chenged ? false : true}>Update</button>
                                <br />
                                {formSubmitLoading ? <LoadingBar /> : ""}
                                {isformRespErr ? <h3 style={{ 'color': "red" }}>{formResponseErrorMsg}</h3> : ""}
                            </form>
                }
            </div>
        </main>
    )
}

export default StoreProfile
