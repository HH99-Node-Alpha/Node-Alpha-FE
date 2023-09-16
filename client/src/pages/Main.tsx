import { useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { BsPerson, BsPersonPlus } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TItem, TItemStatus, TList } from "../types/dnd";
import { getItemStyle, getListStyle } from "../utils/dnd";

function Main() {
  const navigate = useNavigate();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const [lists, setLists] = useState<TList[]>([
    {
      id: "list-1",
      title: "List 1",
      items: [...Array(10)].map((_, i) => ({
        id: `${i}${i}${i}`,
        title: `Title ${i + 1}000`,
        status: "todo",
      })),
    },
    {
      id: "list-2",
      title: "List 2",
      items: [...Array(10)].map((_, i) => ({
        id: `${i + 1}${i + 2}${i + 3}`,
        title: `Title ${i + 1}000`,
        status: "todo",
      })),
    },
  ]);

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
    <div
      className="w-screen h-screen flex flex-col bg-cover"
      style={{ backgroundImage: "url('/assets/background.svg')" }}
    >
      <nav className="w-full h-16 py-3 px-10 flex justify-between bg-[#1D2125] z-10 ">
        <div className="flex gap-8 cursor-pointer">
          <div
            onClick={() => navigate("/")}
            className="flex h-full justify-center items-center text-white"
          >
            로고
          </div>
          <div className="flex h-full justify-center items-center text-white hover:opacity-50">
            Workspaces
          </div>
          <button className="flex h-full justify-center items-center bg-blue-300 px-4 rounded-lg text-black hover:text-white">
            Create
          </button>
        </div>
        <div className="h-full  flex gap-8">
          <div className="flex justify-center items-center text-white cursor-pointer">
            <GoBell size={24} />
          </div>
          <img
            className="h-full rounded-full cursor-pointer"
            src={process.env.PUBLIC_URL + "/assets/dev-jeans.png"}
            alt="user"
          />
        </div>
      </nav>
      <body className="flex w-full h-full overflow-auto">
        <LeftSidebar />
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
              droppableId="all-lists"
              direction="horizontal"
              type="list"
            >
              {(provided) => (
                <div
                  className="flex"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {lists.map((list, index) => (
                    <Draggable
                      key={list.id}
                      draggableId={list.id}
                      index={index}
                    >
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
        </div>
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => setRightSidebarOpen(false)}
            isOpen={rightSidebarOpen}
          />
        )}
      </body>
    </div>
  );
}

export default Main;

function LeftSidebar() {
  return (
    <>
      <div className="h-full min-w-[320px] bg-[#161A1E] z-10">
        <div className="w-full h-[64px] flex p-4 mb-4 gap-4 items-center border-b-2 border-[#2C3238] cursor-pointer">
          <img
            className="w-[40px] h-[40px] rounded-md cursor-pointer"
            src={process.env.PUBLIC_URL + "/assets/dev-jeans.png"}
            alt="user"
          />
          <div className="text-white">Alpha's Workspace</div>
        </div>
        <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
          <div className="flex h-full gap-4 items-center">
            <BsPerson />
            <span>Members</span>
          </div>
          <div className="flex h-full items-center">+</div>
        </button>
        <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
          <div className="flex h-full gap-4 items-center">
            <span>Your boards</span>
          </div>
          <div className="flex h-full items-center">+</div>
        </button>
      </div>
    </>
  );
}

type RightSidebarProps = {
  closeSidebar: () => void;
  isOpen: boolean;
};

function RightSidebar({ closeSidebar, isOpen }: RightSidebarProps) {
  return (
    <div
      className={`h-full min-w-[320px] bg-[#161A1E] text-white transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-[64px] items-center justify-around border-b-2 border-[#2C3238]">
        <div className="w-[280px] flex justify-center">Menu</div>
        <button onClick={closeSidebar} className="w-[40px] h-[40px]">
          X
        </button>
      </div>
      <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
        <div className="flex h-full gap-4 items-center">
          <span>색상 바꾸기</span>
        </div>
        <div className="flex h-full items-center"></div>
      </button>
    </div>
  );
}
