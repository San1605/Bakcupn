import { useCallback, useState } from "react";
import { hooks } from "botframework-webchat";

import testaData from "../../../../../../test.json"


const { usePostActivity } = hooks;

function TestPaperCard({ msg }) {
// states for the  payload data 
const [inputValuePair, setInputValuePair] = useState([])
const [dropdownValuePair, setDropDownValuePair] = useState([])

  const sendMessage = usePostActivity();
  let store = msg.attachments[0].content; // temprory remove
  // let store =  testaData
  console.log(store);

  const handleClickSend = useCallback(
    (data) => {
      sendMessage({
        type: "message",
        text: "submit",
        name: "questionpapperdetails",
        value: data,
      });
    },
    [sendMessage]
  );

  let payload = [inputValuePair,dropdownValuePair]

  const handleInputBoxValue = (value, name) => {
            setInputValuePair(prev => [...prev, {name : value}] )
  }
  const handleDropDownValues = (value, name) => {
    setDropDownValuePair((drVal) => [...drVal, {name : value}])
  }

  return (

<>
      {store.map((e, i) => {
        return (
          <div>
            <div>{e.cardTitle}</div>
            <div>
              {e.rows.map((ans) => (
                <div>
                  <div>{ans.title_eng}</div>
                  <input
                    type="textbox"
                    placeholder={ans.title_eng}
                    value={ans.value}
                    onChange={(e) => handleInputBoxValue(e.taget.value, ans.title_eng)}
                  />
                </div>
              ))}
            </div>

            <div>
              {e.dropdown.map((drp, i) => {
                if (drp.dropdowntype === "inputBox") {
                  return (
                    <div>
                      <select name="languages" id="lang" onChange={e => handleDropDownValues(e.target.value)}>
                        {drp?.dropdownvalue.map((e, i) => (
                          <option value="javascript" key={i}>
                            <div>
                              {" "}
                              {e} <input type="checkbox" />
                            </div>
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (drp.dropdowntype === "checkbox") {
                  return (
                    <div>
                      <select name="languages" id="lang" >
                        {drp.dropdownvalue.map((e) => (
                          <option value="javascript">
                            <div>
                              {" "}
                              {e} <input type="checkbox" />
                            </div>
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
              })}
            </div>

            <div>
              <button onClick={() => handleClickSend(payload)}>Submit</button>
              <button onClick={() => handleClickSend("cancel")}>Cancel</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TestPaperCard;
