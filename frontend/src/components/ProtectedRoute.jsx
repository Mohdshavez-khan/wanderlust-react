import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        localStorage.setItem("redirectUrl", location.pathname);
        return <Navigate to="/login" replace />
    }

    return children;

}

export default ProtectedRoute;