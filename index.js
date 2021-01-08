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
    resizing(target);
    // console.log(event.target.className);

    // если мы тянем не за уголок картинки
    if (
      !event.target.classList.contains("square__corner") &&
      !event.target.classList.contains("square-line")
    ) {
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
        // console.log(" pressed without shiftKey ", el);
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
        }

        document.addEventListener("mousemove", onMouseMove);

        document.onmouseup = function () {
          console.log(" its mouseup in cate ");
          document.removeEventListener("mousemove", onMouseMove);
          // el.onmouseup = null;
          // getSelected(el);
        };
        el.ondragstart = function () {
          return false;
        };
      }
    }
    // el.onmouseup = function () {
    //   console.log(" its mouseup in cate ");
    //   el.onmouseup = null;
    // };
    // el.ondragstart = function () {
    //   return false;
    // };
  };
};

const moveLeft = (el) => {
  let lineToLeft = el.querySelector(".square-line--left");

  lineToLeft.onmousedown = function (event) {
    console.log("left onmousedown");
    let target = event.currentTarget;

    let shiftX = event.clientX - el.getBoundingClientRect().left;
    let shiftY = event.clientY - el.getBoundingClientRect().top;
    el.style.position = "absolute";
    document.body.append(el);
    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      el.style.left = pageX - shiftX + "px";
      el.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function () {
      console.log(" its mouseup in left line");
      document.removeEventListener("mousemove", onMouseMove);
    };
  };
  lineToLeft.addEventListener("mousedown",  initDrag, false);

  var startX, startY, startWidth, startHeight;
  
  function initDrag(e) {
    let target = e.currentTarget;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(el).width, 10);
      startHeight = parseInt(
        document.defaultView.getComputedStyle(el).height,
        10
      );

      document.documentElement.addEventListener("mousemove", doDragLeft, false); 
      document.documentElement.addEventListener("mouseup", stopDragLeft, false);


      function doDragLeft(e) {
        console.log(el, 'its el ')
        let imageBoxImg = document.querySelector('img');
        el.style.maxWidth = startWidth - e.clientX + startX + "px";
        imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
      }
      
      function stopDragLeft(e) {
        console.log(' stop drug left ')
        document.documentElement.removeEventListener("mousemove", doDragLeft, false);
        document.documentElement.removeEventListener("mouseup",stopDragLeft, false);
      }
 
  }
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
  // выполнять
  move(cat);
  moveLeft(cat);

  move(sofa);
  move(selectWrap);
  images.forEach((el) => {
    el.addEventListener("click", selectSome);
    el.addEventListener("mouseup", selectSome);
  });
} else {
  console.log("its mobil device, use finger for action");
}
