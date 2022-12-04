import React from "react";

const Input = ({ children }) => {
  return (
    <div className="Input" data-test="inputComponent">
      {children}
    </div>
  );
};

Input.Label = ({
  title,
  className,
  placeholder,
  type,
  name,
  readOnly,
  id,
  value,
  defaultValue,
  htmlFor,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-white">
        {title ?? "Title"}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          id={id}
          value={value}
          className={
            "mt-2 block pl-3 pr-10 w-full text-md text-white bg-transparent focus:ring-2 focus:ring-white focus:border-white focus:outline-none disabled:text-slate-500 invalid:text-pink-600 sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 rounded " +
            className
          }
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

Input.Select = ({
  title,
  className,
  defaultValue,
  name,
  id,
  onChange,
  htmlFor,
  children,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-white">
        {title ?? "Title"}
      </label>
      <select
        id={id}
        name={name}
        onChange={onChange}
        className={
          "mt-2 block pl-3 pr-10 w-full text-md text-white bg-transparent focus:ring-2 focus:ring-white focus:border-white focus:outline-none disabled:text-slate-500 invalid:text-pink-600 sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 rounded " +
          className
        }
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </div>
  );
};
export default Input;
