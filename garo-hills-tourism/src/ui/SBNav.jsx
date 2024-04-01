import React from "react";
import { NavLink } from "react-router-dom";

export default function SBNav({ to, children }) {
  return (
    <NavLink
      className="text-md flex items-center gap-5 rounded-md px-3 py-2 font-medium text-stone-600 transition-all ease-in-out visited:bg-slate-100 hover:bg-slate-100 hover:text-stone-800 active:bg-slate-100 active:text-stone-800 "
      to={to}
    >
      {children}
    </NavLink>
  );
}
