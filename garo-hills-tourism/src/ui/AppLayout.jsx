import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className=" grid h-screen grid-cols-[17rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className=" overflow-scroll bg-slate-100 px-12 pb-16 pt-12">
        <Outlet />
      </main>
    </div>
  );
}
