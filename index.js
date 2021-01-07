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

const move = (el) => {
  el.onmousedown = function (event) {
    let target = event.currentTarget;
    console.log(event.target.className);
    // если мы тянем не за уголок картинки 
    if (!event.target.classList.contains("square__corner--rb")) {
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
        console.log(" pressed without shiftKey ", el);
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
        document.body.append(el);
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          el.style.left = pageX - shiftX + "px";
          el.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          // el.hidden = true;
          // let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          // el.hidden = false;

          // if (!elemBelow) return;

          // let droppableBelow = elemBelow.closest(".droppable");
          // if (currentDroppable != droppableBelow) {
          //   currentDroppable = droppableBelow;
          // }
        }

        document.addEventListener("mousemove", onMouseMove);

        document.onmouseup = function () {
          console.log(" its mouseup ");
          document.removeEventListener("mousemove", onMouseMove);
          el.onmouseup = null;
          // getSelected(el);
        };
        el.ondragstart = function () {
          return false;
        };
      }
    }

    // THERE IS MOBIL EVENTS THERE IS MOBIL EVENTS

    el.onmouseup = function () {
      el.onmouseup = null;
    };
    el.ondragstart = function () {
      return false;
    };
  };
};

const selectSome = (event) => {
  let target = event.currentTarget;

  if (event.shiftKey) {
    console.log("selectSome with shiftKey");
    let target = event.currentTarget;
    selectedGroup.push(target.id);
    selectWrap.classList.remove("hide");
    selectWrap.append(target);
    // getSelected(target);
  }
};
const resetSelecting = (elems) => {
  console.log(" reset");
  elems.forEach((el) => {
    removeSelecting(el);
    el.removeAttribute("selecting");
  });
};

// проверим с чего сидит пользователь
// переделать на красиво
btnResetSelect.onclick = () => resetSelecting(images);
if (window.innerWidth >= 600) {
  // выполнять
  move(cat);
  move(sofa);
  move(selectWrap);
  images.forEach((el) => {
    el.addEventListener("click", selectSome);
    el.addEventListener("mouseup", selectSome);
  });
} else {
  console.log(" mobil");
}
