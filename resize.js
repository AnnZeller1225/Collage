"use strict";
let directionToResize = "";
let isMouseDown = false;
const parentForImage = document.querySelector(".field");
let coordinatesInBtn = {};

function getCoordinatesInParent ( event ) { // когда мы кликаем по квадрату, чтобы не получать сдвиг,получаем точные координаты мыши и отнbмаем их для позиционирования image
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





  const rotateBtn = imageBox.querySelector('.rotate');

  var R2D, active, angle, center, rotate, rotation, start, startAngle, stop;

  active = false;
  angle = 0;
  rotation = 0;
  startAngle = 0;
  center = {
    x: 0,
    y: 0
  };

  document.ontouchmove = function(e) {
    return e.preventDefault();
  };

  R2D = 180 / Math.PI;

  start = function(e) {
    var height, left, top, width, x, y, _ref;
    e.preventDefault();
    _ref = imageBox.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
    center = {
      x: left + (width / 2),
      y: top + (height / 2)
    };
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
  //   console.log(_ref, 'its this')
    return active = true;
  };

  rotate = function(e) {
    var d, x, y;
    e.preventDefault();
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    if (active) {
      return imageBox.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
    }
  };

  stop = function() {
    angle += rotation;
    return active = false;
  };

  // init();

  rotateBtn.addEventListener("mousedown", start, false);
  document.documentElement.addEventListener("mousemove", rotate, false);
  document.addEventListener("mouseup", stop, false);



};
