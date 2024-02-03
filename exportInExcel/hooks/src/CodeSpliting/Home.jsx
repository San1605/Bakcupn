import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    console.log("I am Home component")
    return (
        <div>
            <ul className='flex flex-row '>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                <li>
                    <Link to={"/services"}>Services</Link>
                </li>
            </ul>
        </div>
    )
}

export default Home
