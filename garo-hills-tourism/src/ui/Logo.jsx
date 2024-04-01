import React from "react";
import logoImage from "../assets/Garo Hills (1).png";

export default function Logo() {
  return (
    <div className="flex justify-center">
      <img
        className=" w-24 rounded-md"
        src={logoImage}
        alt="Garo Hills Tourism"
      />
    </div>
  );
}
