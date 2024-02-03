import React, { useEffect, useState } from 'react'

const Skills = (props) => {
    
    const { skills } = props
    useEffect(()=>{
        setTimeout(()=>{
            setIsLogin(true)
        },500)
    },[])
    
    const [isLogin, setIsLogin] = useState(false);
    return (
        <div>

            {
                skills?.map((item, index) => {
                    return <button key={index}>{item}</button>

                })
            }

            {
                isLogin ? (
                    <button>start learning</button>
                ) : (
                    <button onClick={() => setIsLogin(true)}>Login</button>
                )
            }

        </div>
    )
}

export default Skills
