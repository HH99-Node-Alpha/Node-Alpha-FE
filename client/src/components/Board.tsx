import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { addNewColumnAPI, getColumnsAPI } from "../api/boardAPI";
import { TCard, TColumn } from "../types/dnd";
import { getCardStyle, getColumnStyle } from "../utils/dnd";
import RightSidebar from "./RightSidebar";

type BoardProps = {
  boardId: string;
};

function Board({ boardId }: BoardProps) {
  const { workspaceId } = useParams();

  const [columns, setColumns] = useState<TColumn[]>([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(false);
  const [isInputMode, setInputMode] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");

  const {
    data: fetchedColumns,
    refetch,
    isLoading,
  } = useQuery(
    ["columns", workspaceId, boardId],
    () => getColumnsAPI(workspaceId!, boardId),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch().then(() => {
      if (fetchedColumns) {
        const sanitizedColumns = fetchedColumns.map((col: any) => ({
          ...col,
          cards: Array.isArray(col.cards) ? col.cards : [],
        }));
        setColumns(sanitizedColumns);
      }
    });
  }, [workspaceId, boardId, refetch, fetchedColumns]);

  const addNewColumn = async () => {
    const column = await addNewColumnAPI(workspaceId!, boardId, columnName);
    if (column) {
      addColumn(+column.columnId, columnName, column.columnOrder);
      setInputMode(false);
      setColumnName("");
    }
  };

  // Column 추가 기능
  const addColumn = (
    columnId: number,
    columnName: string,
    columnOrder: number
  ) => {
    const newColumn = {
      columnId: `${columnId}`,
      columnName: columnName,
      columnOrder: columnOrder,
      cards: [],
    };
    setColumns([...columns, newColumn]);
  };

  // Card 추가 기능
  const addCard = (columnId: string) => {
    const newTitle = prompt("새 카드의 제목을 입력하세요");
    if (newTitle) {
      const newCard: TCard = {
        cardId: `${Date.now()}`,
        cardName: "New Card",
      };
      setColumns(
        columns?.map((column) =>
          column.columnId === columnId
            ? { ...column, cards: [...column.cards, newCard] }
            : column
        )
      );
    }
  };

  const onDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) return;

    if (type === "column") {
      const reorderedColumns = Array.from(columns);
      const [movedColumn] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, movedColumn);
      setColumns(reorderedColumns);
      return;
    }

    const sourceColumn = columns.find(
      (column) => column.columnId === source.droppableId
    );
    const destColumn = columns.find(
      (column) => column.columnId === destination.droppableId
    );

    if (sourceColumn && destColumn) {
      if (sourceColumn.columnId === destColumn.columnId) {
        const reorderedCards = Array.from(sourceColumn.cards);
        const [movedCard] = reorderedCards.splice(source.index, 1);
        reorderedCards.splice(destination.index, 0, movedCard);
        setColumns(
          columns?.map((column) =>
            column.columnId === sourceColumn.columnId
              ? { ...column, cards: reorderedCards }
              : column
          )
        );
      } else {
        const sourceCards = Array.from(sourceColumn.cards);
        const destCards = Array.from(destColumn.cards);
        const [movedCard] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, movedCard);

        setColumns(
          columns?.map((column) =>
            column.columnId === sourceColumn.columnId
              ? { ...column, cards: sourceCards }
              : column.columnId === destColumn.columnId
              ? { ...column, cards: destCards }
              : column
          )
        );
      }
    }
  };

  // requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="h-full w-full">
      <div className="w-full h-[64px] text-white flex justify-between p-4  gap-8 items-center border-b-2 cursor-pointer">
        <div>
          <div>Alpha's Board</div>
        </div>
        <div className="flex gap-4">
          <button className="flex justify-center items-center gap-2 h-10 w-28 rounded-md px-2 hover:bg-[#2C3238]">
            <BsPersonPlus />
            <span>share</span>
          </button>
          <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex gap-2 p-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns?.map((column, index) => (
                <Draggable
                  key={column.columnId}
                  draggableId={column.columnId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Droppable
                        droppableId={column.columnId}
                        key={column.columnId}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              ...getColumnStyle(snapshot.isDraggingOver),
                            }}
                          >
                            <h2 className="text-white mb-2">
                              {column.columnName}
                            </h2>
                            {column.cards?.map((card, index) => (
                              <Draggable
                                key={card.cardId}
                                draggableId={card.cardId}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...getCardStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style || {}
                                      ),
                                    }}
                                  >
                                    {card.cardName}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            <button
                              onClick={() => addCard(column.columnId)}
                              className="bg-white p-2 rounded w-full text-black"
                            >
                              +
                            </button>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {isInputMode ? (
                <div className="bg-white p-4 w-[320px] h-auto flex flex-col justify-between rounded text-black">
                  <input
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    className="p-2 border-2 border-black rounded-md"
                    placeholder="Column이름을 입력해주세요."
                  />
                  <div className="flex justify-between items-end mt-2">
                    <button
                      onClick={addNewColumn}
                      className="bg-blue-500 text-white p-2 rounded h-full"
                    >
                      Add column
                    </button>
                    <button
                      onClick={() => setInputMode(false)}
                      className="px-[14px] py-1 h-full rounded border-black text-black border-2 hover:bg-black hover:text-white"
                    >
                      X
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setInputMode(true)}
                  className="bg-white p-4 w-[320px] h-[40px] flex items-center justify-center rounded text-black"
                >
                  +
                </button>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {rightSidebarOpen && (
        <RightSidebar
          closeSidebar={() => setRightSidebarOpen(false)}
          isOpen={rightSidebarOpen}
        />
      )}
    </div>
  );
}
export default Board;
