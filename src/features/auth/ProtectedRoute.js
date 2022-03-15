import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../ui/Spinner";
import Container from "../ui/Container";

const ProtectedRoute = ({ children, isAuth }) => {
	const location = useLocation();

	if (isAuth === undefined)
		return (
			<ContainerExtended>
				<Spinner />
			</ContainerExtended>
		);

	if (!isAuth) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

const ContainerExtended = styled(Container)`
	align-items: center;
`;

export default ProtectedRoute;
