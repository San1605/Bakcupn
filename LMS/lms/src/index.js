import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './components/LoginMicrosoft/MicrosoftADLogin';
const root = ReactDOM.createRoot(document.getElementById('root'));
const msalInstance = new PublicClientApplication(msalConfig)
root.render(
  // <GoogleOAuthProvider clientId='674346709000-o8bq2pg2jvc3fqj2ubt0h54jlm3h6s7s.apps.googleusercontent.com'>
  <MsalProvider instance={msalInstance}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </MsalProvider>
// </GoogleOAuthProvider>
);
