export const findBoardById = (boards: any[], id: string) => {
  for (const workspace of boards) {
    const foundBoard = workspace.Boards.find(
      (board: any) => board.boardId.toString() === id
    );
    if (foundBoard) return foundBoard;
  }
  return null;
};
