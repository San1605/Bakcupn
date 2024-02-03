import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

const Context = ({ children }) => {
  const [chatArray, setChatArray] = useState([
    { text: "hi how can i help you ?", origin: "bot" },
  ]);

  const [myContext, setMyContext] = useState([]);
  console.log(myContext, "2374382738");

  return (
    <AppContext.Provider
      value={{
        chatArray,
        setChatArray,
        myContext,
        setMyContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { Context };
export const useAppContext = () => {
  return useContext(AppContext);
};
