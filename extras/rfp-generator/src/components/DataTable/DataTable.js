import React from 'react';
import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

const DataTable = ({ data, setTableResponse }) => {


  console.log(data, "datapreview")

  const tableHTMLString = `
  <div>
    <table class='border'>
    <thead class='border'>
      <tr class='border'>
        <th class='border'>Functional Requirements</th>
        <th class='border'>Action Item</th>
      </tr>
    </thead>
    <tbody>
      ${data.length > 0 && data?.map((item, index) => (
    `<tr key=${index} class='border'>
          <td class='border'>${Object.keys(item)[0]}</td>
          <td class='border'>${Object.values(item)[0]}</td>
        </tr>`
  )).join('')}
    </tbody>
  </table>
  </div>
`;

  useEffect(() => {
    setTableResponse(tableHTMLString)
  }, [setTableResponse, tableHTMLString])


  return (
    data.length > 0 && (
      <div style={{ maxHeight: "25rem", overflow: "auto" }}>
        <table className='border'>
          <thead className='border'>
            <tr className='border'>
              <th className='border'>Content</th>
              <th className='border'>Yes</th>
              <th className='border'>No</th>
              <th className='border'>Partially</th>
              <th className='border'>Comment</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data.map((item, index) => (
              <tr key={index} className='border'>
                <td className='border'>{item}</td>
                <td className='border' style={{minWidth: "50px"}}></td>
                <td className='border' style={{minWidth: "50px"}}></td>
                <td className='border'></td>
                <td className='border'></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};








export default DataTable;