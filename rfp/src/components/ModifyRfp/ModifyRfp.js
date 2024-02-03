import React, { useContext } from 'react';
import './Modify.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from '../../assets/images/profile.svg';
import ct_logo from '../../assets/images/ct_logo.svg';
import ChatContext from '../../Context/Context';
import search from '../../assets/images/search.svg';
import icon from '../../assets/images/icon.svg';
import rfp from '../../assets/images/rfp.svg';
import cross from '../../assets/images/cross.svg';
import rfp1 from '../../assets/images/rfp1.svg';
import Loader from "react-loader-spinner";
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import NoData from "../../assets/images/NoData.png"
import Testing from "../../assets/images/testing.png"
export const ModifyRfp = () => {
  const { isOn } = useContext(ChatContext)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState('');
  const [basicApiPayloadSet, setBasicApiPayloadSet] = useState({});

  const globalApiEndPoint = "http://20.127.168.63:8082";
  const [filteredData, setFilteredData] = useState()
  let navigate = useNavigate();


  const fetchDataFromApi = (searchQuery) => {
    setLoading(true);
    if (searchQuery.trim() !== '') {
      // const toastId = toast.loading("Please wait!!!");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "Question": `Show me rfp from ${searchQuery}`
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${globalApiEndPoint}/advanced_search`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((result) => {
          if (result === "No Relevant RFP's") {
            console.log("inside no resposne")
            setLoading(false);
            setSearchResults([]);
            // toast.dismiss(toastId);
            // toast.error("No Relevant RFP's for this query")
            setSearchQuery("")
          }
          else {
            const responser = JSON.parse(result);
            setLoading(false);
            setSearchResults(responser);
            // setSearchQuery("")
          }
          // toast.dismiss(toastId);
        })
        .catch((error) => console.error('error', error));
    } else {
      setSearchResults([]);
    }
  };



  const handleSearchIconClick = () => {
    setSearchClicked(true);
    fetchDataFromApi(searchQuery);
  };

  // console.log(searchResults, "searchresult")

  const getFiltersApi = () => {
    setLoadingData(true)
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
        setLoadingData(false)
        setFilteredData(result)
      })
      .catch((error) => console.error('error', error));

  };


  useEffect(() => {
    // fetchDataFromApi("Qatar");
    getFiltersApi()
  }, [])



  const basicSearchApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    setLoading(true)
    // const toastId = toast.loading("please wait !!")
    var raw = JSON.stringify({
      "filters": {
        "DatePublishedStart": "2022-10-10",
        "DatePublishedEnd": "2023-10-10",
        ...basicApiPayloadSet
      }
    });
    // console.log(raw, "asasasasas")
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${globalApiEndPoint}/basic_search`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((result) => {
        if (result === "No Relevant RFP's") {
          console.log("inside no resposne")
          setLoading(false);
          setSearchResults([]);
          //  toast.dismiss(toastId);
          // toast.error("No Relevant RFP's for this query")
        }
        else {
          const responser = JSON.parse(result);
          setLoading(false);
          setSearchResults(responser);
        }
        // toast.dismiss(toastId);
      })
      .catch((error) => console.error('error', error));
  };


  const handleSelectValues = (keyss, val) => {
    console.log(keyss, val, "eeeeeeeeeeeeeee")
    setBasicApiPayloadSet({ ...basicApiPayloadSet, [keyss]: [val] })
  }
  // console.log(basicApiPayloadSet, "yyvyvyvyvyv")



  return (
    <div>
      <div className='landing_heading'>
        <div><img src={ct_logo} style={{ width: '5.5rem' }} alt="" className="ms-5 " /></div>
        <div><button className='create-button me-3' onClick={() => navigate("/home")}>{isOn === "English" ? "Create new RFP" : "إنشاء طلب تقديم عروض جديد"}</button>  <img src={profile} style={{ width: '1.3rem' }} alt="" className="profile_img me-5 cursor-pointer" onClick={() => navigate("/Profile")} /></div>
      </div>
      <div className='mt-3'><b className=' ms-5'>{isOn === "English" ? "Modify an existing  RFP  " : "تعديل طلب تقديم العروض الموجود "}</b></div>
      <div className="row m-0 d-flex" >
        <div className="column col-lg-9 col-md-12 ">
          <div className='modifi_div1 ps-4'>
            <div className='mt-4 position-relative'>
              <input type="text"
                placeholder={isOn === "English" ? "Search.." : "ابحث هنا ..."}
                style={{ outline: "none" }}
                className='search' value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" ? handleSearchIconClick() : null
                }
              />
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

              <div className='header-tab-inside'>
                {
                  filteredData?.length >0  && filteredData?.map((item, index) => (
                    <div className='tab1' key={index}>
                      <select className='tabs' onChange={(e) => handleSelectValues(Object.keys(item)[0], e.target.value)}>
                        <option value="" selected >{Object.keys(item)[0]}</option>
                        {
                          item && item[Object.keys(item)[0]]?.map((option, index) => (
                            <option value={option} key={index}>
                              {option}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  ))
                }
              </div>
              {
                !loadingData && <button className='submit' onClick={()=>{
                  basicSearchApi()
                  setSearchClicked(true)
                }}>{isOn === "English" ? "Submit" : "يُقدِّم"}</button>
              }
            </div>
            {
              !loading && searchResults.length === 0 && !searchClicked && (
                <div className="mt-5 text-center">
                  <img src={Testing} alt='Please search to modify an existing rfp' />
                </div>
              )
            }
            {
              loading && <Spinner animation="border" role="status" className='mt-5 d-block m-auto'>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
            <div className='scrolling mt-3' >

              <div style={{
                alignItems: "center",
                justifyContent: "center",
                display: 'flex'
              }}>
                {
                  // searchQuery.trim() !== '' && 
                  searchClicked && !loading && searchResults.length === 0 && (
                    // <div>No Relevant RFP's found for this query</div>
                    <img src={NoData} alt="No Relevant RFP's found for this query" />
                  )}
              </div>

              {/* {loading && <div className="loader">Loading...</div>} */}
              {!loading && searchResults !== undefined && searchResults?.map((result, index) => (
                <div key={index} className='serach-item'>
                  <div key={result?.id} className="d-flex">
                    <img src={rfp} className="rfp-icon" alt="RFP" />
                    <div className="rfp-div1 d-flex flex-column ms-2">
                      <div className="rfp-text">{result?.metadata?.DocName}</div>
                      <div className="rfp-text" onClick={() => navigate('/pdfeditor',
                        {
                          state: {
                            pdfUrl: result?.metadata?.edit_url,
                            blobUrl: result?.metadata?.bloburl
                          }
                        })}
                        style={{ cursor: "pointer" }}>
                        click here for pdf
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <div className='rfp_texts1 mt-2'>{result?.metadata?.DocName}</div> */}
                    <div className="rfp-text2 " style={{ wordBreak: 'break-word' }}>
                      {result && result?.metadata && Object.keys(result?.metadata).map((item, index) => {
                        const value = result?.metadata[item];
                        if (Array.isArray(value) && value.length > 0) {
                          return (
                            <React.Fragment key={index}>
                              <span>{value[0]} </span>
                            </React.Fragment>
                          );
                        }
                        return null;
                      })}


                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>
        {/* {
          !loading && searchResults !== undefined && searchResults.length > 0 && ( */}
        <div className="column col-lg-3 d-none d-lg-flex ps-4 ">
          <div className='modifi_div2 mt-4 ps-2 w-100'>
            <div className='mt-3 w-100' style={{ fontSize: '14px' }}>Knowledge Base </div>

            {!loading && searchResults !== undefined && searchResults?.map((result, index) => (
              <div key={index} className='serach-item'>
                <div key={result?.id} className="d-flex w-100">
                  <img src={rfp} className="rfp-icon" alt="RFP" />
                  <div className="rfp-div1 d-flex flex-column ms-2">
                    <div className="rfp-text">{result?.metadata?.DocName}</div>
                    <div className="rfp-text w-100">
                      <a href={result?.Pdf_Url} target="_blank" rel="noopener noreferrer" style={{ wordWrap: 'break-word' }}>
                        {result?.Pdf_Url}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  {/* <div className='rfp_texts1 mt-2'>{result?.metadata?.DocName}</div> */}
                  <div className="rfp-text2" style={
                    { wordBreak: "break-word" }
                  }>
                    {result?.metadata && Object.keys(result?.metadata).map((item, index) => {
                      const value = result?.metadata[item];
                      if (Array.isArray(value) && value.length > 0) {
                        return (
                          <React.Fragment key={index}>
                            <span>{value[0]} </span>
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
        {/* ) */}
        {/* } */}

      </div>
      {/* { <div className="loader">Loading...</div>} */}
      {/* <Loader
            type="TailSpin"
            color="rgb(155, 236, 34)"
            height={70}
            width={70}
            timeout={5000}
        /> */}

    </div>
  )
}
