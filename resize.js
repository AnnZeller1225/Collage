"use strict";

function setPosition(positionedImage, direction, pageX, pageY, shiftX, shiftY) {
  // задать позицию картинке (меняем при mousemove)
  if (direction === "left" || direction === "leftBottom") {
    positionedImage.style.left = pageX - shiftX + "px";
    // positionedImage.style.top = pageY + "px";
  } else if (direction === "leftTop") {
    console.log('left top in setP')
    positionedImage.style.left = pageX - shiftX + "px";
    positionedImage.style.top = pageY - shiftY + "px";

  } else if (direction === "rightTop") {
    positionedImage.style.right = pageX - shiftX + "px";
    positionedImage.style.top = pageY - shiftY + "px";

  }
  
  
  else if (direction === "top") {
    positionedImage.style.top = pageY + "px";
    positionedImage.style.left = pageX - shiftX + "px";
  } else {
    console.log("setPosition, exception");
  }
}
// для правого нижнего угла
const resizing = (imageBox) => {
  console.log('resizing')
  const rbCorner = imageBox.querySelector(".square__corner--rb");
  const lbCorner = imageBox.querySelector(".square__corner--lb");
  const rtCorner = imageBox.querySelector(".square__corner--rt");

  rbCorner.addEventListener("mousedown", startDrag, false);
  rtCorner.addEventListener("mousedown", startDrag, false);
  lbCorner.addEventListener("mousedown", startDrag, false);

  var startX, startY, startWidth, startHeight;

  function startDrag(e) {
    let target = e.currentTarget;
    console.log("startDrag");

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(imageBox).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(imageBox).height,
      10
    );
    if (target.classList.contains("square__corner--rb")) {
      document.documentElement.addEventListener("mousemove", doDrag, false); // здесь делать условие куда двигать
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
  }

  function doDrag(e) {
    // console.log("do drag ");

    imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
    let imageBoxImg = imageBox.querySelector("img");
    imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
  }

  function stopDrag(e) {
    console.log(" stop");
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }
  

  // function changeParams(e, direction) {
  //   let imageBoxImg = imageBox.querySelector("img");
  //   console.log(direction);
  //   if (direction === "left") {
  //     console.log("left ");
  //     imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
  //     imageBoxImg.style.height = 280 + "px";
  //   } else {
  //     console.log("else");
  //     imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
  //     imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
  //   }
  // }

};

// ..левая линия
const resizingToLeft = (imageBox) => {
  const lineToLeft = imageBox.querySelector(".square-line--left");

  lineToLeft.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "left")
  );
  lineToLeft.addEventListener(
    "mousedown",
    (e) => startDrag(e, imageBox),
    false
  );

  let startX, startY, startWidth, startHeight;

  function startDrag(e, imageBox) {
    // начинаем определять куда двигать
    // console.log(imageBox)
    let target = e.currentTarget;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(imageBox).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(imageBox).height,
      10
    );

    document.documentElement.addEventListener("mousemove", changeParams, false);
    document.documentElement.addEventListener(
      "mouseup",
      stopChangeParams,
      false
    );

    function changeParams(e) {
      // изменяет параметры картинки, ширину и высоту
      // console.log('changeParams')
      let imageBoxImg = imageBox.querySelector("img");
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      // imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
      imageBoxImg.style.height = 280 + "px";
    }

    function stopChangeParams(e) {
      console.log(" stop drug left ");
      document.documentElement.removeEventListener(
        "mousemove",
        changeParams,
        false
      );
      document.documentElement.removeEventListener(
        "mouseup",
        stopChangeParams,
        false
      );
    }
  }
};



// вниз влево
const resizingToLeftBottom = (imageBox) => {
  const lbCorner = imageBox.querySelector(".square__corner--lb");

  lbCorner.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "leftBottom")
  );
  lbCorner.addEventListener("mousedown", (e) => startDrag(e, imageBox), false);

  let startX, startY, startWidth, startHeight;

  function startDrag(e, imageBox) {
    // начинаем определять куда двигать
    // console.log(imageBox)
    let target = e.currentTarget;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(imageBox).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(imageBox).height,
      10
    );

    document.documentElement.addEventListener("mousemove", changeParams, false);
    document.documentElement.addEventListener(
      "mouseup",
      stopChangeParams,
      false
    );

    function changeParams(e) {
      // изменяет параметры картинки, ширину и высоту
      let imageBoxImg = imageBox.querySelector("img");
      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBoxImg.style.height = startHeight + e.clientY - startY - 20 + "px";
    }

    function stopChangeParams(e) {
      console.log(" stop drug left ");
      document.documentElement.removeEventListener(
        "mousemove",
        changeParams,
        false
      );
      document.documentElement.removeEventListener(
        "mouseup",
        stopChangeParams,
        false
      );
    }
  }
};

