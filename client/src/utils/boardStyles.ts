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
