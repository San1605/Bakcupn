import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./AdminRoleManagement.css"
import AdminHeaderTabs from '../../../../Components/AdminHeaderTabs/AdminHeaderTabs'
import HeaderButton from '../../../../Components/HeaderButton/HeaderButton'
import { EmptyLearningPath, deleteIcon } from "../../Assets/adminIcons";
import SearchBox from '../../../../Components/SearchBox/SearchBox'
import AddRoleModal from '../../Components/AddRoleModal/AddRoleModal'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
import Loader from '../../../../Utils/Loader/Loader'
import FilterComponent from '../../../../Components/FilterComponent/FilterComponent'
import { adminActions } from '../../Context/AdminAction'
import AddHrRoleModal from '../../Components/AddRoleModal/AddHrBuddyRole'
import { filter } from '../../../../Assets/globalIcons';

const AdminRoleManagement = () => {
    const [filteredCelebalRoleList, setFilteredCelebalRoleList] = useState([]);
    const [filteredCollegeRoleList, setFilteredCollegeRoleList] = useState([]);
    const [searchQueryCelebal, setSearchQueryCelebal] = useState('');
    const [searchQueryCollege, setSearchQueryCollege] = useState('');
    const tabsList = ["Celebal Roles", "College Roles"];
    const tabsListHrBuddy = ["CT Mentors", "College Faculty Mentor"];
    const [show, setShow] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userType, setUserType] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [roleId, setRoleId] = useState(0);
    const [selectFilter, setSelectFilter] = useState({
        Domain: [],
        colleges: []
    });
    const role = localStorage.getItem("role")
    const { getCollegeMentors, staticdata, getCelebalMentors, dispatch, celebalMentors, collegeMentors, loading, selectedTabIndexRole, setLoading } = useContext(GlobalContext)

    console.log(staticdata, "filterlist")
    // useEffect(() => {
    //     if (Object.keys(staticdata)?.length > 0) {
    //         const arr = {
    //             Domain: [],
    //             College: []
    //         }

    //         Object.keys(staticdata)?.forEach((item) => {
    //             const arr1 = [];
    //             const arr2 = []
    //             if (item === 'domains') {
    //                 staticdata[item]?.forEach(ele => {
    //                     arr1.push({
    //                         text: ele,
    //                         value: ele
    //                     })
    //                 })
    //                 arr.Domain = arr1
    //             }
    //             else {
    //                 staticdata[item]?.forEach(ele => {
    //                     arr2.push({
    //                         text: ele?.collegeName,
    //                         value: ele?.collegeId
    //                     })
    //                 })
    //                 arr.College = arr2
    //             }
    //         })
    //         setFilterList(arr);
    //     }
    // }, [staticdata])




    const getCollegeMentorsApi = useCallback(async (filter) => {
        setLoading(true)
        try {
            const res = await getCollegeMentors(filter);
            dispatch(
                {
                    type: adminActions.GET_COLLEGE_ROLES,
                    payload: res?.data
                }
            )
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }, [dispatch, getCollegeMentors])

    const getCelebalMentorsApi = useCallback(async (filter) => {

        setLoading(true)
        try {
            const res = await getCelebalMentors(filter);
            dispatch(
                {
                    type: adminActions.GET_CELEBAL_ROLES,
                    payload: res?.data
                }
            )


        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }
        , [dispatch, getCelebalMentors])






    const handleSearch = (list, input) => {
        return list.filter(item =>
            item?.role.toLowerCase().includes(input?.toLowerCase()) ||
            item?.fullName.toLowerCase().includes(input?.toLowerCase())
        );
    };
    const handleSearchCollege = (list, input) => {
        return list.filter(item =>
            item?.fullName.toLowerCase().includes(input?.toLowerCase())
        );
    };

    // useEffect(() => {
    //     if (selectedTabIndexRole)
    //         setSelectedTab(selectedTabIndexRole)
    // }, [selectedTabIndexRole])


    useEffect(() => {
        const arr = handleSearch(celebalMentors, searchQueryCelebal);
        setFilteredCelebalRoleList(arr)
    }, [searchQueryCelebal]);

    useEffect(() => {
        const arr = handleSearchCollege(collegeMentors, searchQueryCollege);
        setFilteredCollegeRoleList(arr)
    }, [searchQueryCollege]);


    useEffect(() => {
        setSearchQueryCelebal("")
        setSearchQueryCollege("")
        if (selectedTab === 0) {
            if (celebalMentors?.length === 0) {
                getCelebalMentorsApi()
            }
        }
        else {
            if (collegeMentors?.length === 0) {
                getCollegeMentorsApi()
            }
        }
        setShowFilter(false);
        setSelectFilter(
            {
                Domain: [],
                colleges: []
            }
        )
    }, [selectedTab])


    useEffect(() => {
        setFilteredCelebalRoleList(celebalMentors)
    }, [celebalMentors])
    useEffect(() => {
        setFilteredCollegeRoleList(collegeMentors)
    }, [collegeMentors])

    useEffect(() => {

    }, [])
    if (loading) {
        return <Loader />
    }
    return (
        <div className='AdminLearningPaths'>
            <AdminHeaderTabs
                tabsList={role === "Admin" ? tabsList : tabsListHrBuddy}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className='AdminLearningPathsDiv'>

                {selectedTab === 0 &&
                    <div className='courseListContainer'>
                        <div className='lpListHeader'>
                            <span>Role List</span>
                            <div className='lpListHeaderRight'>
                                {
                                    (selectedTab === 0 && celebalMentors?.length > 0)
                                    &&
                                    <SearchBox
                                        placeholder={"Search By Role or name"}
                                        searchQuery={searchQueryCelebal}
                                        setSearchQuery={setSearchQueryCelebal}
                                    />
                                }

                                {selectedTab === 0 &&
                                    <img
                                        style={{ cursor: "pointer", position: "relative" }}
                                        src={filter}
                                        alt=''
                                        onClick={() => setShowFilter(!showFilter)}
                                    />}
                                {showFilter &&

                                    <FilterComponent
                                        filterList={staticdata}
                                        showFilter={showFilter}
                                        setShowFilter={setShowFilter}
                                        selectFilter={selectFilter}
                                        setSelectFilter={setSelectFilter}
                                        getCelebalMentorsApi={getCelebalMentorsApi}
                                    />}
                                <HeaderButton
                                    show={show}
                                    setShow={setShow}
                                    text={role === "Admin" ? "Add Celebal Role" : "Add CT Mentor"} />
                            </div>
                        </div>
                        {
                            role === "Admin" ?
                                <AddRoleModal
                                    text="Celebal"
                                    show={show}
                                    setShow={setShow}
                                    getCelebalMentorsApi={getCelebalMentorsApi}
                                    getCollegeMentorsApi={getCollegeMentorsApi}
                                />
                                :
                                <AddHrRoleModal
                                    text="Celebal"
                                    show={show}
                                    setShow={setShow}
                                    getCelebalMentorsApi={getCelebalMentorsApi}
                                    getCollegeMentorsApi={getCollegeMentorsApi}
                                />
                        }
                        <div className='RoleList'>
                            {
                                filteredCelebalRoleList?.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr className='headingRow'>
                                                <th>No.</th>
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Email Id</th>
                                                <th>Domain</th>
                                                <th>College</th>
                                                <th>Added By</th>
                                                <th>Added On</th>
                                                {localStorage.getItem("role") === 'Admin' && <th>Actions</th>}
                                            </tr>
                                        </thead>

                                        <tbody className='tbodyAdminTable'>
                                            {
                                                filteredCelebalRoleList?.map((item, index) => (
                                                    <tr className='tableRowadmin' key={index}>
                                                        <td>{index + 1}</td>
                                                        <td >{item?.fullName}</td>
                                                        <td >{item?.role}</td>
                                                        <td>{item?.emailId}</td>
                                                        <td>{item?.Domain || "NA"}</td>
                                                        <td>{item?.CollegeName || "NA"}</td>
                                                        <td >{item?.added_by}</td>
                                                        <td>{item?.added_on}</td>
                                                        {localStorage.getItem("role") === 'Admin' && <td
                                                            style={{
                                                                cursor: "pointer",
                                                                // textAlign:'center'
                                                            }}
                                                            onClick={() => {
                                                                setRoleId(item?.id)
                                                                setShowDeleteModal(!showDeleteModal)
                                                                setUserType(item?.role)
                                                            }} ><img src={deleteIcon} alt='' /></td>}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <DeleteModal
                                            show={showDeleteModal}
                                            setShow={setShowDeleteModal}
                                            roleId={roleId}
                                            userType={userType}
                                            isCelebal={selectedTab === 0}
                                            getCelebalMentorsApi={getCelebalMentorsApi}
                                            getCollegeMentorsApi={getCollegeMentorsApi}
                                        />
                                    </table>
                                ) : (
                                    <div className='NoLPdata'>
                                        <img src={EmptyLearningPath} alt='' />
                                    </div>
                                )
                            }


                        </div>

                    </div>
                }
                {selectedTab === 1 &&
                    <div className='courseListContainer'>
                        <div className='lpListHeader'>
                            <span>Role List</span>
                            <div className='lpListHeaderRight'>
                                {
                                    (selectedTab === 1 && collegeMentors?.length > 0) &&
                                    <SearchBox
                                        placeholder={"Search By Name"}
                                        searchQuery={searchQueryCollege}
                                        setSearchQuery={setSearchQueryCollege}
                                    />}
                                {selectedTab === 1 &&
                                    <img
                                        style={{ cursor: "pointer", position: "relative" }}
                                        src={filter}
                                        alt=''
                                        onClick={() => setShowFilter(!showFilter)}
                                    />}
                                {showFilter &&

                                    <FilterComponent
                                        filterList={staticdata}
                                        showFilter={showFilter}
                                        setShowFilter={setShowFilter}
                                        selectFilter={selectFilter}
                                        setSelectFilter={setSelectFilter}
                                        getCelebalMentorsApi={getCollegeMentorsApi}
                                    />}
                                <HeaderButton
                                    show={show}
                                    setShow={setShow}
                                    text={role === "Admin" ? "Add College Role" : "Add College Faculty"} />
                            </div>
                        </div>


                        {
                            role === "Admin" ?
                                <AddRoleModal
                                    text="College"
                                    show={show}
                                    setShow={setShow}
                                    getCelebalMentorsApi={getCelebalMentorsApi}
                                    getCollegeMentorsApi={getCollegeMentorsApi}
                                />
                                :
                                <AddHrRoleModal
                                    text="College"
                                    show={show}
                                    setShow={setShow}
                                    getCelebalMentorsApi={getCelebalMentorsApi}
                                    getCollegeMentorsApi={getCollegeMentorsApi}
                                />
                        }


                        <div className='RoleList'>
                            {
                                filteredCollegeRoleList?.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr className='headingRow'>
                                                <th>No.</th>
                                                <th>Faculty Name</th>
                                                <th>Domain</th>
                                                <th>Contact No.</th>
                                                <th>EmailID</th>
                                                <th>College Name</th>
                                                <th>Added By</th>
                                                <th>Added On</th>
                                                {localStorage.getItem("role") === 'Admin' && <th>Action</th>}
                                            </tr>
                                        </thead>

                                        <tbody className='tbodyAdminTable'>
                                            {
                                                filteredCollegeRoleList?.map((item, index) => (
                                                    <tr className='tableRowadmin' key={index}>
                                                        <td >{index + 1}</td>
                                                        <td >{item?.fullName}</td>
                                                        <td >{item?.domain}</td>
                                                        <td >{item?.contact}</td>
                                                        <td >{item?.emailId}</td>
                                                        <td>{item?.collegeName}</td>
                                                        <td >{item?.added_by}</td>
                                                        <td>{item?.added_on}</td>
                                                        {localStorage.getItem("role") === 'Admin' && <td
                                                            style={{
                                                                cursor: "pointer",
                                                                // textAlign:"center"
                                                            }}
                                                            onClick={() => {
                                                                setRoleId(item?.id)
                                                                setShowDeleteModal(!showDeleteModal)
                                                            }} ><img src={deleteIcon} alt='' /></td>}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <DeleteModal
                                            show={showDeleteModal}
                                            setShow={setShowDeleteModal}
                                            roleId={roleId}
                                            isCelebal={selectedTab === 0}
                                            getCelebalMentorsApi={getCelebalMentorsApi}
                                            getCollegeMentorsApi={getCollegeMentorsApi}
                                        />
                                    </table>
                                ) : (
                                    <div className='NoLPdata'>
                                        <img src={EmptyLearningPath} alt='' />
                                    </div>
                                )
                            }
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default AdminRoleManagement