import React, { useState } from "react";
import Image from "next/image";
import FillImage from "../public/fill.png";
import cls from "classnames";
import { FaFileUpload } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";
import {
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlineFileDone,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import InputField from "./Input";


const MedicalRecord = () => {
    return (
      <div className="px-5 rounded-md py-10 p-2 pt-10 bg-[#F5F7FB] border-dashed border-gray-400 border-2 flex flex-col items-center ">
        <div className="p-6 shadow-md bg-white w-fit">
          <AiOutlineFileDone color="#6757E5" size={32} />
        </div>
        <div>
          <input
            type="text"
            value="New Record"
            className="text-[#6757E5] w-full outline-none text-center mt-3  bg-transparent p-1"
          />
        </div>
        <div className="mt-4 flex space-x-3 text-sm">
          <button className="bg-white px-3 py-1 border-[1px] flex items-center space-x-2">
            <AiOutlineEdit></AiOutlineEdit>
            <div>Edit</div>
          </button>
          <button className="bg-white px-3 py-1 border-[1px] flex items-center space-x-2">
            <AiOutlineDelete></AiOutlineDelete>
            <div>Remove</div>
          </button>
        </div>
      </div>
    );
  };

export default MedicalRecord