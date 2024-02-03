export const msalConfig = {
    auth: {
      clientId: "14591786-1700-421c-92d1-180fb69e285c",
      authority: "https://login.microsoftonline.com/53246dee-9681-474e-b35a-1be802a3cbd4",
      //  This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
    scopes: ["User.ReadBasic.All"],
  };  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/users",
  };