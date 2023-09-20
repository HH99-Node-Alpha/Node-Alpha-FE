type RightSidebarProps = {
  closeSidebar: () => void;
  isOpen: boolean;
  openModal: () => void;
};
function RightSidebar({ closeSidebar, isOpen, openModal }: RightSidebarProps) {
  return (
    <div
      className={`h-full min-w-[320px] bg-[#161A1E] text-white transition-transform duration-300 absolute right-0 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-[64px] items-center justify-around border-b-2 border-[#2C3238]">
        <div className="w-[280px] flex justify-center">Menu</div>
        <button onClick={closeSidebar} className="w-[40px] h-[40px]">
          X
        </button>
      </div>
      <button
        className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]"
        onClick={openModal}
      >
        <div className="flex h-full gap-4 items-center">
          <span>색상 바꾸기</span>
        </div>
        <div className="flex h-full items-center"></div>
      </button>
    </div>
  );
}

export default RightSidebar;
