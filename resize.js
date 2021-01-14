"use strict";
let directionToResize = "";
function setPosition(positionedImage, direction, pageX, pageY) {
  if (isMouseDown) {
    //pageX - координаты мыши текущие
    //shiftX координаты внутри картинки, чтобы она не дергалась
    if (direction === "left") {
      positionedImage.style.left = pageX + "px";
    } else if (direction === "top") {
      positionedImage.style.top = pageY + "px";
    } else if (direction === "leftBottom") {
      positionedImage.style.left = pageX + "px";
      positionedImage.style.top = positionedImage.style.top + "px";
    } else if (direction === "bottom") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
    } else if (direction === "leftTop") {
      positionedImage.style.left = pageX + "px";
      positionedImage.style.top = pageY + "px";
    } else if (direction === "rightTop") {
      positionedImage.style.top = pageY + "px";
    } else if (direction === "right") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
    } else {
      console.log("setPosition, exception");
    }
  }
}

let isMouseDown = false;

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
    }
    else {
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
  document.body.append(image);
};

// получить направление по клbe на элемент
const getDirection = (btn, imageBox, e) => {
  directionToResize = btn.getAttribute("direction");
  getMountingImage(imageBox);
  getStartParamOfImage(imageBox, e);    //вычисляем начальные параметры картинки и клика
};

const resize = (imageBox) => {

  const btns = imageBox.querySelectorAll("[direction]");
  btns.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => getDirection(btn, imageBox, e));
  });

  document.addEventListener("mousemove", (event) =>
    setPosition(imageBox, directionToResize, event.pageX, event.pageY)
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
