import React from "react";

export default function FileInput({
  id,
  disabled,
  required,
  min,
  defaultValue,

  register,
}) {
  return (
    <input
      className=" block w-full text-sm text-slate-500
      file:mr-4 file:rounded-full file:border-0
      file:bg-slate-200 file:px-4
      file:py-2 file:text-sm
      file:font-semibold file:text-slate-700
      hover:file:bg-slate-300"
      type="file"
      id={id}
      disabled={disabled}
      required={required}
      min={min}
      defaultValue={defaultValue}
      {...register}
    />
  );
}
