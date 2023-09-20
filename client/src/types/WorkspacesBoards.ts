export interface ColorType {
  backgroundUrl?: string;
  colorId: number;
  endColor?: string | null;
  startColor?: string | null;
}

export interface BoardType {
  boardId: number;
  boardName?: string;
  Color: ColorType;
}

export interface WorkspaceType {
  workspaceId: number;
  workspaceName?: string;
  Boards: BoardType[];
}

export type UserWorkspacesBoardSpaces = WorkspaceType[];
