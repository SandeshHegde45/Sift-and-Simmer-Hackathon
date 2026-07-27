import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function RequireAuth() {
  const status = useSelector((state) => state.auth.status);

  if (status === "loading") {
    return <Loader label="Checking your session..." />;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;