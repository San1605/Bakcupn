import React, { useContext, useEffect } from 'react'
import KpiCard from '../../../../Components/KpiCard/KpiCard'
import HeaderButton from '../../../../Components/HeaderButton/HeaderButton'
import AdminAddStudents from '../AdminAddColleges/AdminAddStudents'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { decrypt } from '../../../../Utils/encryptDecrypt'
import { adminActions } from '../../Context/AdminAction'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { deleteIcon } from '../../Assets/adminIcons'

const RoleListCollege = ({ kpis, kpiData }) => {
    const { getRoleList, setLoading, dispatch, collegeRoleList, deleteRoles } = useContext(GlobalContext);
    const { id1, id2 } = useParams();

    async function getRoleListApi(id) {
        setLoading(true)
        try {
            const res = await getRoleList(decrypt(id));
            dispatch({
                type: adminActions.GET_COLLEGE_ROLE_LIST,
                payload: res?.data
            })
        }
        catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }

    async function deleteRolesApi(roleId, isCelebal) {
        const toastId = toast.loading("Please Wait")
        try {
            const res = await deleteRoles(roleId, isCelebal);
            toast.dismiss(toastId);
            toast.success("Sucessfully deleted");
            getRoleList()
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        getRoleListApi(id2)
    }, [])
    return (
        <div className='adminCollegesStudentDiv'>
            <div className='KpiContainer'>
                {
                    (kpis?.length > 0 ? kpis : kpiData)?.map((item, index) => (
                        <KpiCard {...item} key={index} />
                    ))
                }
            </div>
            <div className='studentListContainer'>
                <div className='studentListHeader'>
                    <span>Roles List</span>
                    {collegeRoleList?.length === 0 && <span>&nbsp;</span>}
                    {/* <HeaderButton
                        show={show}
                        setShow={setShow}
                        text={"Add Student"} /> */}
                </div>
                {/* <AdminAddStudents
                    show={show}
                    setShow={setShow}
                    type="Students"
                    CollegeId={decrypt(id2)}
                    getApi={getStudentsApi}
                /> */}
                <div className='studentList'>
                    <table>
                        <thead>
                            <tr className='headingRow'>
                                <th className='stickyColumnth'>Name</th>
                                <th>Role</th>
                                <th>Email ID</th>
                                <th>Contact No.</th>
                                <th>Domain</th>
                                <th>Added By</th>
                                <th>Added On</th>
                                {localStorage.getItem('role') === "Admin" &&
                                    <th>Action</th>
                                }
                            </tr>
                        </thead>

                        <tbody className='tbodyAdminTable'>
                            {
                                collegeRoleList?.map((item, index) => (
                                    <tr className='tableRowadmin' key={index}>
                                        <td className='stickyColumn'>{item?.Name}</td>
                                        <td>{item?.role || "NA"}</td>
                                        <td>{item?.EmailId || "NA"}</td>
                                        <td>{item?.contactNo || "NA"}</td>
                                        <td>{item?.domain || "NA"}</td>
                                        <td>{item?.addedBy || "NA"}</td>
                                        <td>{item?.addedOn || "NA"}</td>
                                        {localStorage.getItem('role') === "Admin" && <td
                                            style={{
                                                cursor: "pointer",
                                                // textAlign:"center"
                                            }}
                                            onClick={() => {
                                                deleteRolesApi(item?.id, (item?.role === "Hr Buddy" || item?.role === "Mentor") ? true : false)
                                            }} ><img src={deleteIcon} alt='' /></td>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default RoleListCollege