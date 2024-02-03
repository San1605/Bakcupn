import React, { useContext } from 'react'
import { myContext } from './ContextApi'
const ContextApiConsumer = () => {
    const { isDarkTheme, toggleTheme } = useContext(myContext)
    return (
        // <myContext.Consumer>
        //     {(value) => (
        //         <div>
        //              <div>{value.isDarkTheme ? "Light" : "Dark"}</div>
        //             <button onClick={value.toggleTheme}>Toggle</button>
        //         </div>
        //     )}
        // </myContext.Consumer>


        // using useContext

        <div>
            <div>{isDarkTheme ? "Light" : "Dark"}</div>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
    )
}
export default ContextApiConsumer