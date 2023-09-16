export function getColumnStyle(isDraggingOver: boolean): React.CSSProperties {
  return {
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 300,
  };
}

export function getCardStyle(
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
