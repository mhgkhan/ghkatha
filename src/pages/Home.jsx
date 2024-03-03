import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Inputs from '../components/form/Inputs'
import { LuArrowUpDown } from "react-icons/lu";

import CreateKathaBox from '../components/dailogs/CreateKathaBox';
import LoadingBar from '../components/LoadingBar';

const Home = () => {

  const nav = useNavigate();
  const kathaRef = useRef();


  // eslint-disable-next-line
  const [cnic, setCnic] = useState("");
  const [error, setError] = useState(false)

  const [recieveKatha, setRecieveKathas] = useState([]);
  const [recieveKathaError, setRecieveKathaError] = useState("");
  const [token, setToken] = useState("")


  const [tempKathas, setTempKathas] = useState([])


  const [areas, setAreas] = useState([]);



  const [createKathaLoading, setCreateKathaLoading] = useState(false);
  const [createKathaRes, setCreateKathaRes] = useState("");




  const [openedCreateKatha, setOpenCreateKatha] = useState(false)

  const [pic1Path, setPic1Path] = useState("/userimg.png")
  const [pic2Path, setPic2Path] = useState("/author-1.png")

  // eslint-disable-next-line
  const [img1Val, setImg1Val] = useState("");
  // eslint-disable-next-line
  const [img2Val, setImg2val] = useState("")


  const [loading, setLoading] = useState(false)

  const [oldatabtn, setOlddatabtn] = useState(false)

  const [serchVal, setSearchVal] = useState("")

  const changeSearch = e => {
    setSearchVal(e.target.value)
    const rawReceiveKathas = tempKathas;
    serchVal.length < 1 ? setRecieveKathas(rawReceiveKathas) : setRecieveKathas(rawReceiveKathas.filter((val, index) => val.fullname.split("")[index] === serchVal.split("")[index]))
  }


  const filterKathasBySelection = e => {
    const rawKathas = tempKathas;
    setRecieveKathas(rawKathas.filter(prev => prev.area.toLowerCase() === e.target.value.toLowerCase()));
  }

  const resetAllData = () => setRecieveKathas(tempKathas)
  const sortByDate = () => {
    const rawReceiveKatha = recieveKatha
    setRecieveKathas(rawReceiveKatha.reverse())
    setOlddatabtn(!oldatabtn)
  }

  const checkingUser = async () => {
    if (localStorage.getItem("ghkathatoken")) {
      const token = localStorage.getItem("ghkathatoken");
      try {
        // const request = await (await fetch("https://ant-robe.cyclic.app/api/auth/check", {
        const request = await (await fetch("http://localhost:4000/api/auth/check", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            token: token
          }
        })).json();
        // console.log(request)

        if (request.success) {
          // console.log(request)
          localStorage.setItem("ghkathacnic", request.cnic);
          setCnic(request.cnic);
          setToken(token);
          if (request.verified) {
            // console.log(request.verified)
            fetchIngKathas(token);
            fetchingUserAreas(token);
          }
          else {
            nav("/profile")
          }
        }
        else {
          localStorage.clear();
          nav("/login")
        }

      } catch (error) {
        nav("/login");
        localStorage.clear();
      }
    }
    else {
      nav("/login");
      localStorage.clear();
    }
  }

  const fetchIngKathas = async tok => {
    try {
      setLoading(true)
      // const reqAndRes = await (await fetch("https://ant-robe.cyclic.app/api/get/getkathas/", {
      const reqAndRes = await (await fetch("http://localhost:4000/api/get/getkathas/", {
        method: "GET",
        headers: { "content-type": "application/json", token: tok },
      })).json();
      setLoading(false)

      // console.log(reqAndRes)

      if (reqAndRes.success) {
        if (reqAndRes.kathas.length > 0) {
          setError(false);
          setRecieveKathas(reqAndRes.kathas)
          setTempKathas(reqAndRes.kathas);
        }
        else {
          setError(true);
          setRecieveKathas("There is no kathas to show ..")
        }
      }
      else {
        setError(true);
        setRecieveKathaError(reqAndRes.message)
      }

    } catch (error) {
      setError(true)
      setRecieveKathas("SOME ERROR OCCURED PLEASE TRY AGAIN LATER ...")
    }
  }

  const fetchingUserAreas = async tok => {
    // console.log(tok)
    try {
      // const fetchAreaRequstAndResponse = await (await fetch("https://ant-robe.cyclic.app/api/getshortthings/fetchuserareas", {
      const fetchAreaRequstAndResponse = await (await fetch("http://localhost:4000/api/getshortthings/fetchuserareas", {
        method: "GET",
        headers: { 'content-type': "application/json", token: tok }
      })).json();

      // console.log(fetchAreaRequstAndResponse)

      if (fetchAreaRequstAndResponse.success) {
        setAreas(fetchAreaRequstAndResponse.areas)
      }
      else {
        setAreas([]);
      }

    } catch (error) {
      setAreas([])
    }
  }

  useEffect(() => {
    checkingUser();
    // eslint-disable-next-line
  }, [])


  const openKathaCreateBox = () => {
    setOpenCreateKatha(!openedCreateKatha)
  }

  const [formInputs, setFormInputs] = useState({
    fullname: "",
    father: "",
    cnic: "",
    phone: "",
    area: "",
    address: ""
  })

  const changeInputs = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const submitCreateKathaForm = async e => {
    e.preventDefault();
    setLoading(true)

    setCreateKathaLoading(true)
    try {
      // const reqAndRes = await (await fetch("https://ant-robe.cyclic.app/api/kathaoperations/createkatha", {
      const reqAndRes = await (await fetch("http://localhost:4000/api/kathaoperations/createkatha", {
        method: "POST",
        headers: { 'content-type': "application/json", token: token },
        body: JSON.stringify({ fullname: formInputs.fullname, father: formInputs.father, cnic: formInputs.cnic, phone: formInputs.phone, area: formInputs.area, address: formInputs.address }),
      })).json();


      // console.log(reqAndRes);

      if (reqAndRes.success) {
        fetchIngKathas(token);
        fetchingUserAreas(token)
        setCreateKathaLoading(false)
        setCreateKathaRes("Katha has been created..")


        setTimeout(() => {
          setOpenCreateKatha(false);
          setCreateKathaRes("")
          setFormInputs({ fullname: "", father: "", cnic: "", phone: "", area: "", address: "" })
        }, 2000);
      }
      else {
        setCreateKathaRes(reqAndRes.message);
        setCreateKathaLoading(false)
      }
    } catch (error) {
      setCreateKathaLoading(false)
      setCreateKathaRes("SOME ERROR OCCURED PLEASE TRY AGAIN LATER.")
    }
  }


  return (
    <main className='main-katha-main'>

      <CreateKathaBox createKathaLoading={createKathaLoading} createKathaRes={createKathaRes} loading={loading} formRef={kathaRef} submitForm={submitCreateKathaForm} changeInputs={changeInputs} formInputs={formInputs} setImg1Val={setImg1Val} setImg2Val={setImg2val} openedCreateKatha={openedCreateKatha} openKathaCreateBox={openKathaCreateBox} setPic1Path={setPic1Path} setPic2Path={setPic2Path} pic1Path={pic1Path} pic2Path={pic2Path} />

      <section className='main-header'>
        <div className="container">
          <div className="username"><button className="btn" onClick={(() => nav("/profile"))}>Profile</button></div>
          <div className="actions-katha">
            <button onClick={openKathaCreateBox}>Create new </button>
          </div>
        </div>
      </section>


      <br />
      <section className='searchbar'>
        <div className="container">
          <br />
          <h2>Filter Your kathas</h2>
          <br />
          <form onSubmit={(e) => e.preventDefault()}>
            <Inputs type={'search'} name={'searchtxt'} required={false} ph={'Type to search katha by name'} minl={2} val={serchVal} onchange={changeSearch} />
          </form>
        </div>
      </section>


      <section className="filters-kathas">
        <div className="container">

          <div className="filter-container">


            <div className="by-selection">
              <span>Filter by area</span> <br />
              <select name="filter-by-add" onChange={filterKathasBySelection}>
                <option defaultChecked >Select Area </option>
                {areas && areas.map((area, index) => {
                  return <option key={index} value={area}>{area.toUpperCase()}</option>
                })}

              </select>
            </div>

            <div className="by-date">
              <div className="header-bydate"><span>Filter By Date </span></div>
              <div className="buttons-filter">
                <button onClick={resetAllData}>Reset </button>
                <button onClick={sortByDate}> <LuArrowUpDown /> </button>
              </div>
            </div>


          </div>



        </div>
      </section>


      <section className="intro all-kathas-section">
        <div className="container">
          <h2>Saved Kathas </h2>

          <div className="kathas-list">

            <div className="katha-1 katha-block">
              <p className='serial-no'>S</p>
              <p className="fullname-k-block">full name</p>
              <p className='cnic-k-block'>cnic</p>
              <p className='area-block-katha'>Area</p>
              <p>Open</p>
            </div>
            {
              error ? <h3 align="center" style={{ color: 'red' }}>{recieveKathaError}</h3>
                : loading ? <LoadingBar /> :

                  recieveKatha && recieveKatha.map((katha, index) => <div className=" katha-block" key={index}>
                    <p className='serial-no'>{index + 1}</p>
                    <p className="fullname-k-block">{katha.fullname.toUpperCase()}</p>
                    <p className='cnic-k-block'>{katha.cnic.toUpperCase()}</p>
                    <p className='area-block-katha'>{katha.area.toUpperCase()}</p>
                    <button onClick={() => nav(`/katha/${katha._id}`)}>Open</button>
                  </div>
                  )

            }



          </div>


        </div>
      </section>

    </main>
  )
}

export default Home
