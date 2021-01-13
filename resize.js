"use strict";

function setPosition(positionedImage, direction, pageX, pageY) {
  if (isMouseDown) {
    //pageX - координаты мыши текущие
    //shiftX координаты внутри картинки, чтобы она не дергалась
    if (direction === "left") {
      positionedImage.style.left = pageX + "px";
      // positionedImage.style.top = positionedImage.style.top + "px";
      // console.log("setPosition, direction:", direction);
    }
     else if (direction === "top") {
      positionedImage.style.top = pageY + "px";
      // console.log("setPosition, direction:", direction);
    }
     else if (direction === "leftBottom") {
      positionedImage.style.left = pageX + "px";
      // positionedImage.style.left = 400 + "px";
      positionedImage.style.top = positionedImage.style.top + "px";
      // console.log('setPosition, direction:', direction);
    } else if (direction === "bottom") {
      // console.log('setPosition, direction:', direction);
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
      // positionedImage.style.left = 500 + "px";
      // console.log(  positionedImage.style.left,   positionedImage.style.top, 'bottom')
    } else if (direction === "leftTop") {
      positionedImage.style.left = pageX + "px";
      // positionedImage.style.top = pageY + shiftY + "px";
      positionedImage.style.top = pageY + "px";
      // positionedImage.style.top = pageY - shiftY - 70 + "px";
      // console.log(positionedImage.style.height);
      // console.log(positionedImage.style.top)
    } else if (direction === "rightTop") {
      // тут ошибка
      // positionedImage.style.left = pageX - shiftX + "px";
      // positionedImage.style.top = pageY - shiftY + "px";
    } else if (direction === "right") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
      console.log("setPosition, direction:", direction);
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
    let imageBoxImg = imageBox.querySelector("img");

    if (direction === "left") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBoxImg.style.height = startHeight + "px"; // нужно фиксировать
      console.log(direction)
    } else if (direction === "leftTop") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      // imageBoxImg.style.height = startHeight - e.clientY + 200 + "px";
      imageBoxImg.style.height = startHeight - e.clientY + startY + "px";

      // console.log(startHeight);
    } else if (direction === "top") {
      // console.log("changeParams, top");

      // imageBox.style.maxWidth = imageBox.style.maxWidth + "px";
      // imageBoxImg.style.height = startHeight - e.clientY + startY + "px";

      imageBox.style.height = startHeight - e.clientY + startY + "px";
      imageBoxImg.style.height = startHeight - e.clientY  + startY + "px";
      console.log(direction)
    } else if (direction === "leftBottom") {
      // console.log("changeParams, leftBottom");
      console.log(e.target, "in setP");
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY + "px";
    } else if (direction === "bottom") {
      // console.log("bottom");
      // imageBox.style.maxWidth = imageBox.style.maxWidth + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY + "px";
    } else if (direction === "rightBottom") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY + "px";
    } else if (direction === "right") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBoxImg.style.height = startHeight + "px";
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
  document.body.append(image);
};

const resizingToLeft = (imageBox) => {
//  reset();
  const lineLeft = imageBox.querySelector(".square-line--left");
  const direction = "left";
  // монтируем картинку в документ
  lineLeft.addEventListener("mousedown", () => getMountingImage(imageBox));

  //вычисляем начальные параметры картинки и клика
  lineLeft.addEventListener(
    "mousedown",
    (e) => getStartParamOfImage(imageBox, e),
    false
  );
  // меняем top и left картинки
  document.addEventListener("mousemove", (event) =>
    setPosition(imageBox, direction, event.pageX, event.pageY)
  );
  // меняем ширину-высоту
  document.documentElement.addEventListener(
    "mousemove",
    (event) => changeParams(event, imageBox, direction),
    false
  );
  document.onmouseup = function () {
    isMouseDown = false;
  };
};

// верхняя линия (сужаем)
const resizingToTop = (imageBox) => {
  // reset()
  const lineTop = imageBox.querySelector(".square-line--top");
  const direction = "top";
  // монтируем картинку в документ
  lineTop.addEventListener("mousedown", () => getMountingImage(imageBox));

  //вычисляем начальные параметры картинки и клика
  lineTop.addEventListener(
    "mousedown",
    (e) => getStartParamOfImage(imageBox, e),
    false
  );
  // меняем top и left картинки
  document.addEventListener("mousemove", (event) =>
    setPosition(imageBox, direction, event.pageX, event.pageY)
  );
  // меняем ширину-высоту
  document.documentElement.addEventListener(
    "mousemove",
    (event) => changeParams(event, imageBox, direction),
    false
  );
  document.onmouseup = function () {
    isMouseDown = false;
  };
};
// левый верний угол
const resizingToLeftTop = (imageBox) => {
  const ltCorner = imageBox.querySelector(".square__corner--lt");
  ltCorner.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "leftTop")
  );
  ltCorner.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "leftTop"),
    false
  );
};

const resizingToLeftBottom = (imageBox) => {
  const lbCorner = imageBox.querySelector(".square__corner--lb");

  lbCorner.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "leftBottom")
  );
  lbCorner.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "leftBottom"),
    false
  );
};

const resizingToBottom = (imageBox) => {
  const lineBottom = imageBox.querySelector(".square-line--bottom");
  lineBottom.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "bottom")
  );

  lineBottom.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "bottom"),
    false
  );
};
const resizingToRightBottom = (imageBox) => {
  const rbCorner = imageBox.querySelector(".square__corner--rb");
  rbCorner.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "rightBottom")
  );

  rbCorner.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "rightBottom"),
    false
  );
};

const resizingToRight = (imageBox) => {
  const lineRight = imageBox.querySelector(".square-line--right");
  lineRight.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "right")
  );

  lineRight.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "right"),
    false
  );
};
