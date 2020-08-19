let canvas, ctx;
let isDrawing;
let drawType;
let startX,
  startY,
  stopX,
  stopY,
  touchX,
  touchY,
  touchStartX,
  touchStartY,
  rgb,
  hex,
  colour = "black";

let img = new Image();
img.src = "color-wheel-12-colors.png";
let savedState;

function init() {
  (canvas = document.getElementById("myCanvas")),
    (ctx = canvas.getContext("2d"));
}

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

canvas.addEventListener("touchmove", function (e) {
  const rect = canvas.getBoundingClientRect();
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  touchX = touch.pageX - rect.left;
  touchY = touch.pageY - rect.top;
  e.preventDefault();
  if (touchX < canvas.width - 130 || touchY < canvas.height - 130) {
    if (isDrawing) {
      switch (drawType) {
        case 0:
          erase(touchX, touchY);
          break;
        case 1:
          lineDraw(touchX, touchY);
          break;
        case 3:
          ctx.putImageData(savedState, 0, 0);
          rectDraw(touchStartX, touchStartY, touchX, touchY);
          break;
        case 4:
          ctx.putImageData(savedState, 0, 0);
          circleDraw(touchStartX, touchStartY, touchX, touchY);
          break;
      }
    }
  }
});

canvas.addEventListener("touchstart", function (e) {
  if (drawType == 3 || drawType == 4) {
    savedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  if (!isDrawing) {
    const rect = canvas.getBoundingClientRect();
    var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    touchStartX = touch.pageX - rect.left;
    touchStartY = touch.pageY - rect.top;
    // console.log(touchStartY);
  }

  if (touchStartX > 250 && touchStartY > 300) {
    rgb = ctx.getImageData(touchStartX, touchStartY, 1, 1).data;
    hex =
      "#" +
      ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16)
        .slice(1);
    colour = hex;
  }
  canvas.style.overflow = "hidden";

  isDrawing = true;
});

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
    // console.log(startY);
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

canvas.addEventListener("touchend", function (e) {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    touchEndX = touch.pageX - rect.left;
    touchEndY = touch.pageY - rect.top;
    // console.log(touchEndY);
  }
  isDrawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mouseup", () => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    stopX = event.clientX - rect.left;
    stopY = event.clientY - rect.top;
    // console.log(stopY);
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
          erase(mouseX, mouseY);
          break;
        case 1:
          lineDraw(mouseX, mouseY);
          break;
        case 3:
          ctx.putImageData(savedState, 0, 0);
          rectDraw(startX, startY, mouseX, mouseY);
          break;
        case 4:
          ctx.putImageData(savedState, 0, 0);
          circleDraw(startX, startY, mouseX, mouseY);
          break;
      }
    }
  }
});

colourPallete = new Image();
colourPallete;

function lineDraw(x, y) {
  ctx.strokeStyle = colour;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineTo(x, y);
  ctx.stroke();
}
function erase(x, y) {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}
function rectDraw(sx, sy, x, y) {
  ctx.fillStyle = colour;
  ctx.fillRect(sx, sy, x - sx, y - sy);
}

function circleDraw(sx, sy, mx, my) {
  ctx.fillStyle = colour;
  x = mx - sx;
  y = my - sy;
  rad = Math.sqrt(x * x + y * y);
  ctx.beginPath();
  ctx.arc(sx, sy, rad, 0, Math.PI * 2, false);
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
