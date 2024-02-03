import React from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CheckBox = ({ data, setTableResponse }) => {


    console.log(data, "datapreview")

    const tableHTMLString = `
  <div>
      ${data.length > 0 && data?.map((item, index) => (
        `<div>
        <p>${item}</p>
        <label class="radio-inline">
      <input type="radio" name=${"optradio" + index} checked>Yes
    </label>
    <label class="radio-inline">
      <input type="radio"  name=${"optradio" + index}>No
    </label>
        </div>
        `
    ))}
  </div>`;

    useEffect(() => {
        setTableResponse(tableHTMLString)
    }, [setTableResponse, tableHTMLString])


    return (
        data.length > 0 && (
            <div>
                {data.length > 0 && data.map((item, index) => (
                    <div className='mb-1'>
                        <p className='mb-1'>{item}</p>
                        <div className='inlineRadio'>
                            <label class="radio-inline radioPre">
                                <input type="radio" name={"optradio" + index} checked />Yes
                            </label>
                            <label class="radio-inline ms-4 radioPre">
                                <input type="radio" name={"optradio" + index} />No
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
};

export default CheckBox;