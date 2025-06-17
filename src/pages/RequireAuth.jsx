import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated || !user) {
        return <Navigate to="/" replace />;
    }

    return children;
}