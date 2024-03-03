import React, { useState } from 'react'
import Inputs from '../components/form/Inputs'
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleNotch } from 'react-icons/fa'

const Login = () => {

  const nav = useNavigate();

  const [formData, setFormData] = useState({ cnic: "", password: "" })
  const [response, setResponse] = useState("")
  const [valid, setValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const changeInputVal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitForm = async e => {
    e.preventDefault();
    if (formData.cnic.length < 5 || formData.password.length < 5) return false
    else {

      try {
        setLoading(true)
        // const request = await (await fetch("https://ant-robe.cyclic.app/api/auth/signin", {
        const request = await (await fetch("http://localhost:4000/api/auth/signin", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ cnic: formData.cnic, password: formData.password })
        })).json();


        setLoading(false)
        if (request.success) {
          setValid(true)
          setResponse(request.message);
          localStorage.setItem("ghkathatoken", request.token);
          setTimeout(() => {
            if (request.verified) {
              nav("/")
            }
            else {
              nav("/profile")
            }
          }, 1000);
        }
        else { setValid(false); setResponse(request.message); localStorage.clear(); }


      } catch (error) {
        setValid(false);
        setLoading(false)
        setResponse("SOME ERROR OCCURED TRY AGAIN PLEASE..");
        localStorage.clear();
      }


    }
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
            <Inputs type={'text'} name={'cnic'} required={true} ph={'Enter your cnic'} minl={'11'} onchange={changeInputVal} val={formData.cnic} disable={loading ? loading : false} />
            <Inputs type={'password'} name={'password'} required={true} ph={'Enter password'} minl={6} onchange={changeInputVal} val={formData.password} disable={loading ? loading : false} />
            <button disabled={loading ? loading : false}>{loading ? <>Loading ... <FaCircleNotch /> </> : "Login"}</button>
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
