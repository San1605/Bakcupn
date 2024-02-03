import React from 'react'
import "./home.css"
import homeBg from "../../assets/homeBg.png"
import BackgroundHome from "../../assets/BackgroundHome.png"
import Form from '../../Components/Form/Form'


const Home = () => {
    return (
        <div className='w-[100%]  lg:h-[42.7rem] flex flex-row home' style={{ backgroundImage:`url(${BackgroundHome})`,backgroundPosition:"top left",backgroundRepeat:"no-repeat"}}>
            <div className='flex items-center pl-[4.25rem] w-[55%] h-[100%] formdiv'>
                <Form />
            </div>
            <div className='w-[45%] h-[100%] homeimg' style={{ backgroundImage:`url(${homeBg})`,backgroundPosition:"bottom 20px right",backgroundRepeat:"no-repeat"}}>
            </div>
        </div>
    )
}

export default Home
