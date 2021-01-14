"use strict";
let directionToResize = "";
let isMouseDown = false;
const parentForImage = document.querySelector(".field");
let coordinatesInBtn = {};

function getCoordinatesInParent ( event ) { // когда мы кликаем по квадрату, чтобы не получать сдвиг,получаем точные координаты мыши и отномаем их для позиционирования image
  var bounds = event.target.getBoundingClientRect();
  var x = event.clientX - bounds.left;
  var y = event.clientY - bounds.top;
   coordinatesInBtn = {
    x: x.toFixed(1),
    y: y.toFixed(1),
  }
}
function setPosition(positionedImage, direction, event) {
      //pageX - координаты мыши текущие
    //shiftX координаты внутри картинки, чтобы она не дергалась
  if (isMouseDown) {
    if (direction === "left") {
      positionedImage.style.left = event.pageX - (coordinatesInBtn.x) + "px";
    } 
    else if (direction === "leftBottom") {
      positionedImage.style.left = event.pageX - (coordinatesInBtn.x) + "px";
      positionedImage.style.top = positionedImage.style.top + "px";

    } else if (direction === "top") {
      positionedImage.style.top = event.pageY - (coordinatesInBtn.y) + "px";
    } else if (direction === "bottom") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
    } else if (direction === "leftTop") {

      positionedImage.style.left = event.pageX - (coordinatesInBtn.x) + "px";
      positionedImage.style.top = event.pageY - (coordinatesInBtn.y) + "px";
    } else if (direction === "rightTop") {
      positionedImage.style.top = event.pageY - (coordinatesInBtn.y) + "px";
    } else if (direction === "right") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
    } else {
      console.log("setPosition, exception");
    }
  }
}

function onMouseMove(event, image, direction) {
  if (isMouseDown) {
    setPosition(image, direction, event.pageX, event.pageY);
  }
}
// startX - horixontal cordinate event
var startX, startY, startWidth, startHeight;

function changeParams(e, imageBox, direction) {
  // изменяет параметры картинки, ширину и высоту
  if (isMouseDown) {
    console.log("is changeP");
    if (direction === "left") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBox.style.height = startHeight + "px"; // нужно фиксировать
    } else if (direction === "leftTop") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBox.style.height = startHeight - e.clientY + startY + "px";
    } else if (direction === "top") {
      imageBox.style.height = startHeight - e.clientY + startY + "px";
    } else if (direction === "leftBottom") {
      // console.log("changeParams, leftBottom");
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBox.style.height = startHeight + e.clientY - startY + "px";
    } else if (direction === "bottom") {
      imageBox.style.height = startHeight + e.clientY - startY + "px";
    } else if (direction === "rightBottom") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBox.style.height = startHeight + e.clientY - startY + "px";
    } else if (direction === "right") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBox.style.height = startHeight + "px";
    } else if (direction === "rightTop") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBox.style.height = startHeight - e.clientY + startY + "px";
    } else {
      console.log(" добавь direction в changeParams");
    }
  }
}

const getStartParamOfImage = (imageBox, e) => {
  startX = e.clientX; // horixontal cordinate
  startY = e.clientY; // vertical cordinate
  startWidth = parseInt(
    document.defaultView.getComputedStyle(imageBox).width,
    10
  );
  startHeight = parseInt(
    document.defaultView.getComputedStyle(imageBox).height,
    10
  );
  // console.log(imageBox, startWidth)
};

// монтируем в документ
const getMountingImage = (image) => {
  isMouseDown = true;
  image.style.position = "absolute";
  parentForImage.append(image);
};

// получить направление по клbe на элемент
const getDirection = (btn, imageBox, e) => {
  directionToResize = btn.getAttribute("direction");
  getMountingImage(imageBox);
  getStartParamOfImage(imageBox, e); //вычисляем начальные параметры картинки и клика на кодкументе
  getCoordinatesInParent(e);
};

const resize = (imageBox) => {
  const btns = imageBox.querySelectorAll("[direction]");
  btns.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => getDirection(btn, imageBox, e));
  });

  document.addEventListener("mousemove", (event) =>
    setPosition(imageBox, directionToResize, event)
  );
  document.documentElement.addEventListener(
    "mousemove",
    (event) => changeParams(event, imageBox, directionToResize),
    false
  );

  document.onmouseup = function () {
    isMouseDown = false;
  };
};
