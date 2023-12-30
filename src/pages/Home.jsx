import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Inputs from '../components/form/Inputs'

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

  const [authToken, setAuthToken] = useState("")
  const [rawDataset, setRawData] = useState(rawData);



  const checkAuthorize = () => {
    // eslint-disable-next-line
    if (localStorage.getItem("user-auth-token") && localStorage.getItem("user-auth-token").length > 10) setAuthToken(JSON.parse(localStorage.getItem("user-auth-token")).cnic)
    else nav("/login");
  }

  const [serchVal, setSearchVal] = useState("")

  const changeSearch = e => {
    setSearchVal(e.target.value)
    setRawData(rawData.filter(katha => katha.name === serchVal))
  }


  const filterKathasBySelection = e => {
    setRawData(rawData.filter((katha, index) => katha.area === e.target.value))
  }

  const filterByDateNew = () => {
    setRawData(rawData)
  }
  const filterByDateOld = () => {
    setRawData(rawData.reverse())
  }



  useEffect(() => {
    checkAuthorize();
  })

  return (
    <main>
      <section className='main-header'>
        <div className="container">
          <div className="username"><h1>{authToken}</h1></div>
          <div className="actions-katha">
            <button>Create new </button>
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
                {rawData.map(katha => {
                  return <option value={katha.area}>{katha.area.toUpperCase()}</option>
                })}

              </select>
            </div>

            <div className="by-date">
              <div className="header-bydate"><span>Filter By Date </span></div>
              <div className="buttons-filter">
                <button onClick={filterByDateNew}>Newest </button>
                <button onClick={filterByDateOld}>Oldest</button>
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
              rawDataset.map((katha, index) => <div className=" katha-block">
                <p className='serial-no'>{index + 1}</p>
                <p className="fullname-k-block">{katha.name}</p>
                <p className='cnic-k-block'>{katha.cnic}</p>
                <p className='area-block-katha'>{katha.area}</p>
                <button>Open</button>
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
