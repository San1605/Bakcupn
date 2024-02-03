import React, { useEffect, useRef, useState } from 'react'
import "./AdminPage.css"
import adduserIcon from '../../assets/adduserIcon.svg'
import sort from "../../assets/sort.svg"
import searchIcon from "../../assets/searchIcon.svg"
import leftArrow from "../../assets/leftArrow.svg"
import rightArrow from "../../assets/rightArrow.svg"
import CreateUserModal from '../../components/CreateUserModal/CreateUserModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { addUsers } from '../../redux/actions'
const AdminPage = () => {
    const navigate = useNavigate()
    const userArray = useSelector((store) => store.userArray)
    const [query, setQuery] = useState('');
    const searchValueInput = useRef(null);
    // const [adminData, setAdminData] = useState(userArray);
    const [filteredArray, setFilteredArray] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc")
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const userRegion = localStorage.getItem("user-region")
    const userRole = localStorage.getItem("user-role")
    const [pageNo, setPageNo] = useState(1);
    const dispatch = useDispatch();
    const [totalPages, setTotalpages] = useState(0);

    const handleSearch = () => {
        if (userArray?.length > 0) {
            const arr = userArray?.filter(
                (item) =>
                    item.user_name.toLowerCase().includes(query.toLowerCase()) ||
                    item.user_email.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredArray(arr);
        }
    }
    const handleSort = () => {
        const sortedArray = [...filteredArray].sort((a, b) => {
            const nameA = a.user_name.toLowerCase();
            const nameB = b.user_name.toLowerCase();
            if (sortOrder === 'asc') {
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            } else {
                return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
            }
        });
        setFilteredArray(sortedArray);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const getAdminData = async () => {
        const data = new FormData();
        data.append("role", userRole);
        data.append("region", userRegion);
        data.append("page_number", pageNo);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/users_detail_with_role`,
            data: data
        };
        try {
            const response = await axios(config);
            if (response.status === 200) {
                console.log(response?.data?.data);
                const data = response.data
                if (data?.data) {
                    dispatch(addUsers(response?.data?.data?.data))
                    const total = response?.data?.data?.total_count;
                    if (total % 10 === 0) {
                        setTotalpages(total / 10)
                    }
                    else {
                        setTotalpages(Math.floor(total / 10) + 1)
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const searchQuery = async (query) => {
        const data = new FormData();
        data.append("role", userRole);
        data.append("region", userRegion);
        data.append("page_number", pageNo);
        data.append("search_name", query);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/searchUser`,
            data: data
        };
        try {
            const response = await axios(config);
            if (response.status === 200) {
                console.log(response?.data?.data);
                const data = response.data
                if (data?.data) {
                    dispatch(addUsers(response?.data?.data?.data))
                    const total = response?.data?.data?.total_count;
                    if (total % 10 === 0) {
                        setTotalpages(total / 10)
                    }
                    else {
                        setTotalpages(Math.floor(total / 10) + 1)
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }



    // useEffect(() => {
    //     // handleSearch()
    //     if (query?.length > 0) {
    //         searchQuery(query)
    //     }
    //     else {
    //         getAdminData()
    //     }

    // }, [query]);




    const handleSearchQuery = (...args) => {
        const query = args[0].target.value;
        console.log(searchValueInput.current.value, args, query, "query")
        if (query?.length > 0) {
            searchQuery(query)
        }
        else {
            getAdminData()
        }
    }

    const debounceFunc = (func, delay) => {
        let timer;
        return function (...args) {
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args)
            }, delay)
        }
    }

    const handleSearchDebounce = debounceFunc(handleSearchQuery, 300);



    useEffect(() => {
        getAdminData()
    }, [pageNo])

    useEffect(() => {
        setFilteredArray(userArray)
    }, [userArray])

    return (
        <div className='manageuser'>
            <div className="header">
                <div className='manageuserHeading'>
                    <div className='manageuserHeading1'>Manage Users</div>
                    <div className='manageuserHeading2'>Region : {userRegion}</div>
                </div>
                <button className='createuserbutton' onClick={() => setShowCreateUserModal(true)}>
                    <img src={adduserIcon} alt='' />
                    <span>create users</span>
                </button>
                <CreateUserModal
                    show={showCreateUserModal}
                    onHide={() => setShowCreateUserModal(false)}
                />
            </div>
            <div className='adminTableContainer'>
                <div className='adminTableUpper'>
                    <div className='adminTableUpperLeft'>
                        {/* <div className="adminTableUpperLeftUpper">
                            <div>Total users - 10</div>
                            <div>Total Admin - 10</div>
                        </div> */}
                        <div className="user">Users</div>
                    </div>

                    <div className='adminTableUpperRight'>
                        <div className="searchBar">
                            <img src={searchIcon} alt='' />
                            <input
                                ref={searchValueInput}
                                type="text"
                                placeholder='Search by name'
                                onChange={
                                    // setQuery(e.target.value)
                                    handleSearchDebounce
                                } />
                        </div>
                        <img style={{
                            marginRight: '2rem'
                        }} onClick={handleSort} src={sort} alt='' />
                    </div>
                </div>


                <div className='adminTableLower'>
                    <table>
                        <thead>
                            <tr className='headingRow'>
                                <th style={{
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px"
                                }}>S.No</th>
                                <th>Name</th>
                                <th>Email ID</th>
                                {/* <th>Last updated by</th>
                                <th>Last updated On </th> */}
                                <th>Validity</th>
                                <th style={{
                                    borderBottomRightRadius: "10px",
                                    borderTopRightRadius: "10px"
                                }}>Status </th>
                            </tr>
                        </thead>

                        <tbody className='tbodyAdminTable'>
                            {
                                filteredArray?.map((item, index) => (
                                    <tr onClick={() => navigate(`/manage-user-profile/${item?.user_name}`)} className='tableRowadmin' key={index}>
                                        <td style={{
                                            borderBottomLeftRadius: "10px",
                                            borderTopLeftRadius: "10px"
                                        }}>{index + 1}</td>
                                        <td>{item?.user_name}</td>
                                        <td>{item?.user_email}</td>
                                        {/* <td>{item?.LastUpdatedBy}</td>
                                        <td>{item?.LastUpdatedOn}</td> */}
                                        <td>{item?.user_last_day}</td>
                                        <td style={{
                                            borderBottomRightRadius: "10px",
                                            borderTopRightRadius: "10px"
                                        }}>{item?.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className='paginationBox'>
                        <span>Page</span>
                        <input type='text' value={pageNo} onChange={(e) => setPageNo(e.target.value)} />
                        <span>of {totalPages}</span>
                        <span onClick={() => {
                            if (pageNo > 1) {
                                setPageNo((prev) => prev - 1)
                            }
                        }}><img src={leftArrow} alt='' /></span>
                        <span onClick={() => {
                            if (pageNo < totalPages) {
                                setPageNo((prev) => prev + 1)
                            }
                        }}
                        ><img src={rightArrow} alt='' /></span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminPage