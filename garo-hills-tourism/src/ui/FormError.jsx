import React from "react";

export default function FormError({ children }) {
  return <p className="text-sm text-red-500">{children}</p>;
}
