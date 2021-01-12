let cat = document.querySelector("#cat");
let sofa = document.querySelector("#sofa");
let palm = document.querySelector(".palm");
let images = document.querySelectorAll(".box");
let field = document.querySelector(".field");
let btnResetSelect = document.querySelector(".btn-selected-reset");
let selectWrap = document.querySelector(".selectWrap");

let currentDroppable = null;
let selectedGroup = [];

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

const move = (el) => {
  el.onmousedown = function (event) {
    let target = event.currentTarget;
    if (isChangedParam(event.target, el)) {
      // если мы тянем за уголок или линию  картинки
      // isChangedParam(event.target, el);
      // console.log("isChangedParam");
    } else {
      // resizing(target);
      console.log(" переносим ");
      getSelected(el);
      if (target.classList.contains("selectWrap")) {
        // console.log(' contins selectWrap')
        let children = target.querySelectorAll(".box");
        children.forEach((el) => {
          // getSelected(el);
          el.setAttribute("selecting", true);
          document.body.append(el);
        });
        target.classList.toggle("hide");
      }
      if (!event.shiftKey) {
        // changePosition(event);
        const field = document.querySelector('.field');

        let shiftX = event.clientX - el.getBoundingClientRect().left;
        let shiftY = event.clientY - el.getBoundingClientRect().top;
        el.style.position = "absolute";

        images.forEach((el) => {
          if (!el.hasAttribute("selecting")) {
            removeSelecting(el);
          }
        });
        getSelected(el);
        // el.style.zIndex = 10; // для наслаивания
        // document.body.append(el);
        field.append(el);
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          el.style.left = pageX - shiftX + "px";
          el.style.top = pageY - shiftY - 110 + "px";
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", onMouseMove);
        });
        // document.onmouseup = function () {
        //   // console.log(" its mouseup in cate ");
        //   document.removeEventListener("mousemove", onMouseMove);
        //   // el.onmouseup = null;
        //   // getSelected(el);
        // };
        el.ondragstart = function () {
          return false;
        };
      }
    }
  };
};

const selectSome = (event) => {
  let target = event.currentTarget;

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

// проверим с чего сидит пользователь
// переделать на красиво
btnResetSelect.onclick = () => resetSelecting(images);
if (window.innerWidth >= 600) {
  move(cat);
  resizingToLeft(cat);
  // resizing(cat);
  resizingToRight(cat);
  resizingToRightBottom(cat);

  resizingToLeftBottom(cat);
  resizingToLeftTop(cat);
  // resizingToRightTop(cat)
  resizingToTop(cat);
  resizingToBottom(cat);

  // move(sofa);
  // move(selectWrap);
  images.forEach((el) => {
    el.addEventListener("click", selectSome);
    el.addEventListener("mouseup", selectSome);
  });
} else {
  console.log("its mobil device, use finger for action");
}
