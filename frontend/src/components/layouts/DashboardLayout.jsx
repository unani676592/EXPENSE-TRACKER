import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="h-screen flex flex-col">
      
      <Navbar activeMenu={activeMenu} />

      <div className="flex flex-1">
        
        <div className="w-64 bg-gray-200">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="flex-1 mx-5">
          {children}
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;