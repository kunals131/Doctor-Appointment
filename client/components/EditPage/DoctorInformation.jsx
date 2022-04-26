import React, { useState } from "react";
import Image from "next/image";

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
import InputField from "../Input";
import InputAdvance from "../InputAdvance";
import MedicalRecord from "../MedicalRecord";

const DoctorDetails = ()=>{
    return (
        <>
             <div className="text-[#5A5482] font-bold text-xl flex justify-between w-full">
          <div>Additional Information</div>
          <div className="text-base bg-[#5A5482] px-4 rounded-md py-[2px] hover:scale-105 transition-all cursor-pointer text-white ">Save</div>
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Update Personal Details, Change the details and hit save!
        </div>
        <div>
          
        </div>
        <div className="mt-6 space-y-4 text-black" >
            <div className="flex space-x-3">
            <InputField label="Medical Experience" width="200px" placeholder={"Medical Experience in Yrs"}/>
            <InputField label="Lisense Id" width="100%" placeholder={"Medical Lisense Id"}/>
            </div>
            <InputField label={"Work Address"} width="100%"/>
            <div className="flex space-x-2">
                <InputField width="300px" label="Degree"/>
                <InputField width="100%" label="University"/>
            </div>
            <InputAdvance width="100%" label="Disease Tags" placeholder="Enter diseases you can treat"/>
        </div>
        </>
    )
    
}

export default DoctorDetails;