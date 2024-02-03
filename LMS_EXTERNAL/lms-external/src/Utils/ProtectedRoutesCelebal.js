import { Navigate } from 'react-router-dom';

export function ProtectedRoutesCelebal({ children }) {
    const { token, role, email, name } = localStorage;
    const redirectURL = "/admin";
    const allConditionsMet = token && role && email && name;

    return allConditionsMet ? (
        children
    ) : (
        <Navigate to={redirectURL} />
    );
}


