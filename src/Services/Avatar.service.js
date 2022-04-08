export function randomColorHex() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
}

export function getFontColorByBackgroundColor(backgroundColor) {
  var color =
    backgroundColor.charAt(0) === "#"
      ? backgroundColor.substring(1, 7)
      : backgroundColor;
  var red = parseInt(color.substring(0, 2), 16);
  var green = parseInt(color.substring(2, 4), 16);
  var blue = parseInt(color.substring(4, 6), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? "black" : "white";
}

export function getAvatarText(name = "") {
  name = name.trim();
  if (!name.trim().length) return "TN";
  const words = name.split(" ");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (
    words[0].charAt(0).toUpperCase() +
    words[words.length - 1].charAt(0).toUpperCase()
  );
}

export function generateAvatar(text, foregroundColor, backgroundColor) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 200;
  canvas.height = 200;

  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 80px Assistant";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas;
}
