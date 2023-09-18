import { useQuery } from "react-query";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import { getAPI } from "../axios";
import { useNavigate } from "react-router-dom";

type Workspace = {
  Boards: Board[];
  workspaceId: number;
  workspaceName: string;
};

type Board = {
  boardId: number;
  boardName: string;
};

type SectionProps = {
  title: string;
  items: {
    id: number;
    name: string;
    workspaceId?: number;
    boardId?: number;
  }[];
};

type MainCardProps = {
  name: string;
  workspaceId?: number;
  boardId?: number;
};

const fetchUserData = async () => {
  const response = await getAPI("/api/users");
  console.log(response.data);
  return response.data;
};

function Main() {
  const { data, isLoading, isError } = useQuery("userData", fetchUserData);

  const workspaces: Workspace[] = data || [];
  const boards: Board[] =
    data?.reduce(
      (acc: Board[], workspace: Workspace) =>
        acc.concat(workspace.Boards || []),
      []
    ) || [];

  if (isLoading) return <p>로딩중..</p>;
  if (isError) return <p>서버 에러</p>;

  return (
    <Wrapper>
      <Navbar />
      <div className="flex w-full h-full overflow-auto justify-center items-center">
        <div className=" w-7/12 h-5/6 bg-[#1D2125] rounded-lg flex flex-col items-center overflow-auto">
          <h1 className="w-full h-16 py-2 border-b-2 border-white flex items-center text-white px-4 ">
            하이!
          </h1>
          <Section
            title="Recent visited"
            items={workspaces.slice(0, 7).map((workspace: Workspace) => ({
              id: workspace.workspaceId,
              name: workspace.workspaceName,
              workspaceId: workspace.workspaceId,
              boardId: workspace.Boards[0]?.boardId,
            }))}
          />
          <Section
            title="My Workspaces"
            items={workspaces.map((workspace: any) => ({
              id: workspace.workspaceId,
              name: workspace.workspaceName,
              workspaceId: workspace.workspaceId,
              boardId: workspace.Boards[0]?.boardId,
            }))}
          />
          <Section
            title="My Boards"
            items={boards.map((board: any) => ({
              id: board.boardId,
              name: board.boardName,
              workspaceId: data[0].workspaceId,
              boardId: board.boardId,
            }))}
          />
        </div>
      </div>
    </Wrapper>
  );
}

function Section({ title, items }: SectionProps) {
  return (
    <div className="w-full flex-1">
      <div className="w-full h-10 flex items-center p-4 text-white mt-2 text-2xl text-bold mb-2">
        {title}
      </div>
      <div className="w-full h-full px-4 grid grid-cols-6 grid-rows-2 gap-x-6 gap-y-2 items-center">
        {items?.map((item) => (
          <MainCard
            key={item.id}
            name={item.name}
            workspaceId={item.workspaceId}
            boardId={item.boardId}
          />
        ))}
      </div>
    </div>
  );
}

function MainCard({ name, workspaceId, boardId }: MainCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (workspaceId && boardId) {
      navigate(`/workspaces/${workspaceId}/boards/${boardId}`);
    } else if (workspaceId) {
      navigate(`/workspaces/${workspaceId}/boards/1`);
    }
  };

  return (
    <div onClick={handleCardClick}>
      <div className="w-40 h-20 bg-rose-400 rounded-md"></div>
      <div className="text-white mt-2 mx-1">{name}</div>
    </div>
  );
}

export default Main;
