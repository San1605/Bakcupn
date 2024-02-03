import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import React from 'react'
import { loginRequest } from './MicrosoftADLogin'
import { useEffect } from 'react'

const LoginMicrosoft = () => {
    const { instance, accounts } = useMsal()
    const isauth = useIsAuthenticated()
    const handleClick = () => {
        instance.loginRedirect(loginRequest).catch((e) => {
            console.log(e);
        })
    }
    console.log(instance,"instance")
    console.log(accounts,"accounts")
    console.log(isauth,"isauth");

    const requestData=async()=>{
      const request={
        ...loginRequest,
        account:accounts[0]
      }
      await instance
      .acquireTokenSilent(request)
      .then((response)=>{
        const username = response.username
        localStorage.setItem("token",response.accessToken)
        localStorage.setItem("email",response.username)
      })
      .catch((Error) => {
        console.log(Error);
      });
    }

    useEffect(()=>{
        if(isauth){
            requestData();
        }
    })
    return (
        <div>
            <button onClick={handleClick}>Login</button>
            <button onClick={()=>{
                    instance.logoutRedirect({
                        postLogoutRedirectUri: "/",
                        mainWindowRedirectUri: "/",
                      });
            }}>logout</button>
        </div>
    )
}

export default LoginMicrosoft
