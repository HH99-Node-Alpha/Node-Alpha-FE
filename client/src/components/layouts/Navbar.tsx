import { useEffect } from "react";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Socket } from "socket.io-client";
import { postAPI } from "../../axios";
import useModal from "../../hooks/useModal";
import {
  alarmCountState,
  inviteResultsState,
  userWorkspacesBoardsState,
} from "../../states/userInfoState";
import CreateWorkspaceBoardModal from "../modals/CreateWorkspaceBoardModal";
import InviteResultsModalItem from "../modals/InviteResultModalItem";

function Navbar({
  page,
  socket,
  worksapceId,
  removeInvitationById,
}: {
  page?: string;
  socket?: Socket | null;
  worksapceId?: string;
  removeInvitationById?: (invitationId: number) => void;
}) {
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

  const {
    isOpen: inviteResultsModalIsOpen,
    modalRef: inviteResultsModalRef,
    openModal: inviteResultsModalOpen,
    closeModal: inviteResultsModalClose,
  } = useModal();

  const {
    isOpen: userModalIsOpen,
    modalRef: userModalRef,
    openModal: userModalOpen,
    closeModal: userModalClose,
  } = useModal();

  const userWorkspacesBoards = useRecoilValue(userWorkspacesBoardsState);
  const [inviteResults, setInviteResults] = useRecoilState(inviteResultsState);
  const [alarmCount, setAlarmCount] = useRecoilState(alarmCountState);
  const workspaces = userWorkspacesBoards.map((v) => {
    return {
      workspaceId: v.workspaceId,
      workspaceName: v.workspaceName,
      boardId: v.Boards[0]?.boardId,
    };
  });

  const logout = async () => {
    await postAPI("/api/logout", {});
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("invite", (data) => {
      console.log(data);
      setInviteResults((prev) => [...prev, data]);
      setAlarmCount((prev) => prev + 1);
    });
    return () => {
      socket.off("invite");
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
                        className="hover:bg-blue-500  hover:text-white p-2 rounded"
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
        <div className="h-full flex gap-8 relative">
          {page !== "main" && (
            <>
              <div
                className="flex justify-center items-center text-white cursor-pointer relative"
                onClick={inviteResultsModalOpen}
              >
                <GoBell size={24} />
              </div>
              {alarmCount !== 0 && (
                <div className="absolute right-[64px] top-0 bg-red-600 text-sm px-[6px] text-white rounded-full">
                  {alarmCount}
                </div>
              )}
            </>
          )}
          <img
            className="h-full rounded-full cursor-pointer"
            src={process.env.PUBLIC_URL + "/assets/dev-jeans.png"}
            alt="user"
            onClick={userModalOpen}
          />
        </div>
        {inviteResultsModalIsOpen && (
          <div
            ref={inviteResultsModalRef}
            className="absolute top-[68px] right-[72px] min-w-[300px] bg-white rounded-md px-3 py-2 flex flex-col gap-2 justify-center"
          >
            {inviteResults.length === 0 ? (
              <div className="h-40 flex justify-center items-center w-full cursor-default">
                🙅‍♀️알림이 없어요
              </div>
            ) : (
              inviteResults.map((result: any, index: number) => (
                <InviteResultsModalItem
                  key={index}
                  result={result}
                  worksapceId={worksapceId}
                  socket={socket}
                  closeModal={inviteResultsModalClose}
                  removeInvitationById={removeInvitationById}
                />
              ))
            )}
          </div>
        )}
        {userModalIsOpen && (
          <div
            ref={userModalRef}
            className="absolute top-[68px] right-[8px] w-[100px] bg-white rounded-md px-3 py-2 flex flex-col gap-2"
          >
            <button
              onClick={() => {
                alert("아직 준비중인 기능입니다!");
                userModalClose();
              }}
              className="hover:bg-rose-400  hover:text-white p-1 rounded"
            >
              수정하기
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
                userModalClose();
              }}
              className="hover:bg-rose-400  hover:text-white p-1 rounded"
            >
              로그아웃
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
