import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "react-query";
import { Socket } from "socket.io-client";
import { getAPI } from "../../axios";

interface UserSearchModalProps {
  userSearchModalRef: any;
  closeUserSearchModal: () => void;
  socket: Socket | null;
  workspaceId: string;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  userSearchModalRef,
  closeUserSearchModal,
  socket,
  workspaceId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const fetchUsers = async (queryKey: any) => {
    const query = queryKey.queryKey[1];
    const result = await getAPI(
      `/api/users/search?email=${query}&name=${query}&workspaceId=${workspaceId}`
    );
    return result.data;
  };

  const { data, isError, isLoading } = useQuery(
    ["searchUsers", searchTerm],
    fetchUsers,
    {
      enabled: searchTerm.length > 0,
    }
  );

  const addMember = (invitedByUserId: number) => {
    socket?.emit("invite", {
      invitedUserId: currentUser.userId,
      invitedByUserId,
      workspaceId: +workspaceId,
    });
  };
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
        <div className="flex justify-between px-2 gap-4 mt-3 items-center mb-2">
          <input
            className="w-full h-8 border-2 rounded-md border-black px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <BsSearch />
          </button>
        </div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>검색도중 오류가 발생했습니다.</div>}
        {data && data.length === 0 && !isLoading && !isError && (
          <div className="w-full h-full flex justify-center items-center">
            🙅‍♀️ 검색결과가 없어요
          </div>
        )}
        {data && data.length > 0 && (
          <ul>
            {data
              .filter((user: any) => user.userId !== currentUser.userId)
              .map((user: any) => (
                <button
                  onClick={() => {
                    addMember(user.userId);
                  }}
                  key={user.id}
                  className="w-full h-16 flex justify-between hover:bg-blue-400 hover:text-white rounded-md py-2"
                >
                  <div className="flex flex-col items-start justify-center w-full h-full px-3">
                    <li>{user.email}</li>
                    <li>{user.name}</li>
                  </div>
                  <div className="w-[40px] h-full flex items-center ">+</div>
                </button>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSearchModal;
