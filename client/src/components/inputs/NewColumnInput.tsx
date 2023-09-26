import React from "react";

type NewColumnInputProps = {
  isInputMode: boolean;
  columnName: string;
  setColumnName: (name: string) => void;
  addNewColumn: () => void;
  toggleInputMode: () => void;
};

const NewColumnInput: React.FC<NewColumnInputProps> = ({
  isInputMode,
  columnName,
  setColumnName,
  addNewColumn,
  toggleInputMode,
}) => {
  return isInputMode ? (
    <div className="bg-white p-4 w-[320px] h-[132px] flex flex-col justify-between rounded text-black">
      <input
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addNewColumn();
          }
        }}
        className="p-2 border-2 border-black rounded-md"
        placeholder="Column이름을 입력해주세요."
      />
      <div className="flex justify-between items-end mt-2">
        <button
          onClick={addNewColumn}
          className="bg-blue-500 text-white p-2 rounded h-full"
        >
          Add column
        </button>
        <button
          onClick={toggleInputMode}
          className="px-[14px] py-2 h-full rounded border-black text-black border-2 hover:bg-black hover:text-white"
        >
          X
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={toggleInputMode}
      className="bg-white p-4 mt-[2px] w-[320px] h-[40px] flex items-center justify-center rounded text-black"
    >
      +
    </button>
  );
};

export default NewColumnInput;
