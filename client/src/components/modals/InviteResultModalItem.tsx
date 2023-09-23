// InviteResultsModalItem.tsx
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

interface InviteResultsModalItemProps {
  result: any;
  worksapceId: string | undefined;
  socket?: Socket | null;
  closeModal: () => void;
  removeInvitationById?: (invitationId: number) => void;
}

function InviteResultsModalItem({
  result,
  worksapceId,
  socket,
  closeModal,
  removeInvitationById,
}: InviteResultsModalItemProps) {
  const navigate = useNavigate();
  console.log(result);
  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        {result.workspaceName}의 {result.userName}님으로부터 초대가 왔어요!
      </div>
      <div className="flex gap-2">
        <button
          className=" bg-blue-500 text-white px-[6px] rounded-md"
          onClick={() => {
            socket?.emit("confirmInvitation", {
              WorkspaceId: +result.WorkspaceId!,
              invitationId: result.invitationId,
              InvitedByUserId: result.InvitedByUserId,
              accepted: true,
            });
            closeModal();
            removeInvitationById?.(result.invitationId);
            navigate("/main");
          }}
        >
          O
        </button>
        <button
          className=" bg-rose-400 text-white px-[6px] rounded-md"
          onClick={() => {
            socket?.emit("confirmInvitation", {
              workspaceId: +worksapceId!,
              invitationId: result.invitationId,
              InvitedByUserId: result.InvitedByUserId,
              accepted: false,
            });
            closeModal();
            removeInvitationById?.(result.invitationId);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default InviteResultsModalItem;
