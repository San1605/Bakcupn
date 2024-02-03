import React from 'react'

import { useNavigate } from 'react-router-dom';
import SearchBox from '../../SearchBox/SearchBox';
import { filter } from '../../../Assets/globalIcons';
const StudentsDetails = ({studentList}) => {
    const navigate = useNavigate();

    return (
        <div className='collegeInformation'>
            <div className="collegeInformationHeading">
                <span>Student Details</span>
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
                            <th>Student Name</th>
                            <th>Email ID</th>
                            <th>Contact No.</th>
                            <th>Btech Stream</th>
                            <th>Current Sem</th>
                            <th>Domain</th>
                        </tr>
                    </thead>

                    <tbody className='tbodyAdminTable'>
                        {
                            studentList?.map((item, index) => (
                                <tr style={{
                                    cursor: "pointer"
                                }}
                                    onClick={() => navigate(`/student/${item?.id}`)}
                                    className='tableRowadmin' key={index}>
                                    <td>Student</td>
                                    <td>{item?.emailId}</td>
                                    <td>{item?.contactNo}</td>
                                    <td>{item?.btech_stream}</td>
                                    <td>{item?.CurrentSem || 6}</td>
                                    <td>{item?.domain}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentsDetails
