// 이것은 드래그 중일 때의 리스트 스타일을 반환하는 함수입니다.
export function getListStyle(isDraggingOver: boolean): React.CSSProperties {
  return {
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 300,
  };
}

// 이것은 드래그 중일 때의 아이템 스타일을 반환하는 함수입니다.
export function getItemStyle(
  isDragging: boolean,
  draggableStyle: React.CSSProperties
): React.CSSProperties {
  return {
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  };
}
