import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./form.css"

const Form = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col lg:h-[28.5rem] w-[27rem] formclass'>
            <div >
                <h1 className='font-bold  leading-8  font-sans text-2xl account'>Account Login</h1>
                <p className='mt-[0.5rem] font-normal text-[#6D6D6D] font-sans text-base paragraph'>
                    If you are already a member you can login with your email address and password.
                </p>
            </div>

            <form className='flex flex-col justify-around'>
                <label className='mt-[2rem] mb-[0.5rem] text-[16px] text-[#696F79] font-sans font-medium emailResp'> Email address</label>
                <input className='border border-[#8692A6] h-[2.625rem]  rounded-[6px] ' type="email" />
                <label className='mt-[1rem] mb-[0.5rem] text-[16px] text-[#696F79] font-sans font-medium passResp' >Password</label>
                <input className='border border-[#8692A6] h-[2.625rem]  rounded-[6px]' type="password" />
                <div className='flex flex-row mt-[1rem] mb-[2rem] emailResp'>
                    <input className='border border-black  ' value="test" type="checkbox" />
                    <label className='ml-[0.5rem] text-[16px] text-[#696F79] font-sans font-medium resptext' htmlFor="">Remember me </label>
                </div>
                <button className='h-[4rem]  rounded-[6px] bg-[#5B5FC7] text-white loginBtnResp' onClick={() => navigate("/home")}>Login</button>
                <div className='mt-[1rem] text-[16px] text-[#696F79] font-sans font-medium resptext textResp'>Dont have an account ? <span className='text-[16px] textResp text-[#2C73EB] font-sans font-medium '>Sign up here </span>
                </div>
            </form>
        </div>
    )
}

export default Form
