import React, { useContext } from 'react'
import "./HeaderButton.css"
import { plus } from '../../Assets/globalIcons'
import { GlobalContext } from '../../Context/GlobalContext'
import toast from 'react-hot-toast'
const HeaderButton = ({ show, setShow, text }) => {
  const { staticdata } = useContext(GlobalContext)
  const role = localStorage.getItem("role");
  const TextArr = ["Add College Role", "Add College Faculty", "Add Celebal Role", "Add CT Mentor"]
  return (
    <button onClick={() => {
      if ((role === "Admin" || role === "HR Buddy") && TextArr.includes(text)) {
        if (staticdata?.colleges?.length > 0 && staticdata?.Domain?.length > 0) {
          setShow(!show)
        }
        else {
          toast.dismiss();
          toast.error("Please add Domain and College first")
        }
      }
      else {
        setShow(!show)
      }
    }} className='HeaderButton'>
      {text}
      <img src={plus} alt='plus' />
    </button>
  )
}
export default HeaderButton