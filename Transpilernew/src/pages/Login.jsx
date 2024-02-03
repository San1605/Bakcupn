import React, { useContext, useState } from "react";
import loginBg from "../assets/img/login_bg.png";
import ctLogo from "../assets/icons/logo.svg";
import loginbgImg from "../assets/svg/login-bl.svg";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { globalContext } from "../context/globalContext";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(globalContext)



  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = () => {
    if (!isEmailValid(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address");
    } else if (!isPasswordValid(password)) {
      toast.dismiss();
      toast.error("Password should be at least 6 characters long");
    } else {
      // Form is valid, proceed with login
      console.log(password, email, "data inside login");
      handleLogin(email, password);
      // navigate("/home");
    }
  };



  // const handleSubmit = () => {
  //   if (!email || !password) {
  //     toast.error("Please enter credentials to login");
  //     return;
  //   }
  //   if (email === "admin@celebaltech.com" && password === "1234567") {
  //     toast.success("Login Successfully!");
  //     navigate("/home");
  //   } else {
  //     toast.error("Invalid credentials");
  //   }
  // };


  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Toaster />
      <div className="w-5/12 h-full bg-[#F8FAFB] relative flex flex-col p-2 gap-8">
        <div className="h-[50px] flex items-center justify-start px-3">
          <img src={ctLogo} alt="ctLogo" />
        </div>
        <div className="flex flex-col px-6 gap-12 items-center">
          <div className="flex flex-col w-full">
            <p className="font-bold text-[34px] text-[#242424]">Login</p>
            <p className="text-sm text-[#828282] ps-[2px]">
              Please enter the following details to login
            </p>
          </div>
          <div className="flex flex-col gap-4 w-10/12">
            <div className="flex flex-col gap-1">
              <label
                className="text-[#242424] font-semibold text-sm"
                htmlFor="email"
              >
                Email Id
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="py-2 px-2.5 border border-[#D0D5DD] text-sm rounded focus-visible:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-[#242424] font-semibold text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="py-2 px-2.5 border border-[#D0D5DD] text-sm rounded focus-visible:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              className="bg-[#2D9596] mt-2 text-sm py-2 rounded flex items-center justify-center text-white font-medium cursor-pointer"
              onClick={handleSubmit}
            >
              Login
            </div>
            <p className="mt-2 text-center">
              Don’t have an account{" "}
              <span className="text-[#251C88] font-bold underline underline-offset-2" onClick={() => navigate("/signUp")}>
                Register now
              </span>
            </p>
            <img
              src={loginbgImg}
              alt="loginbgImg"
              className="absolute bottom-[-4px] left-[-12px]"
            />
          </div>
        </div>
      </div>
      <div
        className="w-7/12 h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>
    </div>
  );
};

export default Login;
