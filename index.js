let cat = document.querySelector(".cat");
let sofa = document.querySelector(".sofa");
let currentDroppable = null;

const move = (el) => {
  el.onmousedown = function (event) {
    let shiftX = event.clientX - el.getBoundingClientRect().left;
    let shiftY = event.clientY - el.getBoundingClientRect().top;

    el.style.position = "absolute";
    el.style.zIndex = 1000;
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
        if (currentDroppable) {
          // null если мы были не над droppable до этого события
          // (например, над пустым пространством)
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // null если мы не над droppable сейчас, во время этого события
          // (например, только что покинули droppable)
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener("mousemove", onMouseMove);

    el.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      el.onmouseup = null;
    };

    function enterDroppable(elem) {
      elem.style.background = "pink";
    }

    function leaveDroppable(elem) {
      elem.style.background = "";
    }
  };
  el.ondragstart = function () {
    return false;
  };
};
move(sofa);
move(cat);
