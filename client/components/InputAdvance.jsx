import React, { useState } from "react";

import cls from "classnames";
import { FaFileUpload } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";

import { MdClear } from "react-icons/md";
import InputField from "./Input";
import DatalistInput, { useComboboxControls } from "react-datalist-input";



const ListItem = ({ text, handleRemove,id }) => {
  return (
    <div className="bg-gray-300 w-fit flex space-x-2 items-center px-3 py-1 text-sm rounded-xl text-gray-500">
      <div>{text}</div>
      <div
        onClick={()=>handleRemove(id)}
        className="cursor-pointer"
      >
        <MdClear />
      </div>
    </div>
  );
};

const InputAdvance = ({ width, label,list, placeholder,handleAdd, handleRemove, options }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState("");
  const { value, setValue } = useComboboxControls({ initialValue: '' });
  return (
    <>
      {list?.length > 0 && (
        <div className="">
          <div className="font-semibold text-sm text-gray-700">
            Added {label}
          </div>
          <div className="flex mt-2 space-x-3">
            {list.map((l,idx) => (
              <ListItem key={idx} list={list} handleRemove={handleRemove} id={l.id || l} text={l?.title || l?.value || l} />
            ))}
          </div>
        </div>
      )}
      <div className="text-sm" style={{ width: width || "97.5%" }}>
        <label
          htmlFor=""
          className={cls(
            "block transition-all text-[#6857E5] font-semibold",
            { "scale-100": isFocus && list?.length === 0 },
            { "scale-0": !isFocus }
          )}
        >
          {label}
        </label>
        <div className="flex items-center -space-x-8">
         { !options?<input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => setIsFocus(e.target.value !== "")}
            placeholder={placeholder || label}
            className="border-gray-300 placeholder:text-gray-400 outline-none border-2 mt-1 px-2 py-[8px] rounded-sm w-full"
          />:<DatalistInput
          placeholder={placeholder || label}
          className="w-full"
          inputProps={{className : 'border-gray-300 placeholder:text-gray-400 outline-none border-2 mt-1 px-2 py-[8px] rounded-sm w-full'}}
          onSelect={(item)=>{handleAdd(item); setValue('')}}
          listboxProps={{className : 'bg-white p-2 rounded-md h-[150px] overflow-y-auto '}}
          listboxOptionProps={{className : 'border-b-2'}}
          value={value}
          setValue={setValue}
          items={options}
        />}
          {isFocus && input.length>0 && (
            <div>
              <HiArrowSmRight
                onClick={() => {
                  handleAdd(input)
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

export default InputAdvance;