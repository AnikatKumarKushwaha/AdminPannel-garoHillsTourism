import React from "react";

export default function AuthInputField({
  type,
  id,
  disabled,
  required,
  placeholder,
  register,
}) {
  return (
    <input
      className="w-full rounded-sm border border-slate-300 bg-slate-50 px-2 py-1 text-slate-500 shadow-sm outline-none placeholder:pl-2 placeholder:text-sm focus-visible:border-b-2 focus-visible:border-b-green-500"
      type={type}
      id={id}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      {...register}
    />
  );
}
