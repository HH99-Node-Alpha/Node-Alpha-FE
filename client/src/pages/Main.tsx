import { useParams } from "react-router-dom";
import Board from "../components/Board";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import io from "socket.io-client";
import { useEffect } from "react";

function Main() {
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

  const { boardId } = useParams();

  return (
    <Wrapper>
      <Navbar />
      <body className="flex w-full h-full overflow-auto">
        <LeftSidebar />
        <Board boardId={boardId!} />
      </body>
    </Wrapper>
  );
}

export default Main;
