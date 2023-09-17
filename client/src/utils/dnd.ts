export function getColumnStyle(isDraggingOver: boolean): React.CSSProperties {
  return {
    background: "#161A1E",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    paddingBottom: 16,
    width: 320,
    font: "white",
  };
}

export function getCardStyle(
  isDragging: boolean,
  draggableStyle: React.CSSProperties
): React.CSSProperties {
  return {
    marginTop: 12,
    marginBottom: 12,
    userSelect: "none",
    padding: 12,
    borderRadius: "10px",
    background: "white",
    width: 288,
    ...draggableStyle,
  };
}
