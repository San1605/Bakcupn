import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import React, { useState, useEffect } from 'react'
import { LoginApi} from '../../api/loginapi';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [user, setUser] = useState([]);

  const navigate = useNavigate()
  const loginFunc = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      // console.log(codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error)
  });



  const loginApi = async () => {
    try {
      const res = await LoginApi(user.access_token)
      console.log(res)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loginApi()
  }, [user])

  if(user.access_token){
    navigate("/profile" , {
      state: {
        access_token:user.access_token
      }
    } );
  }
  return (
    <div>
      <h1>Google Login</h1>
      <button onClick={() => loginFunc()}>sign in with google</button>
      <button onClick={() => googleLogout()}>Logout</button>
    </div>
  )
}
export default Login