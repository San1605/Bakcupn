import React from 'react'
import Logo from "../../assets/Logo.png"
import "./Header.css"
import { useLocation } from 'react-router-dom';
const Header = () => {
    const location = useLocation();
    const isSecondPage = location.pathname === '/home';
    return (
        <div className='items-center justify-between flex flex-row h-[4.5rem] w-[100%] bg-white border-b-[1px] '>
            <div className=' flex flex-row  lg:ml-[4.25rem] w-[14.68rem] h-[3rem] headerNav '>
                <div className='flex items-center justify-start w-[50%] h-[100%] border-r-[1px]'>
                    <img className='w-[6.313rem]' src={Logo} alt="" srcset="" />
                </div>
                <div className='flex items-center justify-end w-[50%] h-[100%]'>
                    <span className='w-[6.125rem] text-lg text-[#5B5FC7] font-[600] text-[20px]'>Food Zone</span>
                </div>
            </div>
            {
                isSecondPage && <div className='rounded-[50rem] bg-[#5B5FC7] h-[42px] w-[42px] text-center flex items-center justify-center text-white text-[16px] font-[600] mr-[2rem] '>A</div>
            }

        </div>
    )
}
export default Header