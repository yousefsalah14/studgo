import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function Layout() {
//   const { userData } = useContext(UserContext); // Access user data from context (optional)

  return (
    <>
      <NavBar />
      <div className="mt-52">
        <Outlet /> {/* Render child routes */}
      </div>
      {/* <Footer /> */}
    </>
  );
}
