import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { profileApi } from '../../api/loginapi';

const Profile = () => {
  const [profile, setprofile] = useState();
  const location = useLocation();
  const access_token = location.state.access_token

  const getProfile = async () => {
    try {
      const res = await profileApi(access_token);
      setprofile(res);
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProfile()
  }, [access_token])
  return (
    <div>
      <h1>{profile?.name}</h1>
      <h1>{profile?.email}</h1>
  
      <img src={profile?.picture} alt="" />

    </div>
  )
}

export default Profile
