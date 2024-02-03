import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../../../context/GlobalState';
import Requestinnertabs from './Requestinnertabs';


function RequestTabs() {
    const { dispatch, requestdata, navroutes, navigate} = useContext(GlobalContext);
    useEffect(() => {
      if(navroutes?.includes('/requests'))
      {
      requestdata();
      dispatch({
        type:"ACCOUNT_NAV",
        payload:"30"
      })
      document.title = `Notifications | ${process.env.REACT_APP_APP_NAME}`;
    }
    else{
      navigate("/")
    }
    }, [navroutes]);
    return (
      <Requestinnertabs/>
    )
  }

export default RequestTabs