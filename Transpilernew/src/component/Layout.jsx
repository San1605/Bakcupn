import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <div className="flex flex-row h-[calc(100%_-_50px)] border-t border-[#ECECEC]">
        <Sidebar />
        <div className="h-full w-[calc(100%_-_230px)] bg-[#FAFAFA] p-4  layout">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
