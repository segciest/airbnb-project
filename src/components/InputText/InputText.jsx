// 
import React, { useState } from 'react';

const InputText = ({ label, name, handleChange, handleBlur, type = "text", placeholder, error, touched, className, value,defaultValue }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
      <div className="relative">
        <input 
          name={name} 
          onChange={handleChange} 
          onBlur={handleBlur} 
          type={showPassword ? "text" : type} 
          id={name} 
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
          placeholder={placeholder} value={value}
        />
        {type === "password" && (
          <buttonn
            type="button"
            className="absolute top-[5px] bottom-0 right-0 px-1 py-1 cursor-pointer text-sm text-gray-600 dark:text-white"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"} {/* Unicode for eye and eye slash symbols */}
          </buttonn>
        )}
      </div>
      {touched && error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : touched && !error ? (
        <p className="text-green-500 text-sm">Hợp lệ</p>
      ) : null}
    </div>
  );
};

export default InputText;
