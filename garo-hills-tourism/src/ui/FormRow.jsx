import React from "react";

export default function FormRow({ children, label, error, classname }) {
  return (
    <div
      className={`grid grid-cols-[20rem_1fr_1.2fr] items-center gap-3 border-b border-slate-200 py-2 first:pt-0 last:border-b-0 last:pb-0`}
    >
      {label && (
        <label className=" font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-sm font-medium text-red-700">{error}</span>
      )}
    </div>
  );
}
