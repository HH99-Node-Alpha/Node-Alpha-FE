import React, { useState } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

type HeaderProps = {
  boardName: string;
  toggleSidebar: () => void;
  onBoardNameChange: (newName: string) => void;
};

const BoardHeader: React.FC<HeaderProps> = ({
  boardName,
  toggleSidebar,
  onBoardNameChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(boardName);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleInputBlur = () => {
    if (editedName.trim()) {
      onBoardNameChange(editedName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editedName.trim()) {
        onBoardNameChange(editedName);
      }
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full h-[64px] text-white flex justify-between p-4  gap-8 items-center border-b-2 cursor-pointer">
      <div className="w-full" onClick={handleNameClick}>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="bg-transparent outline-none text-white"
          />
        ) : (
          <div>{boardName}</div>
        )}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            alert("아직 준비중인 기능입니다!");
          }}
          className="flex justify-center items-center gap-2 h-10 w-28 rounded-md px-2 hover:bg-[#2C3238]"
        >
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
