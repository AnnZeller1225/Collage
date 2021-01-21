///////////////////////////////
// --------  drag  --------- //
///////////////////////////////
let activeMoving = false;
let activeRotating = false;
// const image = document.querySelector("#cat"); // главный бокс где вообще все
const rightCorner = document.querySelector("#rotate2");// навесить циклом слушатель

const imageCont = document.querySelector("#draggable");
let imgCat = document.querySelector('#catImg');
(function () {
  var init,
    start,
    stop,
    move,
    _x,
    _y,

    drag = document.getElementById("drag"),
    d = document.getElementById("draggable"), // позиционирование
    con = document.getElementById("container");
 
  init = function () {
    // Mouse Events
    drag.addEventListener("mousedown", start, false);
    document.documentElement.addEventListener(
      "mousemove",
      (e) => move(e),
      false
    );

    document.addEventListener("mouseup", (e) => stop(e.originalEvent), false);
  };

  start = function (e) {
    console.log("start");
    e.preventDefault();
    // mouse pos
    var Mx = e.clientX,
      My = e.clientY,
      l = d.getBoundingClientRect().left,
      t = d.getBoundingClientRect().top;
    // offset
    _x = Mx - l;
    _y = My - t;
    return (activeMoving = true);
  };

  move = function (e) {
    e.preventDefault();
    if (activeMoving) {
      var Mx = e.clientX,
        My = e.clientY,
        l = d.getBoundingClientRect().left,
        t = d.getBoundingClientRect().top,
        w = d.getBoundingClientRect().width,
        h = d.getBoundingClientRect().height,
        _l = con.getBoundingClientRect().left,
        _t = con.getBoundingClientRect().top,
        _w = con.getBoundingClientRect().width,
        _h = con.getBoundingClientRect().height,
        x,
        y;
      //check to see if mouse is inside container
      if (Mx - _x > _l && Mx + w - _l < _w + _x) {
        // x = mouseX - offsetX - containerX
        x = Mx - _x - _l;
      }
      if (My - _y > _t && My + h - _t < _h + _y) {
        // y = mouseY - offsetY - containerY
        y = My - _y - _t;
      }
      return (d.style.left = x + "px"), (d.style.top = y + "px");
    }
  };

  stop = function () {
    return (activeMoving = false);
  };

  init();
}.call(this));

///////////////////////////////
// -------  rotate  -------- //
///////////////////////////////

(function () {
  var init,
    rotate,
    start,
    stop,
    // active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    center = {
      x: 0,
      y: 0,
    },
    R2D = 180 / Math.PI,
    rot = document.getElementById("rotate");

  init = function () {
    rot.addEventListener("mousedown", start, false);
    rightCorner.addEventListener("mousedown", start, false);

    document.documentElement.addEventListener(
      "mousemove",
      (e) => rotate(e),
      false
    );

    document.addEventListener("mouseup", (e) => stop(e), false);
  };
let draggable = document.querySelector('#draggable')

  start = function (e) {
    e.preventDefault();
    var bb = draggable.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x,
      y;
    center = {
      x: l + w / 2,
      y: t + h / 2,
    };
    ``;
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    return (activeRotating = true);
  };

  rotate = function (e) {
    if (activeRotating) {
      e.preventDefault();
      var x = e.clientX - center.x,
        y = e.clientY - center.y,
        d = R2D * Math.atan2(y, x);
      rotation = d - startAngle;
      return (draggable.style.webkitTransform =
        "rotate(" + (angle + rotation) + "deg)");
    }
  };

  stop = function () {
    event.preventDefault();
    angle += rotation;
    rotation = 0;
    return (activeRotating = false);
  };

  init();
}.call(this));

///////////////////////////////
// -------  resize  -------- //
///////////////////////////////
let actionOfImage = "";
const workField = document.querySelector("#container");
const btnForRes = document.querySelector(".btn-for-rotate__item");
// btnForRes.addEventListener('click', ()=> getHundler(image));
const getHundler = (img) => {
    const btnRotate = img.querySelectorAll('.btn-rotate');
    // btnRotate.forEach(btn => {
        // btn.style.display = "none";
    // });

  const btns = img.querySelectorAll("[direction]");
  actionOfImage = "resize";

  btns.forEach((btn) => {
    btn.addEventListener("mousedown", (e) =>
      getDirection(btn, img, e, workField)
    );
  });

  document.addEventListener("mousemove", (event) =>
    setPosition(img, directionToResize, event)
  );
  document.documentElement.addEventListener(
    "mousemove",
    (event) => changeParams(event, img, directionToResize),
    false
  );

  document.onmouseup = function () {
    isMouseDown = false;
  };

  img.ondragstart = function () {
    return false;
  };
};

getHundler(imageCont);
