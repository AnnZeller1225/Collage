let cat = document.querySelector("#cat"); // его мы крутим
let field = document.querySelector(".field");
const wrap = document.querySelector(".image-wrap"); // его мы позиционируем и расширяем
let startCoordinatesClick = {};
let difResizeCoord = {}; // разница координат при ресайзинге
let parent = field; // куда монтируем
let actionOfImage = ""; // что делаем с картинкой?

let difValueWithRotate = 0; // смещение при повороте, величина, кторую отнимаем
let num = 0;
function getStartCoordinatesClick(event) {
  // вычисляем координаты клика без учета прокрутки
  let x, y;
  let eventCoordInDocument = event.target.getBoundingClientRect();
  if (diffPositionRotate.x) {
    // если был поворот
    difValueWithRotate = Math.abs(diffPositionRotate.x);
  }
  // если был resize:
  if (difResizeCoord.x) {
    //  num = 25;
    let target = event.currentTarget;
    console.log(difResizeCoord, "dif res");

    num = target.getBoundingClientRect().x - difResizeCoord.x;
    console.log(num, "num");
  }

  x = event.clientX - eventCoordInDocument.x - difValueWithRotate;
  y = event.clientY - eventCoordInDocument.y - difValueWithRotate;
  startCoordinatesClick = {
    // координаты клика
    x: x.toFixed(1),
    y: y.toFixed(1),
  };
}
const changePositionForDrag = (positionedImage, event, parent) => {
  if (isMouseDown && actionOfImage === "move") {
    positionedImage.style.left =
      event.pageX -
      parent.getBoundingClientRect().left -
      startCoordinatesClick.x +
      "px";

    positionedImage.style.top =
      event.pageY -
      startCoordinatesClick.y -
      (parent.getBoundingClientRect().top + pageYOffset) +
      "px";
  }
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
  } else if (event.target.classList.contains("center")) {
    actionOfImage = "changeCenter";

    isMouseDown = true;
  }
  return actionOfImage;
};
const startDrag = (event, imageBox, parent) => {
  if (getActionOfImage(event) === "move") {
    getStartCoordinatesClick(event, parent);
    imageBox.style.position = "absolute";
    getMountingImage(imageBox, parent);

    changePositionForDrag(imageBox, event, parent, true);
  } else if (getActionOfImage(event) === "resize") {
    actionOfImage = "resize";
  } else {
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
    rotateBtn.style.display = "none";
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

move(wrap, parent); // две функции, т.к обе должны сразу срабатывать
rotation(cat);
resize(wrap, parent);
getChangePoint(point, parent);

// resize(wrap, parent);

// const getSelected = (el) => {
//   el.classList.add("selected");
// };
// const removeSelecting = (el) => {
//   el.classList.remove("selected");
// };
