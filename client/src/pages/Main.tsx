import { useParams } from "react-router-dom";
import Board from "../components/Board";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
// import io from "socket.io-client";

function Main() {
  // socket.io
  // const onSocket = () => {
  //   const interval: number = 300000;
  //   const socket = io("http://localhost:8000");

  //   setInterval(() => {
  //     socket.emit("toServer", "클라이언트 -> 서버");
  //   }, interval);

  //   socket.on("toClient", (data) => console.log(data)); // 서버 -> 클라이언트
  // };
  // onSocket();

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
