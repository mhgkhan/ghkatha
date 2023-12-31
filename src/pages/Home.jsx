import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Inputs from '../components/form/Inputs'
import CreateKathaBox from '../components/dailogs/CreateKathaBox';


const rawData = [
  { name: "ghazna", cnic: "21202-1512793-5", area: "kass Killy" },
  { name: "Muhammad Hasnain", cnic: "21202-1512793-5", area: "kass Killy" },
  { name: "Ahmad shah", cnic: "21202-e343343-5", area: "jamrud" },
  { name: "Shahab Khan", cnic: "212032-1512732-5", area: "surkamar" },
  { name: "Aman Khan", cnic: "212032-1512732-5", area: "gudar" },
  { name: "Fazal Amin", cnic: "212032-1512732-5", area: "gudar" },
]



const Home = () => {

  const nav = useNavigate();
  const kathaRef = useRef();


  const [authToken, setAuthToken] = useState("")
  const [rawDataset, setRawData] = useState(rawData);
  const [openedCreateKatha, setOpenCreateKatha] = useState(false)

  const [pic1Path, setPic1Path] = useState("/author-1.png")
  const [pic2Path, setPic2Path] = useState("/author-1.png")


  const [img1Val, setImg1Val] = useState("");
  const [img2Val, setImg2val] = useState("")


  const [loading, setLoading] = useState(false)

  const [oldatabtn, setOlddatabtn] = useState(false)


  const checkAuthorize = () => {
    // eslint-disable-next-line
    if (localStorage.getItem("user-auth-token") && localStorage.getItem("user-auth-token").length > 10) setAuthToken(JSON.parse(localStorage.getItem("user-auth-token")).cnic)
    else nav("/login");
  }

  const [serchVal, setSearchVal] = useState("")

  const changeSearch = e => {
    setSearchVal(e.target.value)
    if (serchVal.length < 2 ? setRawData(rawData) : setRawData(rawData.filter((katha, index) => katha.name.toLowerCase().split("")[index] === serchVal.toLowerCase().split("")[index])))
      setSearchVal("")
  }


  const filterKathasBySelection = e => {
    setRawData(rawDataset.filter((katha, index) => katha.area === e.target.value))
  }

  const resetAllData = () => {
    // const oldRaw = rawDataset
    setRawData(rawData)
  }
  const sortByDate = () => {
    const newRawData = rawDataset
    setRawData([...newRawData.reverse()]);
    setOlddatabtn(!oldatabtn)
  }



  useEffect(() => {
    checkAuthorize();
  })


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

  const submitCreateKathaForm = (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData()
    formData.append("fullname", formInputs.fullname)
    formData.append("father", formInputs.father)
    formData.append("cnic", formInputs.cnic)
    formData.append("phone", formInputs.phone)
    formData.append("area", formInputs.area)
    formData.append("address", formInputs.address)
    formData.append("userImg", img1Val)
    formData.append("cnicImg", img2Val)


    const AddtoRawData = { name: formInputs.fullname, cnic: formInputs.cnic, area: formInputs.area }
    rawData.concat(AddtoRawData);
    setRawData([...rawDataset, AddtoRawData]);
    setTimeout(() => {
      setLoading(false);
      kathaRef.current.reset()
      setOpenCreateKatha(false);
    }, 1000);
  }


  return (
    <main className='main-katha-main'>

      <CreateKathaBox loading={loading} formRef={kathaRef} submitForm={submitCreateKathaForm} changeInputs={changeInputs} formInputs={formInputs} setImg1Val={setImg1Val} setImg2Val={setImg2val} openedCreateKatha={openedCreateKatha} openKathaCreateBox={openKathaCreateBox} setPic1Path={setPic1Path} setPic2Path={setPic2Path} pic1Path={pic1Path} pic2Path={pic2Path} />

      <section className='main-header'>
        <div className="container">
          <div className="username"><h1>{authToken}</h1></div>
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
                {rawDataset.map((katha, index) => {
                  return <option key={index} value={katha.area}>{katha.area.toUpperCase()}</option>
                })}

              </select>
            </div>

            <div className="by-date">
              <div className="header-bydate"><span>Filter By Date </span></div>
              <div className="buttons-filter">
                <button onClick={resetAllData}>Reset </button>
                <button onClick={sortByDate}>{oldatabtn ? "Newist" : "Oldest"}</button>
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
              rawDataset.map((katha, index) => <div className=" katha-block" key={index}>
                <p className='serial-no'>{index + 1}</p>
                <p className="fullname-k-block">{katha.name}</p>
                <p className='cnic-k-block'>{katha.cnic}</p>
                <p className='area-block-katha'>{katha.area}</p>
                <button onClick={()=>nav(`/katha/${index}`)}>Open</button>
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
