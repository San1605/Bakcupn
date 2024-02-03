import React, { useState } from "react";
import LOGIN_BG from "../../assets/pnbAssets/loginBg.png";
import LOGO from "../../assets/pnbAssets/pnbLogo.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/services/api";
import toast from "react-hot-toast";
import { AppContext } from "../../utils/Context/AppContext";
import { useContext } from "react";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";
const Login = () => {
  let toastId;
  const { appData, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    userId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visiblePass, setVisiblePass] = useState("password");
  const [invalidUserId, setInvalidUserId] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const updatePayload = (e) => {
    setInvalidUserId("");
    setInvalidPassword("");
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let isUserIdValid = validateFormInput("userId", payload?.userId);
    let isPasswordValid = validateFormInput("password", payload?.password);
    setInvalidUserId(isUserIdValid);
    setInvalidPassword(isPasswordValid);
    if (!isUserIdValid && !isPasswordValid) {
      setLoading(true);
      toast.dismiss(toastId);
      toastId = toast.loading("loading...");
      try {
        const response = await login(payload.userId, payload.password);
        // console.log("login api response ====>", response);
        localStorage.setItem("tab", response?.data[0]?.tab);
        localStorage.setItem("authToken", response?.data[0]?.token);
        localStorage.setItem("userName", response?.data[0]?.username);
        dispatch({
          type: "AUTH_TOKEN",
          payload: response?.data[0]?.token,
        });
        dispatch({
          type: "AI_CONVERSER_CHAT",
          payload: response?.data[1]?.ai_driven?.reverse(),
        });
        dispatch({
          type: "DATA_DRIVEN_CHAT",
          payload: response?.data[1]?.data_driven?.reverse(),
        });
        toast.dismiss(toastId);
        // if (response?.data[1]?.ai_driven.length > 0) {
        //   navigate("/ai_converser?conversation_id=0");
        // } else {
        navigate("/data_driven_chat?new_conversation");
        // }
      } catch (err) {
        toast.dismiss(toastId);
        // console.log(err);
        // console.log(err?.message);
        // console.log(err?.message == "Authentication Failed ");
        if (err?.message == "Authentication Failed ") {
          toastId = toast.error("Invalid Credentials");
        } else if (err?.message == "Check User ID or Password") {
          toastId = toast.error("Invalid Credentials");
        } else {
          toastId = toast.error("Some error");
        }
        // console.log("catch===>", err);
      }
      setLoading(false);
    }
    // localStorage.setItem("authToken","dummy_token")
    // navigate("/data_driven_chat?new_conversation");
  };

  return (
    <div className="login-page h-full w-full">
      <div className="flex h-full h-full">
        <div className="hidden md:flex sm:w-[50%] bg-[#FBFCFF] h-full flex items-center justify-center">
          <img className="h-full w-full" src={LOGIN_BG} alt="" />
        </div>
        <div className="w-full sm:w-[50%] bg-white-900 h-full flex items-center lg:pl-[8rem] md:pl-[2rem] justify-center md:justify-start">
          <div className="h-3/5 lg:w-9/12 md:w-11/12 w-10/12 max-w-[31rem] pt-4">
            <div>
              <img className="" src={LOGO} alt="" />
            </div>
            <div className="login-form mt-6">
              <h4 className="font-[400] text-[var(--black)] text-2xl w-[80%] ">
                Login
              </h4>
              <h4 className="text-[var(--black)] text-[14px]">
                Welcome to PNB chatbot, please below your details to initiate
                conversation with the bot
              </h4>
              <form onSubmit={handleLogin}>
                <div className="mt-2 h-[77px]">
                  <label className="text-sm">Email</label>
                  <input
                    className={`bg-[#FCFCFC] border-[1px] border-[#DDD] w-full p-2 text-sm rounded-[4px] login-input ${
                      invalidUserId ? "incorrect-input" : ""
                    }`}
                    name="userId"
                    value={payload?.userId}
                    placeholder="Enter your User Id"
                    onChange={updatePayload}
                    autoComplete="off"
                  />
                  {invalidUserId && (
                    <div className="errorMessage ">{invalidUserId}</div>
                  )}
                </div>
                <div className="h-[77px]">
                  <label className="text-sm">Password</label>
                  <div className="relative">
                    <input
                      className={`bg-[#FCFCFC] border-[1px] border-[#DDD] w-full p-2 text-sm rounded-[4px] login-input ${
                        invalidPassword ? "incorrect-input" : ""
                      }`}
                      type={visiblePass}
                      name="password"
                      value={payload?.password}
                      placeholder="Enter your password"
                      onChange={updatePayload}
                      autoComplete="off"
                    />
                    <div className="absolute right-[12px] top-[50%] transform translate-y-[-8px] h-100 w-fit cursor-pointer">
                      {payload.password.length > 0 && (
                        <>
                          {visiblePass === "text" ? (
                            <img
                              className="h-[16px]"
                              src={view}
                              alt=""
                              onClick={() => {
                                setVisiblePass("password");
                              }}
                            />
                          ) : (
                            <img
                              className="h-[16px]"
                              src={hide}
                              alt=""
                              onClick={() => setVisiblePass("text")}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {invalidPassword && (
                    <div className="errorMessage">{invalidPassword}</div>
                  )}
                </div>
                <div className="mt-5">
                  <button
                    className="bg-[#0061AE] text-white px-20 w-full mt-1 py-[10px] rounded-[4px]"
                    type="submit"
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const validateFormInput = (name, value) => {
  switch (name) {
    case "userId": {
      if (value?.length == 0) {
        return "User ID is required.";
      } else {
        return "";
      }
    }
    case "password": {
      if (value?.length === 0) {
        return "Password is required";
      } else {
        return "";
      }
    }

    default: {
      if (value?.length === 0) {
        return `${name} is required`;
      } else {
        return "";
      }
    }
  }
};
