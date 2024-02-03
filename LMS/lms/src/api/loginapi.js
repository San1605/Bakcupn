import axios from "axios";

export const LoginApi=async(authToken)=>{
    let config={
      method:"post",
      url:"https://3e4e-103-137-84-126.ngrok-free.app/api/loginuser",
      headers: {
        Authorization:`Bearer ${authToken}`
      }
    }
    try{
        const res=await axios(config);
        return res.data
    }
    catch(error)
    {
        console.log(error)
        throw error.response.data.error;
    }
}

export const profileApi=async(authToken)=>{
    let config={
        method:"get",
        url:`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authToken}`,
        header:{
            Authorization:`Bearer ${authToken}`,
            Accept: 'application/json'
        }
    }
    try{
      const res=await axios(config);
      return res.data
    }
    catch(error){
        console.log(error)
    }
}