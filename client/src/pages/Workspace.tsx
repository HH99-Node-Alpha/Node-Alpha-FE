import { useParams } from "react-router-dom";
import Board from "../components/Board";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import io from "socket.io-client";
import { useEffect } from "react";

function Workspace() {
  useEffect(() => {
    const socketInstance = io("http://localhost:8000");

    const interval = setInterval(() => {
      socketInstance.emit("toServer", "클라이언트 -> 서버");
    }, 3000);

    socketInstance.on("toClient", (data) => console.log(data));

    // 컴포넌트가 언마운트될 때 소켓 연결과 setInterval을 정리합니다.
    return () => {
      clearInterval(interval);
      socketInstance.close();
    };
  }, []);

  const { workspaceId, boardId } = useParams();

  return (
    <Wrapper>
      <Navbar />
      <div className="flex w-full h-full overflow-auto">
        <LeftSidebar workspaceId={workspaceId!} />
        <Board boardId={boardId!} />
      </div>
    </Wrapper>
  );
}

export default Workspace;
