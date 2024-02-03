import React, { useState, createContext } from "react";
const ChatContext = createContext();
function ContextComponent({ children }) {
  const [directLine, setDirectLine] = useState();
  const [openChat, setOpenChat] = useState(true);
  return (
    <ChatContext.Provider
      value={{
        directLine,
        setDirectLine,
        openChat, setOpenChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
export default ChatContext;
export { ContextComponent };
