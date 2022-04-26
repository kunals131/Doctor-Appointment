import React, { useState } from "react";

import cls from "classnames";
import { FaFileUpload } from "react-icons/fa";
import { HiArrowSmRight } from "react-icons/hi";

import { MdClear } from "react-icons/md";
import InputField from "./Input";



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

export default InputAdvance;