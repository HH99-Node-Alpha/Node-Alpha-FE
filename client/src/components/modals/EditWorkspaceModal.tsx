import { useState } from "react";
import { useRecoilState } from "recoil";
import { Socket } from "socket.io-client";
import { postAPI, putAPI } from "../../axios";
import { userWorkspacesBoardsState } from "../../states/userInfoState";
import { WorkspaceType } from "../../types/WorkspacesBoards";

interface EditWorkspaceModalProps {
  modalRef: any;
  closeModal: () => void;
  socket: Socket | null;
  workspaceId: string;
}

const EditWorkspaceModal: React.FC<EditWorkspaceModalProps> = ({
  modalRef,
  closeModal,
  socket,
  workspaceId,
}) => {
  const [userWorkspacesBoards, setUserWorkspacesBoards] = useRecoilState<
    WorkspaceType[]
  >(userWorkspacesBoardsState);

  const targetWorkspace = userWorkspacesBoards.find(
    (workspace) => workspace.workspaceId.toString() === workspaceId
  );
  const [preview, setPreview] = useState(
    targetWorkspace?.workspaceImage ||
      `${process.env.PUBLIC_URL}/assets/dev-jeans.png`
  );

  const [name, setName] = useState(targetWorkspace?.workspaceName || "");
  const [newWorkspaceImage, setNewWorkspaceImage] = useState(
    targetWorkspace?.workspaceImage || ""
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPreview(fileURL);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const newWorkspaceImageUrl = await postAPI("/api/upload", formData);
      setNewWorkspaceImage(newWorkspaceImageUrl.data);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await putAPI(`/api/workspaces/${workspaceId}`, {
        workspaceName: name,
        workspaceImage: newWorkspaceImage,
      });

      if (response.status === 200) {
        setUserWorkspacesBoards((prevWorkspaces) =>
          prevWorkspaces.map((workspace) =>
            workspace.workspaceId.toString() === workspaceId
              ? {
                  ...workspace,
                  workspaceName: name,
                  workspaceImage: newWorkspaceImage,
                }
              : workspace
          )
        );
        closeModal();
      }
    } catch (error) {
      console.error("Workspace Update Failed", error);
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-60"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="w-[400px] h-[500px] bg-white rounded-md p-4 flex flex-col gap-4 justify-around items-center"
        ref={modalRef}
      >
        <label htmlFor="fileInput">
          <img src={preview} alt="workspace_Image" className="rounded-lg" />
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace Name"
          className="flex justify-center items-center text-center"
        />
        <button
          className="bg-rose-400 text-white py-1 px-2 rounded-xl"
          onClick={handleSubmit}
        >
          수정완료
        </button>
      </div>
    </div>
  );
};

export default EditWorkspaceModal;
