import React, { ChangeEvent } from "react";

interface SignupInputProps {
  label: string;
  placeholder: string;
  type: "text" | "password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const SignupInput: React.FC<SignupInputProps> = ({
  label,
  placeholder,
  type = "text",
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col ">
      <div className="px-1 text-[14px] text-white mb-[2px]">{label}</div>
      <input
        className="w-[320px] h-10 px-2 border-2 border-black rounded-md outline-none"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default SignupInput;
