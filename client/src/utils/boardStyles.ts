import { ColorType } from "../types/WorkspacesBoards";

export const getBoardBackgroundStyle = (board: any) => {
  const { Color } = board || {};

  let backgroundStyle = {};
  if (Color?.backgroundUrl) {
    backgroundStyle = {
      backgroundImage: `url(${Color.backgroundUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  } else if (Color?.startColor) {
    backgroundStyle = {
      backgroundImage: Color.startColor,
    };
  } else if (Color?.endColor) {
    backgroundStyle = {
      backgroundImage: Color.endColor,
    };
  }

  return backgroundStyle;
};

export const determineBackgroundStyle = (color: ColorType | null) => {
  let backgroundStyle = {};
  if (color?.backgroundUrl) {
    backgroundStyle = {
      backgroundImage: `url(${color.backgroundUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  } else if (color?.startColor) {
    backgroundStyle = {
      background: color.startColor,
    };
  } else if (color?.endColor) {
    backgroundStyle = {
      background: color.endColor,
    };
  }
  return backgroundStyle;
};
