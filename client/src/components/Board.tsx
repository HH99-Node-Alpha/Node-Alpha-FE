import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { TCard, TCardStatus, TColumn } from "../types/dnd";
import { getCardStyle, getColumnStyle } from "../utils/dnd";
import RightSidebar from "./RightSidebar";

type BoardProps = {
  boardId: string;
};

function Board({ boardId }: BoardProps) {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  // Column 추가 기능
  const addColumn = () => {
    const newColumn = {
      id: `column-${columns.length + 1}`,
      title: `Column ${columns.length + 1}`,
      cards: [],
    };
    setColumns([...columns, newColumn]);
  };

  // Card 추가 기능
  const addCard = (columnId: string) => {
    const newTitle = prompt("새 카드의 제목을 입력하세요");
    if (newTitle) {
      const newCard: TCard = {
        id: `${Date.now()}`,
        title: "New Card",
        status: "todo" as TCardStatus,
      };
      setColumns(
        columns.map((column) =>
          column.id === columnId
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
      (column) => column.id === source.droppableId
    );
    const destColumn = columns.find(
      (column) => column.id === destination.droppableId
    );

    if (sourceColumn && destColumn) {
      if (sourceColumn.id === destColumn.id) {
        const reorderedCards = Array.from(sourceColumn.cards);
        const [movedCard] = reorderedCards.splice(source.index, 1);
        reorderedCards.splice(destination.index, 0, movedCard);
        setColumns(
          columns.map((column) =>
            column.id === sourceColumn.id
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
          columns.map((column) =>
            column.id === sourceColumn.id
              ? { ...column, cards: sourceCards }
              : column.id === destColumn.id
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
  return (
    <div className="h-full w-full">
      <div className="w-full h-[64px] text-white flex justify-between p-4 mb-4 gap-8 items-center border-b-2 cursor-pointer">
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
              className="flex gap-4 px-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Droppable droppableId={column.id} key={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              ...getColumnStyle(snapshot.isDraggingOver),
                            }}
                          >
                            <h2 className="text-white mb-2">{column.title}</h2>
                            {column.cards.map((card, index) => (
                              <Draggable
                                key={card.id}
                                draggableId={card.id}
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
                                    {card.title}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            <button
                              onClick={() => addCard(column.id)}
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
              <button
                onClick={addColumn}
                className="bg-white p-4 w-[280px] h-[40px] flex items-center justify-center rounded text-black "
              >
                +
              </button>
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
