"use strict";
let directionToResize = "";
let isMouseDown = false;
let startPositionWrap; // позиция родительского документа при повороте, для вычисления угла сдвига
let startX, startY, startWidth, startHeight; // размеры  картинки до ресайзинга,  // координаты старта eventa при движении мыши

let startParamWrap = {};

function getCoordinatesInParent(event, parent) {
  // вычисляем начальные  координаты клика с учетом прокрутки
  // diffPositionRotate
  if (diffPositionRotate.x) {
    // если был поворот
    difValueWithRotate = Math.abs(diffPositionRotate.x);
  }
  let eventCoordInDocument = event.target.getBoundingClientRect();
  let x =
    event.clientX -
    eventCoordInDocument.left +
    parent.getBoundingClientRect().left;
  let y =
    event.clientY -
    eventCoordInDocument.top +
    parent.getBoundingClientRect().top +
    pageYOffset;

  startCoordinatesClick = {
    x: x.toFixed(1),
    y: y.toFixed(1),
  };
}
let cenBox = {};
let imgBox = {};

// вычисляем кооринаты смещения картинки при resize после поворота
const getOffsetImg = (startImg, changingImg) => {
  // startImg - значения картинки после поворота
  // changingImg - значения картинки в момент ресайза, когда она расширяется во все стороны
  let imgCurrent = {
    x: changingImg.getBoundingClientRect().x,
    y: changingImg.getBoundingClientRect().y,
  };

  let offset = {
    // разница сдвига
    x: imgCurrent.x - startImg.x,
    y: imgCurrent.y - startImg.y,
  };
  return offset;
};
let www = {};
// задает позицию картинке
function setPosition(positionedImage, direction, event) {
  //pageX - координаты мыши текущие
  if (isMouseDown && actionOfImage === "resize") {
    www = positionedImage.getBoundingClientRect().top;
    if (direction === "left") {
      positionedImage.style.left = event.pageX - startCoordinatesClick.x + "px";
    } else if (direction === "top") {
      let imgCurrent = {
        x: cat.getBoundingClientRect().x,
        y: cat.getBoundingClientRect().y,
      };
      // finishPositionRotate - картинка, не wrap
      if (finishPositionRotate) {
        // если был поворот, мы считываем последнее положение до resize
        let d = {
          x: finishPositionRotate.x - imgCurrent.x,
          y: finishPositionRotate.y - imgCurrent.y,
        };

        positionedImage.style.top =
          event.pageY - startCoordinatesClick.y + difCenterAfterRotate.x + "px";

        // позиционирую картинку внутри обертки
        cat.style.left = -(d.x / 2) + "px";
        cat.style.top = d.y / 2 + "px";

        // console.log( cat.style.bottom)
        // cat.style.top = d + "px";
        // cat.style.left = `${d.x}`
        // let a = `${d.x / 2 + "px"}`;
      } else {
        positionedImage.style.top =
          event.pageY - startCoordinatesClick.y + "px";
      } // console.log(d.x, d.y,  "dif d ");
      // cat.style.left = "-" + a; //где то тут нудно отнимать
      // cat.style.top = t; // картинка уезжает вниз от родителя

      // console.log(cat.style.left = "-"+ a);
      // console.log(   cat.style.top)
    } else if (direction === "leftBottom") {
      let num = 0;
      positionedImage.style.left =
        event.pageX - startCoordinatesClick.x - num + "px";
      positionedImage.style.top = positionedImage.style.top + "px";
    } else if (direction === "bottom") {
      // смещение вниз и влево
      if (finishPositionRotate) {
        // если был поворот, мы считываем последнее положение до resize
        // позиционирую картинку внутри обертки
        // работает только при двух вычислениях для left
        cat.style.top = -(getOffsetImg(finishPositionRotate, cat).y / 2) + "px"; // корректно
        cat.style.top = -getOffsetImg(finishPositionRotate, cat).y + "px";
        console.log(cat.style.top, "top");

        cat.style.left =
          -(getOffsetImg(finishPositionRotate, cat).x / 2) + "px";
        cat.style.left = -getOffsetImg(finishPositionRotate, cat).x + "px";
      } else {
        positionedImage.style.top = positionedImage.style.top + "px";
        positionedImage.style.left = positionedImage.style.left + "px";
      }
    } else if (direction === "leftTop") {
      positionedImage.style.left = event.pageX - startCoordinatesClick.x + "px";
      positionedImage.style.top = event.pageY - startCoordinatesClick.y + "px";
    } else if (direction === "rightTop") {
      positionedImage.style.top = event.pageY - startCoordinatesClick.y + "px";
    } else if (direction === "right") {
      if (finishPositionRotate) {
        // если был поворот, мы считываем последнее положение до resize
        // позиционирую картинку внутри обертки
        // работает только при двух вычислениях для left
        cat.style.top = getOffsetImg(finishPositionRotate, cat).y / 2 + "px"; // корректно
        cat.style.left =
          -(getOffsetImg(finishPositionRotate, cat).x / 2) + "px"; //  без скачков но с мини смещением
        cat.style.left = -getOffsetImg(finishPositionRotate, cat).x + "px"; // со скачками, смещение меньше
      } else {
        positionedImage.style.left = positionedImage.style.left + "px";
      }
    } else if (direction === "rightBottom") {
      if (finishPositionRotate) {
        cat.style.left =
          -(getOffsetImg(finishPositionRotate, cat).x / 2) + "px"; // корректно+
        cat.style.left = -getOffsetImg(finishPositionRotate, cat).x + "px";
      }
    } else {
      console.log("don't have correct direction in setPosition");
    }
  }
}

