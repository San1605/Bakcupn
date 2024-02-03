import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { GlobalProvider } from './Context/GlobalContext';
import { Toaster } from "react-hot-toast"
import { msalConfig } from "./Utils/MicrosoftLogin";
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
const msalInstance = new PublicClientApplication(msalConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MsalProvider instance={msalInstance}>
    <GlobalProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </GlobalProvider>
  </MsalProvider>
);


