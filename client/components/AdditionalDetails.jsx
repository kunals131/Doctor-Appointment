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

const InputField = ({ width, label, placeholder }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="text-sm" style={{ width: width || "97.5%" }}>
      <label
        htmlFor=""
        className={cls(
          "block transition-all text-[#6857E5] font-semibold",
          { "scale-100": isFocus },
          { "scale-0": !isFocus }
        )}
      >
        {label}
      </label>
      <input
        type="text"
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => setIsFocus(e.target.value !== "")}
        placeholder={`${isFocus ? "" : placeholder||label}`}
        className="border-gray-300 placeholder:text-gray-400 outline-none border-2 mt-1 px-2 py-[8px] rounded-sm w-full"
      />
    </div>
  );
};

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

const ListItem = ({ text, setList, list }) => {
  return (
    <div className="bg-gray-300 w-fit flex space-x-2 items-center px-3 py-1 text-sm rounded-xl text-gray-500">
      <div>{text}</div>
      <div
        onClick={() => setList(list.filter((v) => v !== text))}
        className="cursor-pointer"
      >
        <MdClear />
      </div>
    </div>
  );
};

const InputAdvance = ({ width, label, placeholder }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  return (
    <>
      {list.length > 0 && (
        <div className="">
          <div className="font-semibold text-sm text-gray-700">
            Added {label}
          </div>
          <div className="flex mt-2 space-x-3">
            {list.map((l) => (
              <ListItem list={list} setList={setList} text={l} />
            ))}
          </div>
        </div>
      )}
      <div className="text-sm" style={{ width: width || "97.5%" }}>
        <label
          htmlFor=""
          className={cls(
            "block transition-all text-[#6857E5] font-semibold",
            { "scale-100": isFocus && list.length === 0 },
            { "scale-0": !isFocus }
          )}
        >
          {label}
        </label>
        <div className="flex items-center -space-x-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => setIsFocus(e.target.value !== "")}
            placeholder={placeholder || label}
            className="border-gray-300 placeholder:text-gray-400 outline-none border-2 mt-1 px-2 py-[8px] rounded-sm w-full"
          />
          {isFocus && input.length > 0 && (
            <div>
              <HiArrowSmRight
                onClick={() => {
                  setList([...list, input]);
                  setInput("");
                  setIsFocus(false);
                }}
                className="cursor-pointer"
                size={24}
                color="#6857E5"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PatientDetails = ()=>{
    return (
        <>
         <div className="text-[#5A5482] font-bold text-xl">
          Complete your profile
        </div>
        <div className="text-gray-500 text-xs mt-2">
          So, that your profile is easily accessible to other doctors.
        </div>
        <div className="mt-6">
          <div className="flex space-x-4 items-center">
            <InputField width="150px" label="AGE *" />
            <InputField width="300px" label="Medical History *" />
            <InputField width="250px" label="Blood Group *" />
          </div>
          <div className="mt-4 space-y-4">
            <InputAdvance label="Symptoms" />
            <InputAdvance
              label="Medications"
              placeholder=" Eg : Crosin / 3 in a day / ongoing "
            />
          </div>
          <div className="mt-10">
            <div className="text-[#5A5482] font-bold text-xl">
              Add Medical Records
            </div>
            <div className="text-gray-500 text-xs mt-2">
              These Medical Records will be shown to the doctor for better
              accessment.
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 grid-flow-row">
              <MedicalRecord />
              <MedicalRecord />
              <div className="w-full hover:border-[#6757E5] transition-all ease-in-out group border-gray-400 flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md">
                <div>
                  <BsPlusCircleDotted
                    size={40}
                    className="text-gray-300 group-hover:text-[#6757E5] transition-all ease-linear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

const DoctorDetails = ()=>{
    return (
        <>
         <div className="text-[#5A5482] font-bold text-xl">
          Complete your profile
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Let your patients know how you can treat them the best.
        </div>
        <div className="mt-6 space-y-3">
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

const AdditionalDetails = () => {
  return (
    <div className="h-[100vh] overflow-hidden bg-white w-full flex">
      <div className="h-full overflow-y-auto scrollbar w-[60vw] px-20 pt-16 pb-8">
          <DoctorDetails/>

        <div className="mt-8 flex space-x-3 justify-end">
             <button  className="border-[#6757E5] bg-transparent disabled:bg-opacity-70 text-[#6757E5] border-2 hover:scale-105 transition-all ease-out text-sm px-2 py-2 rounded-md">Detect Location</button>
            <button disabled={true} className="bg-[#6757E5] disabled:bg-opacity-70 text-white text-sm px-2 py-2 rounded-md">Save and Continue</button>
        </div>
      </div>
      <div className="h-full flex items-center bg-[#F5F7FB] w-[40vw]">
        <Image src={FillImage} />
      </div>
    </div>
  );
};

export default AdditionalDetails;
