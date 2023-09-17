import { useState } from "react";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../axios";
import useModal from "../hooks/useModal";

function Navbar() {
  const navigate = useNavigate();
  const { isOpen, modalRef, openModal, closeModal } = useModal();
  const [selectedType, setSelectedType] = useState<
    "workspace" | "board" | null
  >(null);
  const [name, setName] = useState("");

  return (
    <>
      <nav className="w-full h-16 py-3 pl-2 flex justify-between bg-[#1D2125] z-10 ">
        <div className="flex gap-8 cursor-pointer">
          <div
            onClick={() => navigate("/")}
            className="flex h-full justify-center items-center text-white"
          >
            <img
              className="w-[60px] h-[60px] mt-[6px]"
              src={process.env.PUBLIC_URL + "/assets/alpha-logo.png"}
              alt="logo"
            />
          </div>
          <div className="flex h-full justify-center items-center text-white hover:opacity-50">
            Workspaces
          </div>
          <button
            className="flex h-full justify-center items-center bg-blue-300 px-4 rounded-lg text-black hover:text-white relative"
            onClick={openModal}
          >
            Create
          </button>
          {isOpen && (
            <div
              ref={modalRef}
              className="absolute top-16 left-[220px] flex z-20"
            >
              <div className="flex flex-col w-[240px] h-[100px] bg-white p-4 rounded shadow-lg justify-center items-center">
                {!selectedType ? (
                  <>
                    <button
                      className="w-full hover:bg-black hover:text-white rounded-md p-2"
                      onClick={() => setSelectedType("workspace")}
                    >
                      Create Workspace
                    </button>
                    <button
                      className="w-full hover:bg-black hover:text-white rounded-md p-2"
                      onClick={() => setSelectedType("board")}
                    >
                      Create Board
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="border-2 border-black px-2 rounded-md py-1"
                      type="text"
                      placeholder={
                        selectedType === "workspace"
                          ? "Workspace Name"
                          : "Board Name"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex justify-between w-full px-2 py-1 mt-1">
                      <button
                        onClick={async () => {
                          if (selectedType === "workspace") {
                            const result = await postAPI("/api/workspaces", {
                              workspaceName: name,
                            });
                            console.log(result);
                          } else {
                            const result = await postAPI(
                              "/api/workspaces/1/boards",
                              {
                                boardName: name,
                              }
                            );
                            console.log(result);
                          }
                          setName("");
                          setSelectedType(null);
                          closeModal();
                        }}
                      >
                        Create
                      </button>
                      <button
                        onClick={() => {
                          closeModal();
                          setSelectedType(null);
                          setName("");
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
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
    </>
  );
}

export default Navbar;
