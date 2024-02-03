import React, { createContext, useContext, useState } from 'react'
import ContextApiConsumer from './ContextApiConsumer';

export const myContext = createContext();
const ContextApi = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toggleTheme = () => {
        setIsDarkTheme((prev)=>!prev);
    }

    return (
        <div>
            <myContext.Provider value={{ isDarkTheme, toggleTheme }}>
                <ContextApiConsumer />
            </myContext.Provider>
        </div>
    )
}

export default ContextApi




