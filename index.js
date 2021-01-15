let cat = document.querySelector("#cat");
let sofa = document.querySelector("#sofa");
let palm = document.querySelector(".palm");
let images = document.querySelectorAll(".box");
let field = document.querySelector(".field");
let btnResetSelect = document.querySelector(".btn-selected-reset");
let selectWrap = document.querySelector(".selectWrap");
let currentDroppable = null;
let selectedGroup = [];
let isMouseDownForDrag = false;
let coordinatesEvent = {};

let parent = field; // куда монтируем
let actionOfImage = "";
function getCoordinatesEvent(event) {
  console.log(" got coord in ev ");
  // когда мы кликаем по квадрату, чтобы не получать сдвиг,получаем точные координаты мыши и отнbмаем их для позиционирования image
  var bounds = event.target.getBoundingClientRect();
  var x = event.clientX - bounds.left;
  var y = event.clientY - bounds.top;
  coordinatesEvent = {
    x: x.toFixed(1),
    y: y.toFixed(1),
  };
}

const changePositionForDrag = (positionedImage, event, parent) => {
  if (isMouseDown && actionOfImage === "move") {
    positionedImage.style.left =
      event.pageX -
      parent.getBoundingClientRect().left -
      coordinatesEvent.x +
      "px";
    positionedImage.style.top =
      event.pageY -
      coordinatesEvent.y -
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

const isChangedParam = (currentTarget, el) => {
  // console.log( currentTarget.classList)
  if (currentTarget.classList.contains("square__corner")) {
    return true;
  }
  if (currentTarget.classList.contains("square-line")) {
    if (currentTarget.classList.contains("square-line--left")) {
      // console.log(' left line is clicked')
      // resizingToLeft(el);
    }
    return true;
  } else {
    // console.log(' its else ')
    return false;
  }
};

const startDrag = (event, imageBox) => {
  if (event.target.classList.contains("img")) {
    actionOfImage = "move";

    isMouseDown = true;
    getCoordinatesEvent(event);
    imageBox.style.position = "absolute";
    field.append(imageBox);

    changePositionForDrag(imageBox, event, field);
  } else if (
    event.target.classList.contains("square__corner") ||
    event.target.classList.contains("square-line")
  ) {
    actionOfImage = "resize";
  } else {
    console.log(" event not image ");
  }

  // }
};

const move = (imageBox, parent) => {
  imageBox.addEventListener("mousedown", (e) => startDrag(e, imageBox));
  document.addEventListener("mousemove", (event) =>
    changePositionForDrag(imageBox, event, parent)
  );

  document.onmouseup = function () {
    // isMouseDownForDrag = false;
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

const changeClick = (event) => {
  let target = event.target;
  // console.log(target, "its target change click ");
  if (target.classList.contains("square__corner")) {
    move(cat, parent);
    return "resize";
  } else if (target.classList.contains("img")) {
    //  resize();
    return "move";
  }
};
const changePropertiesImage = (event) => {
  changeClick(event);
};
btnResetSelect.onclick = () => resetSelecting(images);
if (window.innerWidth >= 300) {
  // cat.addEventListener("mousedown", (event) => changePropertiesImage(event));

  // changePropertiesImage(cat);

  move(cat, parent);
  resize(cat);

  // rotate(cat);
  // testFunc(cat);
  // move(selectWrap);
  images.forEach((el) => {
    // el.addEventListener("click", selectSome);
    // el.addEventListener("mouseup", selectSome);
  });
} else {
  console.log("its mobil device, use finger for action");
}
