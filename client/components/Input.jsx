import React from 'react'
import { useState } from 'react';
import cls from "classnames";


const Input = ({ width,type, label, placeholder,value,onChange,name }) => {
    const [isFocus, setIsFocus] = useState(value?.length>0);
    return (
      <div className="text-sm" style={{ width: width || "97.5%" }}>
        <label
          htmlFor=""
          className={cls(
            "block transition-all text-[#6857E5]  dark:text-gray-500 font-semibold",
            { "scale-100": isFocus },
            { "scale-0": !isFocus },
            {"mt-3":isFocus}
          )}
        >
          {label}
        </label>
        <input
          type={type || 'text'}
          name={name}
          onChange={onChange}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => setIsFocus(e.target.value !== "")}
          placeholder={`${isFocus ? "" : placeholder||label}`}
          className="border-gray-300 dark:bg-darkElevation-300 dark:placeholder:text-gray-500 dark:text-gray-200 dark:border-none dark:rounded-md text-gray-700 placeholder:text-gray-400 outline-none border-2 mt-1 px-2 py-[8px] rounded-sm w-full"
        />
      </div>
    );
  };

export default Input