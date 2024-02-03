import React, { useEffect, useState } from 'react'
import "./ManageUser.css"
import adduserIcon from '../../assets/adduserIcon.svg'
import sort from "../../assets/sort.svg"
import searchIcon from "../../assets/searchIcon.svg"
import CreateUserModal from '../CreateUserModal/CreateUserModal'
const ManageUser = () => {

    const tableData = [
        { SNo: 1, Name: "Aarav Patel", EmailID: "aarav@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-09", Validity: "Valid", Status: "Active" },
        { SNo: 2, Name: "Ishita Sharma", EmailID: "ishita@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-10", Validity: "Invalid", Status: "Inactive" },
        { SNo: 3, Name: "Arjun Singh", EmailID: "arjun@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-11", Validity: "Valid", Status: "Active" },
        { SNo: 4, Name: "Ananya Verma", EmailID: "ananya@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-12", Validity: "Invalid", Status: "Inactive" },
        { SNo: 5, Name: "Rahul Gupta", EmailID: "rahul@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-13", Validity: "Valid", Status: "Active" },
        { SNo: 6, Name: "Aisha Kapoor", EmailID: "aisha@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-14", Validity: "Invalid", Status: "Inactive" },
        { SNo: 7, Name: "Vikram Singh", EmailID: "vikram@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-15", Validity: "Valid", Status: "Active" },
        { SNo: 8, Name: "Meera Nair", EmailID: "meera@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-16", Validity: "Invalid", Status: "Inactive" },
        { SNo: 9, Name: "Aryan Joshi", EmailID: "aryan@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-17", Validity: "Valid", Status: "Active" },
        { SNo: 10, Name: "Neha Singh", EmailID: "neha@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-18", Validity: "Invalid", Status: "Inactive" },
        { SNo: 11, Name: "Aditya Rajput", EmailID: "aditya@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-19", Validity: "Valid", Status: "Active" },
        { SNo: 12, Name: "Kavya Sharma", EmailID: "kavya@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-20", Validity: "Invalid", Status: "Inactive" },
        { SNo: 13, Name: "Amit Kapoor", EmailID: "amit@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-21", Validity: "Valid", Status: "Active" },
        { SNo: 14, Name: "Sanya Nanda", EmailID: "sanya@example.com", LastUpdatedBy: "User", LastUpdatedOn: "2023-11-22", Validity: "Invalid", Status: "Inactive" },
        { SNo: 15, Name: "Varun Sharma", EmailID: "varun@example.com", LastUpdatedBy: "Admin", LastUpdatedOn: "2023-11-23", Validity: "Valid", Status: "Active" },
    ];

    const [query, setQuery] = useState('');
    const [adminData, setAdminData] = useState(tableData);
    const [filteredArray, setFilteredArray] = useState(tableData);
    const [sortOrder, setSortOrder] = useState("asc")
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    const handleSearch = () => {
        const arr = adminData.filter(
            (item) =>
                item.Name.toLowerCase().includes(query.toLowerCase()) ||
                item.EmailID.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredArray(arr);
    }
    const handleSort = () => {
        const sortedArray = [...filteredArray].sort((a, b) => {
            const nameA = a.Name.toLowerCase();
            const nameB = b.Name.toLowerCase();
            if (sortOrder === 'asc') {
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            } else {
                return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
            }
        });
        setFilteredArray(sortedArray);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    useEffect(() => {
        handleSearch()
    }, [query])

    return (
        <div className='manageuser'>
            <div className="header">
                <div className='manageuserHeading'>
                    <div className='manageuserHeading1'>Manage Users</div>
                    <div className='manageuserHeading2'>Region : Singapore</div>
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
                            <input type="text" placeholder='Search by name or email ID' value={query} onChange={(e) => setQuery(e.target.value)} />
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
                                <th>Last updated by</th>
                                <th>Last updated On </th>
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
                                    <tr className='tableRowadmin' key={index}>
                                        <td style={{
                                            borderBottomLeftRadius: "10px",
                                            borderTopLeftRadius: "10px"
                                        }}>{item?.SNo}</td>
                                        <td>{item?.Name}</td>
                                        <td>{item?.EmailID}</td>
                                        <td>{item?.LastUpdatedBy}</td>
                                        <td>{item?.LastUpdatedOn}</td>
                                        <td>{item?.Validity}</td>
                                        <td style={{
                                            borderBottomRightRadius: "10px",
                                            borderTopRightRadius: "10px"
                                        }}>{item?.Status}</td>
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

export default ManageUser
