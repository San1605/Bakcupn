import React, { useContext } from 'react'
import "./AdminHeaderTabs.css"
import { GlobalContext } from '../../Context/GlobalContext'
import { adminActions } from '../../Views/Admin/Context/AdminAction'
const AdminHeaderTabs = ({ tabsList, selectedTab, setSelectedTab }) => {
    const {dispatch } = useContext(GlobalContext)
    const handleSelected = (index) => {
        setSelectedTab(index)
        dispatch({
            type: adminActions.SET_SELECTED_TAB,
            payload: index
        })
    }
    return (
        <div className='AdminHeaderTabs'>
            <div className='tabs'>
                {
                    tabsList?.map((item, index) => (
                        <div key={index} className={`tab ${selectedTab === index && "selectedTab"}`} onClick={() => handleSelected(index)}>{item}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminHeaderTabs
