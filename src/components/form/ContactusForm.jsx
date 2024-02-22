import React, { useState } from 'react'
import Inputs from './Inputs'
import { FaCircleNotch } from 'react-icons/fa'


const ContactusForm = ({ token, notoken }) => {


    const [inputs, setInputs] = useState({ fullname: "", country: "", email: "", phone: "", message: "" })

    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState("");
    const [vres, setVres] = useState(false);



    const changeInputVal = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value })


    const submitForm = async e => {
        e.preventDefault();

        setLoading(true);

        if (!notoken) {
            setLoading(false)
            setVres(false)
            setResponse("YOU NEED TO AUTHENTICATE PLEASE..")
        }
        else {
            try {
                setLoading(true)
                // calling to api to send the user contactus message data 
                // const requestAndResponse = await (await fetch("https://ant-robe.cyclic.app/api//extra/postcontactus/", {
                const requestAndResponse = await (await fetch("http://localhost:4000/api/extra/postcontactus/", {
                    method: "POST",
                    headers: { 'content-type': "application/json" },
                    body: JSON.stringify({
                        fullname: inputs.fullname,
                        country: inputs.country,
                        email: inputs.email,
                        phone: inputs.phone,
                        message: inputs.message
                    })
                })).json();

                setLoading(false)

                if (requestAndResponse.success) {
                    setVres(true)
                    setInputs({ fullname: "", phone: "", email: "", message: "", country: "" })
                    setResponse(requestAndResponse.message)
                    setTimeout(() => {
                        setResponse("")
                    }, 3000);
                }
                else {
                    setVres(false)
                    setResponse(requestAndResponse.message)
                };


            } catch (error) {
                setLoading(false);
                setVres(false)
                setResponse("SOME ERROR OCCURED PLEASE TRY AGAIN LATER");
            }
        }
    }


    return (
        <form onSubmit={submitForm}>

            <div className="parent-inputs">
                <div className="fullname child-input">
                    <Inputs type={'text'} name={'fullname'} required={true} ph={'Fullname'} minl={'2'} onchange={changeInputVal} val={inputs.fullname} disable={loading ? loading : false} />
                </div>
                <div className="country child-input">
                    <Inputs type={'text'} name={'country'} required={true} ph={'Country'} minl={'2'} onchange={changeInputVal} val={inputs.country} disable={loading ? loading : false} />
                </div>
            </div>

            <div className="parent-inputs">
                <div className="email child-input">
                    <Inputs type={'email'} name={'email'} required={true} ph={'Email'} minl={'5'} onchange={changeInputVal} val={inputs.email} disable={loading ? loading : false} />
                </div>
                <div className="phone child-input">
                    <Inputs type={'text'} name={'phone'} required={true} ph={'Phone'} minl={'2'} onchange={changeInputVal} val={inputs.phone} disable={loading ? loading : false} />
                </div>
            </div>

            <div className="parent-inputs">
                <textarea name='message' required cols="30" rows="10" placeholder='Enter your message here..' value={inputs.message} onChange={changeInputVal} disabled={loading ? loading : false} ></textarea>
            </div>


            <button type='sibmit' disabled={loading ? true : false}>{loading ? <>Loading ... <FaCircleNotch /></> : "Submit"} </button>


            {response ? <h3 style={{ marginTop: '10px', color: vres ? "green" : "red" }}>{loading ? "LOADING ..." : response}</h3> : ""}

        </form>
    )
}

export default ContactusForm
