import { atom } from "recoil";
import { WorkspaceType } from "../types/WorkspacesBoards";

export const userInfoState = atom<WorkspaceType[]>({
  key: "userWorkspacesBoardsState",
  default: [],
});
