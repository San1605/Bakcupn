import React, { useEffect, useState } from "react";
import "./Frame.css";
import python from "./Assets/python.png";
import js from "./Assets/js.png";
import axios from "axios";
import { toast } from "react-toastify";
import { Editor } from "@monaco-editor/react";

function Frame() {
  const [convertOutput, setConvertOutput] = useState("");
  const [output, setOutput] = useState();
  const [text, setText] = useState();
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");

  const handleInputChange = (event) => {
    setSelectedInput(event.target.value);
    console.log(event.target.value);
  };

  const handleOutputChange = (event) => {
    setSelectedOutput(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    let apiUrl = "http://20.244.28.174:8881";
    axios({
      method: "get",
      url: `${apiUrl}/languages`,
    })
      .then(function (response) {
        console.log("hi");
        if (response.status === 200) {
          console.log(response.data);

          setOutput(response.data);
        } else {
          // toast.error("Something went wrong.")
        }
      })
      .catch(function (response) {
        //handle error
        // toast.dismiss(toastId);
        // toast.error("Something went wrong.")
        console.log(response);
      });
  }, []);

  const handleConvert = () => {
    let apiUrl = "http://20.244.28.174:8881";
    const toastId = toast.loading("please wait.....");
    var bodyFormData = new FormData();
    bodyFormData.append("from_lang", selectedInput);
    bodyFormData.append("to_lang", selectedOutput);
    bodyFormData.append("input_code", text);

    axios({
      method: "post",
      url: `${apiUrl}/convert`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        toast.dismiss(toastId);
        if (response.status === 200) {
          console.log(response.data);
          setConvertOutput(response.data);
        } else {
          toast.error("Something went wrong.");
        }
      })
      .catch(function (response) {
        //handle error
        toast.dismiss(toastId);
        toast.error("Something went wrong.");
        console.log(response);
      });
  };

  return (
    <div className="frame-container">
      <div className="frame-top">
        <div className="selectorbox1">
          <>
            {selectedInput && (
              <img
                className="img1"
                src={
                  output?.input_icon_url[output?.input.indexOf(selectedInput)]
                }
                alt={selectedInput}
              />
            )}
            <select
              className="select"
              value={selectedInput}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {output?.input.map((input, index) => (
                <option key={index} value={input}>
                  {input}
                </option>
              ))}
            </select>
          </>
        </div>

        <div className="selectorbox1">
          <>
            {selectedOutput && (
              <img
                className="img1"
                src={
                  output?.output_icon_url[
                  output?.output.indexOf(selectedOutput)
                  ]
                }
                alt={selectedOutput}
              />
            )}
            <select
              className="select"
              value={selectedOutput}
              onChange={handleOutputChange}
            >
              <option value="">Select</option>
              {output?.output.map((output, index) => (
                <option key={index} value={output}>
                  {output}
                </option>
              ))}
            </select>
          </>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "0 1rem",
          marginTop: "3rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Editor
          language={selectedInput.toLowerCase()}
          value={text}
          onChange={(value) => setText(value)}
          options={{ automaticLayout: true }}
          placeholder="language1"
          className="editor"
        />
        <Editor
          language={selectedOutput.toLowerCase()}
          value={convertOutput.output_code}
          options={{
            readOnly: true,
            automaticLayout: true,
          }}
          className="editor"
        />
      </div>
      <div className="frame-down">
        <button className="convert-btn" onClick={() => handleConvert()}>
          Convert
        </button>
      </div>
    </div>
  );
}

export default Frame;




// {
//   "from_lang": "Snowflake",
//   "input_code": "PROC SQL;\n   CREATE TABLE WORK.SGScan_CN_Item_Rec_Days AS \n   SELECT DISTINCT t1.MAILITM_FID, \n          t1.DEST_COUNTRY_CD, \n          t1.RECPTCL_FID LABEL='', \n          t1.Flights, \n          t1.DEST_LOCATION_FCD, \n          t1.Mail_Category, \n          /* DO */\n            (INTNX('HOUR', t1.EVENT_GMT_DT, 8,'same')) FORMAT=DATETIME16. AS DO, \n          t1.CN_DEPARTURE_DT, \n          /* CN_BAH */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,  t1.BAH)/24),0.1)) AS CN_BAH, \n          /* CN_Resdit14 */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,  t1.Resdit_14)/24),0.1)) AS CN_Resdit14, \n          /* CN_Resdit21 */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,  t1.Resdit_21)/24),0.1)) AS CN_Resdit21, \n          /* CN_Resdit24 */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,  t1.Resdit_24)/24),0.1)) AS CN_Resdit24, \n          /* CN_Resdes */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT, t1.Resdes)/24),0.1)) AS CN_Resdes, \n          /* CN_LL */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,  t1.LL)/24),0.1)) AS CN_LL, \n          /* CN_DFFD */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,t1.DFFD )/24),0.1)) AS CN_DFFD, \n          /* Dest_OE */\n            (substr(trim(t1.RECPTCL_FID),7,6)) AS Dest_OE, \n          /* CN_Date */\n            (Datepart(t1.CN_DEPARTURE_DT)) FORMAT=DATE7. AS CN_Date, \n          /* CN_Resdit74 */\n            (Round((INTCK('dthr',t1.CN_DEPARTURE_DT,  t1.Resdit_74)/24),0.1)) AS CN_Resdit74\n      FROM WORK.SGSCAN_CN_ITEM_REC t1;\nQUIT;",
//   "output_code": "sgscan_cn_item_rec_days = (sgscan_cn_item_rec.select('MAILITM_FID',\n                                                    'DEST_COUNTRY_CD',\n                                                    'RECPTCL_FID',\n                                                    'Flights',\n                                                    'DEST_LOCATION_FCD',\n                                                    'Mail_Category',\n                                                    'EVENT_GMT_DT',\n                                                    'CN_DEPARTURE_DT',\n                                                    'BAH',\n                                                    'Resdit_14',\n                                                    'Resdit_21',\n                                                    'Resdit_24',\n                                                    'Resdes',\n                                                    'LL',\n                                                    'DFFD')\n                             .withColumn('DO', from_unixtime(unix_timestamp(col('EVENT_GMT_DT'), \"yyyy-MM-dd HH:mm:ss\"), \"yyyy-MM-dd HH:mm:ss\"))\n                             .withColumn('CN_BAH', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('BAH'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('CN_Resdit14', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('Resdit_14'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('CN_Resdit21', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('Resdit_21'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('CN_Resdit24', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('Resdit_24'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('CN_Resdes', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('Resdes'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('CN_LL', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('LL'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('CN_DFFD', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('DFFD'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .withColumn('Dest_OE', substring(trim(col('RECPTCL_FID')), 7, 6))\n                             .withColumn('CN_Date', date_format(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd\"))\n                             .withColumn('CN_Resdit74', round((unix_timestamp(col('CN_DEPARTURE_DT'), \"yyyy-MM-dd HH:mm:ss\") - unix_timestamp(col('Resdit_74'), \"yyyy-MM-dd HH:mm:ss\"))/3600, 1))\n                             .distinct())",
//   "to_lang": "PySpark"

// {
//   "input": [
//     "Snowflake",
//     "SAS"
//   ],
//   "input_icon_url": [
//     "https://avatars.githubusercontent.com/u/6453780?s=280&v=4",
//     "https://cdn.icon-icons.com/icons2/2699/PNG/512/sas_logo_icon_170761.png"
//   ],
//   "output": [
//     "PySpark"
//   ],
//   "output_icon_url": [
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/2560px-Apache_Spark_logo.svg.png"
//   ]
// }
