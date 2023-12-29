import React, { useState } from 'react'
import Inputs from './Inputs'


const ContactusForm = () => {


    const [inputs, setInputs] = useState({
        fullname: "",
        country: "",
        email: "",
        phone: "",
        message: ""
    })

    const [response, setResponse] = useState("")



    const changeInputVal = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    const submitForm = (e) => {
        e.preventDefault();
        setResponse("Thanks for contactus ")
        setInputs({
            fullname: "", country: "", email: "", phone: "", message: ""
        })

        setTimeout(() => {
            setResponse("")
        }, 3000);
    }


    return (
        <form onSubmit={submitForm}>

            <div className="parent-inputs">
                <div className="fullname child-input">
                    <Inputs type={'text'} name={'fullname'} required={true} ph={'Fullname'} minl={'2'} onchange={changeInputVal} val={inputs.fullname} />
                </div>
                <div className="country child-input">
                    <Inputs type={'text'} name={'country'} required={true} ph={'Country'} minl={'2'} onchange={changeInputVal} val={inputs.country} />
                </div>
            </div>

            <div className="parent-inputs">
                <div className="email child-input">
                    <Inputs type={'email'} name={'email'} required={true} ph={'Email'} minl={'5'} onchange={changeInputVal} val={inputs.email} />
                </div>
                <div className="phone child-input">
                    <Inputs type={'text'} name={'phone'} required={true} ph={'Phone'} minl={'2'} onchange={changeInputVal} val={inputs.phone} />
                </div>
            </div>

            <div className="parent-inputs">
                <textarea name='message' required cols="30" rows="10" placeholder='Enter your message here..' value={inputs.message} onChange={changeInputVal} ></textarea>
            </div>


            <button type='sibmit'>Submit </button>


            {response.length < 1 ? "" : <h3 style={{ marginTop: '10px', color: "green" }}>{response}</h3>}

        </form>
    )
}

export default ContactusForm
