import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";

function ProtectedRoute({ roles, children }) {
    const { currentUser } = useAuthStore();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(currentUser.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;
