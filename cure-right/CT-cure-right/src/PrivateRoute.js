import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ accessType }) {
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");
  let redirectUrl = getRedirectUrl(authToken, userType);
  console.log(authToken ? true : false, userType, redirectUrl);

  if (authToken) {
    if (userType === accessType) {
      return <Outlet />; // Render nested routes
    } else {
      return <Navigate to={redirectUrl} replace />;
    }
  } else {
    if (accessType !== null) {
      return <Navigate to={redirectUrl} replace />;
    } else {
      return <Outlet />; // Render nested routes
    }
  }
}

const getRedirectUrl = (authToken, userType) => {
  const geturl = window.location.pathname.split("/");
  return authToken
    ? userType && userType !== "patient"
      ? `/${userType}/home`
      : "/home"
    : userType === "admin" || geturl[1] === "admin"
    ? "/admin"
    : userType === "doctor" || geturl[1] === "doctor"
    ? "/doctor"
    : "/";
};
