import React from "react";
import withAuth from "../../components/common/WithAuth/WithAuth";
import useProfile from "../../hooks/useProfile";
import MainLayout from "../MainLayout";
function Home() {
  const { currentUser, setCurrentUser } = useProfile();

  return <MainLayout />;
}

export default withAuth(Home);
