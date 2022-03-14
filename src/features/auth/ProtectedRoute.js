import { Navigate } from "react-router-dom";

import { auth } from "../../app/firebase";

const ProtectedRoute = ({ children, isAuth }) => {
	if (!isAuth) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
