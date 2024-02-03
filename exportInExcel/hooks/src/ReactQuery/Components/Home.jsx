import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            {/* <Link className='p-2  border border-black'  to={"/about"}>About</Link> */}
            <Link className='p-2  border border-black' to={"/posts"}>posts page</Link>
            <Link className='p-2 ml-4 border border-black' to={"/rq_posts"}>posts page with react-query</Link>
        </div>
    )
}

export default Home
