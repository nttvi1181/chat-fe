import useProfile from "../../../hooks/useProfile";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import UserService from "../../../services/userApi";
import useAuth from "../../../hooks/useAuth";
const PublicRoute = ["/login", "/register"];
const withAuth =
  (Component: any): any =>
  (props: any) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { onLogout } = useAuth();
    const { currentUser, setCurrentUser } = useProfile();
    const token = localStorage.getItem("_token");
    const isAuthenticated = !!currentUser;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      async function restoreToken() {
        if (!isAuthenticated) {
          if (!token) return onLogout();
          try {
            setLoading(true);
            const { data } = await UserService.getMyinfo();
            setCurrentUser(data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      }

      restoreToken();
    }, [currentUser]);

    if (!token && PublicRoute.includes(pathname)) {
      return <Component {...props} />;
    }

    if (!token) {
      return onLogout();
    }

    if (loading) {
      return <Loading />;
    }
    if (isAuthenticated && currentUser && !currentUser.is_verified && pathname !== "/verify") {
      return navigate("/verify");
    }
    if (isAuthenticated && currentUser && currentUser.is_verified && pathname === "/verify") {
      return navigate("/");
    }

    if (isAuthenticated && PublicRoute.includes(pathname)) {
      return navigate("/");
    }

    return isAuthenticated && <Component {...props} />;
  };

export default withAuth;
