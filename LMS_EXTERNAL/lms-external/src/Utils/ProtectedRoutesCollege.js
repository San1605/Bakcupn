import { Navigate } from "react-router-dom";

export function ProtectedRoutesCollege({ children }) {
  const { token, role, email} = localStorage;
  const redirectURL = "/";
  const allConditionsMet = token && role && email;

  return allConditionsMet ? (
    children
  ) : (
    <Navigate to={redirectURL} />
  );
}