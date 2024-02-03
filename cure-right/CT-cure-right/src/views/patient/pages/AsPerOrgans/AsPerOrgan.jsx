import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from "react-bootstrap";
import Button from "../../../../components/Button/Button";

import Base from "../../assets/images/Base.png"
import Avatar1 from "../../assets/images/Avatar1.png"
import Avatar2 from "../../assets/images/Avatar2.png"
import Avatar3 from "../../assets/images/Avatar3.png"
import Avatar4 from "../../assets/images/Avatar4.png"



import "./AsPerOrgan.css"
const AsPerOrgan = () => {
  const { id } = useParams();
  console.log(id);

  const organs = [
    {
      id: 211,
      image:Base,
      DoctorName: "Zachary Gomez",
      Status: 'Available',
      Experience: '9 years',
      Treated: '24+ patients',
    },
    {
      id: 212,
      image:Avatar1,
      DoctorName: "Amanda Montgomery",
      Status: 'On Break',
      Experience: '4 years',
      Treated: '84+ patients',
    },
    {
      id: 213,    
      image:Avatar2,
      DoctorName: "Lester Holland",
      Status: 'On Break',
      Experience: '6 years',
      Treated: '56+ patients',
    },
    {
      id: 214,
      image:Avatar4,
      DoctorName: "Max Allison",
      Status: 'On Leave',
      Experience: '7 years',
      Treated: '34+ patients',
    },
    {
      id: 215,
      image:Avatar3,
      DoctorName: "Richard Gregory",
      Status: 'On Leave',
      Experience: '10 years',
      Treated: '74+ patients',
    }
  ]
  
  return (
    <div className='asPerOrgans'>
      <div className=" home-top row m-0 p-0 w-100">
        <div className="mb-2 p-0">
          <h3 className="heading-overview mb-1">As Per Organs</h3>
          <h2 className="heading-homepage">Departments/{id}</h2>
        </div>
      </div>


      <Table>
        <thead>
          <tr>
            <th className="table-header small">ID</th>
            <th className="table-header small smallImgTd"></th>
            <th className="table-header ">Doctor's Name</th>
            <th className="table-header">Status</th>
            <th className="table-header">Experience</th>
            <th className="table-header">Treated</th>
            <th className="table-header">Book Appointment</th>
          </tr>

        </thead>
        
        <tbody className="shadow-body">
          {
            organs.map((item) => (
              <tr>
                <td className="table-body small fontAsPerOrganId smallImgTd">{item.id}</td>
                <td className="table-body ps-0 text-nowrap small smallImgTd" > 

                  <img className='profImg' src={item.image} alt="" />
                 </td>

                <td className="table-body text-nowrap"  >{item.DoctorName}</td>


                <td className="table-body"  >
                  <div className='flex'>
                  <div className={item.Status==="Available"?"green":item.Status==="On Break"?"yellow":"red"}></div>
                  <span> {item.Status}</span>
                  </div>
                </td>


                <td className="table-body">{item.Experience}</td>
                <td className="table-body">{item.Treated}</td>
                <td className="table-body">
                  <Button
                    type="primary"
                    text="Book Now"
                    onClick={() => { }}
                    className="d-md-inline d-none"
                    style={{
                      fontSize: "12px",
                      borderRadius: "4px",
                      fontWeight: 500,
                      padding:".4rem 2.7rem"
                    }}
                  />
                </td>
              </tr>

            ))
          }

        </tbody>
      </Table>











    </div>
  )
}

export default AsPerOrgan
