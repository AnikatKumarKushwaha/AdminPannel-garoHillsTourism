import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <div className="row-span-full border-r border-stone-200 bg-stone-50 px-6 py-10">
      <Logo />
      <MainNav />
    </div>
  );
}
