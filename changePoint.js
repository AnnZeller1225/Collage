const point = document.querySelector(".center");
const img = document.querySelector('.cat');
let startCoordinatesPoint = {};
let finishCoordinatesPoint = {};
// parent - рабочее поле, определено в Index js

//внутри картинки курсор?
const isPointInsideParent = (valueOfPosition, point, parentImg, style) => {
  let pointParam = {
    w: point.getBoundingClientRect().width,
    h: point.getBoundingClientRect().height,
  };

  if (style === "left") {
    if (
      valueOfPosition >= 0 &&
      valueOfPosition <= parentImg.getBoundingClientRect().width - pointParam.w
    ) {
      return true;
    } else {
      return false;
    }
  } else if (style === "top") {
    if (
      valueOfPosition >= 0 &&
      valueOfPosition <= parentImg.getBoundingClientRect().height - pointParam.h
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const changePositionPoint = (point, event, parent) => {
  if (isMouseDown && actionOfImage === "changeCenter") {
    let imgParent = point.parentNode;// переменная cat, переделать?
    let left =
      event.pageX -
      startCoordinatesPoint.x -
      imgParent.getBoundingClientRect().left -
      parent.getBoundingClientRect().left;

    let top =
      event.pageY -
      startCoordinatesPoint.y -
      imgParent.getBoundingClientRect().top;

    if (isPointInsideParent(left, point, imgParent, "left")) {
      point.style.left = left + "px";
    }
    if (isPointInsideParent(top, point, imgParent, "top")) {
      point.style.top = top + "px";
    }
    finishCoordinatesPoint = {
      left: point.style.left,
      top: point.style.top,
    };
  }
};

const startDragPoint = (e, point, parent) => {
  if (getActionOfImage(e) === "changeCenter") {
    getStartClick(e, parent);
    getMountingImage(point, img);// врнутрь картинки
    changePositionPoint(point, e, parent);
  }
};
const getStartClick = (event) => {
  let x, y;
  let pointCoordInDoc = event.target.getBoundingClientRect();

  // удалили переменную вращения (хз нужна ли)
  if (diffPositionRotate.x) {
    // если был поворот
    difValueWithRotate = Math.abs(diffPositionRotate.x);
    console.log(' rotate', difValueWithRotate)
  }
  let num = 0;

  x = event.clientX - pointCoordInDoc.x  - num;
  y = event.clientY - pointCoordInDoc.y ;
  startCoordinatesPoint = {
    // координаты клика
    x: x.toFixed(1),
    y: y.toFixed(1),
  };
};

const getChangePoint = (point, parent, wrap) => {
  // wrap - путнктирная линия
  point.addEventListener("mousedown", (e) => startDragPoint(e, point, parent));

  document.addEventListener("mousemove", (event) =>
    changePositionPoint(point, event, parent)
  );

  document.onmouseup = function () {
    isMouseDown = false;
    actionOfImage = "";
  };
  point.ondragstart = function () {
    return false;
  };
};
