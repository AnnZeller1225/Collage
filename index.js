let cat = document.querySelector("#cat");
let field = document.querySelector(".field");
let btnResetSelect = document.querySelector(".btn-selected-reset");
let selectWrap = document.querySelector(".selectWrap");
let currentDroppable = null;
let selectedGroup = [];
let isMouseDownForDrag = false;
let startCoordinatesClick = {};
let diffPositionCoordImage = {};

let started = {};
let parent = field; // куда монтируем
let actionOfImage = ""; // что делаем с картинкой?

let rightDegree = {};
let num = 0;
function getStartCoordinatesClick(event, imageBox) {
  let x, y;

  // пооврот - 45 - num 30;
  // поворот -14 , -78 = 14
  // поворот 75

  let eventCoordInDocument = imageBox.getBoundingClientRect();

  if (diffPositionCoordImage.x) {
    console.log('rotate was')
    let differentCorner = eventCoordInDocument.x - started.x;
    console.log(Math.abs(differentCorner));
    num = differentCorner;
    

    // x = event.clientX - eventCoordInDocument.x - num;
    // y = event.clientY - eventCoordInDocument.y - num;
  } else {
    console.log(
      'rootate wasnt'
    )
    x = event.clientX - eventCoordInDocument.x ;
    y = event.clientY - eventCoordInDocument.y ;
    // }
  }
  startCoordinatesClick = {
    x: x,
    y: y,
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
    getStartCoordinatesClick(event, imageBox);
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
    if (isMouseDown) {
      diffPositionCoordImage = {};
      console.log(" delete Diff");
    }
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
