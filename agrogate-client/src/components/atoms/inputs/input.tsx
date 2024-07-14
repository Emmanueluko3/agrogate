import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clx from "classnames";
import React, { useState, type ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {label && (
        <label
          htmlFor={rest.id}
          className="block font-medium leading-6 text-gray-900 text-sm lg:text-base"
        >
          {label}
        </label>
      )}
      <div className={`${label && "mt-2"} relative`}>
        {rest.type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
        <input
          {...rest}
          type={
            rest.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : rest.type
          }
          className={clx(
            "border w-full border-gray-300 text-customGray1 bg-[#F9F9FB] focus:outline-none rounded-lg py-2 px-4 focus:border-primaryColor",
            className
          )}
        />
      </div>
    </div>
  );
};

export default Input;
