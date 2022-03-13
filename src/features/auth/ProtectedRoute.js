import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserEmail } from "./userSlice";

const ProtectedRoute = ({ children }) => {
	const isAuth = useSelector(selectUserEmail);

	if (!isAuth) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
