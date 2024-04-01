import React from "react";

export default function Button({ type, children, onClick, color, disabled }) {
  if (color === "danger") {
    return (
      <button
        className=" m-1 rounded-sm bg-red-700 px-2 py-1 text-red-50 shadow-md hover:bg-red-600"
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  if (color === "primary") {
    return (
      <button
        className="m-1 rounded-sm bg-blue-700 px-2 py-1 text-blue-50 shadow-md hover:bg-blue-600"
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  if (color === "darkyellow") {
    return (
      <button
        className="m-1 rounded-sm bg-blue-700 px-2 py-1 text-blue-50 shadow-md hover:bg-blue-600"
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className="m-1 rounded-sm bg-blue-700 px-2  py-1 text-blue-50"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
