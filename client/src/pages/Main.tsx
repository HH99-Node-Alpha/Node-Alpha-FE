import { useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { BsPerson, BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function Main() {
  const navigate = useNavigate();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div
      className="w-screen h-screen flex flex-col bg-cover"
      style={{ backgroundImage: "url('/assets/background.svg')" }}
    >
      <nav className="w-full h-16 py-3 px-10 flex justify-between bg-[#1D2125] z-10 ">
        <div className="flex gap-8 cursor-pointer">
          <div
            onClick={() => navigate("/")}
            className="flex h-full justify-center items-center text-white"
          >
            로고
          </div>
          <div className="flex h-full justify-center items-center text-white hover:opacity-50">
            Workspaces
          </div>
          <button className="flex h-full justify-center items-center bg-blue-300 px-4 rounded-lg text-black hover:text-white">
            Create
          </button>
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
      <body className="flex w-full h-full">
        <LeftSidebar />
        <div className="h-full w-full">
          <div className="w-full h-[64px] text-white flex justify-between p-4 mb-4 gap-8 items-center border-b-2 cursor-pointer">
            <div>
              <div>Alpha's Board</div>
            </div>
            <div className="flex gap-4">
              <button className="flex justify-center items-center gap-2 h-10 w-28 rounded-md px-2 hover:bg-[#2C3238]">
                <BsPersonPlus />
                <span>share</span>
              </button>
              <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)}>
                <GiHamburgerMenu size={24} />
              </button>
            </div>
          </div>
        </div>
        {rightSidebarOpen && (
          <div className="h-full w-[400px] bg-[#161A1E] text-white">
            <div className="flex h-[64px] items-center justify-around border-b-2 border-[#2C3238]">
              <div className="w-[280px] flex justify-center">Menu</div>
              <button
                onClick={() => setRightSidebarOpen(false)}
                className="w-[40px] h-[40px]"
              >
                X
              </button>
            </div>
            <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
              <div className="flex h-full gap-4 items-center">
                <span>색상 바꾸기</span>
              </div>
              <div className="flex h-full items-center"></div>
            </button>
          </div>
        )}
      </body>
    </div>
  );
}

export default Main;

function LeftSidebar() {
  return (
    <>
      <div className="h-full w-[400px] bg-[#161A1E]">
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
      </div>
    </>
  );
}
