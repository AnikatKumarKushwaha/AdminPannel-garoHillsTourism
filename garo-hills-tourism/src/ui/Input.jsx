import React from "react";

export default function Input({
  type,
  id,
  disabled,
  required,
  min,
  defaultValue,
  rows,
  register,
}) {
  if (rows) {
    return (
      <textarea
        className="rounded-sm border border-slate-300 bg-slate-50 px-2 py-1 shadow-sm"
        type={type}
        id={id}
        disabled={disabled}
        required={required}
        min={min}
        defaultValue={defaultValue}
        rows={rows}
        {...register}
      ></textarea>
    );
  }
  return (
    <input
      className="rounded-sm border border-slate-300 bg-slate-50 px-2 py-1 shadow-sm "
      type={type}
      id={id}
      disabled={disabled}
      required={required}
      min={min}
      defaultValue={defaultValue}
      {...register}
    />
  );
}
