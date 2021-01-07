const start = (event) => {
  // console.log(" ontouchstart ");
  let target = event.currentTarget;

  images.forEach((el) => {
    if (!el.hasAttribute("selecting")) {
      removeSelecting(el);
    }
  });
  getSelected(target);
  // нужно доработать, поялвяется лишняя обводка
};
const moving = (event) => {
  // event.preventDefault();
  let target = event.currentTarget;

  var touchLocation = event.targetTouches[0];
  var pageX = touchLocation.pageX - 50 + "px";
  var pageY = touchLocation.pageY - 350 + "px";
  target.style.position = "absolute";
  target.style.left = pageX;
  target.style.top = pageY;
};

const moveForMobil = () => {
  console.log("it works touchstart");
};

if (window.innerWidth >= 600) {
  // выполнять
  console.log(" desctop");
} else {
  cat.addEventListener("touchstart", start);
  cat.addEventListener("touchmove", moving);
  sofa.addEventListener("touchstart", start);
  sofa.addEventListener("touchmove", moving);
}

  cat.addEventListener("touchend", () => {
    console.log("touchend");
  });
  cat.addEventListener("touchcancel", () => {
    console.log("touchcancel");
  });
