import React from 'react';
import './Modify.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from '../../assets/images/profile.svg';
import ChatContext from '../../Context/Context';
import ct_logo from '../../assets/images/ct_logo.svg';
import search from '../../assets/images/search.svg';
import icon from '../../assets/images/icon.svg';
import rfp from '../../assets/images/rfp.svg';
import cross from '../../assets/images/cross.svg';
import rfp1 from '../../assets/images/rfp1.svg';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';



export const ModifyRfp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [loading, setLoading] = useState(false);
  const [basicApiData, setBasicApiData] = useState([])

  const globalApiEndPoint = "http://20.127.168.63:8082";
  const [filteredData, setFilteredData] = useState()
  let navigate = useNavigate();

  const fetchDataFromApi = (searchQuery) => {
    setLoading(true);
    if (searchQuery.trim() !== '') {
      const toastId = toast.loading("please wait !!!")
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "Question": `Show me rfp from ${searchQuery}`
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${globalApiEndPoint}/advanced_search`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log(response, "response")
            setLoading(false)
          }
        })
        .then((result) => {
          if (result && typeof result === 'string') {
            toast.dismiss(toastId);
            toast.error("No Response for this query")
            setSearchResults([])
          }
          else {
            setSearchResults(result);
          }
        })
        .catch((error) => console.error('error', error));

    } else {
      setSearchResults([]);
    }
  };


  const handleSearchIconClick = () => {
    fetchDataFromApi();
  };
  console.log(searchResults, "searchresult")


  const getFiltersApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${globalApiEndPoint}/get_filters_cat`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFilteredData(result)
      })
      .catch((error) => console.error('error', error));

  };

  console.log(filteredData, "aaaaaaaaaaaa")

  useEffect(() => {
    fetchDataFromApi("Qatar");
    getFiltersApi()
  }, [])



  const basicSearchApi = () => {

    const toastId = toast.loading("please wait !!!")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "filters": {
        "DatePublishedStart": "2022-10-10",
        "DatePublishedEnd": "2023-10-10",
        "Client": [
          "Bank of India"
        ],
        "Industry": [
          "Banking & Finance"
        ],
        "Location": [
          "India"
        ],
        "Language": [
          "English"
        ]
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${globalApiEndPoint}/basic_search`, requestOptions)
      .then((response) => {
        response.json()
      })
      .then((result) => {
        setSearchResults(result);
      })
      .catch((error) => console.error('error', error));

  };

  const basicApiFunc = (key, value) => {
    setBasicApiData([...basicApiData,[key]:[value]])
  }

  console.log(basicApiData, "basicapi Data")

  return (
    <div>
      <div className='landing_heading'>
        <div><img src={ct_logo} style={{ width: '5.5rem' }} alt="" className="ms-5 " /></div>
        <div><button className='create-button me-3' onClick={() => navigate("/home")}>Create new RFP</button>  <img src={profile} style={{ width: '1.3rem' }} alt="" className="profile_img me-5 cursor-pointer" onClick={() => navigate("/Profile")} /></div>
      </div>
      <div className='mt-3'><b className=' ms-5'>Modify an existing  RFP </b></div>
      <div className="row m-0 d-flex" >
        <div className="column col-lg-9 col-md-12 ">
          <div className='modifi_div1 ps-4'>
            <div className='mt-4 position-relative'> <input type="text" placeholder="Search.." className='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <img src={search} className='search_icon ' onClick={handleSearchIconClick} />
              <img src={cross} className='cross_icon ' onClick={() => setSearchQuery('')} />
            </div>
            <div className='header-tab d-flex mt-4 gap-4'>
              {/* <div className={`tab1 ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')}>
          Tab1
        </div>
        <div className={`tab1 ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')}>
          Tab2
        </div>
        <div className={`tab1 ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')}>
          Tab3
        </div>
        <div className={`tab1 ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => handleTabClick('tab4')}>
          Tab4
        </div>  */}

              {
                filteredData !== undefined && Object.keys(filteredData)?.map((item, index) => (
                  <div className='tab1'>
                    {item}
                    <select className='tabs' onChange={(e) => basicApiFunc(item, e.target.value)} >
                      <option>select</option>
                      {
                        filteredData[item]?.map((option, index) => (
                          // console.log(filteredData[item],"")
                          <option key={index}>
                            {option}
                          </option>
                        ))
                      }
                    </select>

                  </div>

                ))
              }

              <button className='submit' onClick={basicSearchApi}>submit</button>
            </div>
            <div className='scrolling mt-3'>

              {
                searchResults === ""
              }
              {/* {loading && <div className="loader">Loading...</div>} */}
              {!loading && searchResults !== undefined && searchResults?.map((result) => (
                <div>
                  <div key={result.id} className="d-flex  mt-3">
                    <img src={rfp} className="rfp-icon" alt="RFP" />
                    <div className="rfp-div1 d-flex flex-column ms-2">
                      <div className="rfp-text">{result.DocName}</div>
                      <div className="rfp-text">
                        <a href={result.Link} target="_blank" rel="noopener noreferrer">
                          {result.Link}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='rfp_texts1 mt-2'>{result.DocName}</div>
                    <div className="rfp-text2 ">
                      {result.metdata.Location[0]} - {result.metdata.Language[0]} - {result.metdata.Industry[0]} - {result.metdata.Client[0]}
                      {/* {(result.metdata.Client[0]) + (result.metdata.Industry[0]) + (result.metdata.Language[0]) + (result.metdata.Location[0])} */}
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>
        <div className="column col-lg-3 d-none d-lg-flex ps-4 ">
          <div className='modifi_div2 mt-4 ps-2 w-100'>
            <div className='mt-3 w-100' style={{ fontSize: '14px' }}>Trending RFPs </div>

            {!loading && searchResults != undefined && searchResults?.map((result) => (
              <div>
                <div key={result.id} className="d-flex w-100 mt-3">
                  <img src={rfp} className="rfp-icon" alt="RFP" />
                  <div className="rfp-div1 d-flex flex-column ms-2">
                    <div className="rfp-text">{result.DocName}</div>
                    <div className="rfp-text w-100">
                      <a href={result.Link} target="_blank" rel="noopener noreferrer" style={{ wordWrap: 'break-word' }}>
                        {result.Link}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='rfp_texts1 mt-2'>{result.DocName}</div>
                  <div className="rfp-text2 ">
                    {result.metdata.Location[0]} - {result.metdata.Language[0]} - {result.metdata.Industry[0]} - {result.metdata.Client[0]}
                    {/* {(result.metdata.Client[0]) + (result.metdata.Industry[0]) + (result.metdata.Language[0]) + (result.metdata.Location[0])} */}
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
      {/* { <div className="loader">Loading...</div>} */}
      {/* <Loader
            type="TailSpin"
            color="rgb(155, 236, 34)"
            height={70}
            width={70}
            timeout={5000}
        /> */}
      <Spinner animation="border" role="status" className='spin'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}