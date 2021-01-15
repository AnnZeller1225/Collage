let cat = document.querySelector("#cat");
// let sofa = document.querySelector("#sofa");
// let palm = document.querySelector(".palm");
// let images = document.querySelectorAll(".box");
let field = document.querySelector(".field");
let btnResetSelect = document.querySelector(".btn-selected-reset");
let selectWrap = document.querySelector(".selectWrap");
let currentDroppable = null;
let selectedGroup = [];
let isMouseDownForDrag = false;
let startCoordinatesEvent = {};

let parent = field; // куда монтируем
let actionOfImage = ""; // что делаем с картинкой?

function getstartCoordinatesEvent(event) {
  // вычисляем координаты клика без учета прокрутки
  let eventCoordInDocument = event.target.getBoundingClientRect();
  let x = event.clientX - eventCoordInDocument.left;
  let y = event.clientY - eventCoordInDocument.top;
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

    changePositionForDrag(imageBox, event, parent);
  } else if (getActionOfImage(event) === "resize") {
    actionOfImage = "resize";
  } else {
    console.log(" event is something else ");
  }
};

const move = (imageBox, parent) => {
  imageBox.addEventListener("mousedown", (e) => startDrag(e, imageBox, parent));
  document.addEventListener("mousemove", (event) =>
    changePositionForDrag(imageBox, event, parent)
  );

  document.onmouseup = function () {
    isMouseDown = false;
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
  // cat.addEventListener("mousedown", (event) => changePropertiesImage(event));

  // changePropertiesImage(cat);

  move(cat, parent);
  resize(cat, parent);

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
