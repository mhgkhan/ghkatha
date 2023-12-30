import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Inputs from '../components/form/Inputs'

const Signup = () => {

  const nav = useNavigate()

  const [formData, setFormData] = useState({ cnic: "", password: "", cpassword: "" })
  const [response, setResponse] = useState("")
  const [valid, setValid] = useState(false)


  const changeInputVal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitForm = e => {
    e.preventDefault();
    console.log(formData)
    if (formData.password === formData.cpassword) {
      localStorage.setItem("user-auth-token", JSON.stringify(formData))
      setResponse("Account created..")
      setValid(true)
      nav("/")
    }
    else {
      setValid(false)
      setResponse("confirm password not matching..")
    }

    setTimeout(() => {
      setResponse("");
      setFormData({ cnic: "", password: "", cpassword: "" })
    }, 3000);
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
            <Inputs type={'text'} name={'cnic'} required={true} ph={'Enter your cnic'} minl={'11'} onchange={changeInputVal} val={formData.cnic} />
            <Inputs type={'password'} name={'password'} required={true} ph={'Enter password'} minl={6} onchange={changeInputVal} val={formData.password} />
            <Inputs type={'password'} name={'cpassword'} required={true} ph={'Confirm password'} minl={6} onchange={changeInputVal} val={formData.cpassword} />
            <button>Create</button>
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
