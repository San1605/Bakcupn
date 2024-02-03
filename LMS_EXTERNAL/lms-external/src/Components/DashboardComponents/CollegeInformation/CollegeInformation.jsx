import React from 'react'
import "./CollegeInformation.css"
import { useNavigate } from 'react-router-dom';
import SearchBox from "../../SearchBox/SearchBox"
import { filter } from '../../../Assets/globalIcons';
const CollegeInformation = ({ collegeList }) => {
    const navigate = useNavigate();


    return (
        <div className='collegeInformation'>
            <div className="collegeInformationHeading">
                <span>College Information</span>
                <div className='lpListHeaderRight'>
                    <SearchBox
                        placeholder={"Search By Name"}
                    // searchQuery={searchQueryCollege}
                    // setSearchQuery={setSearchQueryCollege}
                    />

                    {/* <img
                        style={{ cursor: "pointer", position: "relative" }}
                        src={filter}
                        alt=''
                     onClick={() => setShowFilter(!showFilter)}
                    /> */}
                </div>
            </div>
            <div className="collegeInformationDiv">
                <table>
                    <thead>
                        <tr className='headingRow'>
                            <th>College Name</th>
                            <th>Address</th>
                            <th>Total Students</th>
                            <th>Total Domain</th>
                        </tr>
                    </thead>

                    <tbody className='tbodyAdminTable'>
                        {
                            collegeList?.map((item, index) => (
                                <tr style={{
                                    cursor: "pointer"
                                }}
                                    onClick={() => navigate(`/college/${item?.id}`)}
                                    className='tableRowadmin' key={index}>
                                    <td >{item?.collegeName}</td>
                                    <td>{item?.address}</td>
                                    <td>{item?.studentCount}</td>
                                    <td>{item?.totalDomain}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CollegeInformation
