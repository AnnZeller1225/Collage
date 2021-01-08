const rbCorner = document.querySelector(".square__corner--rb");

rbCorner.addEventListener("mousedown", initDrag, false);

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
  // console.log( 'do drag ')
  sofa.style.maxWidth = startWidth + e.clientX - startX + "px";
  let sofaImg = sofa.querySelector('img');
  sofaImg.style.height = startHeight + e.clientY - startY -20 + "px";

}

function stopDrag(e) {
  document.documentElement.removeEventListener("mousemove", doDrag, false);
  document.documentElement.removeEventListener("mouseup", stopDrag, false);
}
