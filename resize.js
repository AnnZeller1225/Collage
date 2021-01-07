const rbCorner = document.querySelector(".square__corner--rb");

// sofa.addEventListener(
//   "click",
//   function init() {
//     console.log("to pull");
//     sofa.removeEventListener("click", init, false);
    // p.className = p.className + " resizable";
    // var resizer = document.createElement("div");
    // resizer.className = "resizer";
    // p.appendChild(resizer);
    rbCorner.addEventListener("mousedown", initDrag, false);
  // },
  // false
// );

var startX, startY, startWidth, startHeight;

function initDrag(e) {
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(sofa).width, 10);
  startHeight = parseInt(
    document.defaultView.getComputedStyle(sofa).height,
    10
  );
  document.documentElement.addEventListener("mousemove", doDrag, false);
  document.documentElement.addEventListener("mouseup", stopDrag, false);
}

function doDrag(e) {
  sofa.style.maxWidth = startWidth + e.clientX - startX + "px";
  sofa.style.height = startHeight + e.clientY - startY + "px";
}

function stopDrag(e) {
  document.documentElement.removeEventListener("mousemove", doDrag, false);
  document.documentElement.removeEventListener("mouseup", stopDrag, false);
}
