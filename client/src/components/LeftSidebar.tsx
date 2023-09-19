import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userInfoState } from "../states/userInfoState";

interface Color {
  backgroundUrl?: string;
  colorId: number;
  endColor?: string | null;
  startColor?: string | null;
}

interface Board {
  boardId: number;
  boardName: string;
  Color: Color;
}

interface Workspace {
  workspaceId: number;
  workspaceName: string;
  Boards: Board[];
}

type UserWorkspacesBoardSpaces = Workspace[];

function LeftSidebar({ workspaceId }: { workspaceId: string }) {
  const navigate = useNavigate();
  const userWorkspacesBoardSpaces: UserWorkspacesBoardSpaces =
    useRecoilValue(userInfoState);

  const workspace = userWorkspacesBoardSpaces.find(
    (item) => item.workspaceId === Number(workspaceId)
  );

  const boards = workspace?.Boards;

  return (
    <>
      <div className="h-full min-w-[320px] bg-[#161A1E]">
        <div className="w-full h-[64px] flex p-4 mb-4 gap-4 items-center border-b-2 border-[#2C3238] cursor-pointer">
          <img
            className="w-[40px] h-[40px] rounded-md cursor-pointer"
            src={process.env.PUBLIC_URL + "/assets/dev-jeans.png"}
            alt="user"
          />
          <div className="text-white">Alpha's Workspace</div>
        </div>
        <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
          <div className="flex h-full gap-4 items-center">
            <BsPerson />
            <span>Members</span>
          </div>
          <div className="flex h-full items-center">+</div>
        </button>
        <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
          <div className="flex h-full gap-4 items-center">
            <span>Your boards</span>
          </div>
          <div className="flex h-full items-center">+</div>
        </button>
        <div>
          {boards?.map((board: Board) => (
            <button
              key={board.boardId}
              className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238] items-center"
              onClick={() =>
                navigate(`/workspaces/${workspaceId}/boards/${board.boardId}`)
              }
            >
              {board.boardName}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
export default LeftSidebar;
