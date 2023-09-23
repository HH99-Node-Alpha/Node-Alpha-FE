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
  return (
    <div className="flex justify-between items-center">
      <div>{result.InvitedUserId}님으로부터 초대가 왔어요!</div>
      <div>
        <button
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
          수락
        </button>
        <button
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
          거절
        </button>
      </div>
    </div>
  );
}

export default InviteResultsModalItem;
