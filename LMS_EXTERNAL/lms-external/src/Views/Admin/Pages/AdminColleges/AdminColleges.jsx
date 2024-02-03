import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./AdminColleges.css"
import { gridViewIcon, listViewIcon, listViewIconFill, gridViewIconFill } from "../../Assets/adminIcons"
import HeaderButton from '../../../../Components/HeaderButton/HeaderButton'
import SearchBox from '../../../../Components/SearchBox/SearchBox'
import AdminAddColleges from '../../Components/AdminAddColleges/AdminAddColleges'
import toast from "react-hot-toast"
import { GlobalContext } from '../../../../Context/GlobalContext'
import Loader from '../../../../Utils/Loader/Loader'
import { adminActions } from '../../Context/AdminAction'
import AdminCollegesList from '../../Components/AdminCollegeList/AdminCollegeList'
import AdminCollegesGrid from '../../Components/AdminCollegeGrid/AdminCollegeGrid'


const AdminColleges = () => {
    const [show, setShow] = useState(false);
    const [listView, setListView] = useState("grid");
    const { getAllColleges, deleteColleges, dispatch, collegeList, loading, setLoading } = useContext(GlobalContext)
    const [filteredCollege, setFilteredCollege] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const role = localStorage.getItem("role")
    const getCollegeData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getAllColleges();
            dispatch({
                type: adminActions.GET_COLLEGES,
                payload: res?.data,
            });
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }, [dispatch, getAllColleges]);

    const handleSearch = (list, input) => {
        return list.filter(item =>
            item?.collegeName.toLowerCase().includes(input?.toLowerCase())
        );
    };

    const deleteCollegeApi = useCallback(async (id) => {
        const toastId = toast.loading('Deleting Colleges');
        try {
            await deleteColleges(id);
            toast.dismiss(toastId);
            toast.success("Successfully deleted");
            getCollegeData();
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }, [deleteColleges, getCollegeData]);




    useEffect(() => {
        const arr = handleSearch(collegeList, searchQuery);
        setFilteredCollege(arr)
    }, [searchQuery]);



    useEffect(() => {
        setFilteredCollege(collegeList)
    }, [collegeList])

    useEffect(() => {
        if (collegeList?.length === 0) {
            getCollegeData();
        }
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [])

    const handleDocumentClick = (e) => {
        if (document.getElementById("addCollegeOverlay")?.contains(e.target) && !document.getElementById('addCollege')?.contains(e.target)) {
            setShow(false);
        }
    };


    if (loading) {
        return <Loader />
    }

    return (
        <div className='adminCollegesPage'>
            <div className='adminColleges'>
                <div className="adminCollegeHeader">
                    {collegeList?.length > 0 ? <SearchBox
                        placeholder="Search by College Name"
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    /> : <div></div>
                    }
                    <div className="adminCollegeHeaderIcons">
                        {role === "Admin" && <HeaderButton
                            show={show}
                            setShow={setShow}
                            text="Add College" />}
                        <img style={{ cursor: "pointer" }} onClick={() => setListView("grid")} src={listView === "grid" ? gridViewIconFill : gridViewIcon} alt='gridViewIcon' />
                        <img style={{ cursor: "pointer" }} onClick={() => setListView("list")} src={listView === "list" ? listViewIconFill : listViewIcon} alt='listViewIcon' />

                    </div>
                </div>
                <AdminAddColleges
                    show={show}
                    setShow={setShow}
                    type="College"
                    getApi={getCollegeData}
                />
                <div className='adminCollegeList'>
                    {
                        listView === "grid" ?
                            <AdminCollegesGrid collegesData={filteredCollege} deleteApi={deleteCollegeApi} />
                            :
                            <AdminCollegesList collegesData={filteredCollege} deleteApi={deleteCollegeApi} />
                    }
                </div>
            </div>
        </div>
    )
}
export default AdminColleges