function onMouseMove(event, image, direction) {
  if (isMouseDown) {
    setPosition(image, direction, event);
  }
}

// изменяет параметры картинки, ширину и высоту
function changeParams(e, imageBox, direction) {
  // тут делать проверку на угол поворота, от этого менять параметры, либо вообще менять direction(?)
  if (isMouseDown && actionOfImage === "resize") {
    if (direction === "left") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBox.style.height = startHeight + "px";
    } else if (direction === "top") {
      imageBox.style.height = startHeight - e.clientY + startY + "px";
    } else if (direction === "leftTop") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
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
      console.log("direction not coincided in changeParams", direction);
    }

    let image = imageBox.querySelector(".box");
    difResizeCoord = image.getBoundingClientRect();
  }
}

const getStartParamOfImage = (imageBox, e) => {
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(
    document.defaultView.getComputedStyle(imageBox).width,
    10
  );
  startHeight = parseInt(
    document.defaultView.getComputedStyle(imageBox).height,
    10
  );
};
const getMountingImage = (image, parent) => {
  image.style.position = "absolute";
  parent.append(image);
};
let imgNowCoord = {};
let wrapCoordBeforeRes = {};
// получить направление по click на элемент
const getDirection = (btn, imageBox, e, parent) => {
  directionToResize = btn.getAttribute("direction");
  isMouseDown = true;
  getMountingImage(imageBox, parent);
  getStartParamOfImage(imageBox, e);
  getCoordinatesInParent(e, parent);
  startParamWrap = {
    width: imageBox.getBoundingClientRect().width,
    height: imageBox.getBoundingClientRect().height,
  };

  imgNowCoord = cat.getBoundingClientRect();
  wrapCoordBeforeRes = {
    x: imageBox.getBoundingClientRect().x,
    y: imageBox.getBoundingClientRect().y,
  };
  // console.log(startParamWrap)
};
let centerWhenResize = {};
let difCenterAfterRotate = {};

const isCenterShifted = () => {
  if (isMouseDown && actionOfImage === "resize") {
    // получили новые координаты картинки и ее центр
    // cat.style.top =  getOffsetImg(finishPositionRotate, cat).y / 2 + "px"; // корректно
    // cat.style.left = - (getOffsetImg(finishPositionRotate, cat).x / 2 ) + "px"; //  без скачков но с мини смещением
    // cat.style.left = - (getOffsetImg(finishPositionRotate, cat).x  ) + "px"; // со скачками, смещение меньше
  }
};
const resize = (imageBox, parent) => {
  const btns = imageBox.querySelectorAll("[direction]");
  btns.forEach((btn) => {
    btn.addEventListener("mousedown", (e) =>
      getDirection(btn, imageBox, e, parent)
    );
  });
  document.addEventListener("mousemove", (event) =>
    setPosition(imageBox, directionToResize, event)
  );
  document.addEventListener("mousemove", (event) =>
    isCenterShifted(imageBox, directionToResize, event)
  );

  document.documentElement.addEventListener(
    "mousemove",
    (event) => changeParams(event, imageBox, directionToResize),
    false
  );
  document.onmouseup = function () {
    if (isMouseDown) {
      // console.log(difResizeCoord);
      isMouseDown = false;
    }
  };

  imageBox.ondragstart = function () {
    return false;
  };
};

const prepareRes = () => {
  let corners = document.querySelectorAll(".square__corner");
  corners.forEach((el) => {
    el.style.display = "block";
  });
};

let btnResize = document.querySelector(".btn-for-resize");
// btnResize.addEventListener("mousedown", prepareRes());
