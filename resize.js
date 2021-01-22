"use strict";
let directionToResize = "";
let isMouseDown = false;
let startPositionWrap; // позиция родительского документа при повороте, для вычисления угла сдвига
let startX, startY, startWidth, startHeight; // размеры  картинки до ресайзинга,  // координаты старта eventa при движении мыши

function getCoordinatesInParent(event, parent) {
  // вычисляем начальные  координаты клика с учетом прокрутки
let n = 30;
  if (diffPositionRotate.x) {// если был поворот
    difValueWithRotate = Math.abs(diffPositionRotate.x);
    console.log('difValueWithRotate', difValueWithRotate);
  }


  let eventCoordInDocument = event.target.getBoundingClientRect();

  let x =
    event.clientX -
    eventCoordInDocument.left +
    parent.getBoundingClientRect().left ;
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
function setPosition(positionedImage, direction, event) {
  //pageX - координаты мыши текущие
  if (isMouseDown && actionOfImage === "resize") {
    if (direction === "left") {
      positionedImage.style.left = event.pageX - startCoordinatesClick.x + "px";
    } else if (direction === "leftBottom") {
      // получить разницу углов
      // при 45 - 60
      /// при 20 - 35
      // при -69 - 115 примерно


      let num = 0;
      console.log('difValueWithRotate', difValueWithRotate)

      positionedImage.style.left = event.pageX - startCoordinatesClick.x -num + "px";
      positionedImage.style.top = positionedImage.style.top  + "px";


    } else if (direction === "top") {
      positionedImage.style.top = event.pageY - startCoordinatesClick.y + "px";
    } else if (direction === "bottom") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
    } else if (direction === "leftTop") {
      positionedImage.style.left = event.pageX - startCoordinatesClick.x + "px";
      positionedImage.style.top = event.pageY - startCoordinatesClick.y + "px";
    } else if (direction === "rightTop") {
      positionedImage.style.top = event.pageY - startCoordinatesClick.y + "px";
    } else if (direction === "right") {
      positionedImage.style.top = positionedImage.style.top + "px";
      positionedImage.style.left = positionedImage.style.left + "px";
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

function changeParams(e, imageBox, direction) {
  // изменяет параметры картинки, ширину и высоту
  if (isMouseDown && actionOfImage === "resize") {
    if (direction === "left") {
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBox.style.height = startHeight + "px";
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
      console.log("direction not coincided in changeParams", direction);
    }
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

// получить направление по click на элемент
const getDirection = (btn, imageBox, e, parent) => {
  directionToResize = btn.getAttribute("direction");
  isMouseDown = true;

  getMountingImage(imageBox, parent);
  getStartParamOfImage(imageBox, e);
  getCoordinatesInParent(e, parent);
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

  document.documentElement.addEventListener(
    "mousemove",
    (event) => changeParams(event, imageBox, directionToResize),
    false
  );
  document.onmouseup = function () {
    isMouseDown = false;
  };

  imageBox.ondragstart = function () {
    return false;
  };
};

const prepareRotate = () => {
  startPositionWrap = wrap.getBoundingClientRect();
  rotateBtn.style.display = "block";
};

const btnForRotation = document.querySelector(".btn-for-rotate");
btnForRotation.addEventListener("mousedown", (e) => prepareRotate(e, wrap));

const rotateBtn = document.querySelector(".rotate");
let action = ""; // изменить, есть похожее свойство в Index.js
let diffPositionRotate = {}; // разница между родительским элементом и повернутой картинкой
let finishPositionRotate;
const rotation = (imageBox) => {
  var R2D, active, angle, centerImage, rotation, startAngle, stop;

  active = false;
  angle = 0;
  rotation = 0;
  startAngle = 0;
  centerImage = {
    x: 0,
    y: 0,
  };
  R2D = 180 / Math.PI;
  let getCenterImage = function (e) {
    action = "rotate";
    var height, left, top, width, xBtnEvent, yBtnEvent;
    let positionImage = imageBox.getBoundingClientRect();
    (top = positionImage.top),
      (left = positionImage.left),
      (height = positionImage.height),
      (width = positionImage.width);
    centerImage = {
      x: left + width / 2,
      y: top + height / 2,
    };
    xBtnEvent = e.clientX - centerImage.x; // вычисляем координаты клика внутри кнопки
    yBtnEvent = e.clientY - centerImage.y;
    startAngle = R2D * Math.atan2(yBtnEvent, xBtnEvent);

    return (active = true);
  };

  const getRotate = (e) => {
    if (active) {
      var d, x, y;
      x = e.clientX - centerImage.x;
      y = e.clientY - centerImage.y;
      d = R2D * Math.atan2(y, x); // вычисляем угол поворота в данный момент
      rotation = d - startAngle;
      let calculateAngle = angle + rotation;

      // присвоили новые координаты переменной при повороте
      // координаты считываются корректно, он углов картинки
      return (imageBox.style.webkitTransform =
        "rotate(" + calculateAngle + "deg)");
    }
  };

  stop = function () {
    if (action === "rotate") {
      finishPositionRotate = imageBox.getBoundingClientRect();
      diffPositionRotate.x = finishPositionRotate.x - startPositionWrap.x;
      diffPositionRotate.y = finishPositionRotate.y - startPositionWrap.y;
    }
    console.log('angle' , angle)
    angle += rotation;
    rotation = 0;
    action = "";
    return (active = false);
  };

  rotateBtn.addEventListener("mousedown", getCenterImage, false);

  document.documentElement.addEventListener(
    "mousemove",
    (e) => getRotate(e),
    false
  );
  document.addEventListener("mouseup", stop, false);
};

const prepareRes = () => {
  let corners = document.querySelectorAll(".square__corner");
  corners.forEach((el) => {
    el.style.display = "block";
  });
};

let btnRes = document.querySelector(".btn-for-resize");
btnRes.addEventListener("mousedown", prepareRes());
//
