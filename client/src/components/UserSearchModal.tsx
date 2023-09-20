import { BsSearch } from "react-icons/bs";

interface UserSearchModalProps {
  userSearchModalRef: any;
  closeUserSearchModal: () => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  userSearchModalRef,
  closeUserSearchModal,
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-60"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="w-[400px] h-[600px] bg-white rounded-md p-2"
        ref={userSearchModalRef}
      >
        <div className="flex justify-between px-3 mt-2">
          <div>초대하기</div>
          <button onClick={closeUserSearchModal}>X</button>
        </div>
        <div className="flex justify-between px-2 gap-4 mt-3 items-center">
          <input className="w-full h-8 border-2 rounded-md border-black px-2" />
          <button>
            <BsSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
