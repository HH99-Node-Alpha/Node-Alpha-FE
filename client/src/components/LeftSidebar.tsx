import { BsPerson } from "react-icons/bs";

function LeftSidebar() {
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
      </div>
    </>
  );
}
export default LeftSidebar;
