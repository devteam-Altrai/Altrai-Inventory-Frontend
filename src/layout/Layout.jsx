import React from "react";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col custom-gradient p-3">
      <div className="mb-2">
        <NavBar />
      </div>
      <div className="flex-1 overflow-hidden bg-white rounded-xl border border-black/5 shadow-[0_-4px_14px_-1px_rgba(0,0,0,0.04)]">
        <main className="h-full w-full rounded-lg">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
