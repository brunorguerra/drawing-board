let currentColor = "#0f0";
let lastColor = document.querySelector(".colorArea .color.lastColor");
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let line = 5;
let lineHtml = document.querySelector(".option-one .width-line");

let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d");

document
  .querySelectorAll(".colorArea .color")
  .forEach((item) => item.addEventListener("click", selectColor));
document.querySelector(".clear").addEventListener("click", clearScreen);
document
  .querySelector(".option-one #widthPincel .increase")
  .addEventListener("click", increaseWidthLine);
document
  .querySelector(".option-one #widthPincel .decrease")
  .addEventListener("click", decreaseWidthLine);
document
  .querySelector(".option-two input")
  .addEventListener("change", changeLastColor);

screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);

function increaseWidthLine() {
  line < 30 ? line++ : line;
  lineHtml.innerHTML = `${line}px`;
}
function decreaseWidthLine() {
  line > 1 ? line-- : line;
  lineHtml.innerHTML = `${line}px`;
}
function selectColor(e) {
  let color = e.target.getAttribute("data-color");
  currentColor = color;

  document.querySelector(".color.active").classList.remove("active");
  e.target.classList.add("active");
}
function changeLastColor() {
  let colorSelectForInput = this.value;
  lastColor.style.background = colorSelectForInput;
  lastColor.setAttribute("data-color", colorSelectForInput);
}
function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}
function mouseUpEvent() {
  canDraw = false;
}
function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = line;
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}
function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
