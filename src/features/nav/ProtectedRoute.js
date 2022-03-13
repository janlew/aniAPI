import {
	Routes,
	Route,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserEmail } from "../auth/userSlice";

const ProtectedRoute = ({ children }) => {
	const isAuth = useSelector(selectUserEmail);

	if (!isAuth) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
