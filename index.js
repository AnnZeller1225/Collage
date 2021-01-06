let cat = document.querySelector(".cat");
let sofa = document.querySelector(".sofa");
let palm = document.querySelector(".palm");
let images = document.querySelectorAll(".box");
let field = document.querySelector(".field");

let currentDroppable = null;

const highlight = (el) => {
  el.classList.toggle("highlight");
};
const deleteHighlight = (el) => {
  el.classList.remove("highlight");
}

const move = (el) => {
  el.onmousedown = function (event) {
    let target = event.currentTarget;

    // console.log(target.className)
    if (target.className === "selectWrap") {
      console.log(" its wrap");
      let children = target.querySelectorAll(".box");

      children.forEach((el) => {  
        // let elem =
        deleteHighlight(el);
        document.body.append(el);
      });
      target.classList.toggle('hide');
    }

    if (!event.ctrlKey) {
      // console.log(' pressed without ctrl ', el)
      let shiftX = event.clientX - el.getBoundingClientRect().left;
      let shiftY = event.clientY - el.getBoundingClientRect().top;

      el.style.position = "absolute";
      highlight(el);
      el.style.zIndex = 1; // для наслаивания
      document.body.append(el);
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        el.style.left = pageX - shiftX + "px";
        el.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        el.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        el.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest(".droppable");
        if (currentDroppable != droppableBelow) {
          currentDroppable = droppableBelow;
        }
      }

      document.addEventListener("mousemove", onMouseMove);

      el.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        el.onmouseup = null;
        highlight(el);
      };
      el.ondragstart = function () {
        return false;
      };
    }
  };
  el.ondragstart = function () {
    return false;
  };
};
let selectedGroupWrap = document.querySelector(".selectWrap");
// selectedGroupWrap.classList.add("selectWrap");
// document.body.append(selectedGroupWrap);

let selectedGroup = [];

const selectSome = (event) => {
  console.log("selectSome start");

  if (event.ctrlKey) {
    let target = event.currentTarget;
    selectedGroup.push(target.id);

    selectedGroupWrap.append(target);
    highlight(target);
  }
};

move(sofa);
move(cat);
move(palm);
move(selectedGroupWrap);

images.forEach((el) => {
  el.addEventListener("mousedown", selectSome);
  // el.addEventListener("mouseup", selectSome);
});
const resize = () => {
  var p = document.querySelector("p");
  p.addEventListener(
    "click",
    function init() {
      p.removeEventListener("click", init, false);
      p.className = p.className + " resizable";
      var resizer = document.createElement("div");
      resizer.className = "resizer";
      p.appendChild(resizer);
      resizer.addEventListener("mousedown", initDrag, false);
    },
    false
  );

  var startX, startY, startWidth, startHeight;

  function initDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    p.style.width = startWidth + e.clientX - startX + "px";
    p.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag(e) {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }
};
resize();


