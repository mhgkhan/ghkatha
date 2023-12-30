import React, { useState } from 'react'
import Inputs from '../components/form/Inputs'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const nav = useNavigate();

  const [formData, setFormData] = useState({ cnic: "", password: "" })
  const [response, setResponse] = useState("")
  const [valid, setValid] = useState(false)


  const changeInputVal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitForm = e => {
    e.preventDefault();
    console.log(formData)

    localStorage.setItem("user-auth-token", JSON.stringify(formData))



    setResponse("Logged Success..")
    setValid(true)
    setTimeout(() => {
      setResponse("");
      setFormData({ cnic: "", password: "", cpassword: "" })
    }, 3000);
    nav("/")
  }


  return (
    <main>
      <section className="intro">
        <div className="container">

          <h1>LOGIN TO ACCESS YOUR ACCOUNT </h1>
          <p>Please enter your valid credintials to complete your authentication Easy. </p>
        </div>
      </section>

      <section className="form" onSubmit={submitForm}>
        <form>
          <div className="form-area container">
            <Inputs type={'text'} name={'cnic'} required={true} ph={'Enter your cnic'} minl={'11'} onchange={changeInputVal} val={formData.cnic} />
            <Inputs type={'password'} name={'password'} required={true} ph={'Enter password'} minl={6} onchange={changeInputVal} val={formData.password} />
            <button>Enter</button>
          </div>
          <br /><br />
          <h4 align="center" style={{ color: valid ? "green" : "red" }}>{response}</h4>
        </form>
        <br />
        <br />
        <p align="center" >Not have an account  <Link to={'/signup'}>Signup now  </Link> </p>
        <p align="center" >Forget your password  <Link to={'/signup'}>Reset now </Link> </p>
      </section>
    </main>
  )
}

export default Login
