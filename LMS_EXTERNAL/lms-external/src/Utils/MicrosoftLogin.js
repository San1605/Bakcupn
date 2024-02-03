export const msalConfig = {
  auth: {
    clientId: "98c3952a-55d2-43fe-930f-4222eded784f",
    authority:
      "https://login.microsoftonline.com/e4e34038-ea1f-4882-b6e8-ccd776459ca0",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: [
    "User.ReadBasic.All",
    "user.read",
    "mail.read",
    "offline_access",
    "Calendars.ReadWrite",
  ],
};
