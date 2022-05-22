import React, {useState} from "react";
const InputField = ({
    label,
    type,
    placeholder,
    name,
    onChange,
    value,
    width,
  }) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div>
        <label
          htmlFor={name}
          className={`block text-sm font-semibold ${
            isFocus ? "text-primary dark:text-darkPrimary" : "text-black dark:text-gray-500"
          }`}
        >
          {label}
        </label>
        <input
          style={{ width: width || "370px" }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          type={type || "text"}
          className="mt-2  h-[40px] dark:bg-darkElevation-400 dark:placeholder:text-gray-600 text-sm p-2 rounded-md outline-none"
          placeholder={placeholder}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  };
  

export default InputField;