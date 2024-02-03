import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { deleteIcon } from "../../Assets/adminIcons"
import { GlobalContext } from "../../../../Context/GlobalContext";
import toast from "react-hot-toast";

function AdminCollegesList({ collegesData,deleteApi }) {
    const navigate = useNavigate()
    return (
        <div className='adminCollegeListView'>
            <table>
                <thead>
                    <tr className='headingRow'>
                        <th>College Name</th>
                        <th>Place</th>
                        <th>Total Students</th>
                        <th>Total Domains</th>
                        <th>Start Date</th>
                        <th>Expected End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody className='tbodyAdminTable'>
                    {
                        collegesData?.map((item, index) => (
                            <tr style={{ cursor: "pointer" }} className='tableRowadmin' key={item?.id} onClick={() => navigate(`/colleges/students/${item?.collegeName}/${item?.id}`)} >
                                <td>{item?.collegeName}</td>
                                <td>{item?.address}</td>
                                <td>{item?.studentCount}</td>
                                <td>{item?.totalDomain}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                <td
                                    style={{
                                        cursor: "pointer",
                                        display: 'flex',
                                        gap: "12px"
                                        // textAlign:'center'
                                    }}
                                >
                                    <img onClick={(e) => {
                                        e.stopPropagation()
                                        deleteApi(item?.id)
                                    }} src={deleteIcon} alt='' />

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminCollegesList