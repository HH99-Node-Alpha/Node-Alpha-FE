import { postAPI, getAPI, putAPI, deleteAPI } from "../axios";
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

export const updateColumnAPI = async (
  workspaceId: string,
  boardId: string,
  columnId: string,
  updatedColumnOrder: { columnOrder?: number; columnName?: string }
) => {
  await putAPI(
    `/api/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}`,
    updatedColumnOrder
  );
};

export const deleteColumnAPI = async (
  workspaceId: string,
  boardId: string,
  columnId: string
) => {
  await deleteAPI(
    `/api/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}`
  );
};
