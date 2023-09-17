import React from "react";
import { BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

type HeaderProps = {
  boardName: string;
  toggleSidebar: () => void;
};

const BoardHeader: React.FC<HeaderProps> = ({ boardName, toggleSidebar }) => {
  return (
    <div className="w-full h-[64px] text-white flex justify-between p-4  gap-8 items-center border-b-2 cursor-pointer">
      <div>
        <div>{boardName}</div>
      </div>
      <div className="flex gap-4">
        <button className="flex justify-center items-center gap-2 h-10 w-28 rounded-md px-2 hover:bg-[#2C3238]">
          <BsPersonPlus />
          <span>share</span>
        </button>
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;
