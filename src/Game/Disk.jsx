function getFontColorByBackgroundColor(backgroundColor) {
  var color =
    backgroundColor.charAt(0) === "#"
      ? backgroundColor.substring(1, 7)
      : backgroundColor;
  var red = parseInt(color.substring(0, 2), 16);
  var green = parseInt(color.substring(2, 4), 16);
  var blue = parseInt(color.substring(4, 6), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? "black" : "white";
}

export const Disk = ({ size, color, value, children }) => {
  return (
    <div
      className="text-center rounded-pill shadow d-flex justify-content-center align-items-center pe-none"
      style={{
        height: "40px",
        backgroundColor: color,
        width: `calc(100% - ( ${size} - ${value} + 1 ) * 1rem)`,
        color: getFontColorByBackgroundColor(color),
      }}
    >
      <div>{children}</div>
    </div>
  );
};
