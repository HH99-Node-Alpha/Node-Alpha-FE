import { postAPI, getAPI } from "../axios";
import { TColumn } from "../types/dnd";

export const addNewColumnAPI = async (
  workspaceId: string,
  boardId: string,
  columnName: string
): Promise<TColumn | null> => {
  try {
    const result = await postAPI(
      `/api/workspaces/${workspaceId}/boards/${boardId}/columns`,
      {
        columnName,
      }
    );
    return result.data.column;
  } catch (error) {
    console.error("Error adding new column:", error);
    return null;
  }
};

export const getColumnsAPI = async (workspaceId: string, boardId: string) => {
  try {
    const result = await getAPI(
      `/api/workspaces/${workspaceId}/boards/${boardId}/columns`
    );
    return result.data.columns;
  } catch (error) {
    console.error("Error fetching columns:", error);
    return [];
  }
};

export const getOneBoardAPI = async (workspaceId: string, boardId: string) => {
  try {
    const result = await getAPI(
      `/api/workspaces/${workspaceId}/boards/${boardId}`
    );
    return result.data;
  } catch (error) {
    console.error("Error adding new column:", error);
    return null;
  }
};
