let cat = document.querySelector("#cat");
let field = document.querySelector(".field");
let btnResetSelect = document.querySelector(".btn-selected-reset");
let selectWrap = document.querySelector(".selectWrap");
let currentDroppable = null;
let selectedGroup = [];
let isMouseDownForDrag = false;
let startCoordinatesEvent = {};

let diffPositionCoordImage = {
  x: 0,
  y: 0,
};

let parent = field; // куда монтируем
let actionOfImage = ""; // что делаем с картинкой?

let num = 30;
function getstartCoordinatesEvent(event) {
  // вычисляем координаты клика без учета прокрутки

  // ТУТ ВЫЧЕСТЬ РАЗНИЦУ МЕЖДУ ДИФ  И ДОБАЫИТЬ ЕЕ ПРИ ВЫЧИСЛИЕННИ

  let x, y;
  let eventCoordInDocument = event.target.getBoundingClientRect();

  console.log(
    eventCoordInDocument,
    "стартовые координаты картинки до начала движения",
    diffPositionCoordImage,
    "diffPositionCoordImage"
  );

  // if (diffPositionCoordImage.x !== 0) {

  //   // console.log(' был поворот, используем координаты из функции rotate ', diffPositionCoordImage)
  //  x = event.clientX - diffPositionCoordImage.x ;
  //  y = event.clientY - diffPositionCoordImage.y ;
  // startCoordinatesEvent = {
  //   x: x.toFixed(1),
  //   y: y.toFixed(1),
  // };
  // } else {
  // console.log('поворота не было, используем текущие координаты ')

  x = event.clientX - eventCoordInDocument.x;
  y = event.clientY - eventCoordInDocument.y;
  startCoordinatesEvent = {
    x: x.toFixed(1),
    y: y.toFixed(1),
  };
}

const changePositionForDrag = (positionedImage, event, parent) => {
  if (isMouseDown && actionOfImage === "move") {
    positionedImage.style.left =
      event.pageX -
      parent.getBoundingClientRect().left -
      startCoordinatesEvent.x +
      "px";

    positionedImage.style.top =
      event.pageY -
      startCoordinatesEvent.y -
      (parent.getBoundingClientRect().top + pageYOffset) +
      "px";

    // console.log(
    //   diffPositionCoordImage.x,
    //   positionedImage.style.left,
    //   "its chaangePfor Drag "
    // );
  } else {
  }
};

const getSelected = (el) => {
  el.classList.add("selected");
};
const removeSelecting = (el) => {
  el.classList.remove("selected");
};
const getActionOfImage = (event) => {
  if (event.target.classList.contains("img")) {
    actionOfImage = "move";
    isMouseDown = true;
  } else if (
    event.target.classList.contains("square-line") ||
    event.target.classList.contains("square__corner")
  ) {
    actionOfImage = "resize";
  }
  return actionOfImage;
};
const startDrag = (event, imageBox, parent) => {
  if (getActionOfImage(event) === "move") {
    getstartCoordinatesEvent(event);
    imageBox.style.position = "absolute";
    getMountingImage(imageBox, parent);

    changePositionForDrag(imageBox, event, parent, true);
  } else if (getActionOfImage(event) === "resize") {
    actionOfImage = "resize";
    // console.log(' it move in start drag');
  } else {
    // console.log(" event is something else ");
    // getstartCoordinatesEvent(event);
  }
};

const move = (imageBox, parent) => {
  imageBox.addEventListener("mousedown", (e) => startDrag(e, imageBox, parent));
  document.addEventListener("mousemove", (event) =>
    changePositionForDrag(imageBox, event, parent)
  );

  document.onmouseup = function () {
    isMouseDown = false;
    actionOfImage = "";
  };
  imageBox.ondragstart = function () {
    return false;
  };
};

const selectSome = (event) => {
  if (event.shiftKey) {
    // console.log("selectSome with shiftKey");
    let target = event.currentTarget;
    selectedGroup.push(target.id);
    selectWrap.classList.remove("hide");
    selectWrap.append(target);
    // getSelected(target);
  }
};
const resetSelecting = (elems) => {
  // console.log(" reset");
  elems.forEach((el) => {
    removeSelecting(el);
    el.removeAttribute("selecting");
  });
};

btnResetSelect.onclick = () => resetSelecting(images);
if (window.innerWidth >= 300) {
  move(cat, parent); // две функции, т.к обе должны сразу срабатывать
  rotation(cat);
  // resize(cat, parent);
  // rotate(cat);
  // testFunc(cat);
  // move(selectWrap);
  // images.forEach((el) => {
  // el.addEventListener("click", selectSome);
  // el.addEventListener("mouseup", selectSome);
  // });
} else {
  console.log("its mobil device, use finger for action");
}
