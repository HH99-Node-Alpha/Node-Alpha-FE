import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchUserData } from "../../api/userAPI";
import { postAPI } from "../../axios";
import { userWorkspacesBoardsState } from "../../states/userInfoState";

type CreateWorkspaceBoardModalProps = {
  page?: string;
  workspaceId?: string;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
};

const CreateWorkspaceBoardModal: React.FC<CreateWorkspaceBoardModalProps> = ({
  page,
  closeModal,
  modalRef,
  workspaceId,
}) => {
  const [selectedType, setSelectedType] = useState<
    "workspace" | "board" | null
  >(null);
  const [name, setName] = useState("");
  const [, setUserWorkspacesBoards] = useRecoilState(userWorkspacesBoardsState);

  const { refetch } = useQuery("userData", fetchUserData, {
    onSuccess: (data) => {
      setUserWorkspacesBoards(data);
    },
  });
  return (
    <div ref={modalRef} className="absolute top-[68px] left-[220px] flex z-20">
      <div className="flex flex-col w-[240px] h-auto bg-white p-4 rounded shadow-lg justify-center items-center">
        {!selectedType ? (
          <>
            <button
              className="w-full hover:bg-black hover:text-white rounded-md p-2"
              onClick={() => setSelectedType("workspace")}
            >
              Create Workspace
            </button>
            {page !== "main" && (
              <button
                className="w-full hover:bg-black hover:text-white rounded-md p-2"
                onClick={() => setSelectedType("board")}
              >
                Create Board
              </button>
            )}
          </>
        ) : (
          <>
            <input
              className="border-2 border-black px-2 rounded-md py-1"
              type="text"
              placeholder={
                selectedType === "workspace" ? "Workspace Name" : "Board Name"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex justify-between w-full px-2 py-1 mt-1">
              <button
                onClick={async () => {
                  if (selectedType === "workspace") {
                    await postAPI("/api/workspaces", {
                      workspaceName: name,
                    });
                  } else {
                    await postAPI(`/api/workspaces/${workspaceId}/boards`, {
                      boardName: name,
                    });
                  }
                  setName("");
                  setSelectedType(null);
                  refetch();
                  closeModal();
                }}
              >
                Create
              </button>
              <button
                onClick={() => {
                  closeModal();
                  setSelectedType(null);
                  refetch();
                  setName("");
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateWorkspaceBoardModal;
