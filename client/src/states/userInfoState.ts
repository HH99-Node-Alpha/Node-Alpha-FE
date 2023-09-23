import { atom } from "recoil";
import { InviteResult } from "../pages/Workspace";
import { WorkspaceType } from "../types/WorkspacesBoards";

export const userWorkspacesBoardsState = atom<WorkspaceType[]>({
  key: "userWorkspacesBoardsState",
  default: [],
});

export const inviteResultsState = atom<InviteResult[]>({
  key: "inviteResultsState",
  default: [],
});

export const alarmCountState = atom<number>({
  key: "alarmCountState",
  default: 0,
});
