import React from "react";
import { FaMountainSun } from "react-icons/fa6";
import { RiImageAddLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { BsHouseAddFill } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import SBNav from "./SBNav";

export default function MainNav() {
  return (
    <nav>
      <ul className="mt-5 flex flex-col gap-3">
        <li>
          <SBNav to="/attraction">
            <FaMountainSun />
            <span>Places </span>
          </SBNav>
        </li>
        <li>
          <SBNav to="/add-attraction">
            <RiImageAddLine />
            <span>Add New Places</span>
          </SBNav>
        </li>
        <li>
          <SBNav to="/rest-place">
            <BiBuildingHouse />
            <span>Rest Place</span>
          </SBNav>
        </li>
        <li>
          <SBNav to="/add-rest-place">
            <BsHouseAddFill />
            <span>Add Rest Places</span>
          </SBNav>
        </li>
        <li>
          <SBNav to="/tour-operator">
            <FaCarSide />
            <span>Tour operator</span>
          </SBNav>
        </li>
        <li>
          <SBNav to="/add-tour-operator">
            <IoMdAddCircleOutline />
            <span>Add Tour Operator</span>
          </SBNav>
        </li>
      </ul>
    </nav>
  );
}
