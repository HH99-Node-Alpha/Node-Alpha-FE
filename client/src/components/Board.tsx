import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { TItem, TItemStatus, TList } from "../types/dnd";
import { getItemStyle, getListStyle } from "../utils/dnd";
import RightSidebar from "./RightSidebar";

type BoardProps = {
  boardId: string;
};

function Board({ boardId }: BoardProps) {
  const [lists, setLists] = useState<TList[]>([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  // 리스트 추가 기능
  const addList = () => {
    const newList = {
      id: `list-${lists.length + 1}`,
      title: `List ${lists.length + 1}`,
      items: [],
    };
    setLists([...lists, newList]);
  };

  // 카드 추가 기능
  const addItem = (listId: string) => {
    const newTitle = prompt("Enter new card title");
    if (newTitle) {
      const newItem: TItem = {
        id: `${Date.now()}`,
        title: "New Card",
        status: "todo" as TItemStatus,
      };
      setLists(
        lists.map((list) =>
          list.id === listId
            ? { ...list, items: [...list.items, newItem] }
            : list
        )
      );
    }
  };

  const onDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) return;

    if (type === "list") {
      const reorderedLists = Array.from(lists);
      const [movedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, movedList);
      setLists(reorderedLists);
      return;
    }

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);

    if (sourceList && destList) {
      if (sourceList.id === destList.id) {
        const reorderedItems = Array.from(sourceList.items);
        const [movedItem] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, movedItem);
        setLists(
          lists.map((list) =>
            list.id === sourceList.id
              ? { ...list, items: reorderedItems }
              : list
          )
        );
      } else {
        const sourceItems = Array.from(sourceList.items);
        const destItems = Array.from(destList.items);
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, movedItem);

        setLists(
          lists.map((list) =>
            list.id === sourceList.id
              ? { ...list, items: sourceItems }
              : list.id === destList.id
              ? { ...list, items: destItems }
              : list
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
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="flex"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Droppable droppableId={list.id} key={list.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              ...getListStyle(snapshot.isDraggingOver),
                            }}
                          >
                            <h2>{list.title}</h2>
                            {list.items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style || {}
                                      ),
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            <button
                              onClick={() => addItem(list.id)}
                              className="bg-green-500 p-2 rounded w-full text-white mt-2"
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
                onClick={addList}
                className="bg-green-500 p-4 w-[200px] h-[40px] flex items-center justify-center rounded text-white m-2"
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
