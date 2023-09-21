import { useState } from "react";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { postAPI } from "../../axios";
import useModal from "../../hooks/useModal";
import { userInfoState } from "../../states/userInfoState";

function Navbar({ page }: { page?: string }) {
  const navigate = useNavigate();
  const {
    isOpen: createWorkspaceBoardIsOpen,
    modalRef: createWorkspaceBoardModalRef,
    openModal: createWorkspaceBoardModalOpen,
    closeModal: createWorkspaceBoardModalClose,
  } = useModal();
  const {
    isOpen: workspaceModalIsOpen,
    modalRef: workspaceModalRef,
    openModal: workspaceModalOpen,
    closeModal: workspaceModalClose,
  } = useModal();
  const [selectedType, setSelectedType] = useState<
    "workspace" | "board" | null
  >(null);
  const [name, setName] = useState("");
  const userWorkspacesBoards = useRecoilValue(userInfoState);
  const workspaces = userWorkspacesBoards.map((v) => {
    return {
      workspaceId: v.workspaceId,
      workspaceName: v.workspaceName,
      boardId: v.Boards[0].boardId,
    };
  });

  return (
    <>
      <nav className="w-full h-16 py-3 pl-1 pr-4 flex justify-between bg-[#1D2125] z-10 ">
        <div className="flex gap-8 cursor-pointer">
          <div
            onClick={() => navigate("/main")}
            className="flex h-full justify-center items-center text-white"
          >
            <img
              className="w-[60px] h-[60px] mt-[6px]"
              src={process.env.PUBLIC_URL + "/assets/alpha-logo.png"}
              alt="logo"
            />
          </div>
          <button
            className="flex h-full justify-center items-center text-white hover:opacity-50"
            onClick={workspaceModalOpen}
          >
            Workspaces
          </button>
          <button
            className="flex h-full justify-center items-center bg-blue-300 px-4 rounded-lg text-black hover:text-white relative"
            onClick={createWorkspaceBoardModalOpen}
          >
            Create
          </button>
          {workspaceModalIsOpen && (
            <>
              <div
                ref={workspaceModalRef}
                className="absolute top-[68px] left-[92px] w-[240px] bg-white rounded-md px-3 py-2 flex flex-col gap-2"
              >
                {workspaces.map((workspace) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          navigate(
                            `/workspaces/${workspace.workspaceId}/boards/${workspace.boardId}`
                          );
                          workspaceModalClose();
                        }}
                        key={workspace.workspaceId}
                      >
                        {workspace.workspaceName}
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
          {createWorkspaceBoardIsOpen && (
            <div
              ref={createWorkspaceBoardModalRef}
              className="absolute top-[68px] left-[220px] flex z-20"
            >
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
                        selectedType === "workspace"
                          ? "Workspace Name"
                          : "Board Name"
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
                            await postAPI("/api/workspaces/1/boards", {
                              boardName: name,
                            });
                          }
                          setName("");
                          setSelectedType(null);
                          createWorkspaceBoardModalClose();
                        }}
                      >
                        Create
                      </button>
                      <button
                        onClick={() => {
                          createWorkspaceBoardModalClose();
                          setSelectedType(null);
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
          )}
        </div>
        <div className="h-full  flex gap-8">
          <div className="flex justify-center items-center text-white cursor-pointer">
            <GoBell size={24} />
          </div>
          <img
            className="h-full rounded-full cursor-pointer"
            src={process.env.PUBLIC_URL + "/assets/dev-jeans.png"}
            alt="user"
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
