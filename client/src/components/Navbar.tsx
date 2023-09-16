import { useState } from "react";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../axios";

function Navbar() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "workspace" | "board" | null
  >(null);
  const [name, setName] = useState("");

  return (
    <>
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
          <button
            className="flex h-full justify-center items-center bg-blue-300 px-4 rounded-lg text-black hover:text-white relative"
            onClick={() => setShowModal(true)}
          >
            Create
          </button>
          {showModal && (
            <div className="absolute top-16 left-52 flex z-20">
              <div className="flex flex-col bg-white p-4 rounded shadow-lg">
                {!selectedType ? (
                  <>
                    <button onClick={() => setSelectedType("workspace")}>
                      Create Workspace
                    </button>
                    <button onClick={() => setSelectedType("board")}>
                      Create Board
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder={
                        selectedType === "workspace"
                          ? "Workspace Name"
                          : "Board Name"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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
                        setShowModal(false);
                      }}
                    >
                      Create
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedType(null);
                    setName("");
                  }}
                >
                  Close
                </button>
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
