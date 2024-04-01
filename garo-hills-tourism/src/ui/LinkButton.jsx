import React from "react";
import { Link } from "react-router-dom";

export default function LinkButton({ to, children, color }) {
  if (color === "darkyellow") {
    return (
      <Link
        className="  rounded-md border-2 border-yellow-600  px-3 py-2 text-yellow-600 shadow-md hover:border-2  hover:bg-yellow-500 hover:text-yellow-100"
        to={to}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      className="  rounded-md border border-yellow-400 bg-yellow-500 px-3 py-1 text-yellow-50 shadow-md hover:border-2 hover:border-yellow-700 hover:text-yellow-700"
      to={to}
    >
      {children}
    </Link>
  );
}
