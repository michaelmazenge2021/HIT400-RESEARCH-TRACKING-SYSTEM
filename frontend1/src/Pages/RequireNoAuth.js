import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken
        ? jwtDecode(auth.accessToken)
        : undefined

    const roles = decoded?.UserInfo?.roles || [];
    return (
        auth?.accessToken
            ? <Navigate to="/login" state={{ from: location }} replace />
            : auth.accessToken ?
            <Navigate to="/unauthorized"  state={{ from: location }} replace />
            :<Outlet/>

    );
}

export default RequireAuth;
 