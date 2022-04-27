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


const MedicalRecord = ({record, handleRecordTitle}) => {
  const [title,setTitle] = useState(record.title);
  const handleSubmit = ()=>{
    if (title.length>0) handleRecordTitle(record.id,title);
  }
    return (
      <div className="px-5 rounded-md py-10 p-2 pt-10 bg-[#F5F7FB] border-dashed border-gray-400 border-2 flex flex-col items-center ">
        <a href={record.file} target="false" className="p-6 shadow-md bg-white w-fit hover:scale-110">
          <AiOutlineFileDone color="#6757E5" size={32} />
        </a>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            onBlur={handleSubmit}
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