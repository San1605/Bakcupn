import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import profile from "../../assets/profile.svg"
import bell from "../../assets/bell.svg"
import NotificationModal from '../NotificationModal/NotificationModal'
import { GlobalContext } from '../../context/GlobalContext'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../FireBaseLogin/Firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const { socket, NotificationArray } = useContext(GlobalContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/uploadexcel")
        const uid = user.uid;
        // ...
      } else {
        navigate("/firebase")
      }
    });
    return () => { unsubscribe() }
  }, [])

  // useEffect(() => {
  //   if (Object.keys(socket).length > 0) {
  //     socket.on("", (count) => {
  //       console.log(count);
  //       setNotificationCount(count);
  //     })
  //   }
  // }, [socket])

  const handleClickImage = () => {
    setShowModal(true)
    // socket.emit("allread");
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className='navbarDev'>
      <div>
        Welcome sandesh
      </div>
      <button onClick={handleLogout}>Sign out</button>
      <div className='imgDiv'>
        <div className='notificationCountDiv'>
          <div className='notificationCount'>
            <span>{NotificationArray?.length}</span>
          </div>
          <img className='bellImg' src={bell} alt="notification" onClick={handleClickImage} />
        </div>
        <img className='profileimg' src={profile} alt="profile" />
      </div>
      {
        showModal &&
        <NotificationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      }
    </div>
  )
}

export default Navbar
