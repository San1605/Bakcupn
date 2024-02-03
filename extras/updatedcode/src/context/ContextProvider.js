import { useMsal } from "@azure/msal-react";
import React, { createContext, useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // const navigate = useNavigate();
  const [token, setToken] = useState(false);
  const [Authtoken, setAuthToken] = useState("");
  const [keyword, setKeyword] = useState([]);
  const [callStatus, setCallStatus] = useState(false);
  const [chat, setChat] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [show, setShow] = useState(true);
  const [suggestionPlay, setSuggestionPlay] = useState(true);
  const [extensionId, setExtensionId] = useState("");
  const [callid, setCallid] = useState("");
  const { instance, inProgress, accounts } = useMsal();

  useEffect(() => {
    let auth_Token = sessionStorage.getItem("auth_token");
    if (auth_Token) {
      setAuthToken(auth_Token);
    }
  }, []);
  const FetchSocket= async (Authtoken)=>{
    const newSocket = io("wss://aacox-az-dev-bot.azurewebsites.net", {
      transports: ["websocket", "polling"],
        auth: { token: Authtoken ?? await FetchToken() }
      });

      newSocket.on("connect", () => {
        setSocket(newSocket);
        console.log("Connection Established");
      });

      newSocket.on("disconnect", () => {
        console.log("WebSocket disconnected");
        // force a manual reconnect
        FetchSocket();
      });
  }
  useEffect(() => {
    console.log(Authtoken, "auth");
    if (!socket?.connected && Authtoken) {
      FetchSocket(Authtoken)

    }
    

    

    // Don't forget to clean up the socket when the component unmounts



    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [Authtoken]);

  const FetchToken= async ()=>{
    const account = instance.getAllAccounts()[0];
  
    const accessTokenRequest = {
      scopes: ["User.ReadBasic.All"],
      account: account,
      forceRefresh: true,
    };
    
    try {
      console.log("accessToken1111")
      const tokenResult = await instance.acquireTokenSilent(accessTokenRequest);
      console.log("Access token acquired:", tokenResult.accessToken);
      return tokenResult.accessToken;
  
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        instance.acquireTokenRedirect(accessTokenRequest);
        console.log("error accessToken")
        console.log(error);
      }
      console.log(error);
    }  
  }
  return (
    <Context.Provider
      value={{
        token,
        setToken,
        keyword,
        setKeyword,
        Authtoken,
        setAuthToken,
        io,
        socket,
        callStatus,
        setCallStatus,
        chat,
        setChat,
        show,
        setShow,
        suggestionPlay,
        setSuggestionPlay,
        conversation,
        setConversation , 
        extensionId , setExtensionId , 
        callid , setCallid
      }}
    >
      {children}
    </Context.Provider>
  );
};
