import { useParams } from "react-router-dom";
import Board from "../components/Board";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import { useRecoilState } from "recoil";
import { userInfoState } from "../states/userInfoState";
import { getAPI, putAPI } from "../axios";
import { BoardType, ColorType, WorkspaceType } from "../types/WorkspacesBoards";
import ChangeBoardColorModal from "../components/ChangeBoardColorModal";
import { useQuery } from "react-query";

function Workspace() {
  const { workspaceId, boardId } = useParams();
  const {
    isOpen: isColorModalOpen,
    modalRef,
    closeModal,
    openModal,
  } = useModal();

  const [selectedBackground, setSelectedBackground] =
    useState<ColorType | null>(null);
  const [backgrounds, setBackgrounds] = useState<ColorType[]>([]);
  const [tempSelectedBackground, setTempSelectedBackground] =
    useState<ColorType | null>(null);

  const [currentBoardBackground, setCurrentBoardBackground] =
    useState<ColorType | null>(null);
  const [userWorkspacesBoards, setUserWorkspacesBoards] =
    useRecoilState<WorkspaceType[]>(userInfoState);

  const fetchUserData = async () => {
    const response = await getAPI("/api/users");
    return response.data;
  };

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

  const determineBackgroundStyle = (color: ColorType | null) => {
    let backgroundStyle = {};
    if (color?.backgroundUrl) {
      backgroundStyle = {
        backgroundImage: `url(${color.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      };
    } else if (color?.startColor) {
      backgroundStyle = {
        background: color.startColor,
      };
    } else if (color?.endColor) {
      backgroundStyle = {
        background: color.endColor,
      };
    }
    return backgroundStyle;
  };

  const previewBackgroundStyle = determineBackgroundStyle(
    tempSelectedBackground || currentBoardBackground
  );

  return (
    <Wrapper>
      <Navbar />
      <div className="flex w-full h-full overflow-auto">
        <LeftSidebar workspaceId={workspaceId!} />
        <Board boardId={boardId!} openModal={openModal} />
      </div>

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
