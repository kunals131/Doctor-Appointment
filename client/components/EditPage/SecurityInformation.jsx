import React, { useState } from "react";
import Image from "next/image";

import cls from "classnames";

import Input from "../Input";
import InputAdvance from "../InputAdvance";
import MedicalRecord from "../MedicalRecord";


const SecurityDetails = ()=>{
    return (
        <>
             <div className="text-[#5A5482] dark:text-darkPrimary font-bold text-xl flex justify-between w-full">
          <div>Security</div>
          <div className="text-base bg-[#5A5482] dark:bg-darkPrimary dark:bg-opacity-70 px-4 rounded-md py-[2px] hover:scale-105 transition-all cursor-pointer text-white ">Save</div>
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Update Personal Details, Change the details and hit save!
        </div>
        <div>
        </div>
        <div className="mt-5">
          <Input label="Current Password" width="500px" />
          <Input label="New Password" width="500px" />
          <Input label="Confirm Password" width="500px" />
        </div>
        </>)
}

export default SecurityDetails