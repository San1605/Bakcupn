import React, { useEffect, useState } from 'react'
import "./manageUser.css"

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CreateUserModal from '../../components/CreateUserModal/CreateUserModal'

import { baseUrl } from '../../config'

import { setSelectedEmail, setUserList } from '../../redux/actions'

import adduserIcon from '../../assets/adduserIcon.svg'
// import sort from "../../assets/sort.svg"
import searchIcon from "../../assets/searchIcon.svg"
import PrevInActive from '../../assets/previous-inactive.svg'
import PrevActive from '../../assets/previous-active.svg'
import NextInActive from '../../assets/next-inactive.svg'
import NextActive from '../../assets/next-active.svg'

const ManageUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userArray = useSelector((store) => store.userList)
    const role = localStorage.getItem("user-role")
    const region = localStorage.getItem("user-region")

    const [currentPage, setCurrentPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1);

    const [totalPage, setTotalPage] = useState(null);
    const [totalData, setTotalData] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [totalSearchPage, setTotalSearchPage] = useState(null);
    const [totalSearchData, setTotalSearchData] = useState(null);

    const [filteredArray, setFilteredArray] = useState([]);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [query, setQuery] = useState('');
    const [sortOrder, setSortOrder] = useState("asc")

    useEffect(() => {
        searchQuery()
    }, [searchPage])

    useEffect(() => {
        fetchUser()
    }, [currentPage])

    useEffect(() => {
        setFilteredArray(userArray)
    }, [userArray])


    const handleSearch = () => {
        // if (userArray?.length > 0) {
        //     const arr = userArray?.filter(
        //         (item) =>
        //             item.user_name.toLowerCase().includes(query.toLowerCase()) ||
        //             item.user_email.toLowerCase().includes(query.toLowerCase())
        //     );
        //     setFilteredArray(arr);
        // }
    }

    // const handleSort = () => {
    //     const sortedArray = [...filteredArray].sort((a, b) => {
    //         const nameA = a.user_name.toLowerCase();
    //         const nameB = b.user_name.toLowerCase();
    //         if (sortOrder === 'asc') {
    //             return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    //         } else {
    //             return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    //         }
    //     });
    //     setFilteredArray(sortedArray);
    //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    // };

    // useEffect(() => {
    //     handleSearch()
    // }, [query]);


    const fetchUser = () => {

        let data = new FormData();
        data.append('region', region);
        data.append('role', role);
        data.append('page_number', currentPage);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/users_detail_with_role`,
            data: data
        };

        axios(config)
            .then((response) => {
                setTotalPage(Math.ceil(response.data.data.total_count / 10));
                setTotalData(response.data.data.total_count);
                dispatch(setUserList(response.data.data.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handlePagination = (val, type) => {
        if (type === 'search') {
            setSearchData([])
            setSearchPage(searchPage + val)
        } else {
            dispatch(setUserList([]))
            setCurrentPage(currentPage + val)
        }
    }

    const handleUserProfile = (user, email) => {
        navigate(`/user-profile/${user}`)
        dispatch(setSelectedEmail(email))
    }

    const searchQuery = value => {
        if (value === '') {
            setQuery(value)
            setSearchData([])
            setSearchPage(1)
            setCurrentPage(1);
            return
        }
        dispatch(setUserList([]))
        setQuery(value)
        let data = new FormData();
        data.append('search_name', value);
        data.append('region', region);
        data.append('role', role);
        data.append('page_number', searchPage);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/searchUser`,
            data: data
        };

        axios(config)
            .then((response) => {
                if (response.data.data.data) {
                    setSearchData(response.data.data.data)
                    setTotalSearchPage(Math.ceil(response.data.data.total_count / 10));
                    setTotalSearchData(response.data.data.total_count);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='manageuser'>
            <div className="header">
                <div className='manageuserHeading'>
                    <div className='manageuserHeading1'>Manage Users</div>
                    <div className='manageuserHeading2'>Region : {region}</div>
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
                            <input type="text" placeholder='Search by name or email ID' value={query} onChange={(e) => searchQuery(e.target.value)} />
                        </div>
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
                            {searchData.length === 0 ?
                                userArray?.map((item, index) => (
                                    <tr onClick={() => handleUserProfile(item?.user_name, item?.user_email)} className='tableRowadmin' key={index}>
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
                                )) : searchData?.map((item, index) => (
                                    <tr onClick={() => handleUserProfile(item?.user_name, item?.user_email)} className='tableRowadmin' key={index}>
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

                </div>
                {
                    searchData.length === 0 ?
                        <div className='paginationContainer'>
                            <img
                                className={(currentPage === 1) ? 'noAccess' : ''}
                                src={(currentPage === 1) ? PrevInActive : PrevActive}
                                onClick={() => handlePagination(-1, 'basic')}
                                alt='Prev'
                            />
                            <span className='paginationText'>
                                {(currentPage - 1) * 10 + 1}-{(((currentPage - 1) * 10 + 10) > totalData) ? totalData : ((currentPage - 1) * 10 + 10)} of {totalData}
                            </span>
                            {console.log("tp>>>", totalPage)}
                            <img
                                className={(currentPage === totalPage) ? 'noAccess' : ''}
                                src={(currentPage === totalPage) ? NextInActive : NextActive}
                                onClick={() => handlePagination(1, 'basic')}
                                alt='Next'
                            />
                        </div>
                        :
                        <div className='paginationContainer'>
                            <img
                                className={(searchPage === 1) ? 'noAccess' : ''}
                                src={(searchPage === 1) ? PrevInActive : PrevActive}
                                onClick={() => handlePagination(-1, 'search')}
                                alt='Prev'
                            />
                            <span className='paginationText'>
                                {(searchPage - 1) * 10 + 1}-{(((searchPage - 1) * 10 + 10) > totalSearchData) ? totalSearchData : ((searchPage - 1) * 10 + 10)} of {totalSearchData}
                            </span>
                            <img
                                className={(searchPage === totalSearchPage) ? 'noAccess' : ''}
                                src={(searchPage === totalSearchPage) ? NextInActive : NextActive}
                                onClick={() => handlePagination(1, 'search')}
                                alt='Next'
                            />
                        </div>
                }
            </div>

        </div>
    )
}

export default ManageUser
