import React, { useEffect, useState } from 'react'
import "./RightContainer.css"
import LeftTextBox from '../LeftTextBox/LeftTextBox'
import RightTextBox from '../RightTextBox/RightTextBox'
import convert from "../../assets/convert.svg"
import axios from 'axios'
import toast from 'react-hot-toast';
const RightContainer = () => {
  const [textValue, setTextValue] = useState("");
  const [rightTextValue, setRightTextValue] = useState("");
  const [languages, setLanguages] = useState({});

  const getConvertedValue = async () => {
    if (textValue === "") {
      toast.error("Please provide valid data");
      return;
    }
    const toastId = toast.loading("Please wait, code conversion is in progress");
    try {
      const requestConfig = {
        url: "https://0c42-14-194-5-34.ngrok-free.app/convert",
        method: "post",
        data: JSON.stringify({
          abap_code: textValue
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(requestConfig);
      if (response.status === 200) {
        if (response.data?.pyspark_code[0] !== "Invalid input code") {
          // console.log(response.data?.pyspark_code[0], "codeeeeee")
          setRightTextValue(response.data?.pyspark_code[0]);
        }
        else {
          toast.error(response.data?.pyspark_code[0]);
        }

      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error("Something went wrong during the request.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const convertText = () => {
    if (textValue !== '') {
      getConvertedValue();
      // setTextValue("");
    } else {
      toast.error("Please enter valid data");
    }
  };

  const getLanguage = async () => {
    const requestConfig = {
      url: "https://0c42-14-194-5-34.ngrok-free.app/languages",
      method: "get",
      headers: {
        'ngrok-skip-browser-warning': true
      },
    }

    try {
      const response = await axios(requestConfig);
      if (response.status === 200) {
        const data = response.data;
        setLanguages(data)
        console.log(data, "languages")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLanguage()
  }, [])

  return (
    <div className='rightContainer'>
      <LeftTextBox
        textValue={textValue}
        setTextValue={setTextValue}
        languages={languages}
      />

      <RightTextBox
        rightTextValue={rightTextValue}
        languages={languages}
      />

      <div className='convertButton' onClick={convertText}>
        <span>Convert</span>
        <img src={convert} alt="" />
      </div>
    </div>
  )
}
export default RightContainer