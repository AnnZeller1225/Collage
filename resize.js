"use strict";

function setPosition(positionedImage, direction, pageX, pageY, shiftX, shiftY) {
  // задать позицию картинке (меняем при mousemove)
  //pageX - координаты мыши текущие
  //shiftX координаты внутри картинки, чтобы она не дергалась
  if (direction === "left") {
    positionedImage.style.left = pageX - shiftX + "px";
    // positionedImage.style.top =     positionedImage.style.top + "px";
  } else if (direction === "leftBottom") {
    positionedImage.style.left = pageX - shiftX + "px";
    // positionedImage.style.top = pageY + "px";
  } else if (direction === "leftTop") {
    positionedImage.style.left = pageX - shiftX + "px";
    // positionedImage.style.top = pageY + shiftY + "px";
    positionedImage.style.top = pageY - 70 + "px";
    // positionedImage.style.top = pageY - shiftY - 70 + "px";
    // console.log(positionedImage.style.height);
    // console.log(positionedImage.style.top)
  } else if (direction === "rightTop") {
    // тут ошибка
    // positionedImage.style.left = pageX - shiftX + "px";
    // positionedImage.style.top = pageY - shiftY + "px";
  } else if (direction === "top") {
    positionedImage.style.top = pageY - 70 + "px";

  } else if (direction === "bottom") {
    console.log(  'its pos t',  
      positionedImage.style.top );

    positionedImage.style.top = positionedImage.style.top + "px";
    positionedImage.style.left = positionedImage.style.left + "px";
    // startHeight + e.clientY - startY - 20 + "px";
  } else if (direction === "right") {
    positionedImage.style.top = positionedImage.style.top + "px";
    positionedImage.style.left = positionedImage.style.left + "px";


  } else {
    console.log("setPosition, exception");
  }
}

let isMouseDown = false;
function onMouseMove(event, image, direction, shiftX, shiftY) {
  if (isMouseDown) {
    setPosition(image, direction, event.pageX, event.pageY, shiftX, shiftY);
  }
}
function changeParams(
  e,
  imageBox,
  startWidth,
  startHeight,
  direction,
  startX,
  startY
) {
  // изменяет параметры картинки, ширину и высоту
  if (isMouseDown) {
    let imageBoxImg = imageBox.querySelector("img");

    if (direction === "left") {
      // console.log(e.clientX, "changeP");

      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBoxImg.style.height = startHeight - 20 + "px";
    } else if (direction === "leftTop") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      // imageBoxImg.style.height = startHeight - e.clientY + 200 + "px";
      imageBoxImg.style.height = startHeight - e.clientY + startY + "px";

      // console.log(startHeight);
    } else if (direction === "top") {
      // console.log("changeParams, top");

      imageBox.style.maxWidth = imageBox.style.maxWidth + "px";
      imageBoxImg.style.height = startHeight - e.clientY + startY + "px";
    } else if (direction === "leftBottom") {
      // console.log("changeParams, leftBottom");
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
    } else if (direction === "bottom") {
      // console.log("bottom");
      imageBox.style.maxWidth = imageBox.style.maxWidth + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
    } else if (direction === "rightBottom") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
    } else if (direction === "right") {
      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
      imageBoxImg.style.height = startHeight - 25 + "px";
    } else {
      console.log(" добавь direction в changeParams");
    }
  }
}

function startDrag(event, imageBox, direction) {
  // начинаем определять куда двигать
  console.log(direction, "startDrag");
  let startX = event.clientX; // начало движения отсюда
  let startY = event.clientY;
  let startWidth = parseInt(
    // ширина которая была
    document.defaultView.getComputedStyle(imageBox).width,
    10
  );
  let startHeight = parseInt(
    document.defaultView.getComputedStyle(imageBox).height,
    10
  );

  document.documentElement.addEventListener(
    "mousemove",
    (event) =>
      changeParams(
        event,
        imageBox,
        startWidth,
        startHeight,
        direction,
        startX,
        startY
      ),
    false
  );
}

const changePosition = (event, image, direction) => {
  //shiftX  координаты внутри картинки
  const field = document.querySelector(".field");
  isMouseDown = true;
  let shiftX = event.clientX - image.getBoundingClientRect().left;
  let shiftY = event.clientY - image.getBoundingClientRect().top;

  image.style.position = "absolute";
  field.append(image);

  document.addEventListener("mousemove", (event) =>
    onMouseMove(event, image, direction, shiftX, shiftY)
  );

  document.onmouseup = function () {
    isMouseDown = false;
  };
};

// верхняя линия (сужаем)
const resizingToTop = (imageBox) => {
  const lineTop = imageBox.querySelector(".square-line--top");

  lineTop.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "top")
  );
  lineTop.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "top"),
    false
  );
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

const resizingToLeft = (imageBox) => {
  const lineLeft = imageBox.querySelector(".square-line--left");

  lineLeft.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "left")
  );
  lineLeft.addEventListener(
    "mousedown",
    (event) => startDrag(event, imageBox, "left"),
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