// левый верний угол
const resizingToLeftTop = (imageBox) => {
  const ltCorner = imageBox.querySelector(".square__corner--lt");
  ltCorner.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "leftTop")
  );
  ltCorner.addEventListener("mousedown", (e) => startDrag(e, imageBox), false);

  let startX, startY, startWidth, startHeight;

  function startDrag(e, imageBox) {
    // начинаем определять куда двигать
    // console.log(imageBox)
    let target = e.currentTarget;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(imageBox).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(imageBox).height,
      10
    );

    document.documentElement.addEventListener("mousemove", changeParams, false);
    document.documentElement.addEventListener(
      "mouseup",
      stopChangeParams,
      false
    );

    function changeParams(e) {
      // изменяет параметры картинки, ширину и высоту
      // console.log('changeParams')
      let imageBoxImg = imageBox.querySelector("img");

      imageBox.style.maxWidth = startWidth - e.clientX + startX + "px";
      imageBoxImg.style.height = startHeight - e.clientY - startY - 20 + "px";
    }

    function stopChangeParams(e) {
      // console.log(" stop drug left ");
      document.documentElement.removeEventListener(
        "mousemove",
        changeParams,
        false
      );
      document.documentElement.removeEventListener(
        "mouseup",
        stopChangeParams,
        false
      );
    }
  }
};




// .. правый верхний угол, который мерзко двигается не туда

const resizingToRightTop = (imageBox) => {
  const rtCorner = imageBox.querySelector(".square__corner--rt");
  rtCorner.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "rightTop")
  );
  rtCorner.addEventListener("mousedown", (e) => startDrag(e, imageBox), false);

  let startX, startY, startWidth, startHeight;

  function startDrag(e, imageBox) {
    // начинаем определять куда двигать
    let target = e.currentTarget;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(imageBox).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(imageBox).height,
      10
    );

    document.documentElement.addEventListener("mousemove", changeParams, false);
    document.documentElement.addEventListener(
      "mouseup",
      stopChangeParams,
      false
    );

    function changeParams(e) {
      // изменяет параметры картинки, ширину и высоту
      console.log(' change params')
      let imageBoxImg = imageBox.querySelector("img");

      imageBox.style.maxWidth = startWidth + e.clientX - startX + "px";
  
      imageBoxImg.style.height = imageBoxImg.style.height + "px";

      
    }

    function stopChangeParams(e) {
      // console.log(" stop drug left ");
      document.documentElement.removeEventListener(
        "mousemove",
        changeParams,
        false
      );
      document.documentElement.removeEventListener(
        "mouseup",
        stopChangeParams,
        false
      );
    }
  }
};























// универсальная
const changePosition = (event, image, direction) => {
  console.log("unive");
  let shiftX = event.clientX - image.getBoundingClientRect().left;
  let shiftY = event.clientY - image.getBoundingClientRect().top;

  image.style.position = "absolute";
  document.body.append(image);

  function onMouseMove(event) {
    setPosition(image, direction, event.pageX, event.pageY, shiftX, shiftY);
  }
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
  };
};

// ..должна быть универсальна, но пока фиг
// function changeParams(event, imageBox) 


// верхняя линия (сужаем)
const resizingToTop = (imageBox) => {
  const lineTop = imageBox.querySelector(".square-line--top");

  lineTop.addEventListener("mousedown", (event) =>
    changePosition(event, imageBox, "top")
  );
  lineTop.addEventListener("mousedown", (e) => startDrag(e, imageBox), false);

  let startX, startY, startWidth, startHeight;

  function startDrag(e, imageBox) {
    // начинаем определять куда двигать
    // console.log(imageBox)
    let target = e.currentTarget;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(imageBox).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(imageBox).height,
      10
    );

    document.documentElement.addEventListener("mousemove", changeParams, false);
    document.documentElement.addEventListener(
      "mouseup",
      stopChangeParams,
      false
    );

    function changeParams(e) {
      // изменяет параметры картинки, ширину и высоту
      let imageBoxImg = imageBox.querySelector("img");
      console.log(" change ");
      imageBox.style.maxWidth = startWidth + "px";
      imageBoxImg.style.height = startHeight - e.clientY - 20 + "px";
    }

    function stopChangeParams(e) {
      // console.log(" stop drug left ");
      document.documentElement.removeEventListener(
        "mousemove",
        changeParams,
        false
      );
      document.documentElement.removeEventListener(
        "mouseup",
        stopChangeParams,
        false
      );
    }
  }
};
