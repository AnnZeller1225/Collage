"use strict";
let directionToResize = "";
let isMouseDown = false;
let calculateAngle = 0; // перенести в локальную
let startX, startY, startWidth, startHeight; // размеры  картинки до ресайзинга,  // координаты старта eventa при движении мыши

function getCoordinatesInParent(event, parent) {
  // вычисляем начальные  координаты клика с учетом прокрутки
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
  console.log(" назначили координаты картинке");
}
function setPosition(positionedImage, direction, event) {
  //pageX - координаты мыши текущие
  if (isMouseDown && actionOfImage === "resize") {
    let line = event.target;
    if (direction === "left") {
      positionedImage.style.left = event.pageX - startCoordinatesClick.x + "px";
    } else if (direction === "leftBottom") {
      positionedImage.style.left = event.pageX - startCoordinatesClick.x + "px";
      positionedImage.style.top = positionedImage.style.top + "px";
    } else if (direction === "top") {
      let line = positionedImage.querySelector(".square-line--top");
      let top = window.getComputedStyle(line).top;
      top = Math.abs(Number(top.substr(0, top.length - 2)));

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

  // getMountingImage(imageBox, parent);
  getStartParamOfImage(imageBox, e);
  getCoordinatesInParent(e, parent);
  // console.log(parent, 'par')
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

let color;
const a = (el) => {
  // color = window.getComputedStyle(el).height;
  console.log(color);
};
// a(cat);
// const rotation = (imageBox) => {
//   var R2D, active, angle, centerImage, rotation, startAngle, stop;
//   const rotateBtn = imageBox.querySelector(".rotate");

//   active = false;
//   angle = 0;
//   rotation = 0;
//   startAngle = 0;
//   centerImage = {
//     x: 0,
//     y: 0,
//   };
//   R2D = 180 / Math.PI;

//   const getCenterImage = (e, imageBox) => {
//     var height, left, top, width, xBtnEvent, yBtnEvent;
//     let positionImage = imageBox.getBoundingClientRect();
//     started = positionImage;
//     console.log("STARDEd updated", started);

//     (top = positionImage.top),
//       (left = positionImage.left),
//       (height = positionImage.height),
//       (width = positionImage.width);
//     centerImage = {
//       x: left + width / 2,
//       y: top + height / 2,
//     };
//     xBtnEvent = e.clientX - centerImage.x; // вычисляем координаты клика внутри кнопки
//     yBtnEvent = e.clientY - centerImage.y;
//     startAngle = R2D * Math.atan2(yBtnEvent, xBtnEvent);
//     // console.log('in getCenter', positionImage)
//     return (active = true);
//   };

//   const getRotate = (e) => {
//     if (active) {
//       var d, x, y;
//       x = e.clientX - centerImage.x;
//       y = e.clientY - centerImage.y;
//       d = R2D * Math.atan2(y, x); // вычисляем угол поворота в данный момент
//       rotation = d - startAngle;
//       calculateAngle = angle + rotation;

//       // присвоили новые координаты переменной при повороте
//       // координаты считываются корректно, он углов картинки
//       // let img = imageBox.querySelector('#catImg');
//       // diffPositionCoordImage = imageBox.getBoundingClientRect();
//       // console.log( img.getBoundingClientRect().x);
//       // console.log( img.getBoundingClientRect().x);
//       // console.log(diffPositionCoordImage, ' это координаты картинки после поворотов ');
//       // console.log('calculateAngle', calculateAngle)
//       return (imageBox.style.webkitTransform =
//         "rotate(" + calculateAngle + "deg)");
//     }
//   };

//   stop = function () {
//     angle += rotation;
//     rotation = 0;

//     return (active = false);
//   };

//   rotateBtn.addEventListener(
//     "mousedown",
//     (e) => getCenterImage(e, imageBox),
//     false
//   );
//   document.documentElement.addEventListener(
//     "mousemove",
//     (e) => getRotate(e),
//     false
//   );
//   document.addEventListener("mouseup", stop, false);
// };
