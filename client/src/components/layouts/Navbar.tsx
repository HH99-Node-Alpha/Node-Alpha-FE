import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useModal from "../../hooks/useModal";
import { userInfoState } from "../../states/userInfoState";
import CreateWorkspaceBoardModal from "../modals/CreateWorkspaceBoardModal";

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
            <CreateWorkspaceBoardModal
              page={page}
              closeModal={createWorkspaceBoardModalClose}
              modalRef={createWorkspaceBoardModalRef}
            />
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
