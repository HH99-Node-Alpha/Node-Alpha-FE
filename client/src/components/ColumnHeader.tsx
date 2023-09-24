import React from "react";
import { LuDelete } from "react-icons/lu";

interface ColumnHeaderProps {
  isEditing: boolean;
  editedColumnName: string;
  onEditBlur: () => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onStartEdit: (columnId: string, columnName: string) => void;
  onDelete: (columnId: string) => void;
  columnId: string;
  columnName: string;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  isEditing,
  editedColumnName,
  onEditBlur,
  onEditChange,
  onEditKeyDown,
  onStartEdit,
  onDelete,
  columnId,
  columnName,
}) => {
  return isEditing ? (
    <input
      autoFocus
      value={editedColumnName}
      onBlur={onEditBlur}
      onChange={onEditChange}
      onKeyDown={onEditKeyDown}
      className="w-full h-8 px-2 bg-[#22272B] rounded-md mb-2 text-white outline-none"
    />
  ) : (
    <h2 className="text-white mb-2 h-8 flex items-center px-2 w-full justify-between">
      <div className="w-full" onClick={() => onStartEdit(columnId, columnName)}>
        {columnName}
      </div>
      <button onClick={() => onDelete(columnId)}>
        <LuDelete />
      </button>
    </h2>
  );
};

export default ColumnHeader;
