import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const EmpPrivateRoute = () => {
  const { providerInfo } = useSelector((state) => state.employee);
  return providerInfo ? <Outlet /> : <Navigate to="/emplogin" replace />;
};

export default EmpPrivateRoute;