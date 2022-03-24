import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Loader from "../loader/Loader";
import Container from "../ui/Container";

const ProtectedRoute = ({ children, isAuth }) => {
	const location = useLocation();

	if (isAuth === undefined) return <Loader />;

	if (!isAuth) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

const ContainerExtended = styled(Container)`
	align-items: center;
`;

export default ProtectedRoute;
