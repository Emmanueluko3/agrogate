import { Outlet } from "react-router-dom";
import React from "react";
// import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  redirectPath?: string;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  // redirectPath = "/signin",
  children,
}) => {
  // const user = useAppSelector((state) => state.auth.user);

  // if (!user) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return children || <Outlet />;
};

export default ProtectedRoute;
