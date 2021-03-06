let centerWhenRotated = {};
const prepareRotate = () => {
  // считываем центр картинки  до поворота 
    startPositionWrap = wrap.getBoundingClientRect();
    let imgStartCoord = cat.getBoundingClientRect();
    centerWhenRotated.x = imgStartCoord.x + (imgStartCoord.width / 2);
    centerWhenRotated.y = imgStartCoord.y + (imgStartCoord.height / 2);
    // console.log(centerWhenRotated, 'img coodr')
    rotateBtn.style.display = "block";
  };
  
  const btnForRotation = document.querySelector(".btn-for-rotate");
  btnForRotation.addEventListener("mousedown", (e) => prepareRotate(e, wrap));
  
  const rotateBtn = document.querySelector(".rotate");
  let action = ""; // изменить, есть похожее свойство в Index.js
  let diffPositionRotate = {}; // разница между родительским элементом и повернутой картинкой
  let finishPositionRotate;
  
let cen = {}

let positionImage = {};
const rotation = (imageBox) => {
    var R2D, active, angle, centerImage, rotation, startAngle, stop;
  
    active = false;
    angle = 0;
    rotation = 0;
    startAngle = 0;
    // if (finishCoordinatesPoint.width){
  
    // }
    centerImage = {
      x: 0,
      y: 0,
    };
    R2D = 180 / Math.PI;
    let getCenterImage = function (e) {
      action = "rotate";
      var height, left, top, width, xBtnEvent, yBtnEvent;
       positionImage = imageBox.getBoundingClientRect();



      (top = positionImage.top),
        (left = positionImage.left),
        (height = positionImage.height),
        (width = positionImage.width);
      centerImage = {
        x: left + width / 2,
        y: top + height / 2,
      };
      // console.log('start coord img in rotate (positionImage) ' ,positionImage );
      xBtnEvent = e.clientX - centerImage.x; // вычисляем координаты клика внутри кнопки
      yBtnEvent = e.clientY - centerImage.y;
      startAngle = R2D * Math.atan2(yBtnEvent, xBtnEvent);
  
      return (active = true);
    };
  
    const getRotate = (e) => {
      if (active) {
        var d, x, y;
        x = e.clientX - centerImage.x;
        y = e.clientY - centerImage.y;
        d = R2D * Math.atan2(y, x); // вычисляем угол поворота в данный момент
        rotation = d - startAngle;
        let calculateAngle = angle + rotation;
  
        // присвоили новые координаты переменной при повороте
        // координаты считываются корректно, он углов картинки
  
         
        if (finishCoordinatesPoint.left) {
          imageBox.style.webkitTransformOrigin = `${finishCoordinatesPoint.left} ${finishCoordinatesPoint.top}`;
        }
        return (imageBox.style.webkitTransform =
          "rotate(" + calculateAngle + "deg)");
      }
    };
  
    stop = function () {
      if (action === "rotate") {
        // получили новые координаты  картинки после поворота
        finishPositionRotate = imageBox.getBoundingClientRect();
        // для корректного поворота
        diffPositionRotate.x = finishPositionRotate.x - startPositionWrap.x; 
        diffPositionRotate.y = finishPositionRotate.y - startPositionWrap.y;
      } 
      angle += rotation;
      rotation = 0;
      action = "";
      return (active = false);
    };
  
    rotateBtn.addEventListener("mousedown", getCenterImage, false);
  
    document.documentElement.addEventListener(
      "mousemove",
      (e) => getRotate(e),
      false
    );
    document.addEventListener("mouseup", stop, false);
  };

  document.addEventListener('click', (e) => {
    console.log(e.pageX, e.pageY, 'click')
  })