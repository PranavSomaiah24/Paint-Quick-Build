let canvas, ctx;
let isDrawing;
let drawType;
let startX,
  startY,
  stopX,
  stopY,
  rgb,
  hex,
  colour = "black";

let img = new Image();
img.src = "color-wheel-12-colors.png";
let savedState;

function init() {
  (canvas = document.getElementById("myCanvas")),
    (ctx = canvas.getContext("2d"));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  img.onload = () => {
    ctx.drawImage(img, canvas.width - 100, canvas.height - 100, 90, 90);
  };
  isDrawing = false;
}

init();

canvas.addEventListener("mousedown", () => {
  if (drawType == 3 || drawType == 4) {
    canvas.style.cursor = "crosshair";
    savedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } else {
    canvas.style.cursor = "default";
  }
  if (!isDrawing) {
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
    console.log(startY);
  }
  isDrawing = true;
  if (startX > canvas.width - 105 && startY > canvas.height - 105) {
    rgb = ctx.getImageData(startX, startY, 1, 1).data;
    hex =
      "#" +
      ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16)
        .slice(1);
    colour = hex;
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(645, 544, 16, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }
});

canvas.addEventListener("mouseup", () => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    stopX = event.clientX - rect.left;
    stopY = event.clientY - rect.top;
    console.log(stopY);
  }
  isDrawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  if (mouseX < canvas.width - 130 || mouseY < canvas.height - 130) {
    if (isDrawing) {
      switch (drawType) {
        case 0:
          erase();
          break;
        case 1:
          lineDraw();
          break;
        case 3:
          ctx.putImageData(savedState, 0, 0);
          rectDraw();
          break;
        case 4:
          ctx.putImageData(savedState, 0, 0);
          circleDraw();
          break;
      }
    }
  }
});

colourPallete = new Image();
colourPallete;

function lineDraw() {
  ctx.strokeStyle = colour;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
}
function erase() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}
function rectDraw() {
  ctx.fillStyle = colour;

  ctx.fillRect(startX, startY, mouseX - startX, mouseY - startY);
}

function circleDraw() {
  ctx.fillStyle = colour;
  x = mouseX - startX;
  y = mouseY - startY;
  rad = Math.sqrt(x * x + y * y);
  console.log(rad);
  ctx.beginPath();
  ctx.arc(startX, startY, rad, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

eraseBtn = document.getElementById("erase");
lineBtn = document.getElementById("line");
clearBtn = document.getElementById("clear");
rectBtn = document.getElementById("rect");
circleBtn = document.getElementById("circle");

eraseBtn.addEventListener("click", () => {
  drawType = 0;
});
lineBtn.addEventListener("click", () => {
  drawType = 1;
});
clearBtn.addEventListener("click", () => {
  init();
  ctx.drawImage(img, canvas.width - 100, canvas.height - 100, 90, 90);
});
rectBtn.addEventListener("click", () => {
  drawType = 3;
});
circleBtn.addEventListener("click", () => {
  drawType = 4;
});
