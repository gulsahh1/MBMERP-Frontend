import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
  if (!token || isTokenExpired(token)) {
    console.log("EXPIRED:", token ? isTokenExpired(token) : "no token");
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
}