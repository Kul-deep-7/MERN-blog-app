import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/header/Header";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
    <Header />
    <Outlet />
    </>
  
);
};

export default ProtectedRoute;
