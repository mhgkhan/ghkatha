import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCircleNotch } from 'react-icons/fa'
import Inputs from '../components/form/Inputs'

const Signup = () => {

  const nav = useNavigate()

  const [formData, setFormData] = useState({ cnic: "", password: "", confirmpassword: "" })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [valid, setValid] = useState(false)


  const changeInputVal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitForm = async e => {
    e.preventDefault();
    if (formData.cnic.length < 5 || formData.password.length < 5 || formData.confirmpassword.length < 5) {
      setValid(false);
      setResponse("Please enter valid data")
    }
    else {

      if (formData.password === formData.confirmpassword) {



        try {
          setLoading(true)
          // const reqRes = await (await fetch("https://ant-robe.cyclic.app/api/auth/signup", {
          // const reqRes = await (await fetch("http://localhost:4000/api/auth/signup", {
          const reqRes = await (await fetch("https://ghkhata.cyclic.app/api/auth/signup", {
            method: "POST",
            headers: { "content-type": "application/json" },
            // body: JSON.stringify({
            //   cnic: formData.cnic, phone: formData.phone, email: formData.email, password: formData.password, confirmpassword: formData.confirmpassword
            // })
            body: JSON.stringify({
              cnic: formData.cnic, password: formData.password, confirmpassword: formData.confirmpassword
            })
          })).json();
          console.log(reqRes)

          setLoading(false)
          if (reqRes.success) {
            localStorage.setItem("ghkathatoken", reqRes.token);
            setValid(true);
            setResponse(reqRes.message)
            setTimeout(() => {
              nav("/profile")
            }, 1000);
          }
          else {
            setValid(false);
            setResponse(reqRes.message)
          }



        } catch (error) {
          setValid(false);
          setLoading(false);
          // console.log(error)
          setResponse("Some error occured please try later..")
        }


      }
      else {
        setValid(false)
        setResponse("confirm password not matching..")
      }

    }
  }

  return (
    <main>
      <section className="intro">
        <div className="container">

          <h1>SIGNUP TO CREATE YOUR ACCOUNT </h1>
          <p>One you complete to fill this form you will be able to submit your form for creating your  <b>Katha</b> </p>
        </div>
      </section>

      <section className="form" onSubmit={submitForm}>
        <form>
          <div className="form-area container">
            <Inputs type={'text'} name={'cnic'} required={true} ph={'Enter your cnic'} minl={'11'} onchange={changeInputVal} val={formData.cnic} disable={loading ? loading : false} />
            {/* <Inputs type={'text'} name={'phone'} required={true} ph={'Enter your phone'} minl={'11'} onchange={changeInputVal} val={formData.phone} disable={loading ? loading : false} />
            <Inputs type={'email'} name={'email'} required={true} ph={'Enter your email'} minl={'11'} onchange={changeInputVal} val={formData.email} disable={loading ? loading : false} /> */}
            <Inputs type={'password'} name={'password'} required={true} ph={'Enter password'} minl={6} onchange={changeInputVal} val={formData.password} disable={loading ? loading : false} />
            <Inputs type={'password'} name={'confirmpassword'} required={true} ph={'Confirm password'} minl={6} onchange={changeInputVal} val={formData.confirmpassword} disable={loading ? loading : false} />
            <button disabled={loading ? loading : false}>{loading ? <>Loading... <FaCircleNotch /></> : "Create"}</button>
          </div>
          <br /><br />
          <h4 align="center" style={{ color: valid ? "green" : "red" }}>{response}</h4>
        </form>
        <br />
        <br />
        <p align="center" >Already have an account  <Link to={'/login'}>Login Now </Link> </p>
      </section>

    </main>
  )
}

export default Signup
