import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getAPI, putAPI } from "../axios";
import { io, Socket } from "socket.io-client";
import { useQuery } from "react-query";

import Board from "../components/Board";
import Wrapper from "../components/layouts/Wrapper";
import Navbar from "../components/layouts/Navbar";
import LeftSidebar from "../components/layouts/LeftSidebar";
import ChangeBoardColorModal from "../components/modals/ChangeBoardColorModal";
import UserSearchModal from "../components/modals/UserSearchModal";
import useModal from "../hooks/useModal";

import {
  alarmCountState,
  inviteResultsState,
  userWorkspacesBoardsState,
} from "../states/userInfoState";

import { BoardType, ColorType, WorkspaceType } from "../types/WorkspacesBoards";
import { determineBackgroundStyle } from "../utils/boardStyles";
import { fetchUserData } from "../api/userAPI";
import EditWorkspaceModal from "../components/modals/EditWorkspaceModal";

export interface InviteResult {
  invitationId: number;
}

function Workspace() {
  const { workspaceId, boardId } = useParams();
  const {
    isOpen: isColorModalOpen,
    modalRef,
    closeModal,
    openModal,
  } = useModal();
  const {
    isOpen: isUserSearchModalOpen,
    modalRef: userSearchModalRef,
    openModal: openUserSearchModal,
    closeModal: closeUserSearchModal,
  } = useModal();
  const navigate = useNavigate();

  const [selectedBackground, setSelectedBackground] =
    useState<ColorType | null>(null);
  const [backgrounds, setBackgrounds] = useState<ColorType[]>([]);
  const [tempSelectedBackground, setTempSelectedBackground] =
    useState<ColorType | null>(null);
  const [currentBoardBackground, setCurrentBoardBackground] =
    useState<ColorType | null>(null);

  const [userWorkspacesBoards, setUserWorkspacesBoards] = useRecoilState<
    WorkspaceType[]
  >(userWorkspacesBoardsState);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setInviteResults] =
    useRecoilState<InviteResult[]>(inviteResultsState);
  const [, setAlarmCount] = useRecoilState(alarmCountState);

  const {
    isOpen: isEditWorkspaceModalOpen,
    modalRef: editWorkspaceModalRef,
    openModal: openEditWorkspaceModal,
    closeModal: closeEditWorkspaceModal,
  } = useModal();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/");
    }
    const newSocket = io(`${process.env.REACT_APP_SERVER_URL!}/main`, {
      query: {
        userId: user.userId,
      },
      path: "/socket.io",
    });
    newSocket.emit("join");
    newSocket.emit("loginAndAlarm", user.userId);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    if (!socket) return;
    socket.on("loginAndAlarm", (data: any) => {
      if (data.inviteResult && Array.isArray(data.inviteResult)) {
        setInviteResults(data.inviteResult);
        setAlarmCount(data.inviteResult.length);
      }
    });

    return () => {
      socket.off("loginAndAlarm");
    };
  }, [socket, setInviteResults, setAlarmCount]);

  const { refetch } = useQuery("userData", fetchUserData, {
    onSuccess: (data) => {
      setUserWorkspacesBoards(data);
    },
  });

  useEffect(() => {
    const targetWorkspace: WorkspaceType | undefined =
      userWorkspacesBoards.find(
        (workspace: WorkspaceType) =>
          workspace.workspaceId.toString() === workspaceId
      );
    if (targetWorkspace && "Boards" in targetWorkspace) {
      const targetBoard: BoardType | undefined = targetWorkspace.Boards.find(
        (board: BoardType) => board.boardId.toString() === boardId
      );
      if (targetBoard) {
        setCurrentBoardBackground(targetBoard.Color);
      }
      setTempSelectedBackground(targetBoard?.Color || null);
    }
  }, [userWorkspacesBoards, workspaceId, boardId]);

  useEffect(() => {
    const fetchColors = async () => {
      const response = await getAPI("/api/workspaces/1/colors");
      const colors: ColorType[] = response.data;
      setBackgrounds(colors);
    };

    fetchColors();
  }, []);

  const handleBackgroundSelect = (background: ColorType) => {
    setTempSelectedBackground(background);
  };

  const handleSave = async () => {
    if (!tempSelectedBackground) return;

    const payload = {
      colorId: tempSelectedBackground.colorId,
    };
    const response = await putAPI(
      `/api/workspaces/${workspaceId}/boards/${boardId}`,
      payload
    );

    if (response.status === 200) {
      const updatedWorkspacesBoards: any = userWorkspacesBoards.map(
        (workspace: WorkspaceType) => {
          if (workspace.workspaceId.toString() === workspaceId) {
            return {
              ...workspace,
              Boards: workspace.Boards.map((board: BoardType) => {
                if (board.boardId.toString() === boardId) {
                  return {
                    ...board,
                    Color: { ...selectedBackground },
                  };
                }
                return board;
              }),
            };
          }
          return workspace;
        }
      );
      refetch();
      setUserWorkspacesBoards(updatedWorkspacesBoards);
      setSelectedBackground(tempSelectedBackground);
      setCurrentBoardBackground({ ...tempSelectedBackground });
      setTempSelectedBackground(null);
      closeModal();
    }
  };

  const removeInvitationById = (invitationId: number) => {
    setInviteResults((prev) =>
      prev.filter((result) => result.invitationId !== invitationId)
    );
  };

  const previewBackgroundStyle = determineBackgroundStyle(
    tempSelectedBackground || currentBoardBackground
  );
  return (
    <Wrapper>
      <Navbar
        socket={socket}
        workspaceId={workspaceId}
        removeInvitationById={removeInvitationById}
      />
      <div className="flex w-full h-full overflow-auto">
        <LeftSidebar
          workspaceId={workspaceId!}
          openUserSearchModal={openUserSearchModal}
          openEditWorkspaceModal={openEditWorkspaceModal}
        />
        <Board boardId={boardId!} openModal={openModal} />
      </div>
      {isUserSearchModalOpen && (
        <UserSearchModal
          userSearchModalRef={userSearchModalRef}
          closeUserSearchModal={closeUserSearchModal}
          socket={socket}
          workspaceId={workspaceId!}
        />
      )}
      {isEditWorkspaceModalOpen && (
        <EditWorkspaceModal
          modalRef={editWorkspaceModalRef}
          closeModal={closeEditWorkspaceModal}
          socket={socket}
          workspaceId={workspaceId!}
        />
      )}

      <ChangeBoardColorModal
        isColorModalOpen={isColorModalOpen}
        modalRef={modalRef}
        closeModal={closeModal}
        handleSave={handleSave}
        handleBackgroundSelect={handleBackgroundSelect}
        tempSelectedBackground={tempSelectedBackground}
        backgrounds={backgrounds}
        previewBackgroundStyle={previewBackgroundStyle}
      />
    </Wrapper>
  );
}

export default Workspace;